import React, { useState, useEffect } from 'react';
import {
    Box,
    Stack,
    Dialog,
    DialogContent,
    Typography,
    MenuItem,
    Select,
    FormControl,
} from '@mui/material';
import { useIntl } from 'react-intl';
import { KubeDeploymentCard } from "../../../components/InfoCard";
import { KubeInput } from "../../../components/Input";
import { KubeCancelButton, KubeConfirmButton } from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDataSources } from '../../../actions/dataSourceAction';
import { getQueryParameter } from '../../../actions/algorithmAction';
import { runAlgorithm } from '../../../actions/algorithmAction';


export default function RunAlgorithmForm({ open, handleClose, instanceToCreate, onRefresh  }) {
    const intl = useIntl();
    const dispatch = useDispatch();

    // 从 Redux 获取数据源列表
    const dataSources = useSelector((state) => state.DataSource.dataSources || []);

    // 状态管理
    const [runName, setRunName] = useState(''); // 实例名称
    const [selectedSource, setSelectedSource] = useState([]); // 选中的数据源
    const [selectedTypes, setSelectedTypes] = useState({}); // 每个数据源选择的类型
    const [dataSourceTypes, setDataSourceTypes] = useState({}); // 每个数据源对应的类型
    const [queryParams, setQueryParams] = useState({}); // 每个数据源的动态参数
    const [customParams, setCustomParams] = useState([]); // 自定义参数

    // 当表单打开时重置状态
    useEffect(() => {
        if (open) {
            // 重置所有状态
            setRunName('');
            setSelectedTypes({});
            setDataSourceTypes({});
            setQueryParams({});
            setCustomParams([]);

            // 加载数据源
            dispatch(fetchAllDataSources());
        }
    }, [open, dispatch]);


    // 加载数据源
    useEffect(() => {
        if (open) {
            dispatch(fetchAllDataSources());
        }
    }, [open, dispatch]);

    // 解析 `instanceToCreate.input` 并设置 `selectedSource`
    useEffect(() => {
        if (instanceToCreate?.input) {
            try {
                const parsedSources = JSON.parse(instanceToCreate.input);
                setSelectedSource(Array.isArray(parsedSources) ? parsedSources : [parsedSources]);
            } catch (error) {
                console.error('Failed to parse input:', error);
                setSelectedSource([]);
            }
        } else {
            setSelectedSource([]);
        }
    }, [instanceToCreate]);

    // 匹配数据源与类型
    useEffect(() => {
        if (Array.isArray(selectedSource)) {
            const typesMap = {};
            selectedSource.forEach((sourceName) => {
                const matchedSource = dataSources.find((dataSource) => dataSource.name === sourceName);
                if (matchedSource) {
                    typesMap[sourceName] = (matchedSource.types || []).map((type) => ({
                        name: type.name,
                        description: type.description || '',
                    }));
                } else {
                    console.warn(`No matching data source found for: ${sourceName}`);
                }
            });
            setDataSourceTypes(typesMap);
        }
    }, [selectedSource, dataSources]);

    // 动态加载参数
    useEffect(() => {
        const fetchDynamicParams = async () => {
            const paramsMap = {};
            for (const source of selectedSource) {
                const type = selectedTypes[source];
                if (type) {
                    // 使用 getQueryParameter 调用接口
                    const payload = { input: source, type };
                    const params = await dispatch(getQueryParameter(payload)); // 调用接口
                    if (params) {
                        paramsMap[source] = params;
                    }
                }
            }
            setQueryParams(paramsMap);
        };
        fetchDynamicParams();
    }, [selectedSource, selectedTypes]);

    // 添加自定义参数
    const handleAddCustomParam = () => {
        setCustomParams([...customParams, { name: '', value: '' }]);
    };

    /// 处理数据类型输入框的变化
    const handleParamChange = (index, key) => (event) => {
        const updatedParam = [...customParams];
        updatedParam[index][key] = event.target.value;
        setCustomParams(updatedParam);
    };


    // 删除指定参数
    const handleParamDelete = (index) => () => {
        const updatedParams = customParams.filter((_, idx) => idx !== index); // 删除对应的参数
        setCustomParams(updatedParams); // 调用 setCustomParams
    };



    // 提交表单
    const handleSubmit = async () => {
        // 构造自定义参数，将 value 设置为 type
        const formattedCustomParams = customParams.map(param => ({
            name: param.name, // 保留参数名称
            value: param.type, // 将 value 设置为用户选择的 type（String 或 Number）
        }));

        const payload = {
            algorithmId: instanceToCreate?.id || 0,
            runName,
            input: selectedSource.map((source) => ({
                input: source,
                type: selectedTypes[source] || '',
                dataSourceParam: (queryParams[source] || []).map((param) => ({
                    name: param.name,
                    value: param.value || param.defaultValue,
                })),
            })),
            parameter: formattedCustomParams,
        };

        try {
            // 调用接口函数
            const response = await dispatch(runAlgorithm(payload));

            if (response) {
                console.log('Algorithm instance created:', response);
                if (onRefresh) {
                    onRefresh(); // 调用父组件传递的刷新方法
                }
                handleClose(); // 关闭弹窗
            } else {
                console.error('Failed to create algorithm instance.');
            }
        } catch (error) {
            console.error('Error running algorithm:', error);
        }
    };

    // 动态参数渲染函数
    const renderQueryParams = (source) => {
        const params = queryParams[source] || [];
        return (
            <Box key={source} sx={{ marginTop: 2 }}>
                {selectedTypes[source] && ( // 当用户选择了类型时才渲染
                    <>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                marginBottom: 1,
                                fontWeight: 'bold'
                        }}
                        >
                            {intl.messages['evolution.queryParametersForData']}
                        </Typography>
                        {params.map((param, index) => (
                            <KubeInput
                                key={`${source}-${index}`}
                                label={`${param.name} (${param.description})`}
                                value={param.value || param.defaultValue || ''}
                                onChange={(e) => {
                                    const updatedParams = { ...queryParams };
                                    updatedParams[source][index].value = e.target.value;
                                    setQueryParams(updatedParams);
                                }}
                            />
                        ))}
                    </>
                )}
            </Box>
        );
    };


    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogContent sx={{ overflowY: 'auto', maxHeight: '80vh', padding: '16px 32px' }}>
                <KubeDeploymentCard
                    title={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>{intl.messages['evolution.createInstance']}</span>}
                    handleClose={handleClose}
                    sx={{
                        padding: '32px',
                        bgcolor: '#FFFFFF',
                        maxWidth: '500px',
                        margin: 'auto',
                        position: 'relative',
                    }}
                >
                    <Stack direction="column" spacing={2} sx={{ padding: '16px', bgcolor: '#eff4f9' }}>
                        <KubeInput
                            label={intl.messages['evolution.runName']}
                            required
                            variant="outlined"
                            value={runName}
                            onChange={(e) => setRunName(e.target.value)}
                        />

                        {selectedSource.map((source) => (
                            <Box key={source}>
                                <KubeInput
                                    label={intl.messages['evolution.dataSource']}
                                    variant="outlined"
                                    value={source}
                                    disabled
                                />
                                <Box>
                                    <Typography
                                        sx={{
                                            fontSize: '12px',
                                            fontWeight: 500,
                                            color: '#36435c',
                                            marginBottom: '4px',
                                        }}
                                    >
                                        {intl.messages['evolution.dataSourceType']}
                                    </Typography>
                                    <FormControl
                                        sx={{
                                            width: '100%',
                                            '& .MuiOutlinedInput-root': {
                                                height: '32px',
                                                borderRadius: '5px',
                                                paddingY: '4px',
                                            },
                                            '& .MuiInputBase-input': {
                                                padding: '8px 12px',
                                                fontSize: '0.875rem',
                                            },
                                        }}
                                    >
                                        <Select
                                            value={selectedTypes[source] || ''}
                                            onChange={(e) =>
                                                setSelectedTypes({ ...selectedTypes, [source]: e.target.value })
                                            }
                                            variant="outlined"
                                        >
                                            {(dataSourceTypes[source] || []).map((type) => (
                                                <MenuItem key={type.name} value={type.name}>
                                                    {type.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                {renderQueryParams(source)}
                            </Box>
                        ))}

                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    marginBottom: 1, // 添加与参数输入框的间距
                                    fontWeight: 'bold', // 设置字体加粗
                                }}
                            >
                                {intl.messages['evolution.customParams']}
                            </Typography>
                            {customParams.map((param, index) => (
                                <Stack direction="row" spacing={2} key={index} alignItems="center">
                                    <KubeInput
                                        label={intl.messages['evolution.paramName']}
                                        value={param.name}
                                        onChange={handleParamChange(index, 'name')}
                                    />
                                    <Box sx={{ marginBottom: 1, width: '100%',paddingTop: '2px'}}>
                                        <Typography
                                            sx={{
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                color: '#36435c',
                                                marginBottom: '4px'
                                            }}
                                        >
                                            {intl.messages['evolution.paramValue']}
                                        </Typography>
                                        <FormControl
                                            sx={{
                                                width: '81%',
                                                '& .MuiOutlinedInput-root': {
                                                    height: '32px',
                                                    borderRadius: '5px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    paddingY: '4px', // 添加垂直内边距，确保文字居中
                                                },
                                                '& .MuiInputBase-input': {
                                                    padding: '8px 12px',
                                                    fontSize: '0.875rem',
                                                    display: 'flex',
                                                    alignItems: 'center', // 保持文字居中
                                                },
                                            }}
                                        >
                                            <Select
                                                value={param.type}
                                                onChange={handleParamChange(index, 'type')}
                                                variant="outlined"
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center', // 确保选择框中的文字垂直居中
                                                    paddingY: '4px', // 控制内部上下边距
                                                }}
                                            >
                                                <MenuItem value="String">String</MenuItem>
                                                <MenuItem value="Number">Integer</MenuItem>
                                            </Select>
                                            <KubeConfirmButton
                                                onClick={handleParamDelete(index)}
                                                sx={{
                                                    height: '32px',
                                                    width: '8px',
                                                    marginTop: -4,
                                                    marginLeft: 43,
                                                    backgroundColor: '#242e42', // 设定背景色
                                                    color: '#FFFFFF', // 设定字体颜色
                                                    '&:hover': {
                                                        backgroundColor: '#242e42' // 设置悬停时的背景色
                                                    }
                                                }}
                                            >
                                                {intl.messages['evolution.delete']}
                                            </KubeConfirmButton>
                                        </FormControl>
                                    </Box>
                                </Stack>
                            ))}
                            <KubeConfirmButton onClick={handleAddCustomParam}>
                                {intl.messages['evolution.addParam']}
                            </KubeConfirmButton>
                        </Box>
                    </Stack>
                </KubeDeploymentCard>
            </DialogContent>
            {/* 固定底部按钮 */}
            <Box
                sx={{
                    padding: '16px 32px',
                    borderTop: '1px solid #e0e0e0', // 顶部分隔线
                    backgroundColor: '#fff',
                    position: 'sticky',
                    bottom: 0, // 固定在底部
                    zIndex: 10,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '16px',
                }}
            >
                <KubeCancelButton onClick={handleClose}>
                    {intl.messages['common.cancel']}
                </KubeCancelButton>
                <KubeConfirmButton onClick={handleSubmit}>
                    {intl.messages['evolution.createInstance']}
                </KubeConfirmButton>
            </Box>
        </Dialog>
    );
}

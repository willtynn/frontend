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
import {KubeDeploymentCard} from "../../../components/InfoCard";
import {KubeInput} from "../../../components/Input";
import {KubeCancelButton, KubeConfirmButton} from "../../../components/Button";
import {useDispatch, useSelector} from "react-redux";
import { fetchAllDataSources } from "../../../actions/dataSourceAction";
import {addAlgorithm, fetchAllAlgorithms} from "../../../actions/algorithmAction";
import IconButton from "@mui/material/IconButton";


export default function AddAlgorithm({open, handleClose}) {
    const intl = useIntl();
    const dispatch = useDispatch(); // 初始化 dispatch

    // 从 Redux 获取数据源列表
    const dataSources = useSelector(state => state.DataSource.dataSources);

    // 初始化数据源基本信息
    const initialAddAlgorithmState = {
        name: '',
        info: '',
        type:'',
        input: [''],
        output: '',
        parameter: [],
        url: ''
    };

    const initialAlgorithmParamState = [];

    // 注册数据源基本信息
    const [algorithm, setAlgorithm] = useState(initialAddAlgorithmState);

    // 算法参数
    const [algorithmParam, setAlgorithmParam] = useState(initialAlgorithmParamState);

    // 每次打开时重置表单状态
    useEffect(() => {
        if (open) {
            setAlgorithm(initialAddAlgorithmState);
            setAlgorithmParam(initialAlgorithmParamState);
            dispatch(fetchAllDataSources());
        }
    }, [open, dispatch]);

    // 处理基本信息输入框的变化
    const handleInputChange = (key) => (event) => {
        setAlgorithm({ ...algorithm, [key]: event.target.value });
    };

    // 添加新的 input 选择框
    const addInput = () => {
        setAlgorithm({ ...algorithm, input: [...algorithm.input, ''] }); // 新增一个空数组
    };

    // 删除指定 input
    const handleInputDelete = (index) => () => {
        const updatedInput = algorithm.input.filter((_, idx) => idx !== index); // 删除对应的 input
        setAlgorithm({ ...algorithm, input: updatedInput });
    };

    // 处理单选数据源的变化
    const handleInputSelectChange = (index) => (event) => {
        const updatedInput = [...algorithm.input];
        updatedInput[index] = event.target.value; // 更新对应位置的值
        setAlgorithm({ ...algorithm, input: updatedInput });
    };

    // 添加算法参数
    const addParam = () => {
        setAlgorithmParam([...algorithmParam, { name: '', type: ''}]);
    };

    // 删除指定参数
    const handleParamDelete = (index) => () => {
        const updatedParam = algorithmParam.filter((_, idx) => idx !== index); // 删除对应的参数
        setAlgorithmParam(updatedParam);
    };

    // 处理数据类型输入框的变化
    const handleParamChange = (index, key) => (event) => {
        const updatedParam = [...algorithmParam];
        updatedParam[index][key] = event.target.value;
        setAlgorithmParam(updatedParam);
    };

    // 提交表单数据
    const handleSubmit = () => {
        const fullAlgorithm = { ...algorithm,  parameter: algorithmParam };
        dispatch(addAlgorithm(fullAlgorithm))
            .then(() => {
                // addAlgorithm 完成后再调用 fetchAllAlgorithms
                dispatch(fetchAllAlgorithms());
                handleClose(); // 关闭弹窗
            })
            .catch((error) => {
                console.error("提交失败:", error);
                // 处理错误
            });
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogContent sx={{ overflowY: 'auto', maxHeight: '80vh', padding: '16px 32px' }}>
                <KubeDeploymentCard
                    title={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>{intl.messages['evolution.addAlgorithm']}</span>}
                    handleClose={handleClose}
                    sx={{
                        padding: '32px',
                        bgcolor: '#FFFFFF',
                        maxWidth: '500px',
                        margin: 'auto',
                    }}
                >
                    {/* 基本信息输入框 */}
                    <Stack direction="column" spacing={2} sx={{ padding: '16px', bgcolor: '#eff4f9' }}>
                        <KubeInput
                            label={intl.messages['evolution.name']}
                            required
                            variant="outlined"
                            value={algorithm.name}
                            onChange={handleInputChange('name')}
                        />
                        <KubeInput
                            label={intl.messages['evolution.info']}
                            variant="outlined"
                            value={algorithm.info}
                            onChange={handleInputChange('info')}
                        />
                        {/*type下拉框*/}
                        <Box sx={{ marginBottom: 1, width: '100%'}}> {/* 外部容器，确保与其他输入框一致 */}
                            {/* 使用 Typography 将 label 放在上方 */}
                            <Typography
                                sx={{
                                    fontSize: '12px',  // 调整为与其他输入框标签一致
                                    fontWeight: 500,
                                    color: '#36435c',  // 调整为与其他输入框标签一致
                                    marginBottom: '4px'
                                }}
                            >
                                {intl.messages['evolution.type']}
                            </Typography>
                            <FormControl
                                sx={{
                                    width: '100%', // 确保宽度占满父容器
                                    '& .MuiOutlinedInput-root': {
                                        height: '32px', // 控制外部容器高度
                                        borderRadius: '5px', // 统一圆角
                                        paddingRight: '14px', // 控制右侧内边距
                                        display: 'flex',
                                        alignItems: 'center', // 垂直居中内容
                                        paddingY: '4px', // 添加垂直内边距，确保文字居中
                                    },
                                    '& .MuiInputBase-input': {
                                        height: '32px', // 控制内部输入框高度
                                        padding: '8px 12px', // 内边距与其他输入框一致
                                        fontSize: '0.875rem', // 将输入框文字大小设置为较小尺寸
                                        display: 'flex',
                                        alignItems: 'center', // 保持文字居中
                                    },
                                }}
                            >
                                <Select
                                    value={algorithm.type}
                                    onChange={handleInputChange( 'type')}
                                    variant="outlined"
                                >
                                    <MenuItem value="analyze">analyze</MenuItem>
                                    <MenuItem value="plan">plan</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        {/* input 下拉框，支持多选 */}
                        <Box sx={{ marginBottom: 1, width: '100%' }}>
                            <Typography
                                sx={{
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    color: '#36435c',
                                    marginBottom: '4px'
                                }}
                            >
                                {intl.messages['evolution.input']}
                            </Typography>
                            {algorithm.input.map((input, index) => (
                                <Box key={index} sx={{ marginBottom: 1, width: '100%' }}>
                                    <FormControl
                                        sx={{
                                            width: '90%', // 确保宽度占满父容器
                                            '& .MuiOutlinedInput-root': {
                                                height: '32px', // 控制外部容器高度
                                                borderRadius: '5px', // 统一圆角
                                                paddingRight: '14px', // 控制右侧内边距
                                                display: 'flex',
                                                alignItems: 'center', // 垂直居中内容
                                                paddingY: '4px', // 添加垂直内边距，确保文字居中
                                            },
                                            '& .MuiInputBase-input': {
                                                height: '32px', // 控制内部输入框高度
                                                padding: '8px 12px', // 内边距与其他输入框一致
                                                fontSize: '0.875rem', // 将输入框文字大小设置为较小尺寸
                                                display: 'flex',
                                                alignItems: 'center', // 保持文字居中
                                            },
                                        }}>
                                        <Select
                                            value={input}
                                            onChange={handleInputSelectChange(index)} // 传递当前索引
                                            variant="outlined"
                                        >
                                            {dataSources && dataSources.map((source, idx) => (
                                                <MenuItem key={idx} value={source.name}>
                                                    {source.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <KubeConfirmButton
                                        onClick={handleInputDelete(index)}
                                        sx={{
                                            marginTop: -7.5,
                                            marginLeft: 90,
                                            backgroundColor: '#242e42', // 设定背景色
                                            color: '#FFFFFF', // 设定字体颜色
                                            '&:hover': {
                                                backgroundColor: '#242e42' // 设置悬停时的背景色
                                            }
                                        }}
                                    >
                                        {intl.messages['evolution.delete']}
                                    </KubeConfirmButton>
                                </Box>
                            ))}
                            <KubeConfirmButton onClick={addInput}>
                                {intl.messages['evolution.addInput']}
                            </KubeConfirmButton>
                        </Box>
                        <KubeInput
                            label={intl.messages['evolution.output']}
                            variant="outlined"
                            value={algorithm.output}
                            onChange={handleInputChange('output')}
                        />
                        <KubeInput
                            label={intl.messages['evolution.url']}
                            variant="outlined"
                            value={algorithm.url}
                            onChange={handleInputChange('url')}
                        />
                        {/* 查询参数 */}
                        <Box sx={{ mt: 2 }}>
                            <Typography
                                variant="subtitle2"
                                sx={{ mb: 1, ml: 2, fontSize: '0.875rem', fontWeight: 'bold' }}
                            >
                                {intl.messages['evolution.parameter']}
                            </Typography>
                            {algorithmParam.map((param, paramIndex) => (
                                <Stack key={paramIndex} direction="row" spacing={2} sx={{ mb: 1 }}>
                                    <KubeInput
                                        label={intl.messages['evolution.parameterName']}
                                        variant="outlined"
                                        value={param.name}
                                        onChange={handleParamChange(paramIndex, 'name')}
                                    />

                                    {/*查询参数的枚举类型下拉框*/}
                                    <Box sx={{ marginBottom: 1, width: '100%',paddingTop: '2px'}}>
                                        <Typography
                                            sx={{
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                color: '#36435c',
                                                marginBottom: '4px'
                                            }}
                                        >
                                            {intl.messages['evolution.paramsType']}
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
                                                onChange={handleParamChange(paramIndex, 'type')}
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
                                                onClick={handleParamDelete(paramIndex)}
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
                            <KubeConfirmButton onClick={() => addParam(algorithmParam)}
                                               sx={{
                                                   backgroundColor: '#242e42', // 设定背景色
                                                   color: '#FFFFFF', // 设定字体颜色
                                                   '&:hover': {
                                                       backgroundColor: '#242e42' // 设置悬停时的背景色
                                                   }
                                               }}
                            >
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
                    {intl.messages['evolution.addAlgorithm']}
                </KubeConfirmButton>
            </Box>
        </Dialog>
    );
}
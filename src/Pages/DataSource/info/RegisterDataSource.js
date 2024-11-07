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
import { useDispatch} from "react-redux";
import { registerDataSource } from '../../../actions/dataSourceAction';


export default function RegisterDataSourceDialog({open, handleClose}) {
    const intl = useIntl();
    const dispatch = useDispatch(); // 初始化 dispatch

    // 初始化数据源基本信息
    const initialDataSourceState = {
        cluster: 0,
        description: '',
        host: '',
        name: '',
        types: [],
        url: '',
        interval: 0,
    };

    // 初始化数据类型
    const initialDataTypesState = [];


    // 注册数据源基本信息
    const [dataSource, setDataSource] = useState(initialDataSourceState);

    // 枚举类型types
    const [dataTypes, setDataTypes] = useState(initialDataTypesState);

    // 每次打开时重置表单状态
    useEffect(() => {
        if (open) {
            setDataSource(initialDataSourceState);
            setDataTypes(initialDataTypesState);
        }
    }, [open]);

    // 处理基本信息输入框的变化
    const handleInputChange = (key) => (event) => {
        setDataSource({ ...dataSource, [key]: event.target.value });
    };

    // 添加数据类型
    const addDataType = () => {
        setDataTypes([...dataTypes, { description: '', driver: '', index: dataTypes.length, name: '', queryParameters: [], schema:'' }]);
    };

    // 处理数据类型输入框的变化
    const handleDataTypeChange = (index, key) => (event) => {
        const updatedTypes = [...dataTypes];
        updatedTypes[index][key] = event.target.value;
        setDataTypes(updatedTypes);
    };

    // 添加查询参数
    const addQueryParameter = (typeIndex) => {
        const updatedTypes = [...dataTypes];
        updatedTypes[typeIndex].queryParameters = updatedTypes[typeIndex].queryParameters || [];
        updatedTypes[typeIndex].queryParameters.push({ name: '', description: '', required: false, type: '', default:'' });
        setDataTypes(updatedTypes);
    };

    // 处理查询参数输入框的变化
    const handleQueryParameterChange = (typeIndex, paramIndex, key) => (event) => {
        const updatedTypes = [...dataTypes];
        updatedTypes[typeIndex].queryParameters[paramIndex][key] = event.target.value;
        setDataTypes(updatedTypes);
    };

    // 提交表单数据
    const handleSubmit = () => {
        const fullDataSource = { ...dataSource, types: dataTypes };
        dispatch(registerDataSource(fullDataSource)); // 调用 registerDataSource
        handleClose(); // 关闭弹窗
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogContent sx={{ overflowY: 'auto', maxHeight: '80vh', padding: '16px 32px' }}>
                <KubeDeploymentCard
                    title={<span style={{ fontSize: '20px', fontWeight: 'bold' }}>{intl.messages['dataSource.dataSourceRegister']}</span>}
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
                            label={intl.messages['dataSource.dataSourceName']}
                            required
                            variant="outlined"
                            value={dataSource.name}
                            onChange={handleInputChange('name')}
                        />
                        <KubeInput
                            label={intl.messages['dataSource.dataSourceDes']}
                            variant="outlined"
                            value={dataSource.description}
                            onChange={handleInputChange('description')}
                        />
                        <KubeInput
                            label={intl.messages['dataSource.dataSourceCluster']}
                            required
                            variant="outlined"
                            value={dataSource.cluster}
                            onChange={handleInputChange('cluster')}
                        />
                        <KubeInput
                            label={intl.messages['dataSource.dataSourceHost']}
                            variant="outlined"
                            value={dataSource.host}
                            onChange={handleInputChange('host')}
                        />
                        <KubeInput
                            label={intl.messages['dataSource.dataSourceUrl']}
                            variant="outlined"
                            value={dataSource.url}
                            onChange={handleInputChange('url')}
                        />

                        <KubeInput
                            label={intl.messages['dataSource.dataSourceInterval']} // 设置 interval 标签
                            variant="outlined"
                            value={dataSource.interval}
                            onChange={handleInputChange('interval')} // 使用 handleInputChange 处理 interval 变化
                        />
                    </Stack>

                    {/* 数据类型输入框 */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="subtitle2"
                                    sx={{ mb: 2, ml: 2, fontSize: '0.875rem', fontWeight: 'bold' }} // 自定义大小和向右偏移
                            >
                            {intl.messages['dataSource.dataTypes']}
                        </Typography>
                        {dataTypes.map((dataType, typeIndex) => (
                            <Stack key={typeIndex} direction="column" spacing={2} sx={{ mb: 2, padding: '16px', bgcolor: '#f0f4f9' }}>
                                <KubeInput
                                    label={intl.messages['dataSource.dataName']}
                                    variant="outlined"
                                    value={dataType.name}
                                    onChange={handleDataTypeChange(typeIndex, 'name')}
                                />

                                <KubeInput
                                    label={intl.messages['dataSource.dataDescription']}
                                    variant="outlined"
                                    value={dataType.description}
                                    onChange={handleDataTypeChange(typeIndex, 'description')}
                                />

                                <KubeInput
                                    label={intl.messages['dataSource.dataIndex']}
                                    variant="outlined"
                                    value={dataType.index}
                                    onChange={handleDataTypeChange(typeIndex, 'index')}
                                />

                                {/*driver下拉框*/}
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
                                        {intl.messages['dataSource.dataSourceDriver']}
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
                                        {/*<InputLabel>{intl.messages['dataSource.dataSourceDriver']}</InputLabel>*/}
                                        <Select
                                            value={dataType.driver}
                                            onChange={handleDataTypeChange(typeIndex, 'driver')}
                                            variant="outlined"
                                        >
                                            <MenuItem value="http-get">http-get</MenuItem>
                                            <MenuItem value="http-post">http-post</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>


                                <KubeInput
                                    label={intl.messages['dataSource.dataSourceSchema']}
                                    variant="outlined"
                                    value={dataType.schema}
                                    onChange={handleDataTypeChange(typeIndex, 'schema')}
                                />

                                {/* 查询参数 */}
                                <Box sx={{ mt: 2 }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ mb: 1, ml: 2, fontSize: '0.875rem', fontWeight: 'bold' }}
                                    >
                                        {intl.messages['dataSource.queryParameters']}
                                    </Typography>
                                    {dataType.queryParameters?.map((param, paramIndex) => (
                                        <Stack key={paramIndex} direction="row" spacing={2} sx={{ mb: 1 }}>
                                            <KubeInput
                                                label={intl.messages['dataSource.paramsName']}
                                                variant="outlined"
                                                value={param.name}
                                                onChange={handleQueryParameterChange(typeIndex, paramIndex, 'name')}
                                            />

                                            <KubeInput
                                                label={intl.messages['dataSource.paramsDescription']}
                                                variant="outlined"
                                                value={param.description}
                                                onChange={handleQueryParameterChange(typeIndex, paramIndex, 'description')}
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
                                                    {intl.messages['dataSource.paramsType']}
                                                </Typography>
                                                <FormControl
                                                    sx={{
                                                        width: '100%',
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
                                                        onChange={handleQueryParameterChange(typeIndex, paramIndex, 'type')}
                                                        variant="outlined"
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center', // 确保选择框中的文字垂直居中
                                                            paddingY: '4px', // 控制内部上下边距
                                                        }}
                                                    >
                                                        <MenuItem value="String">String</MenuItem>
                                                        <MenuItem value="Integer">Integer</MenuItem>
                                                        <MenuItem value="Float">Float</MenuItem>
                                                        <MenuItem value="DateTime">DateTime</MenuItem>
                                                        <MenuItem value="Boolean">Boolean</MenuItem>
                                                        <MenuItem value="Array">Array</MenuItem>
                                                        <MenuItem value="Object">Object</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>

                                            <KubeInput
                                                label={intl.messages['dataSource.paramsRequired']}
                                                variant="outlined"
                                                value={param.required}
                                                onChange={handleQueryParameterChange(typeIndex, paramIndex, 'required')}
                                            />

                                            <KubeInput
                                                label={intl.messages['dataSource.paramsDefault']}
                                                variant="outlined"
                                                value={param.default}
                                                onChange={handleQueryParameterChange(typeIndex, paramIndex, 'default')}
                                            />
                                        </Stack>
                                    ))}
                                    <KubeConfirmButton onClick={() => addQueryParameter(typeIndex)}
                                        sx={{
                                        backgroundColor: '#242e42', // 设定背景色
                                        color: '#FFFFFF', // 设定字体颜色
                                        '&:hover': {
                                        backgroundColor: '#242e42' // 设置悬停时的背景色
                                    }
                                    }}
                                    >
                                        {intl.messages['dataSource.addParam']}
                                    </KubeConfirmButton>
                                </Box>
                            </Stack>
                        ))}

                        {/*增加数据类型按钮居中*/}
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <KubeConfirmButton onClick={addDataType}>
                                {intl.messages['dataSource.addDataType']}
                            </KubeConfirmButton>
                        </Box>
                    </Box>

                    {/* 提交和取消按钮 */}
                    <Stack
                        direction="row"
                        spacing={3}
                        justifyContent="flex-end"
                        alignItems="center"
                        sx={{ mt: 4, padding: '8px 32px', bgcolor: '#f9fbfd' }}
                    >
                        <KubeCancelButton onClick={handleClose}>
                            {intl.messages['common.cancel']}
                        </KubeCancelButton>
                        <KubeConfirmButton onClick={handleSubmit}>
                            {intl.messages['dataSource.register']}
                        </KubeConfirmButton>
                    </Stack>
                </KubeDeploymentCard>
            </DialogContent>
        </Dialog>
    );


}






















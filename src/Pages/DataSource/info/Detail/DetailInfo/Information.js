// Information.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Box, Typography, MenuItem, Select, FormControl} from '@mui/material';
import { useIntl } from 'react-intl';
import {KubeCancelButton, KubeConfirmButton} from "../../../../../components/Button";
import {Stack} from "@mui/system";
import Dialog from "@mui/material/Dialog";
import {KubeDeploymentCard} from "../../../../../components/InfoCard";
import {KubeInput} from "../../../../../components/Input";
import DialogContent from "@mui/material/DialogContent";
import Question from '@/assets/Question.svg';
import {clearTableData, fetchDataQuery} from "../../../../../actions/dataSourceAction";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


export function Information({ dataSourceName }) {

    const intl = useIntl();
    const dispatch = useDispatch();

    // 在组件加载时清空上次查询的数据
    useEffect(() => {
        dispatch(clearTableData());
    }, [dispatch])

    // 从 Redux 中获取指定 dataSourceName 的数据源详细信息
    const dataSourceDetail = useSelector(state =>
        state.DataSource.dataSources?.find(source => source.name === dataSourceName)
    );

    // 提取 types 中的 driver 属性并设置到下拉框
    const typesOptions = dataSourceDetail?.types.map(type => type.driver) || [];

    // 设置下拉框的状态
    const [selectedType, setSelectedType] = useState(typesOptions[0] || '');

    // 控制 Dialog 的显示状态
    const [openDialog, setOpenDialog] = useState(false);

    const [queryParams, setQueryParams] = useState({}); // 存储查询参数，包括时间字段

    // 控制在点击确认按钮时进行查询
    const [isQuerying, setIsQuerying] = useState(false);

    // 选择起始结束时间 进行与时间戳的转换
    const [selectedDate, setSelectedDate] = useState(null);


    // 存储请求返回的数据
    const responseData = useSelector(state => state.DataSource.tableData);

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
        setQueryParams({}); // Reset query params when type changes
    };



    const handleConfirmClick = () => {
        if (selectedType) {
            setOpenDialog(true); // 打开表单
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // 关闭表单
    };


    const selectedTypeDetails = dataSourceDetail?.types.find(type => type.driver === selectedType);
    const queryParameters = selectedTypeDetails?.queryParameters || [];

    // 普通输入框的变更处理
    const handleQueryParamChange = (name) => (event) => {
        setQueryParams(prevParams => ({
            ...prevParams,
            [name]: event.target.value
        }));
    };

    // 时间选择器的变更处理，将日期转换为时间戳
    const handleDateChange = (name) => (date) => {
        setQueryParams(prevParams => ({
            ...prevParams,
            [name]: date ? date.getTime() : null  // 将Date转换为时间戳
        }));
    }


    // 当发送请求时对名称进行编码
    const fetchData = () => {
        const encodedTypeName = encodeURIComponent(selectedTypeDetails?.name || ''); // 使用 encodeURIComponent 编码
        setIsQuerying(true);
        dispatch(fetchDataQuery(dataSourceName, encodedTypeName, queryParams, selectedTypeDetails)).then(() => {
            setIsQuerying(false);
            handleCloseDialog();
        });
    };

    if (!dataSourceDetail) {
        return <Typography>Loading data...</Typography>; // 或者显示加载状态
    }

    return (
        <Box
            sx={{
                backgroundColor: '#FFFFFF', // 白色背景
                borderRadius: '8px', // 圆角边框
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // 阴影
                padding: 3, // 内边距
                marginTop: 3, // 上边距
            }}
        >

            {/* 下拉框选择类型和确认按钮 */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
                <FormControl
                    sx={{
                        width: '600px',
                        '& .MuiInputLabel-root': {
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#888',
                            marginBottom: '4px'
                        },
                    }}
                >
                    <Select
                        value={selectedType}
                        onChange={handleTypeChange}
                        displayEmpty
                        renderValue={(value) =>
                            value === "" ? intl.messages['dataSource.dataGetOptions'] || "请选择请求方式" : value
                        }
                        sx={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: selectedType ? '#36435c' : '#888', // 使初始提示为浅灰色
                            backgroundColor: '#EFF4F9',
                            padding: '4px 8px',
                            borderRadius: '5px',
                            height: '36px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.23)' },
                                '&:hover fieldset': { borderColor: '#000' },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#55bc8a',
                                    boxShadow: '0 4px 8px 0 rgba(85,188,138,.2)',
                                },
                                borderRadius: '5px',
                            },
                        }}
                    >
                        {typesOptions.map((type, index) => (
                            <MenuItem key={index} value={type} sx={{ fontSize: '15px' }}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{ flexGrow: 1 }} /> {/* 用于将按钮推到右边 */}

                {/* 确认按钮 */}
                <KubeConfirmButton
                    sx={{ width: '150px', height: '36px' }}
                    onClick={handleConfirmClick}
                >
                    {intl.messages['dataSource.confirm']}
                </KubeConfirmButton>
            </Stack>


            {/* 弹出表单 */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
                <DialogContent sx={{ overflowY: 'auto', maxHeight: '80vh', padding: '16px 32px 16px 32px' }}>
                    <KubeDeploymentCard
                        title={<span style={{ fontSize: '20px', fontWeight: 'bold' }}> {intl.messages['dataSource.dataDetailInfoQuery']}</span>}
                        handleClose={handleCloseDialog}
                        sx={{
                            padding: '32px',
                            bgcolor: '#FFFFFF',
                            maxWidth: '500px', // 控制表单最大宽度
                            margin: 'auto',
                            marginRight: '16px' // 右侧留白
                        }}
                    >
                        <Stack direction='column' spacing={2} sx={{ padding: '16px 32px', bgcolor: '#eff4f9', p: '20px', overflowY: 'auto', flex: 1 }}>
                            <Box>
                                <h3>{intl.messages['dataSource.dataInfoQueryInput']}</h3>
                                {/*数据名称*/}
                                {/*解码后的名称显示在前端*/}
                                <KubeInput
                                    label={intl.messages['dataSource.dataName']}
                                    description=""
                                    required={true}
                                    variant='outlined'
                                    value={decodeURIComponent(selectedTypeDetails?.name || '')} // 使用 decodeURIComponent 解码
                                    disabled
                                />

                                {/*数据描述*/}
                                <KubeInput
                                    label={intl.messages['dataSource.dataDescription']}
                                    description=""
                                    required={true}
                                    variant='outlined'
                                    value={selectedTypeDetails?.description || ''}
                                    disabled
                                />

                                {/*数据源驱动方式*/}
                                <KubeInput
                                    label={intl.messages['dataSource.dataSourceDriver']}
                                    description=""
                                    required={true}
                                    variant='outlined'
                                    value={selectedTypeDetails?.driver || ''}
                                    disabled
                                />

                                {/* 动态生成查询参数输入框 */}
                                {queryParameters.map((param, index) => (
                                    param.description && (param.description.includes('time') || param.description.includes('Time')) ?  (
                                        <LocalizationProvider dateAdapter={AdapterDateFns} key={index}>
                                            <Box sx={{ marginBottom: 1, width: '100%' }}> {/* 外部容器，确保与其他输入框一致 */}
                                                {/* 使用 Typography 将 label 放在上方 */}
                                                <Typography
                                                    sx={{
                                                        fontSize: '12px',  // 调整为与其他输入框标签一致
                                                        fontWeight: 500,
                                                        color: '#36435c',  // 调整为与其他输入框标签一致
                                                        marginBottom: '4px'
                                                    }}
                                                >
                                                    {`${param.name} (${param.description || ''})`}
                                                </Typography>

                                                <DateTimePicker
                                                    value={queryParams[param.name] || null}
                                                    onChange={handleDateChange(param.name)}
                                                    sx={{
                                                        width: '100%', // 确保宽度占满父容器
                                                        '& .MuiOutlinedInput-root': {
                                                            height: '34px', // 控制外部容器高度
                                                            borderRadius: '5px', // 统一圆角
                                                            paddingRight: '14px', // 控制右侧内边距
                                                            display: 'flex',
                                                            alignItems: 'center', // 垂直居中内容
                                                        },
                                                        '& .MuiInputBase-input': {
                                                            height: '34px', // 控制内部输入框高度
                                                            padding: '8px 12px', // 内边距与其他输入框一致
                                                            fontSize: '0.875rem', // 将输入框文字大小设置为较小尺寸
                                                        },
                                                        '& .MuiSvgIcon-root': {
                                                            fontSize: '1.25rem', // 控制图标大小
                                                            marginRight: '8px', // 控制图标与文字的间距
                                                        },
                                                    }}
                                                    renderInput={(params) => <KubeInput {...params} />}
                                                />
                                            </Box>
                                        </LocalizationProvider>
                                    ) : (
                                        <KubeInput
                                            key={index}
                                            label={`${param.name} (${param.description || ''})`}
                                            required={param.required}
                                            variant='outlined'
                                            value={queryParams[param.name] || ''}
                                            onChange={handleQueryParamChange(param.name)}
                                            fullWidth
                                            sx={{
                                                marginBottom: 2, // 保持垂直间距一致
                                                height: '36px', // 统一高度
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '5px', // 保持圆角一致
                                                },
                                            }}
                                        />
                                    )
                                ))}
                            </Box>
                        </Stack>


                        <Stack
                            sx={{
                                mt: '40px',
                                padding: '8px 32px 8px 16px', // 左右增加 padding
                                bottom: '12px',
                                width: '100%',
                                bgcolor: '#f9fbfd',
                            }}
                            direction='row'
                            spacing={3}
                            justifyContent='flex-end'
                            alignItems='flex-end'
                        >
                            <KubeCancelButton
                                sx={{ height: '32px', padding: '5px 23px' }}
                                onClick={handleCloseDialog}
                            >
                                {intl.messages['common.cancel']}
                            </KubeCancelButton>
                            <KubeConfirmButton
                                sx={{ height: '32px', padding: '5px 23px' }}
                                onClick={fetchData}
                            >
                                {intl.messages['dataSource.query']}
                            </KubeConfirmButton>
                        </Stack>
                    </KubeDeploymentCard>
                </DialogContent>
            </Dialog>

            {/* 显示请求结果或提示文字 */}
            {isQuerying ? (
                <Box sx={{ marginTop: 4, padding: 2, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
                    <Typography variant="h6">查询中...</Typography>
                </Box>
            ) : responseData ? (
                <Box sx={{ marginTop: 4, padding: 2, backgroundColor: '#f1f1f1', borderRadius: 2 }}>
                    <Typography variant="h6">请求结果:</Typography>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </Box>
            ) : (
                <Box sx={{
                    marginTop: 4,
                    padding: 2,
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column', // 垂直排列文字和图标
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography variant="body2" color="textSecondary" align="center" sx={{ fontSize: '13px' }}>
                        {intl.messages['dataSource.dataQueryInfoSelect']}
                    </Typography>
                    <Box sx={{ marginTop: '8px' }}> {/* 设置图标与文字的间距 */}
                        <Question />
                    </Box>
                </Box>
            )}
        </Box>
    );
}

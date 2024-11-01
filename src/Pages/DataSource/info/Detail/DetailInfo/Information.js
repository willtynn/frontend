// Information.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {Box, Typography, MenuItem, Select, FormControl} from '@mui/material';
import { useIntl } from 'react-intl';
import {KubeCancelButton, KubeConfirmButton} from "../../../../../components/Button";
import {Stack} from "@mui/system";
import Dialog from "@mui/material/Dialog";
import {KubeDeploymentCard} from "../../../../../components/InfoCard";
import {KubeInput} from "../../../../../components/Input";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import Question from '@/assets/Question.svg';

export function Information({ dataSourceName }) {

    const intl = useIntl();

    // 从 Redux 中获取指定 dataSourceName 的数据源详细信息
    const dataSourceDetail = useSelector(state =>
        state.DataSource.dataSources?.find(source => source.name === dataSourceName)
    );

    // 提取 types 中的 name 属性并设置到下拉框
    const typesOptions = dataSourceDetail?.types.map(type => type.name) || [];

    // 设置下拉框的状态
    const [selectedType, setSelectedType] = useState(typesOptions[0] || '');

    // 控制 Dialog 的显示状态
    const [openDialog, setOpenDialog] = useState(false);

    const [queryParams, setQueryParams] = useState({});

    // 存储请求返回的数据
    const [responseData, setResponseData] = useState(null);

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


    const selectedTypeDetails = dataSourceDetail?.types.find(type => type.name === selectedType);
    const queryParameters = selectedTypeDetails?.queryParameters || [];

    const handleQueryParamChange = (name) => (event) => {
        setQueryParams(prevParams => ({
            ...prevParams,
            [name]: event.target.value
        }));
    };

    const fetchData = async () => {
        const baseUrl = `http://192.168.1.104:31141/data-source/${dataSourceName}/data/${selectedType}`;
        const isPostRequest = selectedTypeDetails?.driver === 'http-post';

        try {
            const response = isPostRequest
                ? await axios.post(`${baseUrl}/query`, { queryParameters: queryParams }, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                : await axios.get(`${baseUrl}?${new URLSearchParams(queryParams).toString()}`, {
                    headers: { 'Accept': 'application/json' }
                });

            setResponseData(response.data); // 存储返回的数据
            handleCloseDialog();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
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

            {/* 你可以展示更多的详细信息 */}


            {/* 弹出表单 */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
                <DialogContent sx={{ overflowY: 'auto', maxHeight: '80vh', padding: '16px 32px 16px 32px' }}>
                    <KubeDeploymentCard
                        title={intl.messages['dataSource.dataDetailInfoQuery']}
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
                                <KubeInput
                                    label="数据源名称"
                                    description=""
                                    required={true}
                                    variant='outlined'
                                    value={dataSourceName}
                                    disabled
                                />

                                <KubeInput
                                    label="请求方式"
                                    description=""
                                    required={true}
                                    variant='outlined'
                                    value={selectedType}
                                    disabled
                                />

                                {/* 动态生成查询参数输入框 */}
                                {queryParameters.map((param, index) => (
                                    <KubeInput
                                        key={index}
                                        label={`${param.name} (${param.description || ''} - ${param.type || ''})`}  // 在 name 后面加上 description 和 type
                                        required={param.required}
                                        variant='outlined'
                                        value={queryParams[param.name] || ''}
                                        onChange={handleQueryParamChange(param.name)}
                                    />
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
            {responseData ? (
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

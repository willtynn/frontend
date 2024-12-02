// Information.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactJson from 'react-json-view';
import {
    Box,
    Typography,
    MenuItem,
    Select,
    FormControl,
    TableRow,
    TableContainer,
    Table,
    TableHead, TableCell, TableBody
} from '@mui/material';
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
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale, TimeScale } from 'chart.js';
import Paper from "@mui/material/Paper";
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale, TimeScale);

export function Information({ dataSourceName }) {

    const intl = useIntl();
    const dispatch = useDispatch();
    const [chartData, setChartData] = useState(null); // 图表数据

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

    // 渲染基本信息的表格
    const renderBasicInfo = () => {
        const dataName = decodeURIComponent(selectedTypeDetails?.name || '');
        const dataDescription = selectedTypeDetails?.description || '';
        const dataSourceDriver = selectedTypeDetails?.driver || '';

        return (
            <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold', padding: '4px 8px', textAlign: 'center'  }}>{intl.messages['dataSource.dataName']}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', padding: '4px 8px', textAlign: 'center'  }}>{intl.messages['dataSource.dataDescription']}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', padding: '4px 8px', textAlign: 'center'  }}>{intl.messages['dataSource.dataSourceDriver']}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center" sx={{ padding: '6px 8px',textAlign: 'center'  }}>{dataName}</TableCell>
                            <TableCell align="center" sx={{ padding: '6px 8px',textAlign: 'center'  }}>{dataDescription}</TableCell>
                            <TableCell align="center" sx={{ padding: '6px 8px',textAlign: 'center'  }}>{dataSourceDriver}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };


    // 根据返回的数据类型动态展示数据内容
    const renderContent = () => {
        // 返回
        if (Array.isArray(responseData)) {
            if (Array.isArray(responseData[0]) && responseData[0].length === 2) {
                // 识别为二维数组的情况，生成单独图表
                const data = {
                    datasets: [
                        {
                            label: 'Data Points',
                            data: responseData.map(([x, y]) => ({ x: new Date(x * 1000), y: parseFloat(y) })),
                            borderColor: 'rgba(75,192,192,1)',
                            tension: 0.1,
                            fill: false,
                        },
                    ],
                };

                const options = {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'minute',
                                displayFormats: {
                                    minute: 'MM-dd HH:mm', // 24小时制
                                    hour: 'MM-dd HH:mm',
                                },
                            },
                            title: { display: true, text: 'Time' },
                        },
                        y: {
                            title: { display: true, text: 'Value' },
                        },
                    },
                    plugins: {
                        title: { display: true, text: 'Time Series Data' },
                    },
                };

                return (
                    <Box sx={{ marginTop: 4, padding: 2, backgroundColor: '#f1f1f1', borderRadius: 2 }}>
                        <Line data={data} options={options} />
                    </Box>
                );
            }

            //  第二种情况：返回的是一维数组，展示为表格
            return (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {/*根据返回数据动态生成表头*/}
                                {Object.keys(responseData[0] || {}).map((key) => (
                                    key === 'value'
                                        ? Object.keys(responseData[0].value).map((subKey) => (
                                            <TableCell
                                                key={subKey}
                                                sx={{ fontWeight: 'bold',padding: '4px 8px',textAlign: 'center'  }}
                                            >
                                                {subKey}
                                            </TableCell>
                                        ))
                                        : <TableCell
                                            key={key}
                                            sx={{ fontWeight: 'bold', padding: '4px 8px', textAlign: 'center'  }}
                                        >
                                            {key}
                                        </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {responseData.map((row, index) => (
                                <TableRow key={index}>
                                    {/* 动态生成行数据 */}
                                    {Object.keys(row).map((key) => (
                                        key === 'value'
                                            ? Object.values(row.value).map((val, i) => (
                                                <TableCell
                                                    key={i}
                                                    sx={{ padding: '6px 8px',textAlign: 'center'  }}
                                                >
                                                    {val}
                                                </TableCell>
                                            ))
                                            : <TableCell
                                                key={key}
                                                sx={{ padding: '6px 8px',textAlign: 'center'  }}
                                            >
                                                {/* 如果是 time 字段，将时间戳转换为 24 小时制日期格式 */}
                                                {key === 'time'
                                                    ? new Date(row[key]).toLocaleString('zh-CN', {
                                                        hour12: false,
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        second: '2-digit'
                                                    })
                                                    : row[key]}
                                            </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        } else if (responseData && typeof responseData === 'object') {
            // 目前附加情况：多维数组，用于绘制图表
            if (responseData.data?.results) {
                return responseData.data.results.map((metric, index) => {
                    const values = metric.data.result[0].values;
                    const data = {
                        datasets: [
                            {
                                label: metric.metric_name,
                                data: values.map(([x, y]) => ({ x: new Date(x * 1000), y: parseFloat(y) })),
                                borderColor: 'rgba(75,192,192,1)',
                                tension: 0.1,
                                fill: false,
                            }
                        ]
                    };

                    const options = {
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'minute',
                                    displayFormats: {
                                        minute: 'MM-dd HH:mm', // 设置为24小时制，例如: 月-日 小时:分钟
                                        hour: 'MM-dd HH:mm',
                                        day: 'MM-dd HH:mm'
                                    }
                                },
                                title: { display: true, text: 'Time' },
                            },
                            y: {
                                title: { display: true, text: 'Value' },
                            },
                        },
                        plugins: {
                            title: { display: true, text: metric.metric_name },
                        },
                    };


                    return (
                        <Box key={index} sx={{ marginTop: 4, padding: 2, backgroundColor: '#f1f1f1', borderRadius: 2 }}>
                            <Line data={data} options={options} />
                        </Box>
                    );
                });
            }
        //    第一种情况：展示为可交互的JSON格式
            return (
                <ReactJson
                src={responseData}                // 展示的 JSON 数据
                collapsed={2}
                enableClipboard={true}
                displayDataTypes={false}
                style={{
                    backgroundColor: '#ffffff',     // 背景白色
                    padding: '16px',                // 内边距
                    borderRadius: '8px',            // 圆角
                    fontFamily: 'Roboto, Arial, sans-serif', // 字体
                    fontSize: '14px',               // 字体大小
                    lineHeight: '1.5',              // 行高
                    color: '#333333'                // 文字颜色
                }}
                />
            )
        }
    }

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


                        <Box sx={{ paddingRight: '40px' }}>
                            <Stack
                                sx={{
                                    mt: '20px',
                                    padding: '8px 16px 8px 16px',
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
                                    sx={{ height: '32px', padding: '5px 16px' }}
                                    onClick={handleCloseDialog}
                                >
                                    {intl.messages['common.cancel']}
                                </KubeCancelButton>
                                <KubeConfirmButton
                                    sx={{ height: '32px', padding: '5px 16px' }}
                                    onClick={fetchData}
                                >
                                    {intl.messages['dataSource.query']}
                                </KubeConfirmButton>
                            </Stack>
                        </Box>

                    </KubeDeploymentCard>
                </DialogContent>
            </Dialog>

            {/* 显示请求结果或提示文字 */}
            {isQuerying ? (
                <Box sx={{ marginTop: 4, padding: 2, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '16px',    // 调整文字大小
                            marginBottom: '8px', // 设置下边距缩小和上移
                            fontWeight: 'bold'
                        }}
                    >
                        {intl.messages['dataSource.inquiry']}
                    </Typography>
                </Box>
            ) : responseData ? (
                <Box sx={{ marginTop: 4, padding: 2, backgroundColor: '#f1f1f1', borderRadius: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '16px',    // 调整文字大小
                            marginBottom: '8px', // 设置下边距缩小和上移
                            fontWeight: 'bold'
                        }}
                    >
                        {intl.messages['dataSource.responseData']}</Typography>

                    {/*展示返回结果*/}
                    {renderBasicInfo()}
                    {renderContent()}
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

import React, {useEffect, useState} from 'react';
import {
    Box, Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {useIntl} from "react-intl";
import Paper from "@mui/material/Paper";
import ReactJson from "react-json-view";
import Question from '@/assets/Question.svg';
import { useDispatch } from "react-redux";
import { queryInstanceResult } from "@/actions/algorithmAction";
import RefreshIcon from "@mui/icons-material/Refresh";
import {EclipseTransparentButton} from "../../../../../components/Button";
import {deleteInstance} from "../../../../../actions/algorithmAction";


export function InstanceInfo({ instanceDetails, onBackToList }) {

    const intl = useIntl();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false); // 加载状态
    const [error, setError] = useState(null); // 错误状态
    const [currentInstance, setCurrentInstance] = useState(instanceDetails); // 当前实例详情
    const [refreshKey, setRefreshKey] = useState(0); // 添加刷新key来强制更新

    // 使用 useEffect 来加载实例数据，初次加载时通过 id 获取数据
    useEffect(() => {
        const fetchInstanceData = async () => {
            if (!instanceDetails.id) {
                console.error("Instance ID is required.");
                return;
            }

            setLoading(true); // 开始加载
            setError(null); // 清除错误状态

            try {
                const response = await dispatch(queryInstanceResult({ id: instanceDetails.id}));
                if (response && response.data) {
                    setCurrentInstance(response); // 更新实例详情
                } else {
                    setError(intl.messages['evolution.queryInstanceResultError']);
                }
            } catch (err) {
                setError(intl.messages['evolution.queryInstanceResultError']);
            } finally {
                setLoading(false); // 结束加载
            }
        };
        fetchInstanceData(); // 初始化时请求数据
    }, [instanceDetails.id, dispatch, intl.messages]); // 依赖项是 instanceId，这样如果 id 改变会重新请求数据



    // 处理刷新操作
    const handleRefresh = async () => {
        if (!instanceDetails?.id) {
            console.error("Instance ID is required for refresh.");
            return;
        }

        setLoading(true); // 开始加载
        setError(null); // 清除错误状态

        try {
            const response = await dispatch(queryInstanceResult({ id: instanceDetails.id }));
            setCurrentInstance(response);

            if (response && response.data) {
                setCurrentInstance(prevState => ({ ...prevState, ...response, refreshedAt: Date.now() }));
            } else {
                setError(intl.messages['evolution.queryInstanceResultError']);
            }
        } catch (err) {
            setError(intl.messages['evolution.queryInstanceResultError']);
        } finally {
            setLoading(false); // 结束加载
        }

    };

    // 删除实例的逻辑
    const handleDelete = async () => {
        if (!currentInstance?.id) {
            console.error("Instance ID is required for deletion.");
            return;
        }
        setLoading(true); // 显示加载状态
        try {
            const result = await dispatch(deleteInstance(currentInstance.id));
            if (result) {
                onBackToList(); // 删除成功后返回实例列表
            } else {
                setError(intl.messages['evolution.deleteInstanceError'] );
            }
        } catch (err) {
            setError(intl.messages['evolution.deleteInstanceError']);
        } finally {
            setLoading(false); // 结束加载状态
        }
    };

    // 渲染基本信息的表格
    const renderBasicInfo = () => {
        const runName = decodeURIComponent(instanceDetails.runName || '');
        const createTime = instanceDetails.createTime || '';
        const updateTime = instanceDetails.updateTime || '';

        return (
            <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold', padding: '4px 8px', textAlign: 'center'  }}>{intl.messages['evolution.runName']}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', padding: '4px 8px', textAlign: 'center'  }}>{intl.messages['evolution.createTime']}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', padding: '4px 8px', textAlign: 'center'  }}>{intl.messages['evolution.updateTime']}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center" sx={{ padding: '6px 8px',textAlign: 'center'  }}>{runName}</TableCell>
                            <TableCell align="center" sx={{ padding: '6px 8px',textAlign: 'center'  }}>{createTime}</TableCell>
                            <TableCell align="center" sx={{ padding: '6px 8px',textAlign: 'center'  }}>{updateTime}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };


    // 渲染返回数据
    const renderContent = () => {
        const output = currentInstance.output || '';
        if (output) {
            try {
                // 解析output中的字符串，转换为JSON对象
                const parsedOutput = JSON.parse(output);

                // 如果某些字段是字符串化的JSON，再进行解析
                if (parsedOutput.data) {
                    try {
                        parsedOutput.data = JSON.parse(parsedOutput.data);
                    } catch (error) {
                        console.error('Error parsing nested data:', error);
                    }
                }

                // 展示为可交互的JSON格式
                return (
                    <ReactJson
                        src={parsedOutput} // 展示的 JSON 数据
                        collapsed={2} // 默认折叠深度
                        enableClipboard={true} // 启用复制功能
                        displayDataTypes={false} // 不显示数据类型
                        style={{
                            backgroundColor: '#ffffff',  // 背景白色
                            padding: '16px',             // 内边距
                            borderRadius: '8px',         // 圆角
                            fontFamily: 'Roboto, Arial, sans-serif', // 字体
                            fontSize: '14px',            // 字体大小
                            lineHeight: '1.5',           // 行高
                            color: '#333333'             // 文字颜色
                        }}
                    />
                );
            } catch (error) {
                // 如果解析失败，显示错误信息
                return <div>Error parsing output</div>;
            }
        }
        return null;
    };

    let isQuerying;
    return (
        <Box
            sx={{
                backgroundColor: '#FFFFFF', // 白色背景
                borderRadius: '8px', // 圆角边框
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // 阴影
                padding: 3, // 内边距
                marginTop: 3, // 上边距
                // key: refreshKey // 在这里设置key
            }}
        >
            {/* 返回按钮和操作按钮的容器 */}
            <Box
                sx={{
                    display: 'flex', // 使用 Flexbox 布局
                    justifyContent: 'space-between', // 返回按钮在左，其他按钮在右
                    alignItems: 'center', // 垂直居中对齐
                    marginBottom: 2, // 与内容的下方间距
                }}
            >
                {/* 返回按钮 */}
                <Button
                    variant="contained"
                    sx={{
                        fontWeight: 'bold',
                        borderRadius: '20px', // 设置圆角
                        backgroundColor: '#242e42', // 按钮背景色
                        color: '#ffffff', // 按钮文字颜色
                        fontSize: '12px', // 文字大小
                        padding: '4px 12px', // 按钮内边距
                        minWidth: 'auto', // 按钮宽度根据内容调整
                        '&:hover': {
                            backgroundColor: '#1e2534', // 设置鼠标悬浮时的背景色
                        },
                    }}
                    onClick={onBackToList} // 点击时触发 onBackToList 回调
                >
                    {intl.messages['evolution.backToInstanceList']}
                </Button>

                {/* 操作按钮 (刷新和删除) */}
                <Box
                    sx={{
                        display: 'flex', // 使用 Flexbox 布局
                        gap: 2, // 按钮之间的间距
                        justifyContent: 'flex-end', // 靠右对齐
                        alignItems: 'center', // 垂直居中
                    }}
                >
                    {/* 刷新按钮 */}
                    <EclipseTransparentButton
                        sx={{
                            bgcolor: '#f9fbfd !important',
                            '&:hover': {
                                bgcolor: '#FFFFFF !important',
                            },
                            '& svg': {
                                color: '#3d3b4f',
                            },
                            height: '32px',
                        }}
                        onClick={handleRefresh} // 点击时触发刷新逻辑
                    >
                        <RefreshIcon />
                    </EclipseTransparentButton>

                    {/* 删除按钮 */}
                    <Button
                        variant="contained"
                        sx={{
                            fontWeight: 'bold',
                            borderRadius: '20px',
                            backgroundColor: '#d32f2f',
                            color: '#ffffff',
                            fontSize: '12px',
                            padding: '4px 12px',
                            minWidth: 'auto',
                            '&:hover': {
                                backgroundColor: '#b71c1c',
                            },
                        }}
                        onClick={handleDelete} // 点击触发删除逻辑
                    >
                        {intl.messages['evolution.deleteInstance']}
                    </Button>
                </Box>
            </Box>

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
            ) : currentInstance ? (
                <Box sx={{ marginTop: 4, padding: 2, backgroundColor: '#f1f1f1', borderRadius: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '16px',    // 调整文字大小
                            marginBottom: '8px', // 设置下边距缩小和上移
                            fontWeight: 'bold'
                        }}
                    >
                        {intl.messages['evolution.instanceBasicInfo']}</Typography>

                    {/*展示返回结果*/}
                    {renderBasicInfo()}
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '16px',    // 调整文字大小
                            marginBottom: '8px', // 设置下边距缩小和上移
                            fontWeight: 'bold'
                        }}
                    >
                        {intl.messages['evolution.instanceResponseData']}</Typography>
                    {renderContent()}
                </Box>
            ) : (
                <Box sx={{ marginTop: 4, padding: 2, backgroundColor: '#f1f1f1', borderRadius: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '16px',    // 调整文字大小
                            marginBottom: '8px', // 设置下边距缩小和上移
                            fontWeight: 'bold'
                        }}
                    >
                        {intl.messages['evolution.instanceBasicInfo']}</Typography>

                    {/*展示返回结果*/}
                    {renderBasicInfo()}

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
                            {intl.messages['evolution.noData']}
                        </Typography>
                        <Box sx={{ marginTop: '8px' }}> {/* 设置图标与文字的间距 */}
                            <Question />
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

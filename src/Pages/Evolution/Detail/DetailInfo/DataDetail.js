import _, { set } from "lodash";
import { useEffect, useLayoutEffect, useState } from "react";
import {
    useSelector,
    useDispatch,
} from "react-redux";
import {
    Box,
    Stack
} from "@mui/material";
import { fontFamily } from '@/utils/commonUtils';
import { handleParentExpand } from "reactflow";
import DataResource from '@/assets/DataResource.svg'
import Condition from '@/assets/Condition.svg'
import { evo_get_dataSource } from "../../../../actions/evolutionAction";
import { useIntl } from "react-intl";
import Start from '@/assets/Start.svg';
import Stop from '@/assets/Stop.svg';
import { EclipseTransparentButton } from '@/components/Button';
//图表组件的引入
import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { isVisible } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { KubeInput, KubeAutocomplete } from '@/components/Input';
import { setSnackbarMessageAndOpen } from '@/actions/snackbarAction';
import { SEVERITIES } from '@/components/CommonSnackbar';
import { saveAs } from 'file-saver';


export function DataDetail() {
    const intl = useIntl();
    const {
        currentPlan,
        data_resource_list
    } = useSelector(state => {
        return {
            currentPlan: state.Evolution.current_evo_plan,
            data_resource_list: state.Evolution.data_resource_list,
        };
    });

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(evo_get_dataSource());
    }, []);

    const dataResource = _.find(data_resource_list, ['name', currentPlan.data_resource]);

    //表示监控图表是否需要展示出来
    const [ChartVisible, setCharVisible] = useState(false);
    //表示是否开始进行监控
    const [ListenStart, setListenStart] = useState(false);

    const initDataList = [
        {
            dataName: null,
            dataType: null,
            dataValue: 0,
            dataTime: 0
        },
    ]
    //用于存储数据监控的值
    const [dataList, setDataList] = useState(initDataList);

    //用于记录当前数据的总数
    const [countOfData, SetCountOfData] = useState(0);
    //用于选取监控的时间间隔
    const [intervalTime, setIntervalTime] = useState(30);

    // 用于存储监控定时器的ID
    const [timerId, setTimerId] = useState(null);

    var count = 0;

    const handleClick = () => {
        console.log("点击");
    }
    const handleClickOfDataSource = () => {
        setCharVisible(ChartVisible == true ? false : true);
    }

    //点下数据的开始建后，将会从后端不断监听数据
    const handleDataListen = () => {
        console.log("interval is " + intervalTime);
        if (!ListenStart) {
            const id = setInterval(() => {
                getData();
            }, intervalTime * 1000);
            setTimerId(id);
            setListenStart(true);
        }
        console.log("进入到数据监听请求中")
        //由于只是暂时的数据，也不需要存储，所以不需要用到redux
        //TODO：url待定，后端数据源并没有确定如何实现
    }
    
    
    const getData = async ()=> {
        console.log("开始请求数据");
        await axios("http://localhost:1234/evolution/getdata/"+currentPlan.evo_id).then(res => {
            if(res.data == null){
                console.log("未能获取到数据")
                return;
            }
            
            res.data.dataTime = getHourMinSec(res.data.dataTime);
            setDataList(dataList => [...dataList,
            {
                dataId: count,
                dataName: res.data.dataName,
                dataType: res.data.dataType,
                dataValue: res.data.dataValue,
                dataTime: res.data.dataTime,
            }]);
            count++;
            if(res.data.dataname == null){
                dispatch(
                    setSnackbarMessageAndOpen(
                      'common.errorMessage',
                      { msg: "无法正确获取数据，请检查数据源参数是否配置正确" },
                      SEVERITIES.warning
                    )
                  );
            }
        })
        console.log(dataList)
        
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleIntervalTimeChange = (e) => {
        setIntervalTime(e.target.value);
    }

    //停止从后端获取数据
    const handleStop = () => {
        count = 0;
        console.log("设置暂停")
        if (timerId !== null) {
            clearInterval(timerId);
            setTimerId(null);
            setListenStart(false);
        }
    }

    useEffect(() => {
        // 组件卸载时清除定时器
        return () => {
            if (timerId !== null) {
                clearInterval(timerId);
            }
        };
    }, [timerId]);

    //获取时分秒   
    const getHourMinSec = (timestamp) => {

        // 根据时间戳创建一个新的Date对象
        const date = new Date(timestamp);
        // 获取小时
        const hours = String(date.getHours()).padStart(2, '0');
        // 获取分钟
        const minutes = String(date.getMinutes()).padStart(2, '0');
        //获取秒数
        const second = String(date.getSeconds()).padStart(2, '0');
        return hours + ":" + minutes + ":" + second;
    }


    return (
        <Stack direction='row' sx={{ pt: '20px', pb: '40px' }} spacing={1}>
            {/* 描述计划的详细信息 */}
            <Box
                sx={{
                    maxHeight: '660px',
                    overflowY: 'auto',
                }}
            >
                {/* 数据源 */}
                <Stack
                    sx={{
                        padding: '8px 20px',
                        width: '800px',
                        height: '100px',
                        borderRadius: '4px',
                        bgcolor:
                            '#FFFFFF',
                        '&:hover': {
                            bgcolor: '#55bc8a',
                        },
                        cursor: 'pointer',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                    onClick={handleClickOfDataSource}
                    direction='row'
                    alignItems='center'
                    spacing={2.5}
                >
                    <Box>
                        {<DataResource />}
                    </Box>

                    <Box
                        sx={{
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <Box
                            sx={{
                                fontSize: '15px',
                                fontFamily: fontFamily,
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: 1.67,
                                color: '#242e42',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {intl.messages['common.name'] + ":" + (dataResource == undefined ? "" : dataResource.name)}
                            <br></br>
                            {intl.messages['common.type'] + ":" + (dataResource == undefined ? "" : dataResource.type)}
                        </Box>
                        <Box
                            sx={{
                                fontSize: '12px',
                                fontFamily: fontFamily,
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 1.67,
                                color: '#79879c',
                            }}
                        >
                            {intl.messages['common.args'] + ":" + (dataResource == undefined ? "" : dataResource.args)}
                            <br></br>
                            {intl.messages['common.frequency'] + ":" + (dataResource == undefined ? "" : dataResource.freq)}
                            <br></br>
                            {intl.messages['common.description'] + ":" + (dataResource == undefined ? "" : dataResource.description)}
                        </Box>
                    </Box>
                </Stack>
                {ChartVisible &&
                    <Box>
                        {/* 数据图表 */}
                        {/* 选择监控间隔 */}
                        <KubeInput
                            label={"设定监控间隔(s)"}
                            decription={intl.messages['evolution.EvolutionPlan']}
                            requried={true}
                            id='test-evo_name-input'
                            variant='outlined'
                            value={intervalTime}
                            sx={{ width: '100px' }}
                            onChange={handleIntervalTimeChange}
                            validation={{
                                required: "First Name is required!"
                            }}
                        />
                        {/* 开始按钮 */}
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
                            onClick={handleDataListen}
                        >
                            {<Start />}
                        </EclipseTransparentButton>
                        {/* "中断按钮" */}
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
                            onClick={handleStop}
                        >
                            {<Stop />}
                        </EclipseTransparentButton>

                        <ResponsiveContainer width={800} height={200}>
                            <AreaChart
                                width={100}
                                height={150}
                                data={dataList}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="dataTime" />
                                <YAxis dataKey="dataValue" />
                                <Tooltip />
                                <Area type="monotone" dataKey="dataValue" stroke="#8884d8" fill="#b7d5ac" />
                                <Area type="monotone" dataKey="amt" stroke="#8884d8" fill="#b7d5ac" />
                                <Area type="monotone" dataKey="sad" stroke="#8884d8" fill="#b7d5ac" />
                                <Area type="monotone" dataKey="dsa" stroke="#8884d8" fill="#b7d5ac" />
                            </AreaChart>

                        </ResponsiveContainer>
                    </Box>}
                {/* 触发条件 */}
                <Stack
                    sx={{
                        padding: '8px 20px',
                        width: '800px',
                        height: '100px',
                        borderRadius: '4px',
                        bgcolor:
                            '#FFFFFF',
                        '&:hover': {
                            bgcolor: '#55bc8a',
                        },
                        cursor: 'pointer',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                    onClick={handleClick}
                    direction='row'
                    alignItems='center'
                    spacing={2.5}
                >
                    <Box>
                        {<Condition />}
                    </Box>

                    <Box
                        sx={{
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <Box
                            sx={{
                                fontSize: '15px',
                                fontFamily: fontFamily,
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: 1.67,
                                color: '#242e42',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {/* {"触发条件:"+ currentPlan.trigger} */}
                            {intl.messages['evolution.triggerCondition'] + ":" + currentPlan.trigger + "(示例数据)"}
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    );
}
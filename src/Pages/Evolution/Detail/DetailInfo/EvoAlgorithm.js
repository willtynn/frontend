import { useSelector, useDispatch } from "react-redux";
import {
    Box,
    Stack
} from "@mui/material";
import API from '@/assets/API.svg';
import WhiteAPI from '@/assets/WhiteAPI.svg';
import Task from '@/assets/Task.svg'
import { fontFamily } from '@/utils/commonUtils';
import ExeMtd from '@/assets/ExecuteMethod.svg'
import _, { set } from "lodash";
import { useLayoutEffect, useState } from "react";
import { evo_get_algorithm } from "../../../../actions/evolutionAction";
import { useIntl } from "react-intl";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { KubeConfirmButton } from '@/components/Button';
import Detail from '@/assets/popup/detail.svg';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { formatDatetimeString } from '@/utils/commonUtils';



export function EvoAlgorithm() {
    const intl = useIntl();
    const {
        currentPlan,
        ana_alg_list,
        exe_alg_list,
        exe_mtd_list,
        evolution_plan_result_list,
    } = useSelector(state => {
        return {
            currentPlan: state.Evolution.current_evo_plan,
            ana_alg_list: state.Evolution.ana_alg_list,
            exe_alg_list: state.Evolution.exe_alg_list,
            exe_mtd_list: state.Evolution.exe_mtd_list,
            evolution_plan_result_list: state.Evolution.evolution_plan_result_list,
        };
    });

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(evo_get_algorithm());
    }, []);
    //目前为示例数据
    const alg_list = [];
    //用于从算法列表中寻找到当前计划使用的算法和内容
    alg_list.push(_.find(ana_alg_list, ['analyze_name', currentPlan.ana_alg]))
    alg_list.push(_.find(exe_alg_list, ['plan_name', currentPlan.exe_alg]))
    alg_list.push(_.find(exe_mtd_list, ['execute_name', currentPlan.exe_mtd]))

    const [visiableForDetail, setVisiableForDetail] = useState(false);
    const [showList,setShowList] = useState([]);
    const showListTemp = [];

    const handleClick = (index) => {
        console.log("点击")
        //打开显示演示计划执行详情的对话框
        setVisiableForDetail(true);
        showList.length = 0;
        if (index == 0) {
            for (let i = 0; i < evolution_plan_result_list.length; i++) {
                let data = {
                    result_id: evolution_plan_result_list[i].result_id,
                    algorithm_name: getValueFromPosition(index, 1),
                    result: evolution_plan_result_list[i].ana_result,
                    msg: evolution_plan_result_list[i].ana_msg,
                    result_time: evolution_plan_result_list[i].result_time,
                }
                showListTemp.push(data);
            }
        }else if(index == 1){
            for (let i = 0; i < evolution_plan_result_list.length; i++) {
                let data = {
                    result_id: evolution_plan_result_list[i].result_id,
                    algorithm_name: getValueFromPosition(index, 1),
                    result: evolution_plan_result_list[i].plan_result,
                    msg: evolution_plan_result_list[i].plan_msg,
                    result_time: evolution_plan_result_list[i].result_time,
                }
                showListTemp.push(data);
            }
        }else{
            for (let i = 0; i < evolution_plan_result_list.length; i++) {
                let data = {
                    result_id: evolution_plan_result_list[i].result_id,
                    algorithm_name: getValueFromPosition(index, 1),
                    result: evolution_plan_result_list[i].exe_result,
                    msg: evolution_plan_result_list[i].exe_msg,
                    result_time: evolution_plan_result_list[i].result_time,
                }
                showListTemp.push(data);
            }
        }
        setShowList(showListTemp);
        return;
    }

    const handleDetailDialogClose = () => {
        setVisiableForDetail(false);
    }

    const getValueFromPosition = (index, number) => {
        return Object.values(alg_list[index])[number];
    }

    const getTypeOfAlg = (index) => {
        if (alg_list[index] == undefined) {
            return intl.messages['common.loading']
        }
        if (index == 0) {
            return intl.messages['evolution.analyseAlgorithm']
        } else if (index == 1) {
            return intl.messages['evolution.executeAlgorithm']
        } else {
            return intl.messages['evolution.executeMethod']
        }
    }

    const changeIntoString = (result) => {
        if(result == '1'){
            return "成功"
        }else if(result == '0'){
            return "失败"
        }else{
            return "未知"
        }
    }


    return (
        <Stack direction='row' sx={{ pt: '20px', pb: '40px' }} spacing={1}>
            {/* 算法名称和id */}
            <Box
                sx={{
                    maxHeight: '660px',
                    overflowY: 'auto',
                }}
            >

                {/* 执行结果详情框 */}
                <Dialog
                    open={visiableForDetail}
                    onClose={handleDetailDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                // sx={{ width: '600px',alignItems:'center' }}
                >
                    <DialogTitle id="alert-dialog-title"
                        sx={{
                            fontSize: '15px',
                            alignItems: 'center',
                        }}>
                        <Detail />
                        <span sx={{
                            fontSize: '15px',
                            alignItems: 'center',
                            display: 'flex'
                        }}>{intl.messages['common.detailedInfo']}</span>
                    </DialogTitle>
                    <DialogContent>
                        {/* 用来装具体结果的表格 */}
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>算法名称</TableCell>
                                        <TableCell align="right">执行结果</TableCell>
                                        <TableCell align="right">结果描述</TableCell>
                                        <TableCell align="left">执行时间</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {showList.map((row) => (
                                        <TableRow
                                            key={row.result_id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.algorithm_name}
                                            </TableCell>
                                            <TableCell align="right">{changeIntoString(row.result)}</TableCell>
                                            <TableCell align="right">{row.msg}</TableCell>
                                            <TableCell align="right">{formatDatetimeString(row.result_time)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                    <DialogActions>
                        <Stack
                            sx={{ mt: '12px' }}
                            direction='row'
                            spacing={1.5}
                            alignItems='center'
                        >
                            <KubeConfirmButton
                                onClick={handleDetailDialogClose}
                                sx={{ height: '32px', minWidth: '96px' }}
                            >
                                <Stack direction='row' alignItems='center' justifyContent='center'>
                                    <Box sx={{ ml: '4px' }}>{intl.messages['common.confirm']}</Box>
                                </Stack>
                            </KubeConfirmButton>
                        </Stack>
                    </DialogActions>
                </Dialog>

                <Stack direction='column' spacing={1}>
                    {currentPlan && (alg_list != undefined) &&
                        alg_list.map((value, index) => {
                            return (
                                alg_list[index] != undefined &&
                                <Stack
                                    //key为类型
                                    key={getTypeOfAlg(index)}
                                    sx={{
                                        padding: '8px 20px',
                                        width: '800px',
                                        height: '100px',
                                        borderRadius: '4px',
                                        bgcolor:
                                            alg_list === index ? '#55bc8a' : '#FFFFFF',
                                        color: alg_list === index ? '#FFFFFF' : '#242E42',
                                        '&:hover': {
                                            bgcolor: '#55bc8a',
                                            color: '#FFFFFF',
                                        },
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                    onClick={(idnex) => handleClick(index)}
                                    direction='row'
                                    alignItems='center'
                                    spacing={2.5}
                                >
                                    <Box>
                                        {(index == 0 && <Task />) || (index == 1 && <API />) || (index == 2 && <ExeMtd />)}
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
                                            {intl.messages['common.type'] + ":" + getTypeOfAlg(index)}
                                            <br></br>
                                            {intl.messages['common.id'] + ":" + getValueFromPosition(index, 0)}
                                            <br></br>
                                            {intl.messages['common.name'] + ":" + getValueFromPosition(index, 1)}
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
                                            {intl.messages['common.description'] + ":" + getValueFromPosition(index, 2)}
                                        </Box>
                                    </Box>
                                </Stack>
                            );
                        })}
                </Stack>
            </Box>
        </Stack>

    );
}
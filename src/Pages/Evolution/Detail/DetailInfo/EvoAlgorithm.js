import { useSelector,useDispatch } from "react-redux";
import { 
    Box,
    Stack
 } from "@mui/material";
import API from '@/assets/API.svg';
import WhiteAPI from '@/assets/WhiteAPI.svg';
import Task from '@/assets/Task.svg'
import { fontFamily } from '@/utils/commonUtils';
import ExeMtd from '@/assets/ExecuteMethod.svg'
import _ from "lodash";
import { useLayoutEffect } from "react";
import { evo_get_algorithm } from "../../../../actions/evolutionAction";
import { useIntl } from "react-intl";



export function EvoAlgorithm() {
    const intl = useIntl();
    const {
        currentPlan,
        ana_alg_list,
        exe_alg_list,
        exe_mtd_list,
    } = useSelector(state => {
        return {
            currentPlan: state.Evolution.current_evo_plan,
            ana_alg_list: state.Evolution.ana_alg_list,
            exe_alg_list: state.Evolution.exe_alg_list,
            exe_mtd_list:state.Evolution.exe_mtd_list,
        };
    });

    const dispatch = useDispatch();

    useLayoutEffect(()=>{
        dispatch(evo_get_algorithm());
    },[]);
    //目前为示例数据
    const alg_list = [];
    //用于从算法列表中寻找到当前计划使用的算法和内容
    alg_list.push(_.find(ana_alg_list, ['analyze_name',currentPlan.ana_alg]))
    alg_list.push(_.find(exe_alg_list, ['plan_name',currentPlan.exe_alg]))
    alg_list.push(_.find(exe_mtd_list, ['execute_name',currentPlan.exe_mtd]))


    const handleClick = () =>{
        console.log("点击")
    }

    const getValueFromPosition = (index,number) => {
        return Object.values(alg_list[index])[number];
    }

    const getTypeOfAlg = (index) => {
        if(alg_list[index] == undefined){
            return intl.messages['common.loading']
        }
        if(index==0){
            return intl.messages['evolution.analyseAlgorithm']
        }else if (index==1){
            return intl.messages['evolution.executeAlgorithm']
        }else{
            return intl.messages['evolution.executeMethod']
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
                <Stack direction='column' spacing={1}>
                    {currentPlan && (alg_list!=undefined) &&
                        alg_list.map((value, index) => {
                            return (
                            alg_list[index]!=undefined &&
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
                                    onClick={handleClick}
                                    direction='row'
                                    alignItems='center'
                                    spacing={2.5}
                                >
                                    <Box>
                                        {(index==0 && <Task />) || (index==1 && <API />) || (index==2 && <ExeMtd />)}
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
                                            {intl.messages['common.type']+":"+getTypeOfAlg(index)}
                                            <br></br>
                                            {intl.messages['common.id']+":"+getValueFromPosition(index,0)}
                                            <br></br>
                                            {intl.messages['common.name']+":"+getValueFromPosition(index,1)}
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
                                            {intl.messages['common.description']+":"+getValueFromPosition(index,2)}
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
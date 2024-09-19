import _ from "lodash";
import { useEffect,useLayoutEffect } from "react";
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

export function DataDetail() {
    const intl = useIntl();
    const {
        currentPlan,
        data_resource_list
    } = useSelector(state => {
        return{
            currentPlan: state.Evolution.current_evo_plan,
            data_resource_list: state.Evolution.data_resource_list,
        };   
    });

    const dispatch = useDispatch();
  
    useLayoutEffect(() => {
        dispatch(evo_get_dataSource());
      }, []);

    const dataResource = _.find(data_resource_list,['name',currentPlan.data_resource]);

    const handleClick = () =>{
        console.log("点击");
    }
    // //目前是示例数据
    // const dataResource = {
    //     name:"获取中",
    //     description:"获取中",
    //     type:"获取中",
    //     args:"获取中",
    //     freq:"获取中",
    // }
    // function handleClick(){
    //     console.log("点击");
    // }

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
                    onClick={handleClick}
                    direction='row'
                    alignItems='center'
                    spacing={2.5}
                >
                    <Box>
                        {<DataResource/>}
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
                            {intl.messages['common.name']+":" + (dataResource == undefined ? "" : dataResource.name)}
                            <br></br>
                            {intl.messages['common.type']+":" + (dataResource == undefined ? "" : dataResource.type)}
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
                            {intl.messages['common.args']+":"+(dataResource == undefined ? "" : dataResource.args) }
                            <br></br>
                            {intl.messages['common.frequency']+":"+(dataResource == undefined ? "" : dataResource.freq)}
                            <br></br>
                            {intl.messages['common.description']+":" + (dataResource == undefined ? "" : dataResource.description)}
                        </Box>
                    </Box>
                </Stack>
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
                        {<Condition/>}
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
                            {intl.messages['evolution.triggerCondition']+":"+currentPlan.trigger+"(示例数据)"}
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    );
}
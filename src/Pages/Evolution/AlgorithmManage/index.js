//本组件用于管理与演化功能相关的分析算法和规划算法
//index.js为主页，然后汇总其他两个板块，共计三个界面
import { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { fontFamily } from '@/utils/commonUtils';
import InfoFinished from '@/assets/InfoFinished.svg';
import InfoWaiting from '@/assets/InfoWaiting.svg';
import InfoNow from '@/assets/InfoNow.svg';
import DockerFinished from '@/assets/DockerFinished.svg';
import DockerWaiting from '@/assets/DockerWaiting.svg';
import DockerNow from '@/assets/DockerNow.svg';
import { useIntl } from 'react-intl';
import { KubeCancelButton, KubeConfirmButton } from '@/components/Button';
import ProgressIndicator from '../../Cluster/deploy/DeployProgress/ProgressIndicator';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { EVO_RESET_FORM, evo_add, evo_getPlanList, evo_modify } from '../../../actions/evolutionAction';
import { useNavigate } from 'react-router-dom';
//规划算法和分析算法对应的图标
import Plan from '@/assets/API.svg';
import WhiteAPI from '@/assets/WhiteAPI.svg';
import Analysis from '@/assets/Task.svg'
import { set } from 'lodash';
import { AnalysisManage } from './AnalysisAlgorithmManage';
import { PlanAlgorithmManage } from './PlanAlgorithmManage';
import { CreateAlgorithm } from './CreateAlgorithm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '960px',
    boxShadow: 24,
    height: 'calc(100% - 120px)',
    fontFamily: fontFamily,
};

const totalStage = 2;

export function AlgorithmManage(props) {
    const { handleConfirmClick, handleCancelClick,target,type} =
        props;
    //target指示最终要打开的界面,Algorithm为修改界面附带的算法数据
    const [currentStage, setCurrentStage] = useState(1);
    const [evolutionPlanError, setEvolutionPlanError] = useState(0);
    const [state, setState] = useState("analysis");//用于表示当前窗口界面进行什么算法管理
    const navigate = useNavigate();
    const intl = useIntl();
    const dispatch = useDispatch();

    //根据传入字段来进行界面切换，给子组件使用来进行页面切换
    const checkoutByState = (nowState) => {
        setState(nowState);
    }

    const currentPage = () => {
        if (target === "analysis") {
            return <AnalysisManage exit={handleCancelClick}/>;
        } else if (target === "plan") {
            return <PlanAlgorithmManage exit={handleCancelClick}/>;
        } else if (target === "create") {
            return <CreateAlgorithm state={type} checkoutByState={checkoutByState} exit={handleCancelClick}/>;
        }
    };


    return (
        <Box sx={style}>
            <KubeDeploymentCard title={intl.messages['evolution.algorithmManagement']} handleClose={handleCancelClick}>
                <Stack
                    direction='row'
                    spacing={0}
                    sx={{ bgcolor: '#eff4f9', p: '0px 20px' }}
                >
                    {state == "analysis" ? <Analysis /> : <Plan />}
                    &nbsp;
                    <Typography
                        sx={{
                            color: '#36435c',
                            fontSize: '20px',
                            lineHeight: 1.77,

                            fontWeight: 400,
                        }}
                    >
                        {target == "analysis" ? intl.messages['evolution.planningAlgorithm'] : (target == "plan" ? intl.messages['evolution.planningAlgorithm'] : intl.messages['evolution.algorithmRegistration'])}
                    </Typography>

                </Stack>
                <Stack>
                    {currentPage(currentStage)}
                </Stack>


                <Stack
                    sx={{
                        mt: '80px',
                        position: 'absolute',
                        bottom: '12px',
                        width: 'calc(100% - 64px)',
                        bgcolor: '#f9fbfd',
                    }}
                    direction='row'
                    spacing={3}
                    justifyContent='flex-end'
                    alignItems='flex-end'
                >



                    <KubeConfirmButton
                        sx={{ height: '32px', p: '5px 23px',width:"150px" }}
                        onClick={handleCancelClick}
                    >
                        {intl.messages['evolution.back']}
                    </KubeConfirmButton>
                </Stack>
            </KubeDeploymentCard>
        </Box>
    );
}

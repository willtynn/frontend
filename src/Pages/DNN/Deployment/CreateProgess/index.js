/**
 * src\Pages\Application\StressTesting\TestingProgress\index.js
 */

import { useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';

import ProgressIndicator from '@/Pages/Cluster/deploy/DeployProgress/ProgressIndicator';
import ModelInformation from '../SubPage/ModelSelector/ModelInformation';
import ServerInformation from '../SubPage/ServerSelector/ServerInformation';
import InferPlan from '../SubPage/InferPlan/InferPlan'
import AlgorithmSet from '../SubPage/AlgorithmSet/AlgorithmSet'

import {
  UPDATE_CURRENT_GROUP_EDIT_STAGE,
  UPDATE_GROUP_EDIT,
  UPDATE_THREAD_GROUPS,
  RESET_GROUP,
  RESET_PLAN,
  UPDATE_GROUP_EDIT_INDEX,
} from '@/actions/inferPipelineAction';

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

const totalStage = 4;


export function InferProgress(props) {

  const { handleConfirmClick, handleCancelClick, showError, setShowError } =
    props;
  
  const [activeStep, setActiveStep] = useState(0);
  const [inferPlanError, setInferPlanError] = useState(0);

  const intl = useIntl();
  const dispatch = useDispatch();

  const previousStep = () => {
    setActiveStep(prevStage => prevStage - 1);
  };

  const handleBack = () => {
    if (activeStep !== 0) {
      //stakeholdersAndDatesMonitor
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    }
  };

  const handleNext = active => {
    if (activeStep !== totalStage - 1) {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
    console.log(active);
  };

  const handleCancelButtonClick = () => {
    handleCancelClick();
    setActiveStep(0);
  };

  const handleConfirmButtonClick = () => {

  };

  const currentPage = activeStep => {
    switch (activeStep) {
      case 0:
        return (<InferPlan showError={showError} setError={setInferPlanError} />);
      case 1:
        return (<ModelInformation></ModelInformation>);
      case 2:
        return (<ServerInformation></ServerInformation>);
      case 3:
        return (<AlgorithmSet showError={showError} setError={setInferPlanError} />);; 
      default:
        return 'defalut';
    }
  };

  return (
    <Box sx={style}>
      <KubeDeploymentCard title={'创建协同推理计划'} handleClose={handleCancelClick}>
        <Stack
          direction='row'
          spacing={0}
          sx={{ bgcolor: '#eff4f9', p: '0px 20px' }}
        >
          <ProgressIndicator
            title={'基本信息'}
            adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
            stage={0}
            currentStage={activeStep}
          />
          <ProgressIndicator
            title={'选择模型'}
            adornments={[<DockerWaiting />, <DockerNow />, <DockerFinished />]}
            stage={1}
            currentStage={activeStep}
          />
          <ProgressIndicator
            title={'选择服务器'}
            adornments={[<DockerWaiting />, <DockerNow />, <DockerFinished />]}
            stage={2}
            currentStage={activeStep}
          />
          <ProgressIndicator
            title={'算法配置'}
            adornments={[<DockerWaiting />, <DockerNow />, <DockerFinished />]}
            stage={3}
            currentStage={activeStep}
          />
        </Stack>
        {currentPage(activeStep)}

        {/* 按钮组 */}
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
          <KubeCancelButton
            sx={{ height: '32px', p: '5px 23px' }}
            onClick={handleCancelButtonClick}
          >
            {intl.messages['common.cancel']}
          </KubeCancelButton>
          {/* 不在edit group时，主步骤大于1；在edit group时，次步骤大于1 */}
          {(activeStep > 0 )  ? (
            <KubeCancelButton
              sx={{ height: '32px', p: '5px 23px' }}
              onClick={handleBack}
            >
              {intl.messages['common.previousStep']}
            </KubeCancelButton>
          ) : (
            <></>
          )}
          {(activeStep < totalStage - 1) ? (
            <KubeConfirmButton
              sx={{ height: '32px', p: '5px 23px' }}
              onClick={handleNext}
            >
              {intl.messages['common.nextStep']}
            </KubeConfirmButton>
          ) : (
            <KubeConfirmButton
              sx={{ height: '32px', p: '5px 23px' }}
              onClick={handleConfirmButtonClick}
            >
              确认
            </KubeConfirmButton>
          )}
        </Stack>
      </KubeDeploymentCard>
    </Box>
  );
}

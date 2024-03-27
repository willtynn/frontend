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
import ProgressIndicator from '../../Cluster/deploy/DeployProgress/ProgressIndicator';
import { MonitorConfiguration } from './MonitorConfiguration';
import { useSelector, useDispatch } from 'react-redux';
import { AnalyseConfiguration } from './AnalyseConfiguration';
import { PlanConfiguration } from './PlanConfiguration';
import { ExecuteConfiguration } from './ExecuteConfiguration';

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

export function EvolutionProgress(props) {
  const { handleConfirmClick, handleCancelClick, showError, setShowError } =
    props;
  const [currentStage, setCurrentStage] = useState(1);
  const [evolutionPlanError, setEvolutionPlanError] = useState(0);

  const intl = useIntl();
  const dispatch = useDispatch();

  const previousStep = () => {
    setCurrentStage(prevStage => prevStage - 1);
  };

  const nextStep = () => {
    if (currentStage === 1 && evolutionPlanError) {
        setShowError(true);
      } else {
        setCurrentStage(prevStage => prevStage + 1);
        setShowError(false);
      }
  };

  const handleCancelButtonClick = () => {
    handleCancelClick();
    setCurrentStage(1);
  };

  const handleConfirmButtonClick = () => {};

  const currentPage = () => {
    if (currentStage === 1) {
      return <MonitorConfiguration showError={showError} setError={setEvolutionPlanError} />;
    } else if (currentStage === 2) {
      return <AnalyseConfiguration showError={showError} setError={setEvolutionPlanError} />;
    } else if (currentStage === 3) {
      return <PlanConfiguration showError={showError} setError={setEvolutionPlanError} />;
    } else {
      return <ExecuteConfiguration showError={showError} setError={setEvolutionPlanError} />;
    }
  };

  return (
    <Box sx={style}>
      <KubeDeploymentCard title={intl.messages['stressTesting.createTestPlan']} handleClose={handleCancelClick}>
        <Stack
          direction='row'
          spacing={0}
          sx={{ bgcolor: '#eff4f9', p: '0px 20px' }}
        >
          <ProgressIndicator
            title={intl.messages['evolution.monitorConfiguration']}
            adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
            stage={1}
            currentStage={currentStage}
          />
          <ProgressIndicator
            title={intl.messages['evolution.analyseConfiguration']}
            adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
            stage={2}
            currentStage={currentStage}
          />
          <ProgressIndicator
            title={intl.messages['evolution.planConfiguration']}
            adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
            stage={3}
            currentStage={currentStage}
          />
          <ProgressIndicator
            title={intl.messages['evolution.executeConfiguration']}
            adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
            stage={4}
            currentStage={currentStage}
          />
        </Stack>
        {currentPage(currentStage)}

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
          {currentStage > 1 ? (
            <KubeCancelButton
              sx={{ height: '32px', p: '5px 23px' }}
              onClick={previousStep}
            >
              {intl.messages['common.previousStep']}
            </KubeCancelButton>
          ) : (
            <></>
          )}
          
          {(currentStage < totalStage) ? (
            <KubeConfirmButton
              sx={{ height: '32px', p: '5px 23px' }}
              onClick={nextStep}
            >
              {intl.messages['common.nextStep']}
            </KubeConfirmButton>
          ) : (
            <KubeConfirmButton
              sx={{ height: '32px', p: '5px 23px' }}
              onClick={handleConfirmButtonClick}
            >
              {intl.messages['common.create']}
            </KubeConfirmButton>
          )}
        </Stack>
      </KubeDeploymentCard>
    </Box>
  );
}

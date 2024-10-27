/**
 * src\Pages\Cluster\deploy\DeployProgress\index.js
 */
import { useState, useEffect, forwardRef } from 'react';
import { Box, Stack } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { fontFamily } from '../../../../utils/commonUtils';
import InfoFinished from '@/assets/InfoFinished.svg';
import InfoWaiting from '@/assets/InfoWaiting.svg';
import InfoNow from '@/assets/InfoNow.svg';
import DockerFinished from '@/assets/DockerFinished.svg';
import DockerWaiting from '@/assets/DockerWaiting.svg';
import DockerNow from '@/assets/DockerNow.svg';
import ProgressIndicator from './ProgressIndicator';
import { KubeInput } from '../../../../components/Input';
import { useIntl } from 'react-intl';
import {
  KubeCancelButton,
  KubeConfirmButton,
} from '../../../../components/Button';

import { StyledTextField } from '../../../../components/Input';
import BasicInfo from './BasicInfo';
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

// export default function DeployProgress(props) {
const DeployProgress = forwardRef((props, ref) => {
  const { handleConfirmClick, handleCancelClick, totalStage, currentPage, basicInfoError, setShowError, isConfig } =
    props;
  const [currentStage, setCurrentStage] = useState(1);
  
  const intl = useIntl();

  const previousStep = () => {
    setCurrentStage(prevStage => prevStage - 1);
  };

  const nextStep = () => {
    if(currentStage === 1) {
      if(basicInfoError === true) {
        setShowError(true);
        return;
      } else {
        setShowError(false);
      }
      
    }
    setCurrentStage(prevStage => prevStage + 1);
  };

  return (
    <Box sx={style}>
      <KubeDeploymentCard
        title={intl.messages['cluster.makeDeployment']}
        handleClose={handleCancelClick}
      >
        <Stack
          direction='row'
          spacing={0}
          sx={{ bgcolor: '#eff4f9', p: '0px 20px' }}
        >
          <ProgressIndicator
            title={intl.messages['common.basicInfo']}
            adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
            stage={1}
            currentStage={currentStage}
          />
          <ProgressIndicator
            title={intl.messages['cluster.podSetting']}
            adornments={[<DockerWaiting />, <DockerNow />, <DockerFinished />]}
            stage={2}
            currentStage={currentStage}
          />
        </Stack>
        {currentPage(currentStage)}

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
            onClick={handleCancelClick}
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
          {currentStage < totalStage ? (
            <KubeConfirmButton
              sx={{ height: '32px', p: '5px 23px' }}
              onClick={nextStep}
            >
              {intl.messages['common.nextStep']}
            </KubeConfirmButton>
          ) : (
            <KubeConfirmButton
              sx={{ height: '32px', p: '5px 23px' }}
              onClick={handleConfirmClick}
              disabled={isConfig}
            >
              {intl.messages['common.create']}
            </KubeConfirmButton>
          )}
        </Stack>
      </KubeDeploymentCard>
    </Box>
  );
});

export default DeployProgress;

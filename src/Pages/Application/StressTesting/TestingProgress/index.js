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
import { KubeInput, StyledTextField } from '@/components/Input';
import { useIntl } from 'react-intl';
import { KubeCancelButton, KubeConfirmButton } from '@/components/Button';
import ProgressIndicator from '../../../Cluster/deploy/DeployProgress/ProgressIndicator';
import { TestPlan } from './TestPlan';
import { ThreadGroup } from './ThreadGroup';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_CURRENT_GROUP_EDIT_STAGE, UPDATE_GROUP_EDIT } from '../../../../actions/applicationAction';

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
const totalGroupEditStage = 5;

export function TestingProgress(props) {
  const { handleConfirmClick, handleCancelClick, showError, setShowError } =
    props;
  const [currentStage, setCurrentStage] = useState(1);

  const intl = useIntl();
  const dispatch = useDispatch();

  const { groupEdit, currentGroupEditStage } = useSelector(state => {
    return {
      groupEdit: state.Application.groupEdit,
      currentGroupEditStage: state.Application.currentGroupEditStage,
    };
  });

  const previousStep = () => {
    if(groupEdit) {
      dispatch({type: UPDATE_CURRENT_GROUP_EDIT_STAGE, data: currentGroupEditStage - 1});
    } else {
      setCurrentStage(prevStage => prevStage - 1);
    }
  };

  const nextStep = () => {
    if(groupEdit) {
      dispatch({type: UPDATE_CURRENT_GROUP_EDIT_STAGE, data: currentGroupEditStage + 1});
    } else {
      setCurrentStage(prevStage => prevStage + 1);
    }
  };

  const handleCancelButtonClick = () => {
    if(groupEdit) {
      dispatch({type: UPDATE_GROUP_EDIT, data: false});
    } else {
      handleCancelClick();
    }
  }

  const handleConfirmButtonClick = () => {
    if(groupEdit) {
      dispatch({type: UPDATE_GROUP_EDIT, data: false});
    } else {
      handleConfirmClick();
    }
  }

  const currentPage = () => {
    if (currentStage === 1) {
      return <TestPlan />
    }
    return <ThreadGroup />;
  };

  return (
    <Box sx={style}>
      <KubeDeploymentCard title='创建测试计划' handleClose={handleCancelClick}>
        <Stack
          direction='row'
          spacing={0}
          sx={{ bgcolor: '#eff4f9', p: '0px 20px' }}
        >
          <ProgressIndicator
            title='测试计划'
            adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
            stage={1}
            currentStage={currentStage}
          />
          <ProgressIndicator
            title='线程组设置'
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
            onClick={handleCancelButtonClick}
          >
            取消
          </KubeCancelButton>
          {/* 不在edit group时，主步骤大于1；在edit group时，次步骤大于1 */}
          {((currentStage > 1 && !groupEdit) || (groupEdit && currentGroupEditStage > 1)) ? (
            <KubeCancelButton
              sx={{ height: '32px', p: '5px 23px' }}
              onClick={previousStep}
            >
              上一步
            </KubeCancelButton>
          ) : (
            <></>
          )}
          {((currentStage < totalStage && !groupEdit) || (groupEdit && currentGroupEditStage < totalGroupEditStage)) ? (
            <KubeConfirmButton
              sx={{ height: '32px', p: '5px 23px' }}
              onClick={nextStep}
            >
              下一步
            </KubeConfirmButton>
          ) : (
            <KubeConfirmButton
              sx={{ height: '32px', p: '5px 23px' }}
              onClick={handleConfirmButtonClick}
            >
              {!groupEdit ? "创建" : "添加"}
            </KubeConfirmButton>
          )}
        </Stack>
      </KubeDeploymentCard>
    </Box>
  );
}

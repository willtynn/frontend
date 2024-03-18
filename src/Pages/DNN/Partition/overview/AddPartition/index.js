import { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { fontFamily } from '@/utils/commonUtils';
import InfoFinished from '@/assets/InfoFinished.svg';
import InfoWaiting from '@/assets/InfoWaiting.svg';
import InfoNow from '@/assets/InfoNow.svg';
import { KubeCancelButton, KubeConfirmButton } from '@/components/Button';
import ProgressIndicator from './ProgressIndicator';
import { useSelector, useDispatch } from 'react-redux';
import {EDIT_JSON_DATA, EDIT_ORIGIN_MODEL_NAME, EDIT_STRATEGY_NAME} from "@/actions/partitionAction";
import {EditBox} from "./EditBox";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '960px',
  boxShadow: 24,
  height: '550px',
  fontFamily: fontFamily,
};

export function AddProgress(props) {
  const { handleConfirmClick, handleCancelClick } = props;
  const [currentStage, setCurrentStage] = useState(1);
  const dispatch = useDispatch();

  const {
    strategyName,
    originModelName,
    jsonData,
  } = useSelector(state => {
    return {
      strategyName: state.Partition.strategyName,
      originModelName: state.Partition.originModelName,
      jsonData: state.Partition.jsonData,
    };
  });

  const handleCancelButtonClick = () => {
    if(jsonData) {
      dispatch({type: EDIT_JSON_DATA, data: null});
    }
    if(originModelName) {
      dispatch({type: EDIT_ORIGIN_MODEL_NAME, data: null});
    }
    if(strategyName) {
      dispatch({type: EDIT_STRATEGY_NAME, data: null});
    }
    handleCancelClick();
  }

  const handleConfirmButtonClick = (e) => {
    handleConfirmClick();
  }

  return (
    <Box sx={style}>
      <KubeDeploymentCard title='创建拆分策略' handleClose={handleCancelClick}>
        <Stack
          direction='row'
          spacing={0}
          sx={{ backgroundColor: '#eff4f9', p: '0px 20px' }}
        >
          <ProgressIndicator
            title='新建拆分策略'
            adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
            stage={1}
            currentStage={currentStage}
          />
        </Stack>
        <Box>
          <EditBox showError={false}/>
        </Box>
        {/* 按钮组 */}
        <Stack
          sx={{
            mt: '80px',
            position: 'absolute',
            bottom: '12px',
            width: 'calc(100% - 64px)',
            backgroundColor: '#f9fbfd',
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
          <KubeConfirmButton
            sx={{ height: '32px', p: '5px 23px' }}
            onClick={handleConfirmButtonClick}
          >
            创建
          </KubeConfirmButton>
        </Stack>
      </KubeDeploymentCard>
    </Box>
  );
}

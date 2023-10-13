import { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { ContainedButton, OutlinedButton } from '../../../../components/Button';
import { fontFamily } from '../../../../utils/commonUtils';
import InfoFinished from '@/assets/InfoFinished.svg'
import InfoWaiting from '@/assets/InfoWaiting.svg'
import InfoNow from '@/assets/InfoNow.svg'
import DockerFinished from '@/assets/DockerFinished.svg'
import DockerWaiting from '@/assets/DockerWaiting.svg'
import DockerNow from '@/assets/DockerNow.svg'
import ProgressIndicator from './ProgressIndicator';


import { StyledTextFiled } from '../../../../components/Input';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "960px",
  boxShadow: 24,
  height: "calc(100% - 120px)",
  fontFamily: fontFamily
};

const deployLabels = ['服务ID', '服务名称', '镜像路径（URL）', '目标服务器ID'];

const deployValues = [
  <StyledTextFiled id='deploy-service-id' variant='outlined' />,
  <StyledTextFiled id='deploy-service-id' variant='outlined' />,
  <StyledTextFiled id='deploy-service-id' variant='outlined' />,
  <StyledTextFiled id='deploy-service-id' variant='outlined' />,
];

export default function DeployProgress(props) {

  const { handleConfirmClick, handleCancelClick } = props;
  const [currentState, setCurrentState] = useState(1);

  return (
    <Box sx={style}>
      <KubeDeploymentCard title='创建Deployment' handleClose={handleCancelClick}>
        <Stack direction="row" spacing={0} sx={{ bgcolor: "#eff4f9", p: "0px 20px"}}>
          <ProgressIndicator
            title="基本信息"
            adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
            stage={1}
            currentState={currentState}
          />
          <ProgressIndicator
            title="容器组设置"
            adornments={[<DockerWaiting />, <DockerNow />, <DockerFinished />]}
            stage={2}
            currentState={currentState}
          />
        </Stack>
        <Box sx={{ p: '64px 32px 32px 128px' }}>
          <Stack direction='row' spacing={4}>
            <Stack spacing={3}>
              {deployLabels.map((value, index) => {
                return (
                  <Box
                    sx={{
                      width: '224px',
                      height: '50px',
                      fontFamily: fontFamily,
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '36px',
                      color: '#596A7C',
                    }}
                    key={index}
                  >
                    {value}
                  </Box>
                );
              })}
            </Stack>

            <Stack sx={{ width: '500px' }} spacing={3}>
              {deployValues.map((value, index) => {
                return (
                  <Box
                    sx={{
                      width: '100%',
                      height: '50px',
                      fontFamily: fontFamily,
                      fontStyle: 'normal',
                      fontWeight: 400,
                      color: '#262E35',
                      flex: 'none',
                      alignSelf: 'stretch',
                      flexGrow: 0,
                    }}
                    key={index}
                  >
                    {value}
                  </Box>
                );
              })}
            </Stack>
          </Stack>

          <Stack
            sx={{
              mt: '80px',
            }}
            direction='row'
            spacing={3}
          >
            <ContainedButton
              sx={{ height: '40px', width: '114px' }}
              onClick={handleConfirmClick}
            >
              确认
            </ContainedButton>
            <OutlinedButton
              sx={{ height: '40px', width: '114px' }}
              onClick={handleCancelClick}
            >
              取消
            </OutlinedButton>
          </Stack>
        </Box>
      </KubeDeploymentCard>
    </Box>
  );
}

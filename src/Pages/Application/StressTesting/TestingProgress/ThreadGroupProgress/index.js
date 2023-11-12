/**
 * src\Pages\Application\StressTesting\TestingProgress\ThreadGroupProgress\index.js
 */
import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
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
import ProgressIndicator from '../../../../Cluster/deploy/DeployProgress/ProgressIndicator';
import KubeNormalReturn from '@/assets/KubeNormalReturn.svg';
import KubeHoverReturn from '@/assets/KubeHoverReturn.svg';
import { RequestDefaults } from './RequestDefaults';
import { HeaderManager } from './HeaderManager';
import { HttpRequest } from './HttpRequest';
import { Timer } from './Timer';
import { Result } from './Result';
import { ThreadConfig } from './ThreadConfig';
import { useSelector } from 'react-redux';

export function ThreadGroupProgress(props) {
  const { handleReturn, showError, setThreadConfigError } = props;

  const [returnHover, setReturnHover] = useState(false);
  const { currentGroupEditStage } = useSelector(state => {
    return {
      currentGroupEditStage: state.Application.currentGroupEditStage,
    };
  });

  const [httpDefaultName, setHttpDefaultName] = useState(
    'HTTP Request Defaults'
  );

  const currentPage = () => {
    if (currentGroupEditStage === 1) {
      return (
        <ThreadConfig setThreadConfigError={setThreadConfigError} showError={showError}/>
      );
    }
    if (currentGroupEditStage === 2) {
      return <RequestDefaults />;
    }
    if (currentGroupEditStage === 3) {
      return <HeaderManager />;
    }
    if (currentGroupEditStage === 4) {
      return <Timer />;
    }
    return <Result />;
  };
  return (
    <Box
      sx={{
        overflowY: 'auto',
        height: "100%"
      }}
    >
      <Stack
        direction='row'
        spacing={0}
        sx={{ bgcolor: '#eff4f9', p: '0px 20px', overflow: 'auto' }}
      >
        <ProgressIndicator
          title='线程组设置'
          adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
          stage={1}
          currentStage={currentGroupEditStage}
        />
        <ProgressIndicator
          title='请求默认值'
          adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
          stage={2}
          currentStage={currentGroupEditStage}
        />
        <ProgressIndicator
          title='请求头管理'
          adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
          stage={3}
          currentStage={currentGroupEditStage}
        />
        <ProgressIndicator
          title='定时器'
          adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
          stage={4}
          currentStage={currentGroupEditStage}
        />
        {/* <ProgressIndicator
          title='结果'
          adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
          stage={6}
          currentStage={currentStage}
        /> */}
      </Stack>
      <Box
        sx={{
          padding: '12px 24px',
        }}
      >
        {/* 返回按钮和标题 */}
        <Stack direction='row' spacing={1}>
          <Box
            sx={{
              pt: '2px',
              cursor: 'pointer',
            }}
            onMouseOver={() => {
              setReturnHover(true);
            }}
            onMouseLeave={() => {
              setReturnHover(false);
            }}
            onClick={handleReturn}
          >
            {returnHover ? <KubeHoverReturn /> : <KubeNormalReturn />}
          </Box>
          <Typography
            sx={{
              fontWeight: 600,
              color: '#242e42',
              fontSize: '16px',
              lineHeight: 1.67,
            }}
          >
            添加线程组
          </Typography>
        </Stack>
        {currentPage(currentGroupEditStage)}
      </Box>
    </Box>
  );
}

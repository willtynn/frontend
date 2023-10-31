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
import { KubeInput, StyledTextFiled } from '@/components/Input';
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

export function ThreadGroupProgress(props) {
  const { handleReturn } = props;

  const [returnHover, setReturnHover] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  const [groupName, setGroupName] = useState('Thread Group');
  const [groupComment, setGroupComment] = useState('');
  const [onSampleError, setOnSampleError] = useState('continue');
  const [numThreads, setNumThreads] = useState(1);
  const [rampTime, setRampTime] = useState(1);
  const [loops, setLoops] = useState(1);
  const [loopsContinueForever, setLoopsContinueForever] = useState(false);
  const [sameUserOnNextIteration, setSameUserOnNextIteration] = useState(true);
  const [delayedStart, setDelayedStart] = useState(false);
  const [scheduler, setScheduler] = useState(false);
  const [duration, setDuration] = useState(null);
  const [delay, setDelay] = useState(null);

  const [httpDefaultName, setHttpDefaultName] = useState(
    'HTTP Request Defaults'
  );

  const currentPage = () => {
    if (currentStage === 1) {
      return (
        <ThreadConfig
          groupName={groupName}
          setGroupName={setGroupName}
          groupComment={groupComment}
          setGroupComment={setGroupComment}
          onSampleError={onSampleError}
          setOnSampleError={setOnSampleError}
          numThreads={numThreads}
          setNumThreads={setNumThreads}
          rampTime={rampTime}
          setRampTime={setRampTime}
          loops={loops}
          setLoops={setLoops}
          loopsContinueForever={loopsContinueForever}
          setLoopsContinueForever={setLoopsContinueForever}
          sameUserOnNextIteration={sameUserOnNextIteration}
          setSameUserOnNextIteration={setSameUserOnNextIteration}
          delayedStart={delayedStart}
          setDelayedStart={setDelayedStart}
          scheduler={scheduler}
          setScheduler={setScheduler}
          duration={duration}
          setDuration={setDuration}
          delay={delay}
          setDelay={setDelay}
        />
      );
    }
    if (currentStage === 2) {
      return <RequestDefaults />;
    }
    if (currentStage === 3) {
      return <HeaderManager />;
    }
    if (currentStage === 4) {
      return <HttpRequest />;
    }
    if (currentStage === 5) {
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
          currentStage={currentStage}
        />
        <ProgressIndicator
          title='请求默认值'
          adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
          stage={2}
          currentStage={currentStage}
        />
        <ProgressIndicator
          title='请求头管理'
          adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
          stage={3}
          currentStage={currentStage}
        />
        <ProgressIndicator
          title='HTTP请求'
          adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
          stage={4}
          currentStage={currentStage}
        />
        <ProgressIndicator
          title='定时器'
          adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
          stage={5}
          currentStage={currentStage}
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
        {currentPage(currentStage)}
      </Box>
    </Box>
  );
}

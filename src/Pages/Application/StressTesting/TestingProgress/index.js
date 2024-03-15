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
import ProgressIndicator from '../../../Cluster/deploy/DeployProgress/ProgressIndicator';
import { TestPlan } from './TestPlan';
import { ThreadGroup } from './ThreadGroup';
import { useSelector, useDispatch } from 'react-redux';
import {
  UPDATE_CURRENT_GROUP_EDIT_STAGE,
  UPDATE_GROUP_EDIT,
  UPDATE_THREAD_GROUPS,
  RESET_GROUP,
  RESET_PLAN,
  UPDATE_GROUP_EDIT_INDEX,
  createTestPlan
} from '../../../../actions/applicationAction';
import {
  CONSTANT_TIMER,
  UNIFORM_RANDOM_TIMER,
  POISSON_RANDOM_TIMER,
  GAUSSIAN_RANDOM_TIMER,
} from './ThreadGroupProgress/Timer';

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
const totalGroupEditStage = 4;

const composeTestParams = testPlan => {
  testPlan.threadGroups = testPlan.threadGroups.map((group, index) => {
    const timerList = group.timer.map((singleTimer, index) => {
      if (singleTimer.id === CONSTANT_TIMER) {
        return {
          type: singleTimer.id,
          name: singleTimer.id,
          threadDelay: singleTimer.threadDelay,
          comment: '',
        };
      } else if (singleTimer.id === UNIFORM_RANDOM_TIMER) {
        return {
          type: singleTimer.id,
          name: singleTimer.id,
          constantDelayOffset: singleTimer.constantDelayOffset,
          randomDelayMaximum: singleTimer.randomDelayMaximum,
          comment: '',
        };
      } else if (singleTimer.id === POISSON_RANDOM_TIMER) {
        return {
          type: singleTimer.id,
          name: singleTimer.id,
          constantDelayOffset: singleTimer.constantDelayOffset,
          lambda: singleTimer.lambda,
          comment: '',
        };
      } else if (singleTimer.id === GAUSSIAN_RANDOM_TIMER) {
        return {
          type: singleTimer.id,
          name: singleTimer.id,
          deviation: singleTimer.deviation,
          constantDelayOffset: singleTimer.constantDelayOffset,
          comment: '',
        };
      } else {
        return {};
      }
    });
    let headerManager = {};
    group.requestHeader.forEach((header, index) => {
      headerManager[header.name] = header.value;
    });
    let httpArguments = {};
    group.requestParameters.forEach((parameter, index) => {
      httpArguments[parameter.name] = parameter.value;
    })
    return {
      threadGroupName: group.groupName,
      threadNum: group.numThreads,
      rampUp: group.rampTime,
      // scheduler: group.scheduler,
      // duration: group.duration,
      // delay: group.delay,
      // 如何确定是否loop？
      loopControllerVO: {
        loopControllerName: "Loop Controller",
        loopNum: group.loops,
        continueForerever: group.loopsContinueForever,
      },
      httpSamplerProxyVO: {
        name: group.requestDefaultName,
        protocol: group.webServerProtocol,
        server: group.webServerNameOrIP,
        path: group.httpRequestPath,
        port: group.webServerPort,
        method: group.httpRequestMethod,
        body: group.requestBodyData,
        useKeepAlive: 'true',
        followRedirects: 'true',
        arguments: httpArguments
      },
      headerManagerVO: {
        headerManagerName: 'header manager',
        headerList: headerManager,
      },
      timers: timerList,
    };
  });
  return {
    testPlanName: testPlan.planName,
    serialized: testPlan.serializeThreadgroups,
    functionalMode: testPlan.functionalMode,
    tearDown: testPlan.tearDownOnShutdown,
    comment: testPlan.planComment,
    namespace: testPlan.namespace,
    podName: testPlan.podName,
    threadGroupList: testPlan.threadGroups,
  };
};

export function TestingProgress(props) {
  const { handleConfirmClick, handleCancelClick, showError, setShowError } =
    props;
  const [currentStage, setCurrentStage] = useState(1);
  const [testPlanError, setTestPlanError] = useState(0);
  const [threadConfigError, setThreadConfigError] = useState(false);
  const [threadGroupError, setThreadGroupError] = useState(true);

  const intl = useIntl();
  const dispatch = useDispatch();

  const {
    planName,
    planComment,
    functionalMode,
    tearDownOnShutdown,
    serializeThreadgroups,
    namespace,
    podName,
    groupEdit,
    currentGroupEditStage,
    threadGroups,
    groupName,
    groupComment,
    onSampleError,
    numThreads,
    rampTime,
    loops,
    loopsContinueForever,
    sameUserOnNextIteration,
    delayedStart,
    scheduler,
    duration,
    delay,
    requestDefaultName,
    webServerProtocol,
    webServerNameOrIP,
    webServerPort,
    httpRequestMethod,
    httpRequestPath,
    httpRequestContentEncoding,
    requestParameters,
    requestBodyData,
    requestHeader,
    timer,
    groupEditIndex,
  } = useSelector(state => {
    return {
      planName: state.Application.planName,
      planComment: state.Application.planComment,
      functionalMode: state.Application.functionalMode,
      tearDownOnShutdown: state.Application.tearDownOnShutdown,
      serializeThreadgroups: state.Application.serializeThreadgroups,
      namespace: state.Application.namespace,
      podName: state.Application.podName,
      groupEdit: state.Application.groupEdit,
      currentGroupEditStage: state.Application.currentGroupEditStage,
      threadGroups: state.Application.threadGroups,
      groupName: state.Application.groupName,
      groupComment: state.Application.groupComment,
      onSampleError: state.Application.onSampleError,
      numThreads: state.Application.numThreads,
      rampTime: state.Application.rampTime,
      loops: state.Application.loops,
      loopsContinueForever: state.Application.loopsContinueForever,
      sameUserOnNextIteration: state.Application.sameUserOnNextIteration,
      delayedStart: state.Application.delayedStart,
      scheduler: state.Application.scheduler,
      duration: state.Application.duration,
      delay: state.Application.delay,
      requestDefaultName: state.Application.requestDefaultName,
      webServerProtocol: state.Application.webServerProtocol,
      webServerNameOrIP: state.Application.webServerNameOrIP,
      webServerPort: state.Application.webServerPort,
      httpRequestMethod: state.Application.httpRequestMethod,
      httpRequestPath: state.Application.httpRequestPath,
      httpRequestContentEncoding: state.Application.httpRequestContentEncoding,
      requestParameters: state.Application.requestParameters,
      requestBodyData: state.Application.requestBodyData,
      requestHeader: state.Application.requestHeader,
      timer: state.Application.timer,
      groupEditIndex: state.Application.groupEditIndex,
    };
  });

  const previousStep = () => {
    if (groupEdit) {
      dispatch({
        type: UPDATE_CURRENT_GROUP_EDIT_STAGE,
        data: currentGroupEditStage - 1,
      });
    } else {
      setCurrentStage(prevStage => prevStage - 1);
    }
  };

  const nextStep = () => {
    if (groupEdit) {
      if (currentGroupEditStage === 1 && threadConfigError) {
        setShowError(true);
      } else {
        dispatch({
          type: UPDATE_CURRENT_GROUP_EDIT_STAGE,
          data: currentGroupEditStage + 1,
        });
        setShowError(false);
      }
    } else {
      if (currentStage === 1 && testPlanError) {
        setShowError(true);
      } else {
        setCurrentStage(prevStage => prevStage + 1);
        setShowError(false);
      }
    }
  };

  const handleCancelButtonClick = () => {
    if (groupEdit) {
      if (groupEditIndex !== null) {
        dispatch({ type: UPDATE_GROUP_EDIT_INDEX, data: null });
      }
      dispatch({ type: UPDATE_GROUP_EDIT, data: false });
      dispatch({
        type: UPDATE_CURRENT_GROUP_EDIT_STAGE,
        data: 1,
      });
    } else {
      handleCancelClick();
      setCurrentStage(1);
    }
  };

  const handleConfirmButtonClick = () => {
    if (groupEdit) {
      if (groupEditIndex !== null) {
        const tmpGroups = JSON.parse(JSON.stringify(threadGroups));
        tmpGroups[groupEditIndex] = {
          groupName: groupName,
          groupComment: groupComment,
          onSampleError: onSampleError,
          numThreads: numThreads,
          rampTime: rampTime,
          loops: loops,
          loopsContinueForever: loopsContinueForever,
          sameUserOnNextIteration: sameUserOnNextIteration,
          delayedStart: delayedStart,
          scheduler: scheduler,
          duration: duration,
          delay: delay,
          requestDefaultName: requestDefaultName,
          webServerProtocol: webServerProtocol,
          webServerNameOrIP: webServerNameOrIP,
          webServerPort: webServerPort,
          httpRequestMethod: httpRequestMethod,
          httpRequestPath: httpRequestPath,
          httpRequestContentEncoding: httpRequestContentEncoding,
          requestParameters: requestParameters,
          requestBodyData: requestBodyData,
          requestHeader: requestHeader,
          timer: timer,
        };
        dispatch({ type: UPDATE_THREAD_GROUPS, data: tmpGroups });
        dispatch({ type: UPDATE_GROUP_EDIT_INDEX, data: null });
      } else {
        dispatch({
          type: UPDATE_THREAD_GROUPS,
          data: [
            ...threadGroups,
            {
              groupName: groupName,
              groupComment: groupComment,
              onSampleError: onSampleError,
              numThreads: numThreads,
              rampTime: rampTime,
              loops: loops,
              loopsContinueForever: loopsContinueForever,
              sameUserOnNextIteration: sameUserOnNextIteration,
              delayedStart: delayedStart,
              scheduler: scheduler,
              duration: duration,
              delay: delay,
              requestDefaultName: requestDefaultName,
              webServerProtocol: webServerProtocol,
              webServerNameOrIP: webServerNameOrIP,
              webServerPort: webServerPort,
              httpRequestMethod: httpRequestMethod,
              httpRequestPath: httpRequestPath,
              httpRequestContentEncoding: httpRequestContentEncoding,
              requestParameters: requestParameters,
              requestBodyData: requestBodyData,
              requestHeader: requestHeader,
              timer: timer,
            },
          ],
        });
      }
      dispatch({ type: UPDATE_GROUP_EDIT, data: false });
      dispatch({ type: RESET_GROUP });
    } else {
      if (threadGroupError) {
        setShowError(true);
      } else {
        setShowError(false);
        
        const testPlanData = composeTestParams({
          planName: planName,
          planComment: planComment,
          functionalMode: functionalMode,
          tearDownOnShutdown: tearDownOnShutdown,
          serializeThreadgroups: serializeThreadgroups,
          namespace: namespace,
          podName: podName,
          threadGroups: threadGroups,
        });
        // console.log(testPlanData);
        dispatch(createTestPlan(testPlanData));
        handleConfirmClick();
        setCurrentStage(1);
        dispatch({ type: RESET_PLAN });
      }
    }
  };

  const currentPage = () => {
    if (currentStage === 1) {
      return <TestPlan showError={showError} setError={setTestPlanError} />;
    }
    return (
      <ThreadGroup
        showError={showError}
        setThreadConfigError={setThreadConfigError}
        setThreadGroupError={setThreadGroupError}
      />
    );
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
            title={intl.messages['common.testPlan']}
            adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
            stage={1}
            currentStage={currentStage}
          />
          <ProgressIndicator
            title={intl.messages['stressTesting.threadGroupTesting']}
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
            {intl.messages['common.cancel']}
          </KubeCancelButton>
          {/* 不在edit group时，主步骤大于1；在edit group时，次步骤大于1 */}
          {(currentStage > 1 && !groupEdit) ||
          (groupEdit && currentGroupEditStage > 1) ? (
            <KubeCancelButton
              sx={{ height: '32px', p: '5px 23px' }}
              onClick={previousStep}
            >
              {intl.messages['common.previousStep']}
            </KubeCancelButton>
          ) : (
            <></>
          )}
          {(currentStage < totalStage && !groupEdit) ||
          (groupEdit && currentGroupEditStage < totalGroupEditStage) ? (
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
              {!groupEdit
                ? intl.messages['common.create']
                : groupEditIndex !== null
                ? intl.messages['stressTesting.editThreadGroup']
                : intl.messages['common.add']}
            </KubeConfirmButton>
          )}
        </Stack>
      </KubeDeploymentCard>
    </Box>
  );
}

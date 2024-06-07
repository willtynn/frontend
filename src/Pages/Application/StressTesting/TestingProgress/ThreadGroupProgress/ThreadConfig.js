/**
 * src\Pages\Application\StressTesting\TestingProgress\ThreadGroupProgress\ThreadConfig.js
 */
import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { KubeInput } from '@/components/Input';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { StyledRadioGroup } from '../../../../../components/Radio';
import { StyledCheckbox } from '../../../../../components/Checkbox';
import {
  UPDATE_GROUP_NAME,
  UPDATE_GROUP_COMMENT,
  UPDATE_ON_SAMPLE_ERROR,
  UPDATE_NUM_THREADS,
  UPDATE_RAMP_TIME,
  UPDATE_LOOPS,
  UPDATE_LOOPS_CONTINUE_FOREVER,
  UPDATE_SAME_USER_ON_NEXT_ITERATION,
  UPDATE_DELAY_START,
  UPDATE_SCHEDULER,
  UPDATE_DURATION,
  UPDATE_DELAY,
  UPDATE_INITIAL_DELAY,
  UPDATE_START_USERS_COUNT,
  UPDATE_START_USERS_COUNT_BURST,
  UPDATE_START_USERS_PERIOD,
  UPDATE_STOP_USERS_COUNT,
  UPDATE_STOP_USERS_PERIOD,
  UPDATE_FLIGHTTIME,
  UPDATE_RAMP_UP,
} from '../../../../../actions/applicationAction';
import { StaticLineChart } from '@/components/Charts/LineChart';

const regExp = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9 -]{0,251}[a-zA-Z0-9]$/);

export function ThreadConfig(props) {
  const { showError, setThreadConfigError } = props;
  const intl = useIntl();

  const [groupNameError, setGroupNameError] = useState(false);
  const [groupNameErrorType, setGroupNameErrorType] = useState(0);

  const [steppingLineChartData, setSteppingLineChartData] = useState([]);
  const [steppingPeriod, setSteppingPeriod] = useState(10);

  const onSampleErrorData = [
    ['continue', intl.messages['common.continue']],
    ['startnextloop', intl.messages['stressTesting.startNextLoop']],
    ['stopthread', intl.messages['stressTesting.stopthread']],
    ['stoptest', intl.messages['stressTesting.stopTest']],
    ['stoptestnow', intl.messages['stressTesting.stoptestnow']],
  ];

  const {
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
    isBoundary,
    initialDelay,
    startUsersCount,
    startUsersCountBurst,
    startUsersPeriod,
    stopUsersCount,
    stopUsersPeriod,
    flighttime,
    rampUp,
  } = useSelector(state => {
    return {
      groupName: state.Application.groupName,
      groupComment: state.Application.groupComment,
      onSampleError: state.Application.onSampleError,
      numThreads: state.Application.numThreads,
      rampTime: state.Application.rampTime,
      loops: state.Application.loops,
      loopsContinueForever: state.Application.loopsContinueForever,
      sameUserOnNextIteration: state.Application.sameUserOnNextIteration,
      sameUserOnNextIteration: state.Application.sameUserOnNextIteration,
      delayedStart: state.Application.delayedStart,
      scheduler: state.Application.scheduler,
      duration: state.Application.duration,
      delay: state.Application.delay,
      isBoundary: state.Application.isBoundary,
      initialDelay: state.Application.initialDelay,
      startUsersCount: state.Application.startUsersCount,
      startUsersCountBurst: state.Application.startUsersCountBurst,
      startUsersPeriod: state.Application.startUsersPeriod,
      stopUsersCount: state.Application.stopUsersCount,
      stopUsersPeriod: state.Application.stopUsersPeriod,
      flighttime: state.Application.flighttime,
      rampUp: state.Application.rampUp,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setThreadConfigError(groupNameError);
  }, [groupNameError]);

  useEffect(() => {
    if (startUsersCount == 0 || startUsersPeriod == 0) {
      return;
    }
    let currentUser = 0;
    let currentTime = 0;
    const data = [
      {
        x: 0,
        y: 0,
      },
    ];
    if (Number(initialDelay) > 0) {
      data.push({ x: Number(initialDelay), y: 0 });
      currentTime = Number(initialDelay);
    }
    // 处理burst
    if (startUsersCountBurst > 0) {
      [currentUser, currentTime] = processRampUp(
        data,
        Number(rampUp),
        Number(startUsersCountBurst),
        currentUser,
        currentTime
      );
      if (startUsersPeriod > 0) {
        data.push({
          x: currentTime + Number(startUsersPeriod),
          y: currentUser,
        });
        currentTime += startUsersPeriod;
      }
    }
    // 处理周期
    while (true) {
      if (
        (Number(flighttime) == 0 &&
          Number(numThreads) - currentUser <= Number(startUsersCount)) ||
        (Number(flighttime) > 0 &&
          Number(numThreads) - currentUser < Number(startUsersCount))
      ) {
        break;
      }
      [currentUser, currentTime] = processRampUp(
        data,
        Number(rampUp),
        Number(startUsersCount),
        currentUser,
        currentTime
      );
      if (startUsersPeriod > 0) {
        data.push({
          x: currentTime + Number(startUsersPeriod),
          y: currentUser,
        });
        currentTime += Number(startUsersPeriod);
      }
    }

    // 处理残差
    const residual = Math.floor(numThreads % startUsersCount);
    if (residual > 0) {
      [currentUser, currentTime] = processRampUp(
        data,
        Number(rampUp),
        Number(residual),
        currentUser,
        currentTime
      );
      if (startUsersPeriod > 0) {
        data.push({
          x: currentTime + Number(startUsersPeriod),
          y: currentUser,
        });
        currentTime += Number(startUsersPeriod);
      }
    }

    if (flighttime > 0) {
      data.push({ x: currentTime + Number(flighttime), y: currentUser });
      currentTime += Number(flighttime);
    }

    // 处理exit
    if (stopUsersCount == 0 || stopUsersPeriod == 0) {
      // 瞬间停止
      data.push({ x: currentTime, y: 0 });
      currentUser = 0;
    } else {
      while (currentUser >= Number(stopUsersCount)) {
        data.push({ x: currentTime, y: currentUser - Number(stopUsersCount) });
        currentUser -= Number(stopUsersCount);
        // 处理正好为0的情况
        if (currentUser > 0) {
          data.push({
            x: currentTime + Number(stopUsersPeriod),
            y: currentUser,
          });
          currentTime += Number(stopUsersPeriod);
        }
      }
      if (currentUser > 0) {
        data.push({ x: currentTime, y: 0 });
      }
    }
    setSteppingLineChartData(data);
    setSteppingPeriod(currentTime);
  }, [
    numThreads,
    initialDelay,
    startUsersCount,
    startUsersCountBurst,
    startUsersPeriod,
    stopUsersCount,
    stopUsersPeriod,
    flighttime,
    rampUp,
  ]);

  const handleGroupNameChange = e => {
    if (e.target.value === '') {
      setGroupNameError(true);
      setGroupNameErrorType(0);
    } else if (!regExp.test(e.target.value)) {
      setGroupNameError(true);
      setGroupNameErrorType(1);
    } else {
      setGroupNameError(false);
    }
    dispatch({ type: UPDATE_GROUP_NAME, data: e.target.value });
  };

  const handleGroupCommentChange = e => {
    dispatch({ type: UPDATE_GROUP_COMMENT, data: e.target.value });
  };

  const handleNumThreadsChange = e => {
    dispatch({ type: UPDATE_NUM_THREADS, data: e.target.value });
  };

  const handleRampTimeChange = e => {
    dispatch({ type: UPDATE_RAMP_TIME, data: e.target.value });
  };

  const handleLoopsChange = e => {
    dispatch({ type: UPDATE_LOOPS, data: e.target.value });
  };

  const handleDurationChange = e => {
    dispatch({ type: UPDATE_DURATION, data: e.target.value });
  };

  const handleDelayChange = e => {
    dispatch({ type: UPDATE_DELAY, data: e.target.value });
  };

  const handleInitialDelayChange = e => {
    dispatch({ type: UPDATE_INITIAL_DELAY, data: e.target.value });
  };

  const handleStartUsersCountChange = e => {
    dispatch({ type: UPDATE_START_USERS_COUNT, data: e.target.value });
  };

  const handleStartUsersCountBurstChange = e => {
    dispatch({ type: UPDATE_START_USERS_COUNT_BURST, data: e.target.value });
  };

  const handleStartUsersPeriodChange = e => {
    dispatch({ type: UPDATE_START_USERS_PERIOD, data: e.target.value });
  };

  const handleStopUsersCountChange = e => {
    dispatch({ type: UPDATE_STOP_USERS_COUNT, data: e.target.value });
  };

  const handleStopUsersPeriodChange = e => {
    dispatch({ type: UPDATE_STOP_USERS_PERIOD, data: e.target.value });
  };

  const handleFlighttimeChange = e => {
    dispatch({ type: UPDATE_FLIGHTTIME, data: e.target.value });
  };

  const handleRampUpChange = e => {
    dispatch({ type: UPDATE_RAMP_UP, data: e.target.value });
  };

  const processRampUp = (
    data,
    rampUp,
    usersCount,
    currentUser = 0,
    currentTime = 0
  ) => {
    if (rampUp > 0) {
      const stepPeriod = Number(rampTime) / usersCount;
      for (let i = 0; i < usersCount; i++) {
        data.push({ x: currentTime, y: 1 + currentUser });
        if (i != usersCount - 1) {
          data.push({
            x: currentTime + stepPeriod,
            y: 1 + currentUser,
          });
        }
        currentUser++;
        currentTime += stepPeriod;
      }
    } else {
      data.push({ x: currentTime, y: currentUser + Number(usersCount) });
      currentUser += Number(usersCount);
    }
    return [currentUser, currentTime];
  };

  return (
    <Box sx={{ p: '12px' }}>
      <Stack direction='column' spacing={1.5}>
        <KubeInput
          label={intl.messages['common.name']}
          decription={intl.messages['stressTesting.planNameDescription']}
          requried={true}
          id='thread-group-name-input'
          variant='outlined'
          value={groupName}
          onChange={handleGroupNameChange}
          error={groupNameError && showError}
          errorMessage={intl.messages['stressTesting.nameEmptyErrorMsg']}
        />

        <KubeInput
          label={intl.messages['common.annotation']}
          decription={intl.messages['stressTesting.groupCommentDescription']}
          requried={false}
          id='thread-group-comment-input'
          variant='outlined'
          value={groupComment}
          onChange={handleGroupCommentChange}
        />

        <Box>
          <Typography
            sx={{
              color: '#36435c',
              fontSize: '12px',
              lineHeight: 1.67,
              fontWeight: 400,
            }}
          >
            {intl.messages['stressTesting.onSamplerError']}
          </Typography>
          <Box
            sx={{
              padding: '6px 16px',
            }}
          >
            <StyledRadioGroup
              data={onSampleErrorData}
              value={onSampleError}
              setValue={onErr =>
                dispatch({ type: UPDATE_ON_SAMPLE_ERROR, data: onErr })
              }
            />
          </Box>
        </Box>

        <KubeInput
          label={intl.messages['common.threadNum']}
          requried={false}
          id='thread-group-comment-input'
          variant='outlined'
          value={numThreads}
          onChange={handleNumThreadsChange}
        />

        {isBoundary ? (
          <>
            <KubeInput
              label={intl.messages['stressTesting.delayedStartTime']}
              requried={true}
              id='stepping-group-initial-delay'
              variant='outlined'
              value={initialDelay}
              onChange={handleInitialDelayChange}
            />
            <KubeInput
              label={intl.messages['stressTesting.initialUsersCount']}
              requried={true}
              id='stepping-group-initial-users'
              variant='outlined'
              value={startUsersCountBurst}
              onChange={handleStartUsersCountBurstChange}
            />
            <KubeInput
              label={
                intl.messages['stressTesting.newConcurrentRequestsPerRound']
              }
              requried={true}
              id='stepping-group-new-concurrent-requests'
              variant='outlined'
              value={startUsersCount}
              onChange={handleStartUsersCountChange}
            />
            <KubeInput
              label={intl.messages['stressTesting.increasePeriod']}
              requried={true}
              id='stepping-group-step-increase-period'
              variant='outlined'
              value={startUsersPeriod}
              onChange={handleStartUsersPeriodChange}
            />
            <KubeInput
              label={intl.messages['stressTesting.rampUpPerPeriod']}
              requried={true}
              id='stepping-group-ramp-up-time'
              variant='outlined'
              value={rampUp}
              onChange={handleRampUpChange}
            />
            <KubeInput
              label={intl.messages['stressTesting.flighttime']}
              requried={true}
              id='stepping-group-flighttime'
              variant='outlined'
              value={flighttime}
              onChange={handleFlighttimeChange}
            />
            <KubeInput
              label={intl.messages['stressTesting.stopUsersCount']}
              requried={true}
              id='stepping-group-stop-users-count'
              variant='outlined'
              value={stopUsersCount}
              onChange={handleStopUsersCountChange}
            />
            <KubeInput
              label={intl.messages['stressTesting.stopUsersPeriod']}
              requried={true}
              id='stepping-group-stop-users-period'
              variant='outlined'
              value={stopUsersPeriod}
              onChange={handleStopUsersPeriodChange}
            />
            <StaticLineChart
              data={steppingLineChartData}
              period={steppingPeriod}
              count={Number(flighttime) != 0 ? Number(numThreads) : (Number(numThreads) - startUsersCount)}
              tickCount={5}
              labelY={intl.messages['stressTesting.cpuUsage']}
              labelName={intl.messages['common.usage']}
            />
          </>
        ) : (
          <>
            <KubeInput
              label={intl.messages['stressTesting.rampUpTime']}
              requried={false}
              id='thread-group-comment-input'
              variant='outlined'
              value={rampTime}
              onChange={handleRampTimeChange}
            />

            <Stack direction='row' width='100%' justifyContent='space-between'>
              <Box
                sx={{
                  width: 'calc(100% - 100px)',
                }}
              >
                <KubeInput
                  label={intl.messages['common.cycleIndex']}
                  requried={false}
                  id='thread-group-comment-input'
                  variant='outlined'
                  value={loops}
                  onChange={handleLoopsChange}
                  disabled={loopsContinueForever}
                />
              </Box>
              <Box sx={{ pt: '30px' }}>
                <StyledCheckbox
                  checked={loopsContinueForever}
                  setChecked={checked =>
                    dispatch({
                      type: UPDATE_LOOPS_CONTINUE_FOREVER,
                      data: checked,
                    })
                  }
                  msg={intl.messages['common.forever']}
                />
              </Box>
            </Stack>

            <Stack direction='column' spacing={1}>
              <StyledCheckbox
                checked={sameUserOnNextIteration}
                setChecked={checked =>
                  dispatch({
                    type: UPDATE_SAME_USER_ON_NEXT_ITERATION,
                    data: checked,
                  })
                }
                msg={intl.messages['stressTesting.sameUserDescription']}
              />
              <StyledCheckbox
                checked={delayedStart}
                setChecked={checked =>
                  dispatch({ type: UPDATE_DELAY_START, data: checked })
                }
                msg={intl.messages['stressTesting.delayStartDescription']}
              />
              <StyledCheckbox
                checked={scheduler}
                setChecked={checked =>
                  dispatch({ type: UPDATE_SCHEDULER, data: checked })
                }
                msg={intl.messages['stressTesting.schedulerDescription']}
              />
            </Stack>

            {scheduler ? (
              <>
                <KubeInput
                  label={intl.messages['stressTesting.durationS']}
                  requried={false}
                  id='thread-group-comment-input'
                  variant='outlined'
                  value={duration}
                  onChange={handleDurationChange}
                />

                <KubeInput
                  label={intl.messages['stressTesting.startDelayS']}
                  requried={false}
                  id='thread-group-comment-input'
                  variant='outlined'
                  value={delay}
                  onChange={handleDelayChange}
                />
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
}

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
  UPDATE_STOP_USERS_RATE,
} from '../../../../../actions/applicationAction';

const regExp = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9 -]{0,251}[a-zA-Z0-9]$/);

export function ThreadConfig(props) {
  const { showError, setThreadConfigError } = props;
  const intl = useIntl();

  const [groupNameError, setGroupNameError] = useState(false);
  const [groupNameErrorType, setGroupNameErrorType] = useState(0);

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
    stopUsersRate,
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
      stopUsersRate: state.Application.stopUsersRate,
      flighttime: state.Application.flighttime,
      rampUp: state.Application.rampUp,
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setThreadConfigError(groupNameError);
  }, [groupNameError]);

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

  const handleStopUsersRateChange = e => {
    dispatch({ type: UPDATE_STOP_USERS_RATE, data: e.target.value });
  };

  const handleFlighttimeChange = e => {
    dispatch({ type: UPDATE_FLIGHTTIME, data: e.target.value });
  };

  const handleRampUpChange = e => {
    dispatch({ type: UPDATE_RAMP_UP, data: e.target.value });
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
              label={intl.messages['stressTesting.initialUsersCount']}
              requried={true}
              id='stepping-group-initial-users'
              variant='outlined'
              value={startUsersCountBurst}
              onChange={handleStartUsersCountBurstChange}
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
              label={intl.messages['stressTesting.concurrentKillsPerSecond']}
              requried={true}
              id='stepping-group-concurrent-kill-per-second'
              variant='outlined'
              value={stopUsersRate}
              onChange={handleStopUsersRateChange}
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

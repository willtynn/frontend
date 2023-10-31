import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { fontFamily } from '@/utils/commonUtils';
import { KubeInput, StyledTextFiled } from '@/components/Input';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { StyledRadioGroup } from '../../../../../components/Radio';
import { StyledCheckbox } from '../../../../../components/Checkbox';

const regExp = new RegExp(/^[a-z0-9](?:[a-z0-9-]{0,251}[a-z0-9])?$/);
const onSampleErrorData = [
  ['continue', '继续'],
  ['startnextloop', '启动下一进程循环'],
  ['stopthread', '停止线程'],
  ['stoptest', '停止测试'],
  ['stoptestnow', '立即停止测试'],
];

export function ThreadConfig(props) {
  const {
    groupName,
    setGroupName,
    groupComment,
    setGroupComment,
    onSampleError,
    setOnSampleError,
    numThreads,
    setNumThreads,
    rampTime,
    setRampTime,
    loops,
    setLoops,
    loopsContinueForever,
    setLoopsContinueForever,
    sameUserOnNextIteration,
    setSameUserOnNextIteration,
    delayedStart,
    setDelayedStart,
    scheduler,
    setScheduler,
    duration,
    setDuration,
    delay,
    setDelay,
    showError,
  } = props;

  const [groupNameError, setGroupNameError] = useState(true);
  const [groupNameErrorType, setGroupNameErrorType] = useState(0);

  const intl = useIntl();

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
    setGroupName(e.target.value);
  };

  const handleGroupCommentChange = e => {
    setGroupComment(e.target.value);
  };

  const handleNumThreadsChange = e => {
    setNumThreads(e.target.value);
  };

  const handleRampTimeChange = e => {
    setRampTime(e.target.value);
  };

  const handleLoopsChange = e => {
    setLoops(e.target.value);
  };

  const handleDurationChange = e => {
    setDuration(e.target.value);
  };

  const handleDelayChange = e => {
    setDelay(e.target.value);
  };

  return (
    <Box sx={{ p: '12px' }}>
      <Stack direction='column' spacing={1.5}>
        <KubeInput
          label='名称'
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
          label='注释'
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
            在取样器错误后要执行的动作
          </Typography>
          <Box
            sx={{
              padding: '6px 16px',
            }}
          >
            <StyledRadioGroup
              data={onSampleErrorData}
              value={onSampleError}
              handleChange={setOnSampleError}
            />
          </Box>
        </Box>

        <KubeInput
          label='线程数'
          requried={false}
          id='thread-group-comment-input'
          variant='outlined'
          value={numThreads}
          onChange={handleNumThreadsChange}
        />

        <KubeInput
          label='Ramp-Up时间（秒）'
          requried={false}
          id='thread-group-comment-input'
          variant='outlined'
          value={rampTime}
          onChange={handleRampTimeChange}
        />

        <Stack
          direction='row'
          width='100%'
          justifyContent='space-between'
          alignItems='flex-end'
        >
          <Box
            sx={{
              width: 'calc(100% - 100px)',
            }}
          >
            <KubeInput
              label='循环次数'
              requried={false}
              id='thread-group-comment-input'
              variant='outlined'
              value={loops}
              onChange={handleLoopsChange}
              disabled={loopsContinueForever}
            />
          </Box>

          <StyledCheckbox
            checked={loopsContinueForever}
            setChecked={checked => setLoopsContinueForever(checked)}
            msg='永远'
          />
        </Stack>

        <Stack direction='column' spacing={1}>
          <StyledCheckbox
            checked={sameUserOnNextIteration}
            setChecked={checked => setSameUserOnNextIteration(checked)}
            msg={intl.messages['stressTesting.sameUserDescription']}
          />
          <StyledCheckbox
            checked={delayedStart}
            setChecked={checked => setDelayedStart(checked)}
            msg={intl.messages['stressTesting.delayStartDescription']}
          />
          <StyledCheckbox
            checked={scheduler}
            setChecked={checked => setScheduler(checked)}
            msg={intl.messages['stressTesting.schedulerDescription']}
          />
        </Stack>

        {scheduler ? (
          <>
            <KubeInput
              label='持续时间（秒）'
              requried={false}
              id='thread-group-comment-input'
              variant='outlined'
              value={duration}
              onChange={handleDurationChange}
            />

            <KubeInput
              label='启动延迟（秒）'
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
      </Stack>
    </Box>
  );
}

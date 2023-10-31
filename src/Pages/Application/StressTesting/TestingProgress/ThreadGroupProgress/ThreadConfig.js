import { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { fontFamily } from '@/utils/commonUtils';
import { KubeInput, StyledTextFiled } from '@/components/Input';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';

const regExp = new RegExp(/^[a-z0-9](?:[a-z0-9-]{0,251}[a-z0-9])?$/);

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
    showError
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

  const handleGroupCommentChange = (e) => {
    setGroupComment(e.target.value);
  }



  return (
    <Box sx={{p: "12px"}}>
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
      </Stack>
    </Box>
  );
}

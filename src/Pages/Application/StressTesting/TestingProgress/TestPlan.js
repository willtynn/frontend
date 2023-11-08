import { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { fontFamily } from '@/utils/commonUtils';
import { KubeInput, StyledTextField } from '@/components/Input';
import { useIntl } from 'react-intl';
import { StyledCheckbox } from '../../../../components/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import {
  UPDATE_PLAN_COMMENT,
  UPDATE_FUNCTIONAL_MODE,
  UPDATE_PLAN_NAME,
  UPDATE_SERIALIZE_THREADGROUPS,
  UPDATE_TEARDOWN_ON_SHUTDOWN,
} from '../../../../actions/applicationAction';

const regExp = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9 -]{0,251}[a-zA-Z0-9]$/);

export function TestPlan(props) {
  const { showError, setError } = props;

  const {
    planName,
    planComment,
    serializeThreadgroups,
    tearDownOnShutdown,
    functionalMode,
  } = useSelector(state => {
    return {
      planName: state.Application.planName,
      planComment: state.Application.planComment,
      serializeThreadgroups: state.Application.serializeThreadgroups,
      tearDownOnShutdown: state.Application.tearDownOnShutdown,
      functionalMode: state.Application.functionalMode,
    };
  });

  const [planNameError, setPlanNameError] = useState(false);
  const [planNameErrorType, setPlanNameErrorType] = useState(0);

  const intl = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    setError(planNameError);
  }, [planNameError])

  const handlePlanNameChange = e => {
    if (e.target.value === '') {
      setPlanNameError(true);
      setPlanNameErrorType(0);
    } else if (!regExp.test(e.target.value)) {
      setPlanNameError(true);
      setPlanNameErrorType(1);
    } else {
      setPlanNameError(false);
    }

    dispatch({type: UPDATE_PLAN_NAME, data: e.target.value});
  };

  const handlePlanCommentChange = e => {
    dispatch({type: UPDATE_PLAN_COMMENT, data: e.target.value});
  };

  return (
    <Stack sx={{ p: '32px 64px', bgcolor: '#FFFFFF', height: "calc(100% - 244px)" }} direction='column' justifyContent='space-between' >
      <Stack
        
        direction='column'
        spacing={2}
      >
        <KubeInput
          label='名称'
          decription={intl.messages['stressTesting.planNameDescription']}
          requried={true}
          id='test-plan-name-input'
          variant='outlined'
          value={planName}
          onChange={handlePlanNameChange}
          error={planNameError && showError}
          errorMessage={intl.messages['stressTesting.nameEmptyErrorMsg']}
        />

        <KubeInput
          label='注释'
          decription={intl.messages['stressTesting.planCommentDescription']}
          requried={false}
          id='test-plan-comment-input'
          variant='outlined'
          value={planComment}
          onChange={handlePlanCommentChange}
        />
      </Stack>

      <Stack direction='column' spacing={1}>
        <StyledCheckbox checked={serializeThreadgroups} setChecked={(checked) => dispatch({type: UPDATE_SERIALIZE_THREADGROUPS, data: checked})} msg={intl.messages["stressTesting.serializeThreadgroupsDescription"]} />
        <StyledCheckbox checked={tearDownOnShutdown} setChecked={(checked) => dispatch({type: UPDATE_TEARDOWN_ON_SHUTDOWN, data: checked})} msg={intl.messages["stressTesting.tearDownOnShutdownDescription"]} />
        <StyledCheckbox checked={functionalMode} setChecked={(checked) => dispatch({type: UPDATE_FUNCTIONAL_MODE, data: checked})} msg={intl.messages["stressTesting.functionalModeDescription"]} />
      </Stack>
    </Stack>
  );
}

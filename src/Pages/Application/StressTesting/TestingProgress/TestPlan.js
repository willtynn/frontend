/**
 * src\Pages\Application\StressTesting\TestingProgress\TestPlan.js
 */

import { useState, useEffect } from 'react';
import { Box, Stack, Tooltip, TextField } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { fontFamily } from '@/utils/commonUtils';
import { KubeInput, KubeAutocomplete } from '@/components/Input';
import { useIntl } from 'react-intl';
import { StyledCheckbox } from '@/components/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import {
  UPDATE_PLAN_COMMENT,
  UPDATE_FUNCTIONAL_MODE,
  UPDATE_PLAN_NAME,
  UPDATE_SERIALIZE_THREADGROUPS,
  UPDATE_TEARDOWN_ON_SHUTDOWN,
  UPDATE_PLAN_NAMESPACE,
  UPDATE_PLAN_PODNAME,
  UPDATE_IS_BOUNDARY
} from '../../../../actions/applicationAction';
import { getNamaspaces, getInstanceStatus } from '@/actions/instanceAction';

const regExp = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9 -]{0,251}[a-zA-Z0-9]$/);

export function TestPlan(props) {
  const { showError, setError } = props;

  const {
    planName,
    planComment,
    serializeThreadgroups,
    tearDownOnShutdown,
    functionalMode,
    namespaces,
    namespace,
    podName,
    isBoundary,
    gottenInstances
  } = useSelector(state => {
    return {
      planName: state.Application.planName,
      planComment: state.Application.planComment,
      serializeThreadgroups: state.Application.serializeThreadgroups,
      tearDownOnShutdown: state.Application.tearDownOnShutdown,
      functionalMode: state.Application.functionalMode,
      namespaces: state.Instance.namespaces,
      namespace: state.Application.namespace,
      podName: state.Application.podName,
      isBoundary: state.Application.isBoundary,
      gottenInstances: state.Instance.gottenInstances,
    };
  });

  const [planNameError, setPlanNameError] = useState(false);
  const [planNameErrorType, setPlanNameErrorType] = useState(0);

  const intl = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('current_cluster')) {
      dispatch(getNamaspaces(localStorage.getItem('current_cluster')));
    }
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem('current_cluster') &&
      namespace &&
      namespace !== ''
    ) {
      dispatch(
        getInstanceStatus(
          localStorage.getItem('current_cluster'),
          namespace
        )
      );
    }
  }, [namespace]);

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

    dispatch({ type: UPDATE_PLAN_NAME, data: e.target.value });
  };

  const handlePlanCommentChange = e => {
    dispatch({ type: UPDATE_PLAN_COMMENT, data: e.target.value });
  };

  return (
    <Stack sx={{ p: '32px 64px', bgcolor: '#FFFFFF', height: "calc(100% - 244px)" }} direction='column' justifyContent='space-between' >
      <Stack

        direction='column'
        spacing={2}
      >
        <KubeInput
          label={intl.messages['common.name']}
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
          label={intl.messages['common.annotation']}
          decription={intl.messages['stressTesting.planCommentDescription']}
          requried={false}
          id='test-plan-comment-input'
          variant='outlined'
          value={planComment}
          onChange={handlePlanCommentChange}
        />

        <KubeAutocomplete
          height='32px'
          padding='6px 5px 5px 12px'
          value={namespace}
          onChange={(event, newValue) => {
            dispatch({ type: UPDATE_PLAN_NAMESPACE, data: newValue });
          }}
          id='plan_namespace_autocomplete'
          noOptionsText={intl.messages['stressTesting.noOptionalNamespace']}
          options={namespaces}
          sx={{
            width: '100%',
            color: '#36435c',
            fontFamily: fontFamily,
            fontSize: '12px',
            fontWeight: 600,
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 1.67,
            letterSpacing: 'normal',
          }}
          renderInput={params => (
            <TextField {...params} placeholder={intl.messages['common.namespace']} />
          )}
        />


        <KubeAutocomplete
          height='32px'
          padding='6px 5px 5px 12px'
          value={podName}
          onChange={(event, newValue) => {
            dispatch({ type: UPDATE_PLAN_PODNAME, data: newValue });
          }}
          id='plan_podName_autocomplete'
          noOptionsText={intl.messages['stressTesting.noOptionalPod']}
          options={(gottenInstances && gottenInstances.items)? gottenInstances.items.map((value, index) => { return value.metadata.name }) : []}
          filterOptions={(options, params) => {
            const { inputValue } = params;
            return options.filter((option, index) => {
              return (
                option.includes(inputValue)
              );
            });
          }}
          sx={{
            width: '100%',
            color: '#36435c',
            fontFamily: fontFamily,
            fontSize: '12px',
            fontWeight: 600,
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 1.67,
            letterSpacing: 'normal',
          }}
          renderInput={params => (
            <TextField {...params} placeholder='Pod' />
          )}
        />

      </Stack>

      <Stack direction='column' spacing={1}>
        <StyledCheckbox checked={isBoundary} setChecked={(checked) => dispatch({ type: UPDATE_IS_BOUNDARY, data: checked })} msg={intl.messages["stressTesting.performBoundaryTest"]} />
        <StyledCheckbox checked={serializeThreadgroups} setChecked={(checked) => dispatch({ type: UPDATE_SERIALIZE_THREADGROUPS, data: checked })} msg={intl.messages["stressTesting.serializeThreadgroupsDescription"]} />
        <StyledCheckbox checked={tearDownOnShutdown} setChecked={(checked) => dispatch({ type: UPDATE_TEARDOWN_ON_SHUTDOWN, data: checked })} msg={intl.messages["stressTesting.tearDownOnShutdownDescription"]} />
        <StyledCheckbox checked={functionalMode} setChecked={(checked) => dispatch({ type: UPDATE_FUNCTIONAL_MODE, data: checked })} msg={intl.messages["stressTesting.functionalModeDescription"]} />
      </Stack>
    </Stack>
  );
}

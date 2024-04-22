import { useState, useEffect } from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { fontFamily } from '@/utils/commonUtils';
import { KubeInput, KubeAutocomplete } from '@/components/Input';
import { useIntl } from 'react-intl';
import { StyledCheckbox } from '@/components/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { getNamaspaces, getInstanceStatus } from '@/actions/instanceAction';
import {
  UPDATE_PLAN_NAMESPACE
} from '@/actions/applicationAction';

const regExp = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9 -]{0,251}[a-zA-Z0-9]$/);

export default function InferPlan(props) {
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

    // dispatch({ type: UPDATE_PLAN_NAME, data: e.target.value });
  };

  const handlePlanCommentChange = e => {
    // dispatch({ type: UPDATE_PLAN_COMMENT, data: e.target.value });
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
        <Stack direction='column' spacing={0.5} sx={{ width: "100%" }}>
          <Stack direction='row' spacing={1}>
            <Typography
              sx={{
                color: '#36435c',
                fontSize: '12px',
                lineHeight: 1.67,
                fontWeight: 400,
              }}
            >
              命名空间
            </Typography>
            <Typography
              sx={{
                color: '#ca2621',
                fontSize: '12px',
                lineHeight: 1.67,
                fontWeight: 400,
              }}
            >
              *
            </Typography>
          </Stack>
          <KubeAutocomplete
            height='32px'
            padding='6px 5px 5px 12px'
            label={intl.messages['common.name']}
            value={namespace}
            requried={true}
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

        </Stack>

      </Stack>
    </Stack>
  );
}

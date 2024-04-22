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

export default function AlgorithmSet(props) {
  const { showError, setError } = props;

  const [algorithms, setAlgorithms] = useState(['ga', 'pso', 'drl'])
  const [algorithm, setAlgorithm] = useState(null)

  const [goals, setGoals] = useState(['速度优先', '能耗优先'])
  const [goal, setGoal] = useState(null)


  const [planNameError, setPlanNameError] = useState(false);
  const [planNameErrorType, setPlanNameErrorType] = useState(0);

  const intl = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('current_cluster')) {
      dispatch(getNamaspaces(localStorage.getItem('current_cluster')));
    }
  }, []);

//   useEffect(() => {
//     if (
//       localStorage.getItem('current_cluster') &&
//       namespace &&
//       namespace !== ''
//     ) {
//       dispatch(
//         getInstanceStatus(
//           localStorage.getItem('current_cluster'),
//           namespace
//         )
//       );
//     }
//   }, [namespace]);

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
              选择算法
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
            value={algorithm}
            requried={true}
            onChange={(event, newValue) => {
                setAlgorithm(newValue);
            }}
            id='plan_namespace_autocomplete'
            noOptionsText={'协同算法'}
            options={algorithms}
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
              <TextField {...params} placeholder={'协同算法'} />
            )}
          />

        </Stack>
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
              选择目标
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
            value={goal}
            requried={true}
            onChange={(event, newValue) => {
              setGoal(newValue);
            }}
            id='plan_namespace_autocomplete'
            options={goals}
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
              <TextField {...params} placeholder={'优化目标'} />
            )}
          />

        </Stack>
      </Stack>
    </Stack>
  );
}

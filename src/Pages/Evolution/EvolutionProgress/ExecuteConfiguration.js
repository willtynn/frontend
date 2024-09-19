/**
 * src\Pages\Evolution\EvolutionProgress\ExecuteConfiguration.js
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
  EVO_UPDATE_EXE_MTD,
  EVO_UPDATE_REMARKS,
} from '../../../actions/evolutionAction';
import _ from 'lodash';

const regExp = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9 -]{0,251}[a-zA-Z0-9]$/);

export function ExecuteConfiguration(props) {
  const { showError, setError } = props;

  const {
    planName,
    planComment,
    exe_mtd_list,
    exe_mtd,
    evo_remarks,
  } = useSelector(state => {
    return {
      planName: state.Evolution.planName,
      planComment: state.Evolution.planComment,
      exe_mtd: state.Evolution.exe_mtd,
      exe_mtd_list: state.Evolution.exe_mtd_list,
      evo_remarks: state.Evolution.evo_remarks,
    };
  });

  const [planNameError, setPlanNameError] = useState(false);
  const [planNameErrorType, setPlanNameErrorType] = useState(0);

  const intl = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    setError(planNameError);
  }, [planNameError])

  const handleRemarksChange = e =>{
    dispatch({type:EVO_UPDATE_REMARKS,data:e.target.value})
  }
  return (
    <Stack sx={{ p: '32px 64px', bgcolor: '#FFFFFF', height: "calc(100% - 244px)" }} direction='column' justifyContent='space-between' >
      {/* <Stack

        direction='column'
        spacing={2}
      >

        <KubeInput
          label={intl.messages['evolution.executeConfiguration']}
          decription={intl.messages['evolution.executeConfigurationDescription']}
          requried={false}
          id='test-plan-comment-input'
          variant='outlined'
          value={planComment}
        />

      </Stack> */}
      <Stack>
        <KubeAutocomplete
              height='32px'
              padding='6px 5px 5px 12px'
              value={exe_mtd}
              onChange={(event, newValue) => {
                dispatch({ type: EVO_UPDATE_EXE_MTD, data:newValue });
                console.log(newValue)
              }}
              id='plan_exe_mtd_autocomplete'
              noOptionsText={intl.messages['stressTesting.noOptionalPod']}
              options={
                _.map(exe_mtd_list,"execute_name")
              }
              filterOptions={(options, params) => {
                const { inputValue } = params;
                return options.filter((option, index) => {
                  return option.includes(inputValue);
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
              renderInput={params => <TextField {...params} />}
            />
            <Box
                sx={{
                  fontSize: '12px',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontStretch: 'normal',
                  lineHeight: 1.67,
                  letterSpacing: 'normal',
                  color: '#79879c',
                }}
              >
                {intl.messages['evolution.executeConfigurationDescription']}
              </Box>
              <Box direction='column' spacing={1}>
          <br></br>
          <KubeInput
            label={intl.messages['evolution.evolutionPlanRemarks']}
            decription={intl.messages['evolution.EvolutionPlan']}
            requried={true}
            id='test-evo_name-input'
            variant='outlined'
            value={evo_remarks}
            onChange={handleRemarksChange}
          />
        </Box>
        <Box
              sx={{
                fontSize: '12px',
                fontWeight: 400,
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: 1.67,
                letterSpacing: 'normal',
                color: '#79879c',
              }}
            >
              {intl.messages['evolution.setEvolutionPlanRemarks']}
            </Box>
      </Stack>
    </Stack>
  );
}

/**
 * src\Pages\Evolution\EvolutionProgress\MonitorConfiguration.js
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
  EVO_UPDATE_TRIGGER,
  EVO_UPDATE_DATARESOURCE,
  EVO_UPDATE_NAME,
  evo_get_algorithm,
  evo_get_algorithm_data_mapping,
 } from '../../../actions/evolutionAction';
import { KubeTextField } from '../../../components/Input';
import _, { functionsIn } from 'lodash';
import { DisabledByDefault } from '@mui/icons-material';

const regExp = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9 -]{0,251}[a-zA-Z0-9]$/);

export function MonitorConfiguration(props) {
  const { showError, setError } = props;

  const {
    dataResource,
    moniterInterval,
    evo_name,
    trigger,
    trigger_list,
    data_resource_list,
    data_resource,
  } = useSelector(state => {
    return {
      dataResource: state.Evolution.dataResource,
      moniterInterval: state.Evolution.moniterInterval,
      evo_name: state.Evolution.evo_name,
      data_source_list: state.Evolution.data_source_list,
      trigger_list: state.Evolution.trigger_list,
      trigger: state.Evolution.trigger,
      data_resource_list: state.Evolution.data_resource_list,
      data_resource: state.Evolution.data_resource,
    };
  });

  const [DataSourceError, setDataSourceError] = useState(false);

  const intl = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(evo_get_algorithm_data_mapping());
  },[])

  useEffect(() => {
    setError(DataSourceError);
  }, [DataSourceError])

  const handlePlanNameChange = e =>{
    dispatch({type:EVO_UPDATE_NAME,data:e.target.value});
  }
  return (
    <Stack sx={{ p: '32px 64px', bgcolor: '#FFFFFF', height: "calc(100% - 244px)" }} direction='column' justifyContent='space-between' >
      {/* <Stack

        direction='column'
        spacing={2}
      >
        <KubeInput
          label={intl.messages['evolution.monitorResource']}
          decription={intl.messages['evolution.monitorResourceDescription']}
          requried={true}
          id='test-plan-name-input'
          variant='outlined'
          value={dataResource}
          error={DataSourceError && showError}
          errorMessage={intl.messages['evolution.monitorResourceErrMsg']}
        />

        <KubeInput
          label={intl.messages['evolution.moniterInterval']}
          decription={intl.messages['evolution.monitorExecutiveInterval']}
          requried={false}
          id='test-plan-comment-input'
          variant='outlined'
          value={moniterInterval}
        />

      </Stack> */}
      <Stack>
        <Box direction='column' spacing={1}>
          <KubeInput
            label={intl.messages['evolution.evolutionPlanName']}
            decription={intl.messages['evolution.EvolutionPlan']}
            requried={true}
            id='test-evo_name-input'
            variant='outlined'
            value={evo_name}
            onChange={handlePlanNameChange}
            validation={{
              required: "First Name is required!"
            }}
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
              {intl.messages['evolution.setEvolutionPlanName']}
            </Box>
            <br></br>
        <KubeAutocomplete
            label={"数据源"}
            height='32px'
            padding='6px 5px 5px 12px'
            value={data_resource}
            onChange={(event, newValue) => {
              dispatch({ type: EVO_UPDATE_DATARESOURCE, data:newValue });
              console.log(newValue)
            }}
            id='plan_dataResource_autocomplete'
            noOptionsText={intl.messages['stressTesting.noOptionalPod']}
            options={
              _.map(data_resource_list,'name')
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
              {intl.messages['evolution.monitorResourceErrMsg']}
          </Box>
          <br></br>
        <KubeAutocomplete
            height='32px'
            padding='6px 5px 5px 12px'
            value={trigger}
            onChange={(event, newValue) => {
              dispatch({ type: EVO_UPDATE_TRIGGER, data:newValue });
            }}
            id='plan_trigger_autocomplete'
            noOptionsText={intl.messages['stressTesting.noOptionalPod']}
            options={
              trigger_list
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
              {intl.messages['evolution.monitorExecutiveInterval']}
            </Box>
      </Stack>
    </Stack>

  );
}

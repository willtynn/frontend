/**
 * src\Pages\Evolution\EvolutionProgress\AnalyseConfiguration.js
 */

import { useState, useEffect,useLayoutEffect} from 'react';
import { Box, Stack, Tooltip, TextField } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { fontFamily } from '@/utils/commonUtils';
import { KubeInput, KubeAutocomplete } from '@/components/Input';
import { useIntl } from 'react-intl';
import { StyledCheckbox } from '@/components/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import _, { constant } from 'lodash';
import { EVO_UPDATE_ANA_ALG, evo_get_algorithm } from '../../../actions/evolutionAction';

const regExp = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9 -]{0,251}[a-zA-Z0-9]$/);

export function AnalyseConfiguration(props) {
  const { showError, setError } = props;

  const {
    planName,
    planComment,
    ana_alg_list,
    ana_alg,
    ana_data_mapping,
    data_resource,
  } = useSelector(state => {
    return {
      planName: state.Evolution.planName,
      planComment: state.Evolution.planComment,
      ana_alg_list: state.Evolution.ana_alg_list,
      ana_alg: state.Evolution.ana_alg,
      ana_data_mapping: state.Evolution.ana_data_mapping,
      data_resource: state.Evolution.data_resource,
    };
  });

  const [planNameError, setPlanNameError] = useState(false);
  const [planNameErrorType, setPlanNameErrorType] = useState(0);

  const intl = useIntl();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setError(planNameError);
    dispatch(evo_get_algorithm());
  }, [planNameError])

  //符合匹配表的分析算法列表
  console.log(ana_data_mapping)
  const ana_data_list = _.filter(ana_alg_list,function(obj){
    console.log(data_resource)
    if(_.find(ana_data_mapping,{'analyze_name':obj.analyze_name,'data_resource':data_resource}) !== undefined){
      return obj;
    }
  })

  return (
    <Stack sx={{ p: '32px 64px', bgcolor: '#FFFFFF', height: "calc(100% - 244px)" }} direction='column' justifyContent='space-between' >
      <Stack>
        {/* 输入框 */}
        <KubeAutocomplete
          height='32px'
          padding='6px 5px 5px 12px'
          value={ana_alg}
          onChange={(event, newValue) => {
            dispatch({ type: EVO_UPDATE_ANA_ALG, data: newValue });
            console.log(newValue)
          }}
          id='plan_ana_alg_autocomplete'
          noOptionsText={intl.messages['stressTesting.noOptionalPod']}
          options={
            // 如果能够在匹配表里面找到那么就展示出来
            _.map(ana_data_list, "analyze_name")
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
        {/* 提示信息 */}
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
          {intl.messages['evolution.analyseConfigurationDescription']}
        </Box>
      </Stack>
    </Stack>
  );
}

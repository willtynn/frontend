/**
 * src\Pages\Evolution\EvolutionProgress\PlanConfiguration.js
 */

import { useState, useEffect } from 'react';
import { Box, Stack, Tooltip, TextField } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { fontFamily } from '@/utils/commonUtils';
import { KubeInput, KubeAutocomplete } from '@/components/Input';
import { useIntl } from 'react-intl';
import { StyledCheckbox } from '@/components/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import _ from "lodash";
import { EVO_UPDATE_EXE_ALG, EVO_UPDATE_EVO_EXE_ARGS } from '../../../actions/evolutionAction';
import { isJsonString } from '../../../utils/commonUtils';
import { Typography } from '@mui/material';

const regExp = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9 -]{0,251}[a-zA-Z0-9]$/);

export function PlanConfiguration(props) {
  const { showError, setError } = props;

  const {
    planName,
    planComment,
    exe_alg,
    exe_alg_list,
    data_resource,
    exe_data_mapping,
    evo_exe_args,
  } = useSelector(state => {
    return {
      planName: state.Evolution.planName,
      planComment: state.Evolution.planComment,
      exe_alg: state.Evolution.exe_alg,
      exe_alg_list: state.Evolution.exe_alg_list,
      data_resource: state.Evolution.data_resource,
      exe_data_mapping: state.Evolution.exe_data_mapping,
      evo_exe_args: state.Evolution.evo_exe_args,
    };
  });

  const [planNameError, setPlanNameError] = useState(false);
  const [planNameErrorType, setPlanNameErrorType] = useState(0);

  const intl = useIntl();
  const dispatch = useDispatch();
  
  useEffect(() => {
    setError(planNameError);
  }, [planNameError])

  //符合匹配表的执行算法列表
  const exe_data_list = _.filter(exe_alg_list, function (obj) {
    if (_.find(exe_data_mapping, { 'plan_name': obj.plan_name, 'data_resource': data_resource }) !== undefined) {
      return obj;
    }
  })

  //下面为对执行算法的高级配置

  //表示JSON字符串验证结果
  const [jsonRight, setJsonRight] = useState(false);
  const handleExeArgs = e => {
    dispatch({ type: EVO_UPDATE_EVO_EXE_ARGS, data: e.target.value });
    //如果不符合JSON格式那么就会提示报错
    if (!isJsonString(evo_exe_args)) {
      setJsonRight(true);
  }else{
    setJsonRight(false);
  }
  }

  return (
    <Stack sx={{ p: '32px 64px', bgcolor: '#FFFFFF', height: "calc(100% - 244px)" }} direction='column' justifyContent='space-between' >
      <Stack>
        <KubeAutocomplete
          height='32px'
          padding='6px 5px 5px 12px'
          value={exe_alg}
          onChange={(event, newValue) => {
            dispatch({ type: EVO_UPDATE_EXE_ALG, data: newValue });
            console.log(newValue)
          }}
          id='plan_ana_alg_autocomplete'
          noOptionsText={intl.messages['stressTesting.noOptionalPod']}
          options={
            _.map(exe_data_list, "plan_name")
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
          {intl.messages['evolution.planConfigurationDescription']}
        </Box>
        <br></br>
        <KubeInput
          label={"执行算法参数"}
          decription={"此处配置执行算法相关的详细参数，请遵照执行算法的详情进行配置，否则可能导致演化计划不可用"}
          requried={false}
          id='test-evo_name-input'
          variant='outlined'
          value={evo_exe_args}
          onChange={handleExeArgs}
          validation={{
            required: "First Name is required!"
          }}
        />
         {/* 是否通过JSON格式验证  */}
         {jsonRight && <Typography
          sx={{
            color: '#DC143C',
            fontSize: '12px',
            lineHeight: 1.67,
            fontWeight: 400,
          }}
        >
          {"您输入的参数格式不正确"}
        </Typography>}
      </Stack>
    </Stack>
  );
}

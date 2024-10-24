/**
 * src\Pages\Evolution\EvolutionProgress\MonitorConfiguration.js
 */

import { useState, useEffect, useLayoutEffect } from 'react';
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
  EVO_UPDATE_EVO_DATA_ARGS,
} from '../../../actions/evolutionAction';
import { KubeTextField } from '../../../components/Input';
import _, { functionsIn } from 'lodash';
import { ConstructionOutlined, DisabledByDefault } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  KubeCancelButton,
  KubeConfirmButton,
} from '@/components/Button';
//日期选择器
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { KubeDatePicker } from '../../../components/DatePicker';
import { Typography } from '@mui/material';
import axios from 'axios';

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
    evo_data_args,
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
      evo_data_args: state.Evolution.evo_data_args,
    };
  });

  //首先把参数给分开
  const args = evo_data_args.split("},");
  const [DataSourceError, setDataSourceError] = useState(false);

  const intl = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(evo_get_algorithm_data_mapping());
  }, [])

  useEffect(() => {
    setError(DataSourceError);
  }, [DataSourceError])


  const handlePlanNameChange = e => {
    dispatch({ type: EVO_UPDATE_NAME, data: e.target.value });
  }

  //TODO 下面是跟高级配置相关的内容
  const [isVisibleOfHigh, setIsVisibleOfHigh] = useState(false);
  //开始时间变量和结束时间变量
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  //数据源相关参数
  const [dataResourceArgs, setDataSourceArgs] = useState('');
  const handleDataSourceArgs = e => {
    setDataSourceArgs(e.target.value);
  }

  //打开或关闭高级设置界面
  const handleHighConfig = () => {
    setIsVisibleOfHigh(!isVisibleOfHigh);
  };

  const handleSaveHighConfig = () => {
    //把高级配置的参数给交过去
    for (var i = 0; i < args.length; i++) {
      if (args[i].startsWith("\"timeArgs\"")) {
        args[i] = "\"timeArgs\":{\"startTime\":"+startTime+",\"endTime\":"+endTime+"}}";
      }
      if (args[i].startsWith("\"dataArgs\"") || args[i].startsWith("{\"dataArgs\"")) {
        args[i] = "{\"dataArgs\":{"+dataResourceArgs+"}"
      }
    }

    dispatch({ type: EVO_UPDATE_EVO_DATA_ARGS, data: args.join(",") });
  };




  return (
    <Stack sx={{ p: '32px 64px', bgcolor: '#FFFFFF', height: "calc(100% - 244px)" }} direction='column' justifyContent='space-between' >
      <Stack style={{ overflow: 'scroll' }}>
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
            dispatch({ type: EVO_UPDATE_DATARESOURCE, data: newValue });
            console.log(newValue)
          }}
          id='plan_dataResource_autocomplete'
          noOptionsText={intl.messages['stressTesting.noOptionalPod']}
          options={
            _.map(data_resource_list, 'name')
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
            dispatch({ type: EVO_UPDATE_TRIGGER, data: newValue });
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

        <KubeCancelButton
          onClick={handleHighConfig}
          sx={{ height: '32px', minWidth: '96px', width: '100%' }}
        >
          <Stack direction='row' alignItems='center' justifyContent='center'>
            <Box sx={{ ml: '4px' }}>{intl.messages['common.moreOperation']}</Box>
            <ArrowDropDownIcon fontSize='small' />
          </Stack>
        </KubeCancelButton>


        {isVisibleOfHigh &&
          <Box>
            <KubeInput
              label={"数据源参数"}
              decription={"此处配置数据源相关的详细参数，请遵照数据源的详情进行配置，否则可能导致演化计划不可用"}
              requried={false}
              id='test-evo_name-input'
              variant='outlined'
              value={dataResourceArgs}
              onChange={handleDataSourceArgs}
              validation={{
                required: "First Name is required!"
              }}
            />
            <br></br>
            {/* 开始时间和结束时间 */}

            <Typography
              sx={{
                color: '#36435c',
                fontSize: '12px',
                lineHeight: 1.67,
                fontWeight: 400,
              }}
            >
              {"计划可执行时间段（不在该段时间内将不可执行）"}
            </Typography>
            <KubeDatePicker value={startTime} setValue={setStartTime} />
            <KubeDatePicker value={endTime} setValue={setEndTime} />

            <KubeCancelButton
              onClick={handleSaveHighConfig}
              sx={{ height: '32px', minWidth: '96px', width: '10%' }}
            >
              <Stack direction='row' alignItems='center' justifyContent='center'>
                <Box sx={{ ml: '4px' }}>{"确认高级配置"}</Box>
              </Stack>
            </KubeCancelButton>
          </Box>}

      </Stack>
    </Stack>

  );
}

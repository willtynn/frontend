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
import _, { functionsIn, set } from 'lodash';
import { ConstructionOutlined, CookieSharp, DisabledByDefault, Rowing } from '@mui/icons-material';
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
import { setSnackbarMessageAndOpen } from '../../../actions/snackbarAction';
import { SEVERITIES } from '../../../components/CommonSnackbar';
import { saveAs } from 'file-saver';
import { isJsonString } from '../../../utils/commonUtils';
import dayjs from 'dayjs'
import { parse } from 'json5';

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
  const regExpArgs = evo_data_args.match("{\"dataArgs\":{(.*)},\"timeArgs\":{(.*)}}")
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

  const initArgs = [
    {
      key: "1",
      value: "1",
    }
  ]
  //数据源参数的数组
  const [testArgs, SetTestArgs] = useState([
    {
      index: 0,
      key: "2",
      value: "3",
    }
  ]);

  const handleInitArgsKey = (e, index) => {
    console.log(e.target.value);
    console.log(index)
    console.log(1);
    const newArgs = [...testArgs];
    if (newArgs[index].key != e.target.value) {
      newArgs[index].key = e.target.value;
      console.log(newArgs);
      SetTestArgs(newArgs)
    } else {
      return;
    }

  }

  const handleInitArgsValue = (e, index) => {
    console.log(e.target.value);
    console.log(index)
    console.log(1);
    const newArgs = [...testArgs];
    if (newArgs[index].value != e.target.value) {
      newArgs[index].value = e.target.value;
      console.log(newArgs);
      SetTestArgs(newArgs)
    } else {
      return;
    }

  }

  //该函数用于解析参数字符串然后转化到前端页面上
  const parseArgs = () => {
    console.log(regExpArgs)
    if (regExpArgs[1] == "" || regExpArgs[1] == null) {

    } else {
      const dataArgs = regExpArgs[1].split(",")
      console.log(dataArgs)
      const newArgs = [];
      for (var i = 0; i < dataArgs.length; i++) {
        const kvargs = dataArgs[i].split(":");
        console.log(kvargs);
        newArgs[i] = { key: kvargs[0], value: kvargs[1] };
      }
      console.log("newArgs")
      console.log(newArgs)
      SetTestArgs(newArgs)
    }
    const timeArgs = regExpArgs[2];
    if (timeArgs == "") {
      return;
    }
    const time = timeArgs.split(",");
    const start = time[0].split(":")[1];
    const end = time[1].split(":")[1];
    console.log("start and end");
    console.log(start);
    console.log(end);
    if (start != "null" && start != "") {
      console.log(dayjs(1730219400000));
      setStartTime(dayjs(Number(start)));
    }
    if (end != "null" && end != "") {
      setEndTime(dayjs(Number(end)));
    }
    for (var i = 0; i < args.length; i++) {
      if (args[i].startsWith("\"timeArgs\"")) {
        const timeArgs = args[i].split(":");
        const startTime = timeArgs[1].split(",")
      }
    }
  }

  const handleAddArgs = () => {
    const newArgs = [...testArgs];
    newArgs.push({
      index: newArgs.length,
      key: "",
      value: "",
    });
    SetTestArgs(newArgs);
    return;
  };

  //高级设置是否展示
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
    parseArgs();
    setIsVisibleOfHigh(!isVisibleOfHigh);

  };

  const handleSaveHighConfig = () => {
    if (startTime != null || endTime != null) {
      console.log(startTime);
      console.log(endTime)
      var timeNow = Date.now(); //获取当前时间戳，单位：毫秒
      console.log(new Date());
      if (endTime != null && endTime <= timeNow) {
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            { msg: "结束时间不能早于现在" },
            SEVERITIES.warning
          )
        );
        return;
      }

      if (startTime != null && endTime != null && endTime < startTime) {
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            { msg: "结束时间不能早于开始时间" },
            SEVERITIES.warning
          )
        );
        return;
      }
    }
    //首先将TestArgs中的参数全部交给dataResourceArgs
    var tempDataArgs = ""
    for (var i = 0; i < testArgs.length; i++) {
      if (i == testArgs.length - 1) {
        tempDataArgs += testArgs[i].key + ":" + testArgs[i].value;
      } else {
        tempDataArgs += testArgs[i].key + ":" + testArgs[i].value + ",";
      }
    }

    setDataSourceArgs(tempDataArgs);
    //把高级配置的参数给交过去
    for (var i = 0; i < args.length; i++) {
      if (args[i].startsWith("\"timeArgs\"")) {
        args[i] = "\"timeArgs\":{\"startTime\":" + startTime + ",\"endTime\":" + endTime + "}}";
      }
      if (args[i].startsWith("\"dataArgs\"") || args[i].startsWith("{\"dataArgs\"")) {
        args[i] = "{\"dataArgs\":{" + tempDataArgs + "}"
      }
    }

    //当数据源参数不为空的时候就需要进行Json格式判断
    if (tempDataArgs != null || tempDataArgs != "") {
      console.log(args.join(","));
      if (!isJsonString(args.join(","))) {
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            { msg: "您的数据源格式错误,请使用指定格式填写" },
            SEVERITIES.warning
          )
        );
        return;
      }

    }

    console.log(args.join(","));
    //提交到Redux
    dispatch({ type: EVO_UPDATE_EVO_DATA_ARGS, data: args.join(",") });
    //提示用户成功
    dispatch(
      setSnackbarMessageAndOpen(
        'common.confirm',
        { msg: "高级配置保存成功" },
        SEVERITIES.success
      )
    );
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
            <Typography
              sx={{
                color: '#36435c',
                fontSize: '12px',
                lineHeight: 1.67,
                fontWeight: 400,
              }}
            >
              {"数据源参数"}<br></br>
              {"请在左侧输入Key,右侧输入Value,例如 \"name\",\"node1\""}
            </Typography>
            {

              testArgs.map((row, index) => {
                return (
                  <Box key={index}>
                    <TextField
                      id="standard-basic"
                      sx={{
                        legend: {
                          display: 'none',
                        },
                        width: '15%',
                        '& .MuiOutlinedInput-root.MuiInputBase-root': {
                          background: '#FFFFFF',

                          '& .MuiOutlinedInput-input.MuiInputBase-input': {
                            '&:hover': {
                              border: '1px solid #000',
                            },
                            '&:focus': {
                              border: '1px solid #55bc8a',
                              boxShadow: '0 4px 8px 0 rgba(85,188,138,.2)',
                            },
                            border: '1px solid rgba(0, 0, 0, 0.23)',
                            borderRadius: '4px',
                            padding: '6px 12px !important',
                            fontSize: '12px',
                            fontWeight: 600,
                            fontStyle: 'normal',
                            fontStretch: 'normal',
                            lineHeight: 1.67,
                            letterSpacing: 'normal',
                            color: '#36435c',
                          },
                          '& .Mui-disabled': {
                            '&:hover': {
                              border: '1px solid rgba(0, 0, 0, 0.23) !important',
                            },
                          },
                          '& fieldset': {
                            border: 'none',
                          },
                        },
                        '& .Mui-error': {
                          '& .MuiOutlinedInput-input.MuiInputBase-input': {
                            border: '1px solid #CA2621 !important',
                            '&:focus': {
                              boxShadow: 'none !important',
                            },
                          },
                        },
                      }}
                      value={row.key}
                      onChange={(e) => handleInitArgsKey(e, index)}
                    />

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <TextField
                      id="standard-basic"
                      sx={{
                        legend: {
                          display: 'none',
                        },
                        width: '50%',
                        '& .MuiOutlinedInput-root.MuiInputBase-root': {
                          background: '#FFFFFF',

                          '& .MuiOutlinedInput-input.MuiInputBase-input': {
                            '&:hover': {
                              border: '1px solid #000',
                            },
                            '&:focus': {
                              border: '1px solid #55bc8a',
                              boxShadow: '0 4px 8px 0 rgba(85,188,138,.2)',
                            },
                            border: '1px solid rgba(0, 0, 0, 0.23)',
                            borderRadius: '4px',
                            padding: '6px 12px !important',
                            fontSize: '12px',
                            fontWeight: 600,
                            fontStyle: 'normal',
                            fontStretch: 'normal',
                            lineHeight: 1.67,
                            letterSpacing: 'normal',
                            color: '#36435c',
                          },
                          '& .Mui-disabled': {
                            '&:hover': {
                              border: '1px solid rgba(0, 0, 0, 0.23) !important',
                            },
                          },
                          '& fieldset': {
                            border: 'none',
                          },
                        },
                        '& .Mui-error': {
                          '& .MuiOutlinedInput-input.MuiInputBase-input': {
                            border: '1px solid #CA2621 !important',
                            '&:focus': {
                              boxShadow: 'none !important',
                            },
                          },
                        },
                      }}
                      value={row.value}
                      onChange={(e) => handleInitArgsValue(e, index)}
                    />
                    <br></br>
                    <br></br>
                  </Box>
                )
              })
              // 
            }
            <Typography
              sx={{
                color: '#36435c',
                fontSize: '12px',
                lineHeight: 1.67,
                fontWeight: 400,
              }}
            >
              {"此处配置数据源相关的详细参数，请遵照数据源的详情进行配置，否则可能导致演化计划不可用"}
            </Typography>
            < KubeCancelButton
              onClick={handleAddArgs}
              sx={{ margin: '0', height: '32px', minWidth: '96px', width: '25%' }}
            >
              {"+增加参数"}
            </KubeCancelButton>
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
    </Stack >

  );
}

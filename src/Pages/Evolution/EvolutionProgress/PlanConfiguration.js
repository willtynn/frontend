/**
 * src\Pages\Evolution\EvolutionProgress\PlanConfiguration.js
 */

import { useState, useEffect } from 'react';
import { Box, Stack, Tooltip, TextField } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { fontFamily } from '@/utils/commonUtils';
import { KubeInput, KubeAutocomplete, KubeTextField } from '@/components/Input';
import {
  KubeCancelButton,
  KubeConfirmButton,
} from '@/components/Button';
import { useIntl } from 'react-intl';
import { StyledCheckbox } from '@/components/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import _ from "lodash";
import { EVO_UPDATE_EXE_ALG, EVO_UPDATE_EVO_EXE_ARGS, exe_register } from '../../../actions/evolutionAction';
import { isJsonString } from '../../../utils/commonUtils';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setSnackbarMessageAndOpen } from '../../../actions/snackbarAction';
import { SEVERITIES } from '../../../components/CommonSnackbar';
import { saveAs } from 'file-saver';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const regExp = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9 -]{0,251}[a-zA-Z0-9]$/);

export function PlanConfiguration(props) {
  const { showError, setError, close } = props;

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

  //高级配置，执行算法的参数
  const regExpArgs = evo_exe_args.match("{\"exeArgs\":{(.*)}}")
  const [exeArgs, setExeArgs] = useState("")
  //高级设置是否展示
  const [isVisibleOfHigh, setIsVisibleOfHigh] = useState(false);
  //参数的数组,之所以是testArgs是因为还没有经过校验
  const [testArgs, SetTestArgs] = useState([
    {
      index: 0,
      key: "",
      value: "",
    }
  ]);

  //打开或关闭高级设置界面
  const handleHighConfig = () => {
    parseArgs();
    setIsVisibleOfHigh(!isVisibleOfHigh);

  };
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
    console.log(regExpArgs);
    if (regExpArgs[1] == "" || regExpArgs[1] == null) {

    } else {
      const dataArgs = regExpArgs[1].split(",")
      console.log(dataArgs)
      const newArgs = [];
      for (var i = 0; i < dataArgs.length; i++) {
        const kvargs = dataArgs[i].split(":");
        newArgs[i] = { key: kvargs[0], value: kvargs[1] };
      }
      SetTestArgs(newArgs)
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

  //保存设置的参数
  const handleSaveHighConfig = () => {
    //首先将TestArgs中的参数全部交给dataResourceArgs
    var tempDataArgs = ""
    for (var i = 0; i < testArgs.length; i++) {
      if (i == testArgs.length - 1) {
        tempDataArgs += testArgs[i].key + ":" + testArgs[i].value;
      } else {
        tempDataArgs += testArgs[i].key + ":" + testArgs[i].value + ",";
      }
    }

    setExeArgs(tempDataArgs);
    //如果不符合JSON格式那么就会提示报错
    if (!isJsonString("{\"exeArgs\":{" + tempDataArgs + "}}")) {
      setJsonRight(true);
      return;
    } else {
      setJsonRight(false);
    }

    dispatch({ type: EVO_UPDATE_EVO_EXE_ARGS, data: "{\"exeArgs\":{" + tempDataArgs + "}}" });

  };





  //表示JSON字符串验证结果
  const [jsonRight, setJsonRight] = useState(false);
  const handleExeArgs = e => {
    
    // //如果不符合JSON格式那么就会提示报错
    // if (!isJsonString(evo_exe_args)) {
    //   setJsonRight(true);
    // } else {
    //   setJsonRight(false);
    // }
  }

  //增加用户自己的算法
  const [isVisibleOfNewAlgotithm, setIsVisibleOfNewAlgotithm] = useState(false);
  const handleNewAlgotithm = () => {
    setIsVisibleOfNewAlgotithm(!isVisibleOfNewAlgotithm);
  };
  const [newExeAlgName, setNewExeAlgName] = useState('');
  const [newExeAlgContent, setNewExeAlgContent] = useState("public class" + " 此处请填入算法类名 " + "{\n" +
    "    public static void main(String[] args) {\n" +
    "        // TODO write your algorithm\n" +
    "        //推荐您使用本机IDE编写完后复制到此处\n" +
    "}}")
  const [newExeAlgDescribe, setNewExeAlgDescribe] = useState('');

  const handleNewAlgName = e => {
    setNewExeAlgName(e.target.value);
  }
  const handleNewAlgDescribe = e => {
    setNewExeAlgDescribe(e.target.value);
  }
  const handleNewAlgContent = e => {
    setNewExeAlgContent(e.target.value);
  }
  //处理新算法的注册，将其添加到算法表当中
  const handleRegister = () => {
    let data = {
      plan_name: newExeAlgName,
      plan_content: newExeAlgContent,
      plan_text: newExeAlgDescribe
    }
    console.log(data)
    if (data.plan_name == null || '') {
      dispatch(
        setSnackbarMessageAndOpen(
          'common.errorMessage',
          { msg: "新算法名称不能为空" },
          SEVERITIES.warning
        )
      );
      return;
    }
    if (data.plan_content == null || '') {
      dispatch(
        setSnackbarMessageAndOpen(
          'common.errorMessage',
          { msg: "新算法内容不能为空" },
          SEVERITIES.warning
        )
      );
      return;
    }

    dispatch(exe_register(data));
    //关闭窗口进行刷新
    close();
  }

  return (
    <Stack sx={{ p: '32px 64px', bgcolor: '#FFFFFF', height: "calc(100% - 244px)" }} direction='column' justifyContent='space-between' >
      <Stack style={{ overflow: 'scroll' }}>
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
  
        {/* 更多操作按钮 */}
        <KubeCancelButton
          onClick={handleHighConfig}
          sx={{ height: '32px', minWidth: '96px', width: '100%' }}
        >
          <Stack direction='row' alignItems='center' justifyContent='center'>
            <Box sx={{ ml: '4px' }}>{intl.messages['common.moreOperation']}</Box>
            <ArrowDropDownIcon fontSize='small' />
          </Stack>
        </KubeCancelButton>

        {/* 参数配置 */}
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
              {"执行算法参数"}<br></br>
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
              {"此处配置执行算法相关的详细参数，请遵照执行算法的详情进行配置，否则可能导致演化计划不可用"}
            </Typography>
            < KubeCancelButton
              onClick={handleAddArgs}
              sx={{ margin: '0', height: '32px', minWidth: '96px', width: '25%' }}
            >
              {"+增加参数"}
            </KubeCancelButton>
            <KubeCancelButton
              onClick={handleSaveHighConfig}
              sx={{ height: '32px', minWidth: '96px', width: '10%' }}
            >
              <Stack direction='row' alignItems='center' justifyContent='center'>
                <Box sx={{ ml: '4px' }}>{"确认高级配置"}</Box>
              </Stack>
            </KubeCancelButton>
            <br></br>
            <Typography
              sx={{
                color: '#36435c',
                fontSize: '12px',
                lineHeight: 1.67,
                fontWeight: 400,
              }}
            >
              {"最终参数结果及检验"}
            </Typography>
            <KubeInput
              requried={false}
              id='test-evo_name-input'
              variant='outlined'
              value={exeArgs}
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
            <br></br>
            <br></br>
            

            <KubeCancelButton
              onClick={handleNewAlgotithm}
              sx={{ height: '32px', minWidth: '96px', width: '100%' }}
            >
              <Stack direction='row' alignItems='center' justifyContent='center'>
                <Box sx={{ ml: '4px' }}>{"不满足现有的算法？"}</Box>
                <ArrowDropDownIcon fontSize='small' />
              </Stack>
            </KubeCancelButton>
            {/* 添加执行算法的界面 */}
            {isVisibleOfNewAlgotithm &&
              <Box>
                <KubeInput
                  label={"新算法名称"}
                  decription={"此处写新算法的名称"}
                  requried={true}
                  id='test-evo_name-input'
                  variant='outlined'
                  value={newExeAlgName}
                  onChange={handleNewAlgName}
                  validation={{
                    required: "First Name is required!"
                  }}
                />
                <br></br>
                <KubeInput
                  label={"新算法描述"}
                  decription={"请简要描述一下你的新算法"}
                  requried={false}
                  id='test-evo_name-input'
                  variant='outlined'
                  value={newExeAlgDescribe}
                  onChange={handleNewAlgDescribe}
                  validation={{
                    required: "First Name is required!"
                  }}
                />
                <br></br>
                {/* //TODO 参考手册还没写，故连接还没确定 */}
                <Typography
                  sx={{
                    color: '#36435c',
                    fontSize: '12px',
                    lineHeight: 1.67,
                    fontWeight: 400,
                  }}
                >
                  {"算法内容,请使用JAVA语言并阅读"}
                  {<Link href="#">参考手册</Link>}
                </Typography>
                {/* 写算法的内容，直接用JAVA代码写 */}
                <KubeTextField
                  multiline
                  maxRows={10}
                  value={newExeAlgContent}
                  onChange={handleNewAlgContent}
                />
                <br></br>
                <KubeCancelButton
                  onClick={handleRegister}
                  sx={{ height: '32px', minWidth: '96px', width: '10%' }}
                >
                  <Stack direction='row' alignItems='center' justifyContent='center'>
                    <Box sx={{ ml: '4px' }}>{"注册该算法"}</Box>
                  </Stack>
                </KubeCancelButton>
              </Box>
            }
          </Box>}
      </Stack>
    </Stack>
  );
}

/**
 * src\Pages\Evolution\EvolutionProgress\AnalyseConfiguration.js
 */

import { useState, useEffect, useLayoutEffect } from 'react';
import { Box, Stack, Tooltip, TextField } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { fontFamily } from '@/utils/commonUtils';
import { KubeInput, KubeAutocomplete, KubeTextField } from '@/components/Input';
import { useIntl } from 'react-intl';
import { StyledCheckbox } from '@/components/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import _, { constant, set } from 'lodash';
import { EVO_UPDATE_ANA_ALG, EVO_UPDATE_EVO_ANA_ARGS, evo_get_algorithm, ana_register } from '../../../actions/evolutionAction';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  KubeCancelButton,
  KubeConfirmButton,
} from '@/components/Button';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { isJsonString } from '../../../utils/commonUtils';
import { setSnackbarMessageAndOpen } from '../../../actions/snackbarAction';
import { SEVERITIES } from '../../../components/CommonSnackbar';
import { saveAs } from 'file-saver';

const regExp = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9 -]{0,251}[a-zA-Z0-9]$/);

export function AnalyseConfiguration(props) {
  const { showError, setError, close } = props;

  const {
    planName,
    planComment,
    ana_alg_list,
    ana_alg,
    ana_data_mapping,
    data_resource,
    evo_ana_args,
  } = useSelector(state => {
    return {
      planName: state.Evolution.planName,
      planComment: state.Evolution.planComment,
      ana_alg_list: state.Evolution.ana_alg_list,
      ana_alg: state.Evolution.ana_alg,
      ana_data_mapping: state.Evolution.ana_data_mapping,
      data_resource: state.Evolution.data_resource,
      evo_ana_args: state.Evolution.evo_ana_args,
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
  const ana_data_list = _.filter(ana_alg_list, function (obj) {
    if (_.find(ana_data_mapping, { 'analyze_name': obj.analyze_name, 'data_resource': data_resource }) !== undefined) {
      return obj;
    }
    if (_.find(ana_data_mapping, { 'analyze_name': obj.analyze_name, 'data_resource': "all" }) !== undefined) {
      return obj;
    }
  })

  //表示JSON字符串验证结果
  const [jsonRight, setJsonRight] = useState(false);
  const handleAnaArgs = e => {
    dispatch({ type: EVO_UPDATE_EVO_ANA_ARGS, data: e.target.value });
    //如果不符合JSON格式那么就会提示报错
    if (!isJsonString(evo_ana_args)) {
      setJsonRight(true);
    } else {
      setJsonRight(false);
    }
  }

  //下面与高级配置相关，即增加用户自己的算法
  const [isVisibleOfNewAlgotithm, setIsVisibleOfNewAlgotithm] = useState(false);
  const handleNewAlgotithm = () => {
    setIsVisibleOfNewAlgotithm(!isVisibleOfNewAlgotithm);
  };
  const [newAnaAlgName, setNewAnaAlgName] = useState('');
  const [newAnaAlgContent, setNewAnaAlgContent] = useState("public class" + " 此处请填入算法类名 " + "{\n" +
    "    public static void main(String[] args) {\n" +
    "        // TODO write your algorithm\n" +
    "        //推荐您使用本机IDE编写完后复制到此处\n" +
    "}}")
  const [newAnaAlgDescribe, setNewAnaAlgDescribe] = useState('');

  const handleNewAlgName = e => {
    setNewAnaAlgName(e.target.value);
  }
  const handleNewAlgDescribe = e => {
    setNewAnaAlgDescribe(e.target.value);
  }
  const handleNewAlgContent = e => {
    setNewAnaAlgContent(e.target.value);
  }
  //处理新算法的注册，将其添加到算法表当中
  const handleRegister = () => {
    let data = {
      analyze_name: newAnaAlgName,
      analyze_content: newAnaAlgContent,
      analyze_text: newAnaAlgDescribe
    }
    if (data.analyze_name == null || '') {
      dispatch(
        setSnackbarMessageAndOpen(
          'common.errorMessage',
          { msg: "新算法名称不能为空" },
          SEVERITIES.warning
        )
      );
      return;
    }
    if (data.analyze_content == null || '') {
      dispatch(
        setSnackbarMessageAndOpen(
          'common.errorMessage',
          { msg: "新算法内容不能为空" },
          SEVERITIES.warning
        )
      );
      return;
    }

    dispatch(ana_register(data));
    //关闭窗口进行刷新
    close();
  }

  return (
    <Stack sx={{ p: '32px 64px', bgcolor: '#FFFFFF', height: "calc(100% - 244px)" }} direction='column' justifyContent='space-between' >
      <Stack style={{ overflow: 'scroll' }}>
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
          noOptionsText={"无可选算法"}
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
        <br></br>
        <KubeInput
          label={"分析算法参数"}
          decription={"此处配置分析算法相关的详细参数，请遵照分析算法的详情进行配置，否则可能导致演化计划不可用"}
          requried={false}
          id='test-evo_name-input'
          variant='outlined'
          value={evo_ana_args}
          onChange={handleAnaArgs}
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
        <KubeCancelButton
          onClick={handleNewAlgotithm}
          sx={{ height: '32px', minWidth: '96px', width: '25%' }}
        >
          <Stack direction='row' alignItems='center' justifyContent='center'>
            <Box sx={{ ml: '4px' }}>{"不满足现有的算法？"}</Box>
            <ArrowDropDownIcon fontSize='small' />
          </Stack>
        </KubeCancelButton>


        {isVisibleOfNewAlgotithm &&
          <Box>
            <KubeInput
              label={"新算法名称"}
              decription={"此处写新算法的名称"}
              requried={true}
              id='test-evo_name-input'
              variant='outlined'
              value={newAnaAlgName}
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
              value={newAnaAlgDescribe}
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
              value={newAnaAlgContent}
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
      </Stack>
    </Stack>
  );
}

import { useState,useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { fontFamily } from '@/utils/commonUtils';
import InfoFinished from '@/assets/InfoFinished.svg';
import InfoWaiting from '@/assets/InfoWaiting.svg';
import InfoNow from '@/assets/InfoNow.svg';
import DockerFinished from '@/assets/DockerFinished.svg';
import DockerWaiting from '@/assets/DockerWaiting.svg';
import DockerNow from '@/assets/DockerNow.svg';
import { useIntl } from 'react-intl';
import { KubeCancelButton, KubeConfirmButton } from '@/components/Button';
import ProgressIndicator from '../../Cluster/deploy/DeployProgress/ProgressIndicator';
import { MonitorConfiguration } from './MonitorConfiguration';
import { useSelector, useDispatch } from 'react-redux';
import { AnalyseConfiguration } from './AnalyseConfiguration';
import { PlanConfiguration } from './PlanConfiguration';
import { ExecuteConfiguration } from './ExecuteConfiguration';

import { EVO_RESET_FORM, evo_add, evo_getPlanList, evo_modify } from '../../../actions/evolutionAction';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '960px',
  boxShadow: 24,
  height: 'calc(100% - 120px)',
  fontFamily: fontFamily,
};

const totalStage = 4;

export function EvolutionProgress(props) {
  const { handleConfirmClick, handleCancelClick, showError, setShowError,state } =
    props;
  const [currentStage, setCurrentStage] = useState(1);
  const [evolutionPlanError, setEvolutionPlanError] = useState(0);

  const navigate = useNavigate();
  const intl = useIntl();
  const dispatch = useDispatch();

  const previousStep = () => {
    setCurrentStage(prevStage => prevStage - 1);
  };

  const nextStep = () => {
    if (currentStage === 1 && evolutionPlanError) {
        setShowError(true);
    } else {
        setCurrentStage(prevStage => prevStage + 1);
        setShowError(false);
    }
    //TODO此处想要加入表单验证
    // if(currentPage === 1 && evolutionPlanError){
    //   if(evo_name == ""){

    //   }
    // }
  };

  const handleCancelButtonClick = () => {
    handleCancelClick();
    setCurrentStage(1);
  };
  //获取到相关的需要提交的变量
  const {
    evo_id,
    evo_name,
    data_resource,
    trigger,
    ana_alg,
    exe_alg,
    exe_mtd,
    evo_remarks,
    create_by,
    cre_time,
    evo_data_args,
    evo_ana_args,
    evo_exe_args,
  } = useSelector(state => {
    return {
      evo_id: state.Evolution.evo_id,
      evo_name: state.Evolution.evo_name,
      data_resource: state.Evolution.data_resource,
      trigger: state.Evolution.trigger,
      ana_alg: state.Evolution.ana_alg,
      exe_alg: state.Evolution.exe_alg,
      exe_mtd: state.Evolution.exe_mtd,
      create_by: state.Evolution.create_by,
      evo_remarks: state.Evolution.evo_remakes,
      cre_time: state.Evolution.cre_time,
      evo_data_args: state.Evolution.evo_data_args,
      evo_ana_args:state.Evolution.evo_ana_args,
      evo_exe_args:state.Evolution.evo_exe_args,
    };
  });

  //提交表单，此处还可以做一个验证
  async function handleConfirmButtonClick(){
    var plan = {
      evo_id:evo_id,
      evo_name: evo_name,
      data_resource: data_resource,
      cre_time:cre_time,
      trigger: trigger,
      ana_alg: ana_alg,
      exe_alg: exe_alg,
      exe_mtd: exe_mtd,
      evo_enable: "1",
      evo_remarks: evo_remarks,
      create_by: create_by,
      evo_data_args: evo_data_args,
      evo_ana_args:evo_ana_args,
      evo_exe_args:evo_exe_args,
    }
    if(state == "add"){
      plan.evo_id = "-1";
    }
    //如果用户没有输入备注。那么就存为none
    if(evo_remarks == undefined){
      plan.evo_remarks = "none";
    }
    //如果id不等于-1，那么说明是修改，如果id = -1 那么是新建
    if(plan.evo_id == "-1"){
      console.log(plan);
      console.log("增加演化计划");
      dispatch(evo_add(plan));
    }else{
      dispatch(evo_modify(plan));
    }
    //无论如何，恢复默认数据，更新计划列表，返回主页
    await dispatch({type:EVO_RESET_FORM});
    await dispatch(evo_getPlanList("",""));
    //关闭窗口
    handleConfirmClick();
    navigate("/evolution/plan")
  };

  const currentPage = () => {
    if (currentStage === 1) {
      return <MonitorConfiguration showError={showError} setError={setEvolutionPlanError} />;
    } else if (currentStage === 2) {
      return <AnalyseConfiguration close={handleCancelClick} showError={showError} setError={setEvolutionPlanError} />;
    } else if (currentStage === 3) {
      return <PlanConfiguration close={handleCancelClick} showError={showError} setError={setEvolutionPlanError} />;
    } else {
      return <ExecuteConfiguration showError={showError} setError={setEvolutionPlanError} />;
    }
  };

  const checkState = () =>{
    if(state == "modify"){
      return intl.messages['evolution.modifyEvolutionPlan']
    }else{
      return intl.messages['evolution.createEvolutionPlan']
    }
  }

  return (
    <Box sx={style}>
      <KubeDeploymentCard title={checkState()} handleClose={handleCancelClick}>
        <Stack
          direction='row'
          spacing={0}
          sx={{ bgcolor: '#eff4f9', p: '0px 20px' }}
        >
          <ProgressIndicator
            title={intl.messages['evolution.monitorConfiguration']}
            adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
            stage={1}
            currentStage={currentStage}
          />
          <ProgressIndicator
            title={intl.messages['evolution.analyseConfiguration']}
            adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
            stage={2}
            currentStage={currentStage}
          />
          <ProgressIndicator
            title={intl.messages['evolution.planConfiguration']}
            adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
            stage={3}
            currentStage={currentStage}
          />
          <ProgressIndicator
            title={intl.messages['evolution.executeConfiguration']}
            adornments={[<InfoWaiting />, <InfoNow />, <InfoFinished />]}
            stage={4}
            currentStage={currentStage}
          />
        </Stack>
        {currentPage(currentStage)}

         <Stack
          sx={{
            mt: '80px',
            position: 'absolute',
            bottom: '12px',
            width: 'calc(100% - 64px)',
            bgcolor: '#f9fbfd',
          }}
          direction='row'
          spacing={3}
          justifyContent='flex-end'
          alignItems='flex-end'
        >
          <KubeCancelButton
            sx={{ height: '32px', p: '5px 23px' }}
            onClick={handleCancelButtonClick}
          >
            {intl.messages['common.cancel']}
          </KubeCancelButton>
          {currentStage > 1 ? (
            <KubeCancelButton
              sx={{ height: '32px', p: '5px 23px' }}
              onClick={previousStep}
            >
              {intl.messages['common.previousStep']}
            </KubeCancelButton>
          ) : (
            <></>
          )}
          
          {(currentStage < totalStage) ? (
            <KubeConfirmButton
              sx={{ height: '32px', p: '5px 23px' }}
              onClick={nextStep}
            >
              {intl.messages['common.nextStep']}
            </KubeConfirmButton>
          ) : (
            <KubeConfirmButton
              sx={{ height: '32px', p: '5px 23px' }}
              onClick={handleConfirmButtonClick}
            >
              {state == "add" ? intl.messages['common.create'] : intl.messages['common.modify']}
            </KubeConfirmButton>
          )}
        </Stack>
      </KubeDeploymentCard>
    </Box>
  );
}


import { useEffect} from 'react';
import { useDispatch} from 'react-redux';
import { Stack } from '@mui/material';
import { useParams } from 'react-router';
import GeneralInfo from './GeneralInfo';
import { evo_get_plan_result, evo_getone } from '../../../actions/evolutionAction';
import DetailInfo from './DetailInfo';
import { MonitorLog } from './DetailInfo/MonitorLog';

export function EvolutionPlanDetail() {
  const { evo_id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    //获取当前演化计划的详细信息
    dispatch(evo_getone(evo_id));
    //获取一下当前演化计划的执行结果
    dispatch(evo_get_plan_result(evo_id));
  }, []);

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='flex-start'
    >
      <GeneralInfo evo_id={evo_id}/>
      <DetailInfo />  

    </Stack>
  );
}

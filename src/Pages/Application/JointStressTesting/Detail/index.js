
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack } from '@mui/material';
import { useParams } from 'react-router';
import GeneralInfo from './GeneralInfo';
import DetailInfo from './DetailInfo';
import { getJointTestPlanById, getJointTestPlanSonById } from '@/actions/applicationAction';

export function JointTestPlanDetail() {
  const { jointTestPlanId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJointTestPlanById(jointTestPlanId));
    dispatch(getJointTestPlanSonById(jointTestPlanId));
  }, []);


  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='flex-start'
    >
      <GeneralInfo />
      <DetailInfo />
    </Stack>
  );
}

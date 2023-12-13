
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack } from '@mui/material';
import { useParams } from 'react-router';
import GeneralInfo from './GeneralInfo';
import DetailInfo from './DetailInfo';
import { getTestPlanById } from '@/actions/applicationAction';

export function TestPlanDetail() {
  const { testPlanId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTestPlanById(testPlanId));
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

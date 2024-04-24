
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack } from '@mui/material';
import { useParams } from 'react-router';
import GeneralInfo from './GeneralInfo';
import DetailInfo from './DetailInfo';

export function InferPlanDetail() {
  const { testPlanId } = useParams();
  const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getTestPlanById(testPlanId));
//   }, []);

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

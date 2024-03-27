
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack } from '@mui/material';
import { useParams } from 'react-router';
import GeneralInfo from './GeneralInfo';
import { getEvolutionPlanById } from '../../../actions/evolutionAction';
import DetailInfo from './DetailInfo';

export function EvolutionPlanDetail() {
  const { evolutionPlanId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvolutionPlanById(evolutionPlanId));
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

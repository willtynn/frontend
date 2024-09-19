
import { useEffect} from 'react';
import { useDispatch} from 'react-redux';
import { Stack } from '@mui/material';
import { useParams } from 'react-router';
import GeneralInfo from './GeneralInfo';
import { evo_getone } from '../../../actions/evolutionAction';
import DetailInfo from './DetailInfo';

export function EvolutionPlanDetail() {
  const { evo_id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(evo_getone(evo_id));
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

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Stack,
} from '@mui/material';
import {
  getApplicationDetail,
  getApplicationPods
} from '@/actions/inferInstanceAction';
import { useSearchParams  } from 'react-router-dom';
import GeneralInfo from './GeneralInfo';
import { DetailInfo } from './DetailInfo';

export function ApplicationDetail() {
  const [search,setsearch] = useSearchParams()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApplicationDetail(localStorage.getItem('current_cluster'), search.get('name')));
    dispatch(getApplicationPods(localStorage.getItem('current_cluster'), search.get('namespace'), search.get('name')));
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

/**
 * src\Pages\Service\detail\index.js
 */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack } from '@mui/material';
import { searchServiceExactlyById } from '@/actions/serviceAction';
import GeneralInfo from './GeneralInfo';
import { DetailInfo } from './DetailInfo';
import { useParams } from 'react-router';
import { parseId } from '../../../utils/commonUtils';

export function ServiceDetail() {
  const { serviceId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchServiceExactlyById(parseId(serviceId)));
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

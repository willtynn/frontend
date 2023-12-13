import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Stack } from '@mui/material';
import { useParams } from 'react-router';
import DetailInfo from './DetailInfo';
import GeneralInfo from './GeneralInfo';
import { getTestResultByResultId } from '../../../../actions/applicationAction';

export function ResultDetail() {
  const { testResultId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTestResultByResultId(testResultId));
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


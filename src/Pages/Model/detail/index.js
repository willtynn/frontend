import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Box,
  Input,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
} from '@mui/material';
import {
  getModelDetail
} from '@/actions/modelAction';
import { checkVersionFormat } from '@/utils/commonUtils';
import { fontFamily } from '@/utils/commonUtils';
import { useParams } from 'react-router';
import GeneralInfo from './GeneralInfo';
import {DetailInfo} from './DetailInfo';

export function ModelDetail() {
  const { modelId } = useParams();
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getModelDetail(modelId));
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

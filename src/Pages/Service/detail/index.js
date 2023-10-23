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
import { SmallLightFont, SuperLargeBoldFont } from '@/components/Fonts';
import { OutlinedButton } from '@/components/Button';
import { UPDATE_SEARCH_SERVICE } from '@/actions/serviceAction';
import {
  searchServiceById,
  searchServiceByVersion,
  searchServiceExactlyById
} from '@/actions/serviceAction';
import { checkVersionFormat } from '@/utils/commonUtils';
import { fontFamily } from '@/utils/commonUtils';
import GeneralInfo from './GeneralInfo';
import { DetailInfo } from './DetailInfo';
import { useParams } from 'react-router';

export function ServiceDetail() {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(searchServiceExactlyById(serviceId));
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

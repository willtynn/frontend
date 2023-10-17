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
} from '@/actions/serviceAction';
import { checkVersionFormat } from '@/utils/commonUtils';
import { fontFamily } from '@/utils/commonUtils';

export default function GeneralInfo() {
  return (
    <div>GeneralInfo</div>
  )
}

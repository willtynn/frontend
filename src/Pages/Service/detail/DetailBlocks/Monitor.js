import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Stack,
  Tooltip,
  Table,
  TableHead,
  TableRow,
  IconButton,
  TableBody,
} from '@mui/material';
import { SmallLightFont, SuperLargeBoldFont } from '@/components/Fonts';
import {
  OutlinedButton,
  KubeConfirmButton,
  KubeCancelButton,
} from '@/components/Button';
import { checkVersionFormat } from '@/utils/commonUtils';
import { fontFamily } from '@/utils/commonUtils';
import { KubeSimpleCard } from '../../../../components/InfoCard';
import {
  StyledTableBodyCell,
  StyledTableRowCell,
  StyledTableBox,
  StyledTableContainer,
} from '@/components/DisplayTable';
import PolylineIcon from '@mui/icons-material/Polyline';
import { useNavigate, useParams } from 'react-router';

export default function Monitor() {
  
  return (
    <div>Monitor</div>
  )
}

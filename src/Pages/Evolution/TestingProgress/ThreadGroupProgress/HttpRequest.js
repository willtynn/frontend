import { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { KubeInput, EditableTextField } from '@/components/Input';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { StyledRadioGroup } from '../../../../../components/Radio';
import { KubeCheckbox } from '../../../../../components/Checkbox';
import {
  UPDATE_WEB_SERVER_PROTOCOL,
  UPDATE_WEB_SERVER_NAME_OR_IP,
  UPDATE_WEB_SERVER_PORT,
  UPDATE_HTTP_REQUEST_PATH,
  UPDATE_HTTP_REQUEST_CONTENT_ENCODING,
  UPDATE_REQUEST_PARAMETERS,
  UPDATE_REQUEST_BODY_DATA,
} from '../../../../../actions/applicationAction';
import { KubeSubCard } from '../../../../../components/InfoCard';
import Editor from '@monaco-editor/react';
import {
  StyledTableHead,
  StyledTableContainer,
  StyledTableBodyCell,
  StyledTableBox,
} from '../../../../../components/DisplayTable';
import { fontFamily } from '../../../../../utils/commonUtils';
import {
  KubeConfirmButton,
  KubeCancelButton,
} from '../../../../../components/Button';


export function HttpRequest() {
  return (
    <div>HttpRequest</div>
  )
}

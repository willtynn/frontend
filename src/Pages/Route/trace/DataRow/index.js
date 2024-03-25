/**
 * src\Pages\Route\trace\DataRow\index.js
 */
import React from "react";
import dayjs from "dayjs";
import {
  TableRow,
  Tooltip,
} from "@mui/material";
import {
  StyledTableBodyCell
} from '@/components/DisplayTable';

import {calculateDuration} from '../functions/func.js'

import { useIntl } from 'react-intl';

const defaultMinWidth = ['100px', '30px', '150px', '60px', '40px'];
const defaultMaxWidth = ['350px', '30px', '150px', '60px', '40px']

export function DataRow(props) {
  const { key, rowData, onRowClick, selected, minWidth, maxWidth } = props;

  const intl = useIntl();
  
  let _minWidth = minWidth;
  if (!minWidth) {
    _minWidth = defaultMinWidth;
  }
  
  let _maxWidth = maxWidth;
  if (!maxWidth) {
    _maxWidth = defaultMaxWidth;
  }

  if(rowData)
  {
    let time = dayjs(rowData.time).format(intl.messages["routeTrace.timeFormat"])
    let duration = calculateDuration(rowData.duration)

    return (
      <React.Fragment>
        <TableRow onClick={onRowClick} hover selected={selected} key={key}
        sx={{
          position: 'sticky',
          backgroundColor: '#FFFFFF',
        }}>
          <StyledTableBodyCell component="th" scope="row" sx={{ minWidth: _minWidth[0], maxWidth: _maxWidth[0] }}>
            <Tooltip title={rowData.service} placement="top-end">
              <>{rowData.service}</>
            </Tooltip>
          </StyledTableBodyCell>
          <StyledTableBodyCell align="center" sx={{ minWidth: _minWidth[1], maxWidth: _maxWidth[1] }}>
            <Tooltip title={rowData.spanNum} placement="top-end">
              <>{rowData.spanNum}</>
            </Tooltip>
          </StyledTableBodyCell>
          <StyledTableBodyCell align="center" sx={{ minWidth: _minWidth[2], maxWidth: _maxWidth[2] }}>
            <Tooltip title={time} placement="top-end">
              <>{time}</>
            </Tooltip>
          </StyledTableBodyCell>
          <StyledTableBodyCell align="center" sx={{ minWidth: _minWidth[3], maxWidth: _maxWidth[3] }}>
            <Tooltip title={duration} placement="top-end">
              <>{duration}</>
            </Tooltip>
          </StyledTableBodyCell>
          <StyledTableBodyCell align="center" sx={{ minWidth: _minWidth[4], maxWidth: _maxWidth[4] }}>
            <Tooltip title={rowData.status} placement="top-end">
              <>{rowData.status}</>
            </Tooltip>
          </StyledTableBodyCell>
        </TableRow>
      </React.Fragment>
    );
  }
  else
    return (
      <React.Fragment>
        <TableRow onClick={onRowClick} sx={{ backgroundColor: '#FFFFFF' }}>
          <StyledTableBodyCell component="th" scope="row" sx={{ color: "transparent" }}>-</StyledTableBodyCell>
          <StyledTableBodyCell align="center" 
          sx={{ color: "transparent" }}
          >-</StyledTableBodyCell>
          <StyledTableBodyCell align="center" sx={{ color: "transparent" }}>-</StyledTableBodyCell>
          <StyledTableBodyCell align="center" sx={{ color: "transparent" }}>-</StyledTableBodyCell>
          <StyledTableBodyCell align="center" sx={{ color: "transparent" }}>-</StyledTableBodyCell>
        </TableRow>
      </React.Fragment>
    );
}
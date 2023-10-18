import React from "react";
import {
  TableRow,
  Tooltip,
} from "@mui/material";
import { SmallLightFont } from '@/components/Fonts';
import {
  StyledTableBodyCell
} from '@/components/DisplayTable';

import {calculateDuration} from '../functions/func.js'



const defaultMaxWidth = ['200px', '150px', '30px', '60px', '60px', '60px', '60px', '60px'];

export function ServiceRow(props) {
  const { key, rowData, onRowClick, selected, maxWidth, showRows } = props;
  let _maxWidth = maxWidth;
  if (!maxWidth) {
    _maxWidth = defaultMaxWidth;
  }

  if(rowData)
  {
    let low = calculateDuration(rowData.low)
    let percentile50 = calculateDuration(rowData.percentile50)
    let percentile95 = calculateDuration(rowData.percentile95)
    let percentile99 = calculateDuration(rowData.percentile99)
    let high = calculateDuration(rowData.high)
    return (
      <React.Fragment>
        <TableRow onClick={onRowClick} hover selected={selected} key={key}
        sx={{
          position: 'sticky',
          backgroundColor: '#FFFFFF',
        }}>
          {
            (showRows[0]) ? 
              <StyledTableBodyCell component="th" scope="row" 
                sx={{ maxWidth: _maxWidth[0] }}>
                <Tooltip title={rowData.service} placement="top-end">
                  <SmallLightFont style={{ color: "black", overflow: 'hidden', textOverflow: 'ellipsis' }}>            
                    <>{rowData.service}</>
                  </SmallLightFont>
                </Tooltip>
              </StyledTableBodyCell>
            : <></>
          }
          {
            (showRows[1]) ? 
              <StyledTableBodyCell align="center" sx={{ maxWidth: _maxWidth[1] }}>
                <Tooltip title={rowData.api} placement="top-end">
                  <>{rowData.api}</>
                </Tooltip>
              </StyledTableBodyCell>
            : <></>
          }
          {
            (showRows[2]) ? 
              <StyledTableBodyCell align="center" sx={{ maxWidth: _maxWidth[2] }}>
                <Tooltip title={rowData.count} placement="top-end">
                  <>{rowData.count}</>
                </Tooltip>
              </StyledTableBodyCell>
            : <></>
          }
          {
            (showRows[3]) ? 
              <StyledTableBodyCell align="center" sx={{ maxWidth: _maxWidth[3] }}>
                <Tooltip title={low} placement="top-end">
                  <>{low}</>
                </Tooltip>
              </StyledTableBodyCell>
            : <></>
          }
          {
            (showRows[4]) ? 
              <StyledTableBodyCell align="center" sx={{ maxWidth: _maxWidth[4] }}>
                <Tooltip title={percentile50} placement="top-end">
                  <>{percentile50}</>
                </Tooltip>
              </StyledTableBodyCell>
            : <></>
          }
          {
            (showRows[5]) ? 
              <StyledTableBodyCell align="center" sx={{ maxWidth: _maxWidth[5] }}>
                <Tooltip title={percentile95} placement="top-end">
                  <>{percentile95}</>
                </Tooltip>
              </StyledTableBodyCell>
            : <></>
          }
          {
            (showRows[6]) ? 
              <StyledTableBodyCell align="center" sx={{ maxWidth: _maxWidth[6] }}>
                <Tooltip title={percentile99} placement="top-end">
                  <>{percentile99}</>
                </Tooltip>
              </StyledTableBodyCell>
            : <></>
          }
          {
            (showRows[7]) ? 
              <StyledTableBodyCell align="center" sx={{ maxWidth: _maxWidth[7] }}>
                <Tooltip title={high} placement="top-end">
                  <>{high}</>
                </Tooltip>
              </StyledTableBodyCell>
            : <></>
          }

        </TableRow>
      </React.Fragment>
    )
  }
  else
    return (
      <React.Fragment>
        <TableRow onClick={onRowClick} hover selected={selected} sx={{
          position: 'sticky',
          backgroundColor: '#FFFFFF',
          }}>
          <StyledTableBodyCell component="th" scope="row" sx={{ color: "transparent"}}>
            -
          </StyledTableBodyCell>
          <StyledTableBodyCell align="center" sx={{ color: "transparent"}}>
            -
          </StyledTableBodyCell>
          <StyledTableBodyCell align="center" sx={{ color: "transparent"}}>
            -
          </StyledTableBodyCell>
          <StyledTableBodyCell align="center" sx={{ color: "transparent"}}>-</StyledTableBodyCell>
          <StyledTableBodyCell align="center" sx={{ color: "transparent"}}>-</StyledTableBodyCell>
          <StyledTableBodyCell align="center" sx={{ color: "transparent"}}>-</StyledTableBodyCell>
          <StyledTableBodyCell align="center" sx={{ color: "transparent"}}>-</StyledTableBodyCell>
          <StyledTableBodyCell align="center" sx={{ color: "transparent"}}>-</StyledTableBodyCell>
        </TableRow>
      </React.Fragment>
    )
}

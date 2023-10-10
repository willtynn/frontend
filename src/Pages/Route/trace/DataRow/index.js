import React from "react";
import dayjs from "dayjs";
import {
  TableCell,
  TableRow,
} from "@mui/material";
import {
  StyledTableBodyCell
} from '@/components/DisplayTable';

export function DataRow(props) {
    const { rowData, color, onRowClick, selected } = props;

    function calculateDuration(duration){
      if(duration < 1000){
        return duration + 'μs';
      }else if(duration < 1000000){
        return (duration / 1000).toFixed(2) + 'ms';
      }else{
        duration /= 1000000;
      }
      if(duration < 60){
        return duration.toFixed(3) + 's';
      }else if(duration < 3600){
        return (duration / 60).toFixed(2) + 'min';
      }else if(duration < 86400){
        return (duration / 3600).toFixed(2) + 'h';
      }else{
        return (duration / 86400).toFixed(2) + 'd';
      }
    }
    if(rowData)
      return (
        <React.Fragment>
          <TableRow onClick={onRowClick} hover selected={selected} sx={{
            maxWidth: '110px',
            position: 'sticky',
            backgroundColor: '#FDFDFD',
          }}>
            <StyledTableBodyCell component="th" scope="row">{rowData.service}</StyledTableBodyCell>
            <StyledTableBodyCell align="center" sx={{ borderLeft: "solid 1px #B8B5B7", borderRight: "solid 1px #B8B5B7" }}>
              {rowData.spanNum}
            </StyledTableBodyCell>
            <StyledTableBodyCell align="center">{dayjs(rowData.time).format('YYYY-MM-DD HH:mm:ss')}</StyledTableBodyCell>
            <StyledTableBodyCell align="center">{calculateDuration(rowData.duration)}</StyledTableBodyCell>
            <StyledTableBodyCell align="center">{rowData.status}</StyledTableBodyCell>
          </TableRow>
        </React.Fragment>
      );
    else
      return (
        <React.Fragment>
          <TableRow onClick={onRowClick} sx={{ backgroundColor: color }}>
            <StyledTableBodyCell component="th" scope="row" sx={{ color: "transparent" }}>-</StyledTableBodyCell>
            <StyledTableBodyCell align="center" sx={{ borderLeft: "solid 1px #B8B5B7", borderRight: "solid 1px #B8B5B7", color: "transparent" }}>-</StyledTableBodyCell>
            <StyledTableBodyCell align="center" sx={{ color: "transparent" }}>-</StyledTableBodyCell>
            <StyledTableBodyCell align="center" sx={{ color: "transparent" }}>-</StyledTableBodyCell>
            <StyledTableBodyCell align="center" sx={{ color: "transparent" }}>-</StyledTableBodyCell>
          </TableRow>
        </React.Fragment>
      );
  }
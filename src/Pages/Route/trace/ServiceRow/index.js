import React from "react";
import dayjs from "dayjs";
import {
  TableCell,
  TableRow,
} from "@mui/material";
import {
  StyledTableCell
} from '@/components/DisplayTable';

export function ServiceRow(props) {
    const { rowData, color, onRowClick, selected } = props;

    function calculateDuration(duration){
      if(duration < 1000){
        return duration + 'μs';
      }else if(duration < 1000000){
        return (duration / 1000).toFixed(1) + 'ms';
      }else{
        duration /= 1000000;
      }
      if(duration < 60){
        return duration.toFixed(1) + 's';
      }else if(duration < 3600){
        return (duration / 60).toFixed(1) + 'min';
      }else if(duration < 86400){
        return (duration / 3600).toFixed(1) + 'h';
      }else{
        return (duration / 86400).toFixed(1) + 'd';
      }
      //return 'Infinity';
    }

    
      return (
        <React.Fragment>
          <TableRow onClick={onRowClick} hover selected={selected} sx={{
            maxWidth: '110px',
            position: 'sticky',
            backgroundColor: '#F6F8F8',
          }}>
          {
            rowData ? 
              <>
                <StyledTableCell component="th" scope="row" sx={{ borderRight: "solid 1px white" }}>
                  {rowData.service}
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ borderRight: "solid 1px white" }}>
                  {rowData.api}
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ borderRight: "solid 1px white" }}>
                  {rowData.count}
                </StyledTableCell>
                <StyledTableCell align="center">{calculateDuration(rowData.low)}</StyledTableCell>
                <StyledTableCell align="center">{calculateDuration(rowData.percentile50)}</StyledTableCell>
                <StyledTableCell align="center">{calculateDuration(rowData.percentile95)}</StyledTableCell>
                <StyledTableCell align="center">{calculateDuration(rowData.percentile99)}</StyledTableCell>
                <StyledTableCell align="center">{calculateDuration(rowData.high)}</StyledTableCell>
              </>
             : 
              <>
                <StyledTableCell component="th" scope="row" sx={{ borderRight: "solid 1px white", color: "transparent" }}>
                  -
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ borderRight: "solid 1px white", color: "transparent" }}>
                  -
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ borderRight: "solid 1px white", color: "transparent" }}>
                  -
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ color: "transparent" }}>-</StyledTableCell>
                <StyledTableCell align="center" sx={{ color: "transparent" }}>-</StyledTableCell>
                <StyledTableCell align="center" sx={{ color: "transparent" }}>-</StyledTableCell>
                <StyledTableCell align="center" sx={{ color: "transparent" }}>-</StyledTableCell>
                <StyledTableCell align="center" sx={{ color: "transparent" }}>-</StyledTableCell>
              </>
          }
          </TableRow>
        </React.Fragment>
      );
  }
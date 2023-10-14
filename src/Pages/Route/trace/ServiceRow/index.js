import React from "react";
import {
  TableRow,
  Tooltip,
} from "@mui/material";
import { SmallLightFont } from '@/components/Fonts';
import {
  StyledTableBodyCell
} from '@/components/DisplayTable';

const defaultMaxWidth = ['110px', '110px', '110px', '110px', '110px', '110px', '110px', '110px'];

export function ServiceRow(props) {
    const { rowData, color, onRowClick, selected, maxWidth } = props;
    let _maxWidth = maxWidth;
    if (!maxWidth) {
      _maxWidth = defaultMaxWidth;
    }

    if(rowData){
      var low = calculateDuration(rowData.low)
      var percentile50 = calculateDuration(rowData.percentile50)
      var percentile95 = calculateDuration(rowData.percentile95)
      var percentile99 = calculateDuration(rowData.percentile99)
      var high = calculateDuration(rowData.high)
    }

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
              <StyledTableBodyCell component="th" scope="row" 
                sx={{ maxWidth: _maxWidth[0] }}>
                <Tooltip title={rowData.service} placement="top-end">
                  <SmallLightFont style={{ color: "black" }}>            
                    {rowData.service}
                  </SmallLightFont>
                </Tooltip>
              </StyledTableBodyCell>
              <StyledTableBodyCell align="center" sx={{ maxWidth: _maxWidth[1] }}>
                <Tooltip title={rowData.api} placement="top-end">
                    {rowData.api}
                </Tooltip>
              </StyledTableBodyCell>
              <StyledTableBodyCell align="center" sx={{ maxWidth: _maxWidth[2] }}>
                <Tooltip title={rowData.count} placement="top-end">
                  {rowData.count}
                </Tooltip>
              </StyledTableBodyCell>
              <StyledTableBodyCell align="center" sx={{ maxWidth: _maxWidth[3] }}>
                <Tooltip title={low} placement="top-end">
                  {low}
                </Tooltip>
              </StyledTableBodyCell>
              <StyledTableBodyCell align="center" sx={{ maxWidth: _maxWidth[4] }}>
                <Tooltip title={percentile50} placement="top-end">
                  {percentile50}
                </Tooltip>
              </StyledTableBodyCell>
              <StyledTableBodyCell align="center" sx={{ maxWidth: _maxWidth[5] }}>
                <Tooltip title={percentile95} placement="top-end">
                  {percentile95}
                </Tooltip>
              </StyledTableBodyCell>
              <StyledTableBodyCell align="center" sx={{ maxWidth: _maxWidth[6] }}>
                <Tooltip title={percentile99} placement="top-end">
                  {percentile99}
                </Tooltip>
              </StyledTableBodyCell>
              <StyledTableBodyCell align="center" sx={{ maxWidth: _maxWidth[7] }}>
                <Tooltip title={high} placement="top-end">
                  {high}
                </Tooltip>
              </StyledTableBodyCell>
            </>
            : 
            <>
              <StyledTableBodyCell component="th" scope="row" sx={{ color: "transparent", maxWidth: _maxWidth[3] }}>
                -
              </StyledTableBodyCell>
              <StyledTableBodyCell align="center" sx={{ color: "transparent", maxWidth: _maxWidth[3] }}>
                -
              </StyledTableBodyCell>
              <StyledTableBodyCell align="center" sx={{ color: "transparent", maxWidth: _maxWidth[3] }}>
                -
              </StyledTableBodyCell>
              <StyledTableBodyCell align="center" sx={{ color: "transparent", maxWidth: _maxWidth[3] }}>-</StyledTableBodyCell>
              <StyledTableBodyCell align="center" sx={{ color: "transparent", maxWidth: _maxWidth[3] }}>-</StyledTableBodyCell>
              <StyledTableBodyCell align="center" sx={{ color: "transparent", maxWidth: _maxWidth[3] }}>-</StyledTableBodyCell>
              <StyledTableBodyCell align="center" sx={{ color: "transparent", maxWidth: _maxWidth[3] }}>-</StyledTableBodyCell>
              <StyledTableBodyCell align="center" sx={{ color: "transparent", maxWidth: _maxWidth[3] }}>-</StyledTableBodyCell>
            </>
        }
        </TableRow>
      </React.Fragment>
    );
  }
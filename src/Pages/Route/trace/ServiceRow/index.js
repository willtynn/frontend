/**
 * @file index.js
 * @description 这个文件是路由链路页面的组件，用于展示服务链路的一行数据
 */

/**
 * src\Pages\Route\trace\ServiceRow\index.js
 */
import React from 'react';
import { TableRow, Tooltip, Box } from '@mui/material';
import { SmallLightFont } from '@/components/Fonts';
import { StyledTableBodyCell } from '@/components/DisplayTable';

import { calculateDuration } from '../functions/func.js';

const defaultminWidth = [
  '200px',
  '150px',
  '30px',
  '60px',
  '60px',
  '60px',
  '60px',
  '60px',
];

export function ServiceRow(props) {
  const { rowData, onRowClick, selected, minWidth, showRows } = props;
  let _minWidth = minWidth;
  if (!minWidth) {
    _minWidth = defaultminWidth;
  }

  if (rowData) {
    let low = calculateDuration(rowData.low);
    let percentile50 = calculateDuration(rowData.percentile50);
    let percentile95 = calculateDuration(rowData.percentile95);
    let percentile99 = calculateDuration(rowData.percentile99);
    let high = calculateDuration(rowData.high);
    return (
      <React.Fragment>
        <TableRow
          // onClick={onRowClick}
          hover
          selected={selected}
          sx={{
            position: 'sticky',
            backgroundColor: '#FFFFFF',
          }}
        >
          {showRows[0] ? (
            <StyledTableBodyCell
              component='th'
              scope='row'
              sx={{ minWidth: _minWidth[0] }}
            >
              <Tooltip title={rowData.service} placement='top-end'>
                <Box
                  sx={{
                    height: '30px',
                    lineHeight: '30px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#55bc8a',
                    },
                  }}
                  onClick={onRowClick}
                >
                  {rowData.service}
                </Box>
                {/*
                <SmallLightFont
                  style={{
                    color: 'black',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <>{rowData.service}</>
                </SmallLightFont>
                */}
              </Tooltip>
            </StyledTableBodyCell>
          ) : (
            <></>
          )}
          {showRows[1] ? (
            <StyledTableBodyCell align='center' sx={{ minWidth: _minWidth[1] }}>
              <Tooltip title={rowData.api} placement='top-end'>
                <>{rowData.api}</>
              </Tooltip>
            </StyledTableBodyCell>
          ) : (
            <></>
          )}
          {showRows[2] ? (
            <StyledTableBodyCell align='center' sx={{ minWidth: _minWidth[2] }}>
              <Tooltip title={rowData.count} placement='top-end'>
                <>{rowData.count}</>
              </Tooltip>
            </StyledTableBodyCell>
          ) : (
            <></>
          )}
          {showRows[3] ? (
            <StyledTableBodyCell align='center' sx={{ minWidth: _minWidth[3] }}>
              <Tooltip title={low} placement='top-end'>
                <>{low}</>
              </Tooltip>
            </StyledTableBodyCell>
          ) : (
            <></>
          )}
          {showRows[4] ? (
            <StyledTableBodyCell align='center' sx={{ minWidth: _minWidth[4] }}>
              <Tooltip title={percentile50} placement='top-end'>
                <>{percentile50}</>
              </Tooltip>
            </StyledTableBodyCell>
          ) : (
            <></>
          )}
          {showRows[5] ? (
            <StyledTableBodyCell align='center' sx={{ minWidth: _minWidth[5] }}>
              <Tooltip title={percentile95} placement='top-end'>
                <>{percentile95}</>
              </Tooltip>
            </StyledTableBodyCell>
          ) : (
            <></>
          )}
          {showRows[6] ? (
            <StyledTableBodyCell align='center' sx={{ minWidth: _minWidth[6] }}>
              <Tooltip title={percentile99} placement='top-end'>
                <>{percentile99}</>
              </Tooltip>
            </StyledTableBodyCell>
          ) : (
            <></>
          )}
          {showRows[7] ? (
            <StyledTableBodyCell align='center' sx={{ minWidth: _minWidth[7] }}>
              <Tooltip title={high} placement='top-end'>
                <>{high}</>
              </Tooltip>
            </StyledTableBodyCell>
          ) : (
            <></>
          )}
        </TableRow>
      </React.Fragment>
    );
  } else {
    //统计列数
    let num = showRows.reduce((total, item) => {
      return total + (item & 1);
    }, 0);
    let cells = [];
    for (let i = 1; i < num; i++) {
      cells.push(
        <StyledTableBodyCell
          align='center'
          sx={{ minWidth: _minWidth[i], color: 'transparent' }}
        >
          -
        </StyledTableBodyCell>
      );
    }
    return (
      <React.Fragment>
        <TableRow
          onClick={onRowClick}
          hover
          selected={selected}
          sx={{
            position: 'sticky',
            backgroundColor: '#FFFFFF',
          }}
        >
          <StyledTableBodyCell
            component='th'
            scope='row'
            sx={{ minWidth: _minWidth[0], color: 'transparent' }}
          >
            -
          </StyledTableBodyCell>
          {cells}
        </TableRow>
      </React.Fragment>
    );
  }
}

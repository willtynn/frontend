import React from 'react';
import dayjs from 'dayjs';
import { IconButton, Stack, TableRow, Tooltip } from '@mui/material';
import { StyledTableBodyCell } from '@/components/DisplayTable';

import { calculateDuration } from '@/Pages/DNN/Partition/overview/functions/func.js';
import PolylineIcon from "@mui/icons-material/Polyline";
import DeleteIcon from '@mui/icons-material/Delete';
const defaultMinWidth = ['100px'];

export function DataRow(props) {
  const { key, rowData, onRowClick, onDelete, selected, minWidth } = props;
  let _minWidth = minWidth;
  if (!minWidth) {
    _minWidth = defaultMinWidth;
  }

  if (rowData != null) {
    return (
      <React.Fragment>
        <TableRow  
          hover
          selected={false}
          key={key}
          sx={{
            position: 'sticky',
            backgroundColor: '#FFFFFF',
          }}
        >
          <StyledTableBodyCell
            onClick={onRowClick}
            component='th'
            scope='row'
            align='center'
            width="100%"
          >
            <Tooltip title={rowData} placement='top-end'>
              <>{rowData}</>
            </Tooltip>
          </StyledTableBodyCell>
          {/* 删除模型 */}
          <StyledTableBodyCell
            component='th'
            scope='row'
            align='center'
          >
            <Tooltip title="Delete">
              <IconButton aria-label="delete">
                <DeleteIcon onClick={onDelete}
                  size='small'
                  color='primary' />
              </IconButton>
            </Tooltip>

          </StyledTableBodyCell>
        </TableRow>
      </React.Fragment>
    );
  } else
    return (
      <React.Fragment>
        <TableRow onClick={onRowClick} sx={{ backgroundColor: '#FFFFFF' }}>
          <StyledTableBodyCell
            component='th'
            scope='row'
            sx={{ color: 'transparent' }}
          >
            -
          </StyledTableBodyCell>
          <StyledTableBodyCell
            component='th'
            scope='row'
            sx={{ color: 'transparent' }}
          >
            -
          </StyledTableBodyCell>
        </TableRow>
      </React.Fragment>
    );
}

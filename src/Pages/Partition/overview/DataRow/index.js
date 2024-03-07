import React from 'react';
import dayjs from 'dayjs';
import {IconButton, TableRow, Tooltip} from '@mui/material';
import { StyledTableBodyCell } from '@/components/DisplayTable';

import { calculateDuration } from '../functions/func.js';
import PolylineIcon from "@mui/icons-material/Polyline";

const defaultMinWidth = ['100px'];

export function DataRow(props) {
  const { key, rowData, onRowClick, selected, minWidth } = props;
  let _minWidth = minWidth;
  if (!minWidth) {
    _minWidth = defaultMinWidth;
  }

  if (rowData != null) {
    return (
      <React.Fragment>
        <TableRow
          onClick={onRowClick}
          hover
          selected={selected}
          key={key}
          sx={{
            position: 'sticky',
            backgroundColor: '#FFFFFF',
          }}
        >
          <StyledTableBodyCell
            component='th'
            scope='row'
            align='center'
            sx={{ minWidth: _minWidth[0] }}
          >
            <Tooltip title={rowData} placement='top-end'>
              <>子模型{rowData}</>
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
        </TableRow>
      </React.Fragment>
    );
}

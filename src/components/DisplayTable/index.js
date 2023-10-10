import React from 'react';
import {
  Box,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import { useDispatch, useSelector } from 'react-redux';

export const StyledTableRowCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F1F3F5",
    color: "#596A7C",
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '18px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  [`&.${tableCellClasses.root}`]: {
    maxWidth: '260px',
    // border: "1px solid white"
  },
}));

export const StyledTableBodyCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f1f3f5',
    color: '#505050',
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '18px',
    textTransform: 'uppercase',
  },
  [`&.${tableCellClasses.root}`]: {
    height: '43px',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: '24px',
  },
}));





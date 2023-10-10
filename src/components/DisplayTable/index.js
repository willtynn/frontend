import React from 'react';
import {
  Box,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import { useDispatch, useSelector } from 'react-redux';

export const StyledTableBox = styled(TableContainer)(() => ({
  width: '100%',
  overflow: 'hidden',
  boxShadow: '0px 0px 12px 0px rgba(38, 46, 53, 0.12)',
}));

export const StyledTableContainer = styled(TableContainer)(() => ({
  overflow: 'auto',
  width: '100%',
  borderColor: '#DFDEE8',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: '5px',
}));

export const StyledTableRowCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F1F3F5',
    color: '#596A7C',
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
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

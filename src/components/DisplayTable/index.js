import React from 'react';
import {
  Box,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Grid,
  Input,
  FormControl,
  Stack,
  Select,
  MenuItem,
  PaginationItem
} from '@mui/material';
import { styled } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

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

export function StyledTableFooter(props) {
  const {
    pageNum,
    pageSize,
    perPageList,
    count,
    handlePerPageChange,
    handlePageChange,
    width = '100%',
    backgroundColor = '#f1f3f5',
    sx,
    ...others
  } = props;

  return (
    <Box
      display='flex'
      sx={{
        background: backgroundColor,
        pl: 0,
        pr: 0,
        width: width,
        borderRadius: '0px 0px 8px 8px',
        border: '1px solid #DFE4E8',
        borderTop: 'none',
        ...sx,
      }}
      paddingY='3px'
      {...others}
    >
      <Stack
        // container
        direction='row'
        spacing={2}
        sx={{ width: '100%' }}
        justifyContent='center'
        alignItems='center'
      >
        <Grid item container md={6} justifyContent='center' alignItems='center'>
          <GlobalPagination
            id='tableFooterPagination'
            count={Math.ceil(count / pageSize)}
            handlePageChange={handlePageChange}
            page={pageNum}
          />
        </Grid>
        <Grid item md={3} alignItems='center' justifyContent='center'>

          {
            perPageList ? (
              <Stack
                direction='row'
                justifyContent='flex-start'
                alignItems='center'
                spacing={1}
              >
                <span
                  id='tableFooterRowsPerPageText'
                  style={{ fontSize: 'small', fontWeight: '600', color: '#262E35' }}
                >
                  <FormattedMessage id='table.rowsPerPage' />
                </span>
                <FormControl
                  id='tableFooterPageSelectFormControl'
                  sx={{ minWidth: 50 }}
                >
                  <Select
                    id='tableFooterRowsPerPageSelect'
                    sx={{ fontSize: 'small', fontWeight: '600', color: '#262E35' }}
                    value={pageSize}
                    onChange={handlePerPageChange}
                    input={<Input disableUnderline={true} />}
                  >
                    {perPageList.map(num => (
                      <MenuItem
                        id={`tableFooterRowsPerPagePageSize${num}`}
                        key={'pageSize-' + num}
                        value={num}
                      >
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            )
              : <Box> </Box>
          }
        </Grid>
      </Stack>
    </Box>
  );
}

function defaultColorFunc(item) {
  if (item.selected && item.type === 'page') {
    return '#F4F5F7';
  } else if (item.type === 'previous' || item.type === 'next') {
    if (item.disabled) {
      return '#DFE4E8';
    } else {
      return '#113D95';
    }
  } else {
    return '#596A7C';
  }
}

function defaultBgColorFunc(item) {
  if (item.selected && item.type === 'page') {
    return '#113D95';
  }
  return 'transparent';
}

export function GlobalPagination(props) {

  const { sx, id, page, count, handlePageChange, colorFunc = defaultColorFunc, bgColorFunc = defaultBgColorFunc } = props;

  return (
    <Pagination
      sx={sx}
      id={id}
      count={count}
      shape='rounded'
      onChange={handlePageChange}
      page={page}
      variant='text'
      renderItem={item => {
        return (
          <PaginationItem
            {...item}
            disableRipple
            id={`${id}-${item.page}`}
            selected={false}
            sx={{
              margin: "0 0.6px",
              backgroundColor: bgColorFunc(item),
              color: colorFunc(item),
              fontWeight: item.type !== 'page' ? 'bold' : 'regular',
              '&.Mui-disabled': {
                opacity: 1,
              },
              '&:hover': {
                color: '#596A7C',
              },
            }}
          />
        );
      }
      }
    />
  );
}
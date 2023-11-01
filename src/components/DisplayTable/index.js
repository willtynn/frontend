import { useState, useEffect } from 'react';
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
  PaginationItem,
  Popper,
  Checkbox,
  TableSortLabel,
} from '@mui/material';
import { styled } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Triangle from '@/assets/Triangle.svg';
import { fontFamily } from '../../utils/commonUtils';
import { KubeCheckbox } from '../Checkbox';

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
    backgroundColor: '#ffffff',
    color: '#79879c',
    fontWeight: 600,
    fontSize: '12px !important',
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
    padding: "0px 16px",
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '12px !important',
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
    backgroundColor = '#f9fbfd',
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
        <Grid item container md={9} justifyContent='center' alignItems='center'>
          <GlobalPagination
            id='tableFooterPagination'
            count={Math.ceil(count / pageSize)}
            handlePageChange={handlePageChange}
            page={pageNum}
          />
        </Grid>
        <Grid item md={3} alignItems='center' justifyContent='center'>
          {perPageList ? (
            <PageSizePopper
              id='pageSelectPopper'
              pageSize={pageSize}
              handlePageSizeChange={handlePerPageChange}
              pageSizeList={perPageList}
            />
          ) : (
            <Box> </Box>
          )}
        </Grid>
      </Stack>
    </Box>
  );
}

function PageSizePopper(props) {
  const { id, pageSize, handlePageSizeChange, pageSizeList } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [buttonOver, setButtonOver] = useState(false);
  const [popperOver, setPopperOver] = useState(false);

  const handleButtonOver = event => {
    setButtonOver(true);
    setAnchorEl(event.currentTarget);
    // setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleButtonLeave = () => {
    setTimeout(() => {
      setButtonOver(false);
    }, 300);
  };

  const handlePoppernOver = event => {
    setPopperOver(true);
  };

  const handlePopperLeave = () => {
    setTimeout(() => {
      setPopperOver(false);
    }, 300);
  };

  useEffect(() => {
    if (buttonOver === false && popperOver === false) {
      setAnchorEl(null);
    }
  }, [buttonOver, popperOver]);

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Box
        aria-describedby={id}
        sx={{ cursor: 'pointer', display: 'inline-block' }}
      >
        <Stack
          onMouseOver={handleButtonOver}
          onMouseLeave={handleButtonLeave}
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={1}
          sx={{
            fontFamily: fontFamily,
          }}
        >
          <span
            id='tableFooterRowsPerPageText'
            style={{
              fontSize: 'small',
              fontWeight: '600',
              color: '#262E35',
              lineHeight: '16px',
            }}
          >
            <FormattedMessage id='table.rowsPerPage' />
          </span>
          <Stack direction='row' spacing={1}>
            <Box sx={{ lineHeight: '22px' }}>{pageSize}</Box>
            <Box>
              <Triangle />
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        sx={{
          zIndex: 1000,
          boxShadow: '0 4px 16px 0 rgba(39,50,71,.28)',
          borderRadius: '4px',
        }}
      >
        <Stack
          direction='column'
          sx={{
            border: '1px solid #FAFAFA',
            width: '90px',
            borderRadius: '5px',
            padding: '8px',
            bgcolor: '#FFF',
            fontFamily: fontFamily,
          }}
          onMouseOver={handlePoppernOver}
          onMouseLeave={handlePopperLeave}
        >
          {pageSizeList&&pageSizeList.map((value, index) => {
            return (
              <Box
                sx={{
                  '&:hover': {
                    bgcolor: '#eff4f9',
                  },
                  cursor: 'pointer',
                  textAlign: 'center',
                  height: '30px',
                  lineHeight: '30px',
                }}
                onClick={handlePageSizeChange.bind(this, value)}
              >
                {value}
              </Box>
            );
          })}
        </Stack>
      </Popper>
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
      return '#2E2E42';
    }
  } else {
    return '#596A7C';
  }
}

function defaultBgColorFunc(item) {
  if (item.selected && item.type === 'page') {
    return '#2E2E42';
  }
  return 'transparent';
}

export function GlobalPagination(props) {
  const {
    sx,
    id,
    page,
    count,
    handlePageChange,
    colorFunc = defaultColorFunc,
    bgColorFunc = defaultBgColorFunc,
  } = props;

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
              margin: '0 0.6px',
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
      }}
    />
  );
}

export function StyledTableHead(props) {
  const { headRow, selectAll, order, orderBy, onRequestSort, checkAll, setCheckAll } = props;

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow sx={{
        zIndex: 7,
        position: "relative"
      }}>
        {selectAll === true ? (
          <StyledTableRowCell
            align='center'
            sx={{
              maxWidth: "30px",
              minWidth: "30px",
            }}
          >
            <KubeCheckbox
              sx={{
                bgcolor: 'transparent !important',
              }}
              disableRipple
              size="small"
              checked={checkAll}
              onChange={(e) => setCheckAll(e.target.checked)}
            />
          </StyledTableRowCell>
        ) : (
          <></>
        )}

        {headRow&&headRow.map((item, index) => {
          if (item.isOrder) {
            return (
              <StyledTableRowCell
                key={item.id}
                align={item.align}
                style={{display: item.show ? 'table-cell' : 'none'}}
                sx={{
                  maxWidth: item.maxWidth,
                  minWidth: item.minWidth,
                }}
                sortDirection={orderBy === item.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === item.id}
                  direction={orderBy === item.id ? order : 'asc'}
                  onClick={createSortHandler(item.id)}
                >
                  {item.label}
                  {orderBy === item.id ? (
                    <Box component='span' sx={visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </StyledTableRowCell>
            );
          }
          return (
            <StyledTableRowCell
              key={item.id}
              align={item.align}
              style={{display: item.show ? 'table-cell' : 'none'}}
              sx={{
                maxWidth: item.maxWidth,
                minWidth: item.minWidth,
              }}
            >
              {item.label}
            </StyledTableRowCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

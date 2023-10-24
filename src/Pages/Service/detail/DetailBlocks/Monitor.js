import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Stack,
  Box,
  InputAdornment,
  Tooltip,
  Popover,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import {
  KubeConfirmButton,
  KubeCancelButton,
  EclipseTransparentButton,
} from '@/components/Button';
import { fontFamily } from '@/utils/commonUtils';
import { KubeSimpleCard } from '../../../../components/InfoCard';
import {
  StyledTableBodyCell,
  StyledTableContainer,
  StyledTableHead,
  StyledTableFooter,
} from '@/components/DisplayTable';
import { KubeAdornmentTextField } from '../../../../components/Input';
import KubeSearch from '@/assets/KubeSearch.svg';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  getRouteService,
  UPDATE_ROUTE_SERVICE,
  CHANGE_PAGE_SIZE,
  CHANGE_PAGE_NUM,
} from '@/actions/routeAction';
import API from '@/assets/API.svg';
import WhiteAPI from '@/assets/WhiteAPI.svg';
import Watch from '@/assets/Watch.svg';
import dayjs from 'dayjs';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { KubeDatePicker } from '../../../../components/DatePicker';
import { calculateDuration } from '../../../Route/trace/functions/func';

const RangeCandidate = [
  ['最近10分钟', -10, 'minute'],
  ['最近20分钟', -20, 'minute'],
  ['最近30分钟', -30, 'minute'],
  ['最近1小时', -1, 'hour'],
  ['最近2小时', -2, 'hour'],
  ['最近3小时', -3, 'hour'],
  ['最近5小时', -5, 'hour'],
  ['最近12小时', -12, 'hour'],
  ['最近1天', -1, 'day'],
  ['最近2天', -2, 'day'],
  ['最近3天', -3, 'day'],
  ['最近7天', -7, 'day'],
];

function createRow(
  id,
  label,
  isOrder = true,
  minWidth = '110px',
  maxWidth = '220px',
  show = true,
  align = 'center',
  colSpan = 1,
  rowSpan = 1
) {
  return {
    id,
    label,
    isOrder,
    minWidth,
    maxWidth,
    show,
    align,
    colSpan,
    rowSpan,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export default function Monitor(props) {
  const { service } = props;

  const [apiSearchValue, setApiSearchValue] = useState('');
  const [rangeIndex, setRangeIndex] = useState(4);
  const [start, setStart] = useState(dayjs().add(-2, 'hour'));
  const [end, setEnd] = useState(dayjs());

  const [tmpStart, setTmpStart] = useState(dayjs().add(-2, 'hour'));
  const [tmpEnd, setTmpEnd] = useState(dayjs());

  const [enter, setEnter] = useState(0);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const [rangeSelectAnchorEl, setRangeSelectAnchorEl] = useState(null);
  const rangeSelectOpen = Boolean(rangeSelectAnchorEl);
  const [loading, setLoading] = useState(false);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('low');

  const headRow = [
    createRow('api', '接口', true, '200px', '400px', true, 'left'),
    createRow('count', '请求次数', false, '50px', '80px', true, 'center'),
    createRow('low', 'LOW', true, '100px', '100px', true, 'center'),
    createRow('high', 'HIGH', true, '50px', '80px', true, 'center'),
    createRow('percentile50', 'p50', true, '100px', '100px', true, 'center'),
    createRow('percentile95', 'p95', true, '50px', '80px', true, 'center'),
    createRow('percentile99', 'p99', true, '50px', '80px', true, 'center'),
  ];

  const { routeService, pageSize, pageNum } = useSelector(state => {
    return {
      routeService: state.Route.routeService,
      pageSize: state.Route.pageSize,
      pageNum: state.Route.pageNum,
    };
  });

  useEffect(() => {
    dispatch(getRouteService(start.valueOf(), end.valueOf()));
    return () => {
      dispatch({ type: UPDATE_ROUTE_SERVICE, data: [] });
      dispatch({ type: CHANGE_PAGE_SIZE, data: 10 });
      dispatch({ type: CHANGE_PAGE_NUM, data: 1 });
    };
  }, []);

  useEffect(() => {
    dispatch(getRouteService(start.valueOf(), end.valueOf()));
  }, [start, end]);

  useEffect(() => {
    if (rangeIndex > 11) {
      return;
    }
    setStart(
      dayjs().add(RangeCandidate[rangeIndex][1], RangeCandidate[rangeIndex][2])
    );
    setEnd(dayjs());
  }, [rangeIndex]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const visibleAPI = useMemo(() => {
    if (!service || !service.metadata || !routeService) return [];
    const tmpService = routeService.filter(item => {
      // return true;
      // return item.service === service.metadata.name;
      return item.service === service.metadata.name && (apiSearchValue==="" || item.api.includes(apiSearchValue));
    });
    setCount(tmpService.length);
    return stableSort(tmpService, getComparator(order, orderBy)).slice(
      (pageNum - 1) * pageSize,
      (pageNum - 1) * pageSize + pageSize
    );
  }, [routeService, pageNum, pageSize, order, orderBy, enter]);

  const resetParameter = () => {
    setRangeIndex(4);
    setTmpStart(dayjs().add(-2, 'hour'));
    setTmpEnd(dayjs());
  };

  //改变每页的数量
  const handlePerPageChange = pageSize => {
    dispatch({ type: CHANGE_PAGE_SIZE, data: pageSize });
  };

  //改变页码
  const handlePageChange = (_event, newPage) => {
    dispatch({ type: CHANGE_PAGE_NUM, data: newPage });
  };

  const handleSearchInputChange = e => {
    setApiSearchValue(e.target.value);
  };

  const handleRefresh = () => {
    setApiSearchValue('');
    resetParameter();
    // dispatch(searchPodsByServiceName(service.name));
  };

  const handleRangeConfirm = () => {
    setStart(tmpStart);
    setEnd(tmpEnd);
    handleClose();
  };

  const handleKeyDown = e => {
    if (typeof e.target.value === 'string' && e.keyCode === 13) {
      setEnter(prev => prev + 1);
    }
  };

  const handleClose = () => {
    setRangeSelectAnchorEl(null);
  };

  const handleRangeSelectClick = e => {
    setRangeSelectAnchorEl(e.currentTarget);
  };

  const handleRangeButtonClick = index => {
    setRangeIndex(index);
    handleClose();
  };

  return (
    <KubeSimpleCard title='请求监控'>
      <Popover
        id='instance-status-table-custom-content-popover'
        open={rangeSelectOpen}
        anchorEl={rangeSelectAnchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          zIndex: 1000,
          boxShadow: '0 4px 16px 0 rgba(39,50,71,.28)',
          borderRadius: '4px',
          mt: '8px !important',
        }}
      >
        <Stack
          sx={{
            width: '720px',
            padding: '20px',
            bgcolor: '#FFFFFF',
            borderRadius: '4px',
            boxShadow: '0 4px 8px 0 rgba(36,46,66,.06)',
          }}
          direction='row'
        >
          {/* 左侧 */}
          <Box
            sx={{
              width: '360px',
            }}
          >
            <Box
              sx={{
                width: '120px',
                fontSize: '14px',
                fontFamily: fontFamily,
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: 1.67,
                color: '#79879c',
                mb: '12px',
              }}
            >
              选择时间范围
            </Box>
            <Stack direction='row'>
              {[0, 1, 2].map(value => {
                return (
                  <Stack sx={{}} direction='column' spacing={1}>
                    {RangeCandidate.slice(value * 5, 5 * (value + 1)).map(
                      (candidate, index) => {
                        return (
                          <Box
                            sx={{
                              width: '120px',
                              fontSize: '12px',
                              fontFamily: fontFamily,
                              fontStyle: 'normal',
                              fontWeight: 600,
                              lineHeight: 1.67,
                              color:
                                value * 5 + index === rangeIndex
                                  ? '#55bc8a'
                                  : '#242E42',
                              '&:hover': {
                                color: '#55bc8a',
                              },
                              cursor: 'pointer',
                            }}
                            onClick={handleRangeButtonClick.bind(
                              this,
                              value * 5 + index
                            )}
                          >
                            {candidate[0]}
                          </Box>
                        );
                      }
                    )}
                  </Stack>
                );
              })}
            </Stack>
          </Box>

          {/* 右侧 */}
          <Box
            sx={{
              width: '360px',
            }}
          >
            <Box
              sx={{
                width: '120px',
                fontSize: '14px',
                fontFamily: fontFamily,
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: 1.67,
                color: '#79879c',
                mb: '12px',
              }}
            >
              自定义时间范围
            </Box>

            {/* 两个Datetime Picker */}
            <Stack direction='column' spacing={1.5}>
              <Box>
                <Box
                  sx={{
                    fontSize: '12px',
                    fontFamily: fontFamily,
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: 1.67,
                    color: '#36435c',
                  }}
                >
                  开始时间
                </Box>
                <KubeDatePicker value={tmpStart} setValue={setTmpStart} />
              </Box>

              <Box>
                <Box
                  sx={{
                    fontSize: '12px',
                    fontFamily: fontFamily,
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: 1.67,
                    color: '#36435c',
                  }}
                >
                  结束时间
                </Box>
                <KubeDatePicker value={tmpEnd} setValue={setTmpEnd} />
              </Box>
            </Stack>

            {/* 按钮 */}
            <Stack
              direction='row'
              justifyContent='flex-end'
              spacing={1.5}
              sx={{ mt: '32px' }}
            >
              <KubeCancelButton
                sx={{ height: '32px', width: '84px' }}
                onClick={handleClose}
              >
                取消
              </KubeCancelButton>
              <KubeConfirmButton
                sx={{ height: '32px', width: '84px' }}
                onClick={handleRangeConfirm}
              >
                确定
              </KubeConfirmButton>
            </Stack>
          </Box>
        </Stack>
      </Popover>

      <Stack direction='row' spacing={1.5} justifyContent='space-between'>
        {/* 搜索框 */}
        <KubeAdornmentTextField
          onChange={handleSearchInputChange}
          value={apiSearchValue}
          onKeyDown={handleKeyDown}
          sx={{
            width: 'calc(100% - 60px)',
            '&.MuiFormControl-root.MuiTextField-root .MuiInputBase-root.MuiOutlinedInput-root':
              {
                padding: '0px 0px 0px 12px !important',
                height: '32px',
                flexFlow: 'wrap',
                paddingY: '4px',
                '& input': {
                  flexGrow: 1,
                  width: '10%',
                  '&:placeholder-shown': {
                    fontWeight: '400 !important',
                    fontSize: '12px !important',
                    lineHeight: 1.67,
                  },
                },
                bgcolor: '#EFF4F9',
              },
            '& fieldset': {
              border: '1px solid rgba(0, 0, 0, 0.23) !important',
            },
            '& .Mui-focused': {
              bgcolor: '#FFFFFF !important',
            },

            '& .MuiOutlinedInput-input.MuiInputBase-input': {
              fontSize: '12px',
              fontWeight: 600,
              fontStyle: 'normal',
              fontStretch: 'normal',
              lineHeight: 1.67,
              letterSpacing: 'normal',
              color: '#36435c',
              height: '20px',
              padding: '7px 12px 7px 0px !important',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <KubeSearch />
              </InputAdornment>
            ),
          }}
          placeholder='按名称搜索'
          inputProps={{}}
        />

        <Stack
          sx={{
            padding: '4px',
            bgcolor: '#242E42',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          spacing={1}
          onClick={handleRangeSelectClick}
        >
          <Watch />
          <Box
            sx={{
              minWidth: '160px',
              fontSize: '12px',
              fontFamily: fontFamily,
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 1.67,
              color: '#FFFFFF',
            }}
          >
            {RangeCandidate[rangeIndex][0]}
          </Box>
          {rangeSelectOpen ? (
            <ArrowDropUpIcon style={{ color: '#FFF' }} />
          ) : (
            <ArrowDropDownIcon style={{ color: '#FFF' }} />
          )}
        </Stack>

        {/* 刷新按钮 */}
        <EclipseTransparentButton
          sx={{
            bgcolor: '#f9fbfd !important',
            '&:hover': {
              bgcolor: '#EFF4F9 !important',
            },
            '& svg': {
              color: '#3d3b4f',
            },
            height: '32px',
          }}
          onClick={handleRefresh}
        >
          <RefreshIcon fontSize='small' />
        </EclipseTransparentButton>
      </Stack>

      {/* API详情 */}
      <Box sx={{ width: 'calc(100% - 0px)', mt: '20px' }}>
        <StyledTableContainer sx={{ bgcolor: '#FFF', width: '100%' }}>
          <Table
            stickyHeader
            size='small'
            sx={{
              tableLayout: 'auto',
              width: '100%',
            }}
          >
            <StyledTableHead
              headRow={headRow}
              selectAll={false}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />

            <TableBody>
              {!loading && visibleAPI !== null && visibleAPI.length !== 0 ? (
                visibleAPI.map((row, index) => {
                  return (
                    <TableRow
                      key={row.id + '' + index}
                      aria-checked={false}
                      sx={{
                        '&:last-child td, &:last-child th': {
                          border: 0,
                        },
                        fontWeight: 600,
                        maxWidth: '110px',
                        position: 'sticky',
                        left: 0,
                        zIndex: 6,
                      }}
                      selected={false}
                    >
                      <StyledTableBodyCell
                        align={'left'}
                        sx={{
                          padding: '6px 16px !important',
                          minWidth: headRow[0].minWidth,
                          maxWidth: headRow[0].maxWidth,
                        }}
                      >
                        <Box>
                          <Tooltip title={row.api}>
                            <Box
                              component='div'
                              sx={{
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                              }}
                            >
                              {row.api}
                            </Box>
                          </Tooltip>
                        </Box>
                      </StyledTableBodyCell>

                      <StyledTableBodyCell
                        align={'center'}
                        sx={{
                          display: headRow[1].show ? 'table-cell' : 'none',
                          minWidth: headRow[1].minWidth,
                          maxWidth: headRow[1].maxWidth,
                        }}
                      >
                        {row.count}
                      </StyledTableBodyCell>

                      <StyledTableBodyCell
                        align={'center'}
                        sx={{
                          display: headRow[2].show ? 'table-cell' : 'none',
                          minWidth: headRow[2].minWidth,
                          maxWidth: headRow[2].maxWidth,
                        }}
                      >
                        {calculateDuration(row.low)}
                      </StyledTableBodyCell>

                      <StyledTableBodyCell
                        align={'center'}
                        sx={{
                          display: headRow[3].show ? 'table-cell' : 'none',
                          minWidth: headRow[3].minWidth,
                          maxWidth: headRow[3].maxWidth,
                        }}
                      >
                        {calculateDuration(row.high)}
                      </StyledTableBodyCell>

                      <StyledTableBodyCell
                        align={'center'}
                        sx={{
                          display: headRow[4].show ? 'table-cell' : 'none',
                          minWidth: headRow[4].minWidth,
                          maxWidth: headRow[4].maxWidth,
                        }}
                      >
                        {calculateDuration(row.percentile50)}
                      </StyledTableBodyCell>

                      <StyledTableBodyCell
                        align={'center'}
                        sx={{
                          display: headRow[5].show ? 'table-cell' : 'none',
                          minWidth: headRow[5].minWidth,
                          maxWidth: headRow[5].maxWidth,
                        }}
                      >
                        {calculateDuration(row.percentile95)}
                      </StyledTableBodyCell>

                      <StyledTableBodyCell
                        align={'center'}
                        sx={{
                          display: headRow[6].show ? 'table-cell' : 'none',
                          minWidth: headRow[6].minWidth,
                          maxWidth: headRow[6].maxWidth,
                        }}
                      >
                        {calculateDuration(row.percentile99)}
                      </StyledTableBodyCell>
                    </TableRow>
                  );
                })
              ) : !loading ? (
                <TableRow style={{ height: '220px' }}>
                  <TableCell
                    colSpan={6}
                    sx={{
                      textAlign: 'center',
                      fontSize: '20px',
                      fontFamily: fontFamily,
                      fontStyle: 'normal',
                    }}
                  >
                    There are no results...
                  </TableCell>
                </TableRow>
              ) : (
                <div></div>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <StyledTableFooter
          pageNum={pageNum}
          pageSize={pageSize}
          // perPageList={[]}
          count={count}
          handlePerPageChange={handlePerPageChange}
          handlePageChange={handlePageChange}
          sx={{
            pt: '12px',
            pb: '12px',
          }}
        />
      </Box>
    </KubeSimpleCard>
  );
}

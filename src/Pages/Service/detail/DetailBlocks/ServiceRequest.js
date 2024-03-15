/**
 * src\Pages\Service\detail\DetailBlocks\ServiceRequest.js
 */
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
import { formatDatetimeString } from '@/utils/commonUtils';
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
  getRouteTrace,
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
import Question from '@/assets/Question.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import { useIntl } from 'react-intl';

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

export default function ServiceRequest(props) {
  const { service } = props;
  const intl = useIntl();
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
  const [orderBy, setOrderBy] = useState('responseTime');

  const [currentAPI, setCurrentAPI] = useState('');

  const headRow = [
    createRow('request', '请求', false, '200px', '400px', true, 'left'),
    createRow('length', '链路长度', false, '50px', '80px', true, 'center'),
    createRow('startTime', '开始时间', true, '100px', '100px', true, 'center'),
    createRow(
      'responseTime',
      '响应时间',
      true,
      '100px',
      '100px',
      true,
      'center'
    ),
    createRow('method', '请求方法', false, '50px', '80px', true, 'center'),
    createRow('code', '响应码', false, '50px', '80px', true, 'center'),
  ];

  const { routeService, routeTrace, pageSize, pageNum } = useSelector(state => {
    return {
      routeService: state.Route.routeService,
      routeTrace: state.Route.routeTrace,
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
    if (rangeIndex > 11) {
      return;
    }
    setStart(
      dayjs().add(RangeCandidate[rangeIndex][1], RangeCandidate[rangeIndex][2])
    );
    setEnd(dayjs());
  }, [rangeIndex]);

  useEffect(() => {
    dispatch(
      getRouteTrace(
        start.valueOf(),
        end.valueOf(),
        'route-control-service.cloud-collaboration-platform',
        currentAPI
      )
    );
  }, [currentAPI, start, end]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const find = (tags, target) => {
    for (const tag of tags) {
      if (tag.key === target) {
        return tag.value;
      }
    }
    return '';
  };

  const visibleRows = useMemo(() => {
    if (!routeTrace) return [];
    const traceData = routeTrace.map(item => {
      return {
        request: find(item.trace.spans[0].tags, 'http.url'),
        length: item.trace.spans.length,
        startTime: item.time,
        responseTime: item.trace.spans
          .map(span => span.duration)
          .reduce((a, b) => a + b, 0),
        method: find(item.trace.spans[0].tags, 'http.method'),
        code: find(item.trace.spans[0].tags, 'http.status_code'),
      };
    });
    setCount(traceData.length);
    return stableSort(traceData, getComparator(order, orderBy)).slice(
      (pageNum - 1) * pageSize,
      (pageNum - 1) * pageSize + pageSize
    );
  }, [routeTrace, pageNum, pageSize, order, orderBy]);

  const visibleAPI = useMemo(() => {
    if (!service || !service.metadata || !routeService) return [];
    return routeService.filter(item => {
      // return true;
      return item.service === service.metadata.name;
    });
  }, [routeService]);

  useEffect(() => {
    if (visibleAPI.length > 0) {
      setCurrentAPI(visibleAPI[0].api);
    }
  }, [visibleAPI]);

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

  const handleApiChange = api => {
    setCurrentAPI(api);
    resetParameter();
  };

  return (
    <KubeSimpleCard title='服务接口请求'>
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
      <Stack direction='row' sx={{ mt: '20px' }} spacing={2}>
        {/* 左侧api列表 */}
        <Box
          sx={{
            maxHeight: '660px',
            overflowY: 'auto',
          }}
        >
          <Stack direction='column' spacing={1}>
            {visibleAPI.map((api, index) => {
              return (
                <Stack
                  sx={{
                    padding: '8px 20px',
                    width: '200px',
                    height: '52px',
                    borderRadius: '4px',
                    bgcolor: currentAPI === api.api ? '#55bc8a' : '#FFFFFF',
                    color: currentAPI === api.api ? '#FFFFFF' : '#242E42',
                    '&:hover': {
                      bgcolor: '#55bc8a',
                      color: '#FFFFFF',
                    },
                    cursor: 'pointer',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={handleApiChange.bind(this, api.api)}
                  direction='row'
                  alignItems='center'
                  spacing={2.5}
                >
                  <Box>{currentAPI === api.api ? <WhiteAPI /> : <API />}</Box>

                  <Box
                    sx={{
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: '12px',
                        fontFamily: fontFamily,
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: 1.67,
                        color: '#242e42',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {api.api}
                    </Box>
                    <Box
                      sx={{
                        fontSize: '12px',
                        fontFamily: fontFamily,
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: 1.67,
                        color: '#79879c',
                      }}
                    >
                      API
                    </Box>
                  </Box>
                </Stack>
              );
            })}
          </Stack>
        </Box>

        {/* 右侧请求详情 */}
        <Box sx={{ width: 'calc(100% - 256px)' }}>
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
                {!loading &&
                visibleRows !== null &&
                visibleRows.length !== 0 ? (
                  visibleRows.map((row, index) => {
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
                            <Tooltip title={row.request}>
                              <Box
                                component='div'
                                sx={{
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                }}
                              >
                                {row.request}
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
                          {row.length}
                        </StyledTableBodyCell>

                        <StyledTableBodyCell
                          align={'center'}
                          sx={{
                            display: headRow[2].show ? 'table-cell' : 'none',
                            minWidth: headRow[2].minWidth,
                            maxWidth: headRow[2].maxWidth,
                          }}
                        >
                          {formatDatetimeString(row.startTime)}
                        </StyledTableBodyCell>

                        <StyledTableBodyCell
                          align={'center'}
                          sx={{
                            display: headRow[3].show ? 'table-cell' : 'none',
                            minWidth: headRow[3].minWidth,
                            maxWidth: headRow[3].maxWidth,
                          }}
                        >
                          {calculateDuration(row.responseTime)}
                        </StyledTableBodyCell>

                        <StyledTableBodyCell
                          align={'center'}
                          sx={{
                            display: headRow[4].show ? 'table-cell' : 'none',
                            minWidth: headRow[4].minWidth,
                            maxWidth: headRow[4].maxWidth,
                          }}
                        >
                          {row.method}
                        </StyledTableBodyCell>

                        <StyledTableBodyCell
                          align={'center'}
                          sx={{
                            display: headRow[5].show ? 'table-cell' : 'none',
                            minWidth: headRow[5].minWidth,
                            maxWidth: headRow[5].maxWidth,
                          }}
                        >
                          {row.code}
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
                      <Question />
                      <NormalBoldFont>
                        {intl.messages['common.serviceTableContentNoData']}
                      </NormalBoldFont>

                      <SmallLightFont>
                        {intl.messages['common.serviceTableContentNoDataHint']}
                      </SmallLightFont>
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
      </Stack>
    </KubeSimpleCard>
  );
}

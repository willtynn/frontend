/**
 * src\Pages\Service\detail\DetailBlocks\RequestMonitor.js
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
import Watch from '@/assets/Watch.svg';
import dayjs from 'dayjs';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { KubeDatePicker } from '../../../../components/DatePicker';
import { calculateDuration } from '../../../Route/trace/functions/func';
import Question from '@/assets/Question.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import { useIntl } from 'react-intl';



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

export default function RequestMonitor(props) {
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
  const [orderBy, setOrderBy] = useState('low');

  const RangeCandidate = [
    [intl.messages['serviceOverview.duration10M'], -10, 'minute'],
    [intl.messages['serviceOverview.duration20M'], -20, 'minute'],
    [intl.messages['serviceOverview.duration30M'], -30, 'minute'],
    [intl.messages['serviceOverview.duration1H'], -1, 'hour'],
    [intl.messages['serviceOverview.duration2H'], -2, 'hour'],
    [intl.messages['serviceOverview.duration3H'], -3, 'hour'],
    [intl.messages['serviceOverview.duration5H'], -5, 'hour'],
    [intl.messages['serviceOverview.duration12H'], -12, 'hour'],
    [intl.messages['serviceOverview.duration1D'], -1, 'day'],
    [intl.messages['serviceOverview.duration2D'], -2, 'day'],
    [intl.messages['serviceOverview.duration3D'], -3, 'day'],
    [intl.messages['serviceOverview.duration7D'], -7, 'day'],
  ];

  const headRow = [
    createRow('api', intl.messages['common.interface'], true, '200px', '400px', true, 'left'),
    createRow('count', intl.messages['routeTrace.serviceTableTitleRequestCount'], false, '50px', '80px', true, 'center'),
    createRow('low', intl.messages['routeTrace.serviceTableTitleLow'], true, '100px', '100px', true, 'center'),
    createRow('high', intl.messages['routeTrace.serviceTableTitleHigh'], true, '50px', '80px', true, 'center'),
    createRow('percentile50',  intl.messages['routeTrace.serviceTableTitle05'], true, '100px', '100px', true, 'center'),
    createRow('percentile95', intl.messages['routeTrace.serviceTableTitle095'], true, '50px', '80px', true, 'center'),
    createRow('percentile99', intl.messages['routeTrace.serviceTableTitle099'], true, '50px', '80px', true, 'center'),
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
    <KubeSimpleCard title={intl.messages['serviceOverview.requestMonitor']}>
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
              {intl.messages['serviceOverview.selectTimeRange']}
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
              {intl.messages['serviceOverview.customTimeRange']}
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
                  {intl.messages['common.beginTime']}
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
                  {intl.messages['common.endTime']}
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
                {intl.messages['common.cancel']}
              </KubeCancelButton>
              <KubeConfirmButton
                sx={{ height: '32px', width: '84px' }}
                onClick={handleRangeConfirm}
              >
                {intl.messages['common.confirm']}
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
          placeholder={intl.messages['common.searchByName']}
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
                  colSpan={7}
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
    </KubeSimpleCard>
  );
}

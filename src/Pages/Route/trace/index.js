// imports
//#region

/**
 * src\Pages\Route\trace\index.js
 */
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  MenuItem,
  Box,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Popover,
} from '@mui/material';
import Question from '@/assets/Question.svg';
import Link60 from '@/assets/Link60.svg';
import {
  KubeConfirmButton,
  EclipseTransparentButton,
} from '@/components/Button';
import { StyledDateTimePicker, StyledSelect } from '@/components/Input';
import {
  StyledTableRowCell,
  StyledTableContainer,
  StyledTableFooter,
} from '@/components/DisplayTable';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { fontFamily } from '@/utils/commonUtils';
import { ServiceRow } from './ServiceRow';
import { Loading } from './Loading';
import dayjs from 'dayjs';

import {
  getRouteService,
  clearRouteTrace,
  clearFailed,
} from '@/actions/routeAction';

import { useIntl } from 'react-intl';

//#endregion
//import

//Constants
//#region

const serviceNumPerPage = 10;
//#endregion
//Constants

export default function RouteTrace() {
  //定义-开始
  //#region

  
  const intl = useIntl();

  const selectMenuItems = [
    intl.messages['routeTrace.duration1M'],
    intl.messages['routeTrace.duration2M'],
    intl.messages['routeTrace.duration5M'],
    intl.messages['routeTrace.duration10M'],
    intl.messages['routeTrace.duration30M'],
    intl.messages['routeTrace.duration1H'],
    intl.messages['routeTrace.duration3H'],
    intl.messages['routeTrace.duration6H'],
    intl.messages['routeTrace.duration12H'],
    intl.messages['routeTrace.duration1D'],
    intl.messages['routeTrace.duration7D'],
    intl.messages['routeTrace.durationCustom'],
  ];
  const durationList = [
    60, 120, 300, 600, 1800, 3600, 10800, 21600, 43200, 86400, 604800,
  ];

  const serviceTableHeaders = [
    { key: 'service', align: 'left', text: intl.messages['routeTrace.serviceTableTitleService'], minWidth: 200, maxWidth: 200 },
    { key: 'api', align: 'center', text: intl.messages['routeTrace.serviceTableTitleApi'], minWidth: 100, maxWidth: 150 },
    {
      key: 'count',
      align: 'center',
      text: intl.messages['routeTrace.serviceTableTitleRequestCount'],
      minWidth: 85,
      maxWidth: 85,
    },
    { key: 'low', align: 'center', text: intl.messages['routeTrace.serviceTableTitleLow'], minWidth: 60, maxWidth: 60 },
    {
      key: 'percentile50',
      align: 'center',
      text: intl.messages['routeTrace.serviceTableTitle05'],
      minWidth: 60,
      maxWidth: 60,
    },
    {
      key: 'percentile95',
      align: 'center',
      text: intl.messages['routeTrace.serviceTableTitle095'],
      minWidth: 60,
      maxWidth: 60,
    },
    {
      key: 'percentile99',
      align: 'center',
      text: intl.messages['routeTrace.serviceTableTitle099'],
      minWidth: 60,
      maxWidth: 60,
    },
    { key: 'high', align: 'center', text: intl.messages['routeTrace.serviceTableTitleHigh'], minWidth: 60, maxWidth: 60 },
  ];




  const navigate = useNavigate();

  const [durationSelectIndex, setDurationSelectIndex] = useState(5);

  const [startTimeValue, setStartTimeValue] = useState(dayjs().add(-1, 'hour'));
  const [endTimeValue, setEndTimeValue] = useState(dayjs());

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const [serviceRow, setServiceRow] = useState([]);

  const [servicePage, setServicePage] = useState(0);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(-1);

  const [showLoading, setShowLoading] = useState(false);

  const [showEmpty, setShowEmpty] = useState(false);
  //const [showSubPage, setShowSubPage] = useState(false);

  const [showServiceColumnChooseAnchorEl, setShowServiceColumnChooseAnchorEl] =
    useState(null);
  const showServiceColumnChooseOpen = Boolean(showServiceColumnChooseAnchorEl);

  const [serviceColumnDisplay, setServiceColumnDisplay] = useState([
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    true,
  ]);

  const dispatch = useDispatch();

  const { routeService, routeFailed } = useSelector(state => {
    return {
      routeService: state.Route.routeService,
      routeFailed: state.Route.routeFailed,
    };
  });

  const serviceVisibleRows = React.useMemo(() => {
    if (!routeService || routeService.length === 0) {
      setShowEmpty(true);
      return [];
    }
    setShowEmpty(false);
    const tmp = (servicePage - 1) * serviceNumPerPage;
    return routeService.slice(tmp, tmp + serviceNumPerPage);
  }, [routeService, servicePage]);

  //#endregion
  //定义-结束

  //自定义函数-开始
  //#region
  const changePage = (id, start, end) => {
    navigate(`/detail/trace/${start}/${end}/${id}`);
  };

  const clearPage = () => {
    setSelectedServiceIndex(-1);
    setServicePage(1);
  };

  const getVisibleRows = () => {
    return serviceColumnDisplay.reduce(
      (prev, curr) => (curr ? prev + 1 : prev),
      0
    );
  };

  //#endregion
  //自定义函数-结束
  const startLoading = () => {
    setShowLoading(true);
    document.body.style.overflow = 'hidden';
  };

  const endLoading = () => {
    setShowLoading(false);
    document.body.style.overflow = 'auto';
  };
  //HOOK-开始
  //#region

  useEffect(() => {
    if (routeFailed) {
      endLoading();
      dispatch(clearFailed());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeFailed]);

  useEffect(() => {
    endLoading();
    dispatch(clearFailed());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeService]);

  useEffect(() => {
    if (serviceVisibleRows) {
      let minWidths = serviceTableHeaders.map(item => item.minWidth);
      let row = serviceVisibleRows.map((item, index) => {
        return (
          <ServiceRow
            key={item.id}
            selected={selectedServiceIndex === index}
            onRowClick={() => handleServiceClick(index)}
            rowData={{ ...item, spanNum: 99 }}
            showRows={serviceColumnDisplay}
            maxWidth={minWidths}
          />
        );
      });
      setServiceRow(row);
      for (let i = row.length; i < serviceNumPerPage; i++) {
        row.push(
          <ServiceRow
            key={i}
            onRowClick={() => {}}
            rowData={null}
            showRows={serviceColumnDisplay}
          />
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceVisibleRows, selectedServiceIndex, serviceColumnDisplay]);

  useEffect(() => {
    let now = dayjs();
    let startTmp = now - 3600000,
      endTmp = now.valueOf();
    setStartTime(startTmp);
    setEndTime(endTmp);
    clearPage();
    dispatch(getRouteService(startTmp, endTmp));
    dispatch(clearRouteTrace());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //#endregion
  //HOOK-结束

  //handle-开始
  //#region
  const handleSearchClick = e => {
    startLoading();
    let startTmp = 0,
      endTmp = 0;
    if (durationSelectIndex !== 11) {
      //Duration
      let duration = 0;
      if (durationSelectIndex >= 0 && durationSelectIndex < 11) {
        duration = durationList[durationSelectIndex];
      } else {
        console.warn('handleTraceSearchClick durationIndex failure');
        return;
      }
      let now = dayjs();
      startTmp = now - duration * 1000;
      endTmp = now.valueOf();
    }
    //Custom
    else {
      startTmp = startTimeValue.valueOf();
      endTmp = endTimeValue.valueOf();
    }
    clearPage();
    setStartTime(startTmp);
    setEndTime(endTmp);
    dispatch(getRouteService(startTmp, endTmp));
    dispatch(clearRouteTrace());
  };

  const handleDurationSelectChange = e => {
    setDurationSelectIndex(e.target.value);
  };

  const handleStartTimeChange = newValue => {
    setStartTimeValue(newValue);
  };

  const handleEndTimeChange = newValue => {
    setEndTimeValue(newValue);
  };

  const handleServiceChangePage = (_, newPage) => {
    if (servicePage !== newPage) {
      setSelectedServiceIndex(-1);
      setServicePage(newPage);
    }
  };

  const handleServiceClick = index => {
    setSelectedServiceIndex(index);
    changePage(
      (servicePage - 1) * serviceNumPerPage + index,
      startTime,
      endTime
    );
  };

  const handleServiceColumnChooseItemClick = index => {
    setServiceColumnDisplay(prevDisplay => {
      let tmpDisplay = [...prevDisplay];
      tmpDisplay[index] = !tmpDisplay[index];
      return tmpDisplay;
    });
  };

  const handleServiceColumnChooseClick = event =>
    setShowServiceColumnChooseAnchorEl(event.currentTarget);
  const handleServiceColumnChooseClose = () =>
    setShowServiceColumnChooseAnchorEl(null);

  //#endregion
  //handle-结束

  //return
  //#region
  return (
    <>
      <Loading show={showLoading} />

      <Popover
        id='route-trace-table-content-popover'
        open={showServiceColumnChooseOpen}
        anchorEl={showServiceColumnChooseAnchorEl}
        onClose={handleServiceColumnChooseClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          zIndex: 1000,
          boxShadow: '0 4px 16px 0 rgba(39,50,71,.28)',
          borderRadius: '4px',
          mt: '2px !important',
        }}
      >
        <Stack
          direction='column'
          sx={{
            border: '1px solid #FAFAFA',
            width: '100px',
            borderRadius: '5px',
            padding: '8px',
            bgcolor: '#242e42',
            fontSize: '12px',
            fontFamily: fontFamily,
          }}
        >
          {serviceTableHeaders.slice(1).map((value, index) => {
            return (
              <Stack
                direction='row'
                onClick={() => handleServiceColumnChooseItemClick(index + 1)}
                sx={{
                  color: '#FFFFFF',
                  '&:hover': {
                    bgcolor: '#36435c',
                  },
                  p: '0px 8px',
                }}
                justifyContent='flex-start'
                alignItems='center'
                spacing={1}
              >
                {serviceColumnDisplay[index + 1] === true ? (
                  <VisibilityIcon fontSize='small' />
                ) : (
                  <VisibilityOffIcon fontSize='small' />
                )}
                <Box
                  sx={{
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    height: '30px',
                    lineHeight: '30px',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                  }}
                >
                  {value.text}
                </Box>
              </Stack>
            );
          })}
        </Stack>
      </Popover>

      <Box
        sx={{
          width: '100%',
          minWidth: '600px',
        }}
      >
        <Box
          sx={{
            borderRadius: '4px',
            backgroundColor: '#FFFFFF',
            padding: '24px 20px',
            width: 'calc(100% - 40px)',
            height: '58px',
            mb: '12px',
          }}
        >
          <Stack direction='row' spacing={1}>
            <Link60 />
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontStyle: 'normal',
                  color: '#242e42',
                  textShadow: '0 4px 8px rgba(36,46,66,.1)',
                  fontSize: '24px',
                  lineHeight: '32px',
                }}
              >
                {intl.messages['routeTrace.title']}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontStyle: 'normal',
                  color: '#79879c',
                  fontSize: '12px',
                  lineHeight: 1.67,
                }}
              >
                {intl.messages['routeTrace.titleHint']}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Main Body */}

        <Stack sx={{ width: '100%' }}>
          <div style={{ height: '10px' }} />

          {/* 搜索 */}
          <Box
            sx={{
              height: '55px',
              padding: '10px 30px 10px 30px',
              bgcolor: '#f9fbfd',
            }}
          >
            <Stack direction='row'>
              <Stack
                direction='row'
                spacing={2}
                sx={{ width: 'calc(100% - 100px)' }}
              >
                <StyledSelect
                  value={durationSelectIndex}
                  onChange={handleDurationSelectChange}
                  width='140px'
                  style={{ top: '8px' }}
                >
                  {selectMenuItems.map((item, index) => {
                    return (
                      <MenuItem key={index} value={index}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </StyledSelect>
                {durationSelectIndex === 11 ? (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StyledDateTimePicker
                      sx={{ height: '30px' }}
                      round='20px'
                      width='200px'
                      label='Start Time'
                      ampm={false}
                      displayWeekNumber={true}
                      minDate={dayjs('2020-01-01')}
                      maxDate={dayjs().add(1, 'day')}
                      timeSteps={{ hours: 1, minutes: 1, seconds: 10 }}
                      value={startTimeValue}
                      onChange={handleStartTimeChange}
                    />
                    <StyledDateTimePicker
                      round='20px'
                      width='200px'
                      label='End Time'
                      ampm={false}
                      displayWeekNumber={true}
                      minDate={dayjs('2020-01-01')}
                      maxDate={dayjs().add(1, 'day')}
                      timeSteps={{ hours: 1, minutes: 1, seconds: 10 }}
                      value={endTimeValue}
                      onChange={handleEndTimeChange}
                    />
                  </LocalizationProvider>
                ) : (
                  <></>
                )}
              </Stack>
              <Stack direction='row' spacing={1}>
                <EclipseTransparentButton
                  sx={{
                    top: '12px',
                    bgcolor: '#f9fbfd !important',
                    '&:hover': {
                      bgcolor: '#FFFFFF !important',
                    },
                    '& svg': {
                      color: '#3d3b4f',
                    },
                    height: '32px',
                  }}
                  onClick={handleServiceColumnChooseClick}
                >
                  <VisibilityIcon />
                </EclipseTransparentButton>
                <KubeConfirmButton
                  onClick={handleSearchClick}
                  sx={{
                    mt: '6px !important',
                    width: '96px',
                    height: '32px',
                  }}
                  style={{ top: '6px' }}
                >
                  {intl.messages['routeTrace.serviceTableButtonSearch']}
                </KubeConfirmButton>
              </Stack>
            </Stack>
          </Box>
          {/*数据*/}
          <Stack direction='row' spacing={2} sx={{ maxWidth: '100%' }}>
            <Stack sx={{ width: '100%' }}>
              {/* Service 列表 */}
              <Stack>
                <StyledTableContainer sx={{ width: '100%' }}>
                  <Table stickyHeader size='small' sx={{ tableLayout: 'auto' }}>
                    <TableHead>
                      <TableRow sx={{ height: '33px' }}>
                        {serviceTableHeaders.map((item, index) => {
                          if (serviceColumnDisplay[index]) {
                            if (index === 0)
                              return (
                                <StyledTableRowCell
                                  key={item.key}
                                  align={item.align}
                                  sx={{
                                    minWidth: item.minWidth,
                                    color: 'black',
                                  }}
                                >
                                  {item.text}
                                </StyledTableRowCell>
                              );
                            else
                              return (
                                <StyledTableRowCell
                                  key={item.key}
                                  align={item.align}
                                  sx={{ minWidth: item.minWidth }}
                                >
                                  {item.text}
                                </StyledTableRowCell>
                              );
                          }
                          return <></>;
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {showEmpty ? (
                        <TableRow style={{ height: '120px' }}>
                          <TableCell
                            colSpan={getVisibleRows()}
                            sx={{
                              textAlign: 'center',
                              fontSize: '20px',
                              fontFamily: fontFamily,
                              fontStyle: 'normal',
                            }}
                          >
                            <Question />
                            <NormalBoldFont>{intl.messages['routeTrace.serviceTableContentNoData']}</NormalBoldFont>

                            <SmallLightFont>{intl.messages['routeTrace.serviceTableContentNoDataHint']}</SmallLightFont>
                          </TableCell>
                        </TableRow>
                      ) : (
                        serviceRow
                      )}
                    </TableBody>
                  </Table>
                </StyledTableContainer>
                <StyledTableFooter
                  pageSize={serviceNumPerPage}
                  pageNum={servicePage}
                  count={routeService ? routeService.length : 0}
                  handlePageChange={handleServiceChangePage}
                  sx={{
                    width: '100%',
                    pt: '10px',
                    pb: '10px',
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
  //#endregion
}

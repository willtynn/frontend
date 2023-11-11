// imports
//#region
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  MenuItem,
  Box,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
  Modal,
  Slide,
  Popover
} from "@mui/material"
import KubeClose from '@/assets/KubeClose.svg';
import RouteIcon from '@/assets/RouteIcon.svg';
import Link60 from '@/assets/Link60.svg';

import {
  KubeConfirmButton,
  EclipseTransparentButton
} from "@/components/Button";
import {
  StyledDateTimePicker,
  StyledSelect
} from "@/components/Input";
import {
  StyledTableRowCell,
  StyledTableContainer,
  StyledTableFooter
} from '@/components/DisplayTable';
import {
  LargeBoldFont,
  NormalFont,
  NormalFontBlack,
} from "@/components/Fonts";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { fontFamily } from '@/utils/commonUtils';

import { DataRow } from "./DataRow";
import { ServiceRow } from "./ServiceRow";
import { RouteTraceCanvas } from "./RouteTraceCanvas";
import { Loading } from "./Loading";

import { RouteTraceInfoPage } from "./RouteTraceInfoPage";


import dayjs from 'dayjs';

import {
  getRouteService,
  getRouteTrace,
  clearRouteTrace,
  clearFailed
} from "@/actions/routeAction";

//#endregion
//import


//Constants
//#region
const selectMenuItems = 
  ["last 1 min", "last 2 min", "last 5 min", "last 10 min", 
  "last 30 min", "last 1 hour", "last 3 hours", "last 6 hours", 
  "last 12 hours", "last 1 day", "last 7 days", "Custom"];
const durationList = [60, 120, 300, 600, 1800, 3600, 10800, 21600, 43200, 86400, 604800];

const serviceTableHeaders = [
  { key: 'service', align: 'left', text: '服务', minWidth: 200, maxWidth: 200 },
  { key: 'api', align: 'center', text: '接口', minWidth: 100, maxWidth: 150 },
  { key: 'count', align: 'center', text: '请求次数', minWidth: 85, maxWidth: 85 },
  { key: 'low', align: 'center', text: 'Low', minWidth: 60, maxWidth: 60 },
  { key: 'percentile50', align: 'center', text: '0.5', minWidth: 60, maxWidth: 60 },
  { key: 'percentile95', align: 'center', text: '0.95', minWidth: 60, maxWidth: 60 },
  { key: 'percentile99', align: 'center', text: '0.99', minWidth: 60, maxWidth: 60 },
  { key: 'high', align: 'center', text: 'High', minWidth: 60, maxWidth: 60 },
];

const traceTableHeaders = [
  { key: 'service', align: 'left', text: '请求', minWidth: 350, maxWidth: 350 },
  { key: 'spanNum', align: 'center', text: '链路长度', minWidth: 85, maxWidth: 85 },
  { key: 'time', align: 'center', text: '开始时间', minWidth: 150, maxWidth: 150 },
  { key: 'duration', align: 'center', text: '响应时间', minWidth: 80, maxWidth: 80 },
  { key: 'status', align: 'center', text: '请求状态', minWidth: 75, maxWidth: 75 },
];

const serviceNumPerPage = 4;
const spanNumPerPage = 5;
//#endregion
//Constants


export default function RouteTrace() {

  //定义-开始
  //#region
  const [durationSelectIndex, setDurationSelectIndex] = useState(5);

  const [startTimeValue, setStartTimeValue] = useState(dayjs().add(-1, 'hour'));
  const [endTimeValue, setEndTimeValue] = useState(dayjs());

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const [detailSpan, setDetailSpan] = useState(null);
  
  const [traceRow, setTraceRow] = useState([]);
  const [serviceRow, setServiceRow] = useState([]);

  const [servicePage, setServicePage] = useState(0);
  const [tracePage, setTracePage] = useState(0);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(-1);
  const [selectedTraceIndex, setSelectedTraceIndex] = useState(-1);

  const [openModal, setOpenModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);


  const [showServiceColumnChooseAnchorEl, setShowServiceColumnChooseAnchorEl] = useState(null);
  const showServiceColumnChooseOpen = Boolean(showServiceColumnChooseAnchorEl);

  const [serviceColumnDisplay, setServiceColumnDisplay] = useState([true, true, true, true, true, false, true, true]);
  //const [traceColumnDisplay, setTraceColumnDisplay] = useState([true, true, true, true, true]);



  const dispatch = useDispatch();

  const {
    routeService,
    routeTrace,
    routeFailed
  } = useSelector(state => {
    return {
      routeService: state.Route.routeService,
      routeTrace: state.Route.routeTrace,
      routeFailed: state.Route.routeFailed
    };
  });

  const spanVisibleRows = React.useMemo(() => {
    const tmp = (tracePage - 1) * spanNumPerPage;
    return routeTrace ? routeTrace.slice(tmp, tmp + spanNumPerPage) : [];
  }, [routeTrace, tracePage]);
  
  const serviceVisibleRows = React.useMemo(() => {
    const tmp = (servicePage - 1) * serviceNumPerPage;
    return routeService ? routeService.slice(tmp, tmp + serviceNumPerPage) : [];
  }, [routeService, servicePage]);

  //#endregion
  //定义-结束

  //自定义函数-开始
  //#region

  const clearPage = () => {
    setSelectedServiceIndex(-1);
    setSelectedTraceIndex(-1);
    setServicePage(1);
    setTracePage(0);
    setDetailSpan(null);
    setOpenModal(false);
  }

  //#endregion
  //自定义函数-结束
  const startLoading = () => {
    setShowLoading(true);
    document.body.style.overflow = 'hidden';
  }

  const endLoading = () => {
    setShowLoading(false);
    document.body.style.overflow = 'auto';
  }
  //HOOK-开始
  //#region

  useEffect(() => {
    if(routeFailed)
    {
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
      let minWidths = serviceTableHeaders.map((item) => item.minWidth);
      let row = serviceVisibleRows.map((item, index) => {
        return <ServiceRow key={item.id}
          selected={selectedServiceIndex === index}
          onRowClick={() => handleServiceClick(index)}
          rowData={{...item, spanNum: 99}}
          showRows={serviceColumnDisplay}
          maxWidth={minWidths}/>;
      });
      setServiceRow(row);
      for(let i = row.length; i < serviceNumPerPage; i++)
      {
        row.push(<ServiceRow key={i} onRowClick={() => {}} rowData={null} showRows={serviceColumnDisplay}/>);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceVisibleRows, selectedServiceIndex, serviceColumnDisplay]);

  useEffect(() => {
    if (spanVisibleRows) {
      let row = spanVisibleRows.map((item, index) => {
        return <DataRow key={item.traceID}
          onRowClick={() => handleSpanClick(index)}
          selected={selectedTraceIndex === index}
          rowData={{
            service: item.service,
            spanNum: item.trace.spans.length,
            time: item.time,
            duration: item.trace.spans.map((span) => span.duration).reduce((a, b) => a + b, 0),
            status: 200
          }} />;
      });
      for(let i = row.length; i < spanNumPerPage; i++)
      {
        row.push(<DataRow key={i} onRowClick={() => {}} rowData={null} />);
      }
      setTraceRow(row);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spanVisibleRows, selectedTraceIndex]);
/*
  useEffect(() => {
    let now = dayjs();
    setStartTime(now - 3600000);
    setEndTime(now.valueOf());
    clearPage();
    dispatch(getRouteService(startTime, endTime));
    dispatch(clearRouteTrace());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/
  //#endregion
  //HOOK-结束

  //handle-开始
  //#region
  const handleSearchClick = (e) => {
    startLoading();
    let startTmp = 0, endTmp = 0;
    if(durationSelectIndex !== 11)
    //Duration
    {
      let duration = 0;
      if(durationSelectIndex >= 0 && durationSelectIndex < 11)
      {
        duration = durationList[durationSelectIndex];
      }
      else
      {
        console.warn("handleTraceSearchClick durationIndex failure");
        return;
      }
      let now = dayjs();
      startTmp = now - duration * 1000;
      endTmp = now.valueOf();
    }
    //Custom
    else
    {
      startTmp = startTimeValue.valueOf();
      endTmp = endTimeValue.valueOf();
    }
    clearPage();
    setStartTime(startTmp);
    setEndTime(endTmp);
    dispatch(getRouteService(startTmp, endTmp));
    dispatch(clearRouteTrace());
  }

  const handleDurationSelectChange = (e) => {
    setDurationSelectIndex(e.target.value);
  }

  const handleStartTimeChange = (newValue) => {
    setStartTimeValue(newValue);
  }

  const handleEndTimeChange = (newValue) => {
    setEndTimeValue(newValue);
  }

  const handleServiceChangePage = (_, newPage) => {
    if(servicePage !== newPage)
    {
      setSelectedServiceIndex(-1);
      setServicePage(newPage);
      setSelectedTraceIndex(-1);
      setTracePage(0);
      setOpenModal(false);
    }
  };

  const handleSpanChangePage = (_, newPage) => {
    if(tracePage !== newPage)
    {
      setSelectedTraceIndex(-1);
      setTracePage(newPage);
      setOpenModal(false);
    }
  };

  const handleServiceClick = (index) => {
    dispatch(getRouteTrace(startTime, endTime, serviceVisibleRows[index].service, serviceVisibleRows[index].api));
    setSelectedServiceIndex(index);
    setSelectedTraceIndex(-1);
    setTracePage(1);
    setDetailSpan(null);
    setOpenModal(false);
  }

  const handleSpanClick = (index)=>{
    setSelectedTraceIndex(index);
    setDetailSpan(spanVisibleRows[index]);
    setOpenModal(true);
  }

  const handleServiceColumnChooseItemClick = (index) => {
    setServiceColumnDisplay(prevDisplay => {
      let tmpDisplay = [...prevDisplay];
      tmpDisplay[index] = !tmpDisplay[index];
      return tmpDisplay;
    });
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleServiceColumnChooseClick = (event) => setShowServiceColumnChooseAnchorEl(event.currentTarget);
  const handleServiceColumnChooseClose = () => setShowServiceColumnChooseAnchorEl(null);

  //#endregion
  //handle-结束

  const styleModalBox = {
    position: 'absolute',
    left: "50%",
    transform: 'translate(-100%, -50%)',
    minWidth: "500px",
    maxWidth: "1150px",
    width: '50%',
    height: '100%',
    bgcolor: 'background.paper',
    boxShadow: 'inset -15px 0px  15px -15px #444444',
  };


  //return
  //#region
  return (
  <>
    <Loading show={showLoading} />
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      closeAfterTransition>
      <Slide direction="left" in={openModal} mountOnEnter unmountOnExit>
        <Box sx={styleModalBox}>
          <Box sx={{
              height: '40px',
              padding: '10px 30px 10px 30px',
              bgcolor: '#f9fbfd',
              border: '1px solid #EBEEF5',
            }}>
            <Box
              sx={{
                cursor: 'pointer',
                boxShadow: '0 8px 16px 0 rgba(35,45,65,.28)',
                '&:hover': {
                  boxShadow: 'none',
                },
                height: '32px',
                width: '32px',
                pt: "3px"
              }}
              onClick={handleCloseModal}>
              <KubeClose/>
            </Box>
          </Box>
          {/* 依赖图 */}
          <Stack sx={{ justifyContent: "center", pl: 4, pr: 4}}>
            <div style={{ height: "20px" }} />
            {(detailSpan)
              ?
              <div style={{ justifyContent: "center" }}>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={20}>
                    <NormalFont sx={{ width: "60px" }}>服务ID</NormalFont>
                    <NormalFontBlack>{detailSpan.id}</NormalFontBlack>
                  </Stack>
                  <Stack direction="row" spacing={20}>
                    <NormalFont sx={{ width: "60px" }}>服务名</NormalFont>
                    <NormalFontBlack>{detailSpan.service}</NormalFontBlack>
                  </Stack>
                  <Stack direction="row" spacing={20}>
                    <NormalFont sx={{ width: "60px" }}>时间</NormalFont>
                    <NormalFontBlack>{dayjs(detailSpan.time).format('YYYY-MM-DD HH:mm:ss')}</NormalFontBlack>
                  </Stack>
                </Stack>
                <div style={{ height: "20px" }} />
                <RouteTraceCanvas id={detailSpan.id} sx={{ 
                  width: "100%" 
                }}/>
              </div>
              :
              <></>
            }
          </Stack>
        </Box>
      </Slide>
    </Modal>

    
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
        }}>
      <Stack
        direction='column'
        sx={{
          border: '1px solid #FAFAFA',width: '100px',
          borderRadius: '5px',padding: '8px',
          bgcolor: '#242e42',fontSize: '12px',
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
    
    <RouteTraceInfoPage sx={{ width: "100%", height: "100%"}} />

    <Box sx={{
        width: '100%',
        minWidth: "600px"
      }}>
      <Box sx={{
        borderRadius: '4px',
        backgroundColor: '#FFFFFF',
        padding: "24px 20px",
        width: 'calc(100% - 40px)',
        height: '58px',
        mb: "12px"
        }}>
        <Stack direction="row" spacing={-4}>
          <Link60 />
          <Box>
            <Typography sx={{
              fontWeight: 600,
              fontStyle: 'normal',
              color: '#242e42',
              textShadow: '0 4px 8px rgba(36,46,66,.1)',
              fontSize: "24px",
              lineHeight: "32px"
            }}>
              路由链路
            </Typography>
            <Typography sx={{
              fontWeight: 400,
              fontStyle: 'normal',
              color: '#79879c',
              fontSize: "12px",
              lineHeight: 1.67
            }}>
              查看服务的路由链路
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Main Body */}
      <Stack sx={{ width: "100%" }}>
        <div style={{height: "10px"}}/>

        {/* 搜索 */}
        <Box sx={{
            height: '55px',
            padding: '10px 30px 10px 30px',
            bgcolor: '#f9fbfd',
          }}>
            <Stack direction="row">
              <Stack direction="row" spacing={2} sx={{ width: "calc(100% - 100px)"}}>
                <StyledSelect
                  value={durationSelectIndex}
                  onChange={handleDurationSelectChange}
                  width="140px" style={{ top: "8px"}}>
                  {selectMenuItems.map((item, index) => {
                    return <MenuItem key={index} value={index}>{item}</MenuItem>;
                  })}
                </StyledSelect>
                {
                  durationSelectIndex === 11 ? 
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StyledDateTimePicker
                      sx={{ height: "30px" }}
                      round= "20px"
                      width= "200px"
                      label="Start Time"
                      ampm={false}
                      displayWeekNumber={true}
                      minDate={dayjs("2020-01-01")}
                      maxDate={dayjs().add(1, 'day')}
                      timeSteps={{ hours: 1, minutes: 1, seconds: 10 }}
                      value={startTimeValue}
                      onChange={handleStartTimeChange}
                      />
                    <StyledDateTimePicker
                      round= "20px"
                      width= "200px"
                      label="End Time"
                      ampm={false}
                      displayWeekNumber={true}
                      minDate={dayjs("2020-01-01")}
                      maxDate={dayjs().add(1, 'day')}
                      timeSteps={{ hours: 1, minutes: 1, seconds: 10 }}
                      value={endTimeValue}
                      onChange={handleEndTimeChange}
                      />
                        
                  </LocalizationProvider>
                  : <></>
                }
              </Stack>
              <Stack direction="row" spacing={1}>
                <EclipseTransparentButton
                  sx={{
                    top: "12px",
                    bgcolor: '#f9fbfd !important',
                    '&:hover': {
                      bgcolor: '#FFFFFF !important',
                    },
                    '& svg': {
                      color: '#3d3b4f',
                    },
                    height: "32px"
                  }}
                  onClick={handleServiceColumnChooseClick}>
                  <VisibilityIcon />
                </EclipseTransparentButton>
                <KubeConfirmButton 
                  onClick={handleSearchClick}
                  sx={{
                    mt: "6px !important",
                    width: "96px",
                    height: "32px"
                  }}
                  style={{ top: "6px" }}>
                  搜索
                </KubeConfirmButton>
              </Stack>
           </Stack>
        </Box>
        { /*数据*/ }
        <Stack  direction="row" spacing={2} sx={{ maxWidth: "100%" }}>
          <Stack sx={{ width: "100%" }}>
            {/* Service 列表 */}
            <Stack>
              <StyledTableContainer sx={{ width: "100%" }}>
                <Table 
                  stickyHeader
                  size='small'
                  sx={{tableLayout: 'auto'}}>
                  <TableHead>
                    <TableRow sx={{ height: "52px"}}>
                      {
                        serviceTableHeaders.map((item, index) => {
                          if(serviceColumnDisplay[index])
                            return (
                              <StyledTableRowCell key={item.key} align={item.align} 
                                sx={{ minWidth: item.minWidth }}>
                                  {item.text}
                              </StyledTableRowCell>);
                          return <></>
                        })
                      }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {serviceRow}
                  </TableBody>
                </Table>
              </StyledTableContainer>
              <StyledTableFooter
                pageSize={serviceNumPerPage}
                pageNum={servicePage}
                count={routeService ? routeService.length : 0}
                handlePageChange={handleServiceChangePage}
                sx={{
                  width: "100%",
                  pt: "10px",
                  pb: "10px"
                }}
              />
            </Stack>

            <div style={{ height: "10px" }}/>

            {/* Trace 列表 */}
            <Stack>
              
              <LargeBoldFont>请求信息</LargeBoldFont>
              <StyledTableContainer sx={{ width: "100%" }}>
                <Table 
                  stickyHeader
                  size='small'
                  sx={{tableLayout: 'auto'}}>
                  <TableHead>
                    <TableRow sx={{ height: "52px"}}>
                      {
                        traceTableHeaders.map((item) => {
                          return (
                            <StyledTableRowCell key={item.key} align={item.align} 
                              sx={{ minWidth: item.minWidth }}>
                                {item.text}
                            </StyledTableRowCell>);
                        })
                      }
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ borderBottom: "solid 2px #B8B5B7", borderTop: "solid 2px #B8B5B7" }}>
                    {traceRow}
                  </TableBody>
                </Table>
              </StyledTableContainer>
              <StyledTableFooter
                pageSize={spanNumPerPage}
                pageNum={tracePage}
                count={routeTrace ? routeTrace.length : 0}
                handlePageChange={handleSpanChangePage}
                sx={{
                  width: "100%",
                  pt: "10px",
                  pb: "10px"
                }}
              />
            </Stack>
          </Stack>


          {/* 依赖详细和依赖图 
          {
            (detailSpan)
              ?
              <Box sx={{ boxShadow: "1px 1px 4px 1px #B5B5B8", width: "100%", height: "100%" }}>
                <Stack sx={{ width: "100%", padding: "15px" }}>
                  <LargeBoldFont>链路拓扑信息图</LargeBoldFont>
                  <Stack sx={{ paddingLeft: "10px", paddingTop: "10px" }}>
                    <Stack>
                      <Stack spacing={1}>
                        <Stack direction="row" spacing={20}>
                          <NormalFont sx={{ width: "60px" }}>服务ID</NormalFont>
                          <NormalFontBlack>{detailSpan.id}</NormalFontBlack>
                        </Stack>
                        <Stack direction="row" spacing={20}>
                          <NormalFont sx={{ width: "60px" }}>服务名</NormalFont>
                          <NormalFontBlack>{detailSpan.service}</NormalFontBlack>
                        </Stack>
                        <Stack direction="row" spacing={20}>
                          <NormalFont sx={{ width: "60px" }}>时间</NormalFont>
                          <NormalFontBlack>{dayjs(detailSpan.time).format('YYYY-MM-DD HH:mm:ss')}</NormalFontBlack>
                        </Stack>
                      </Stack>
                      <div style={{ height: "20px" }} />
                      {(detailSpan)
                        ?
                        <RouteTraceCanvas id={detailSpan.id} sx={{ 
                          width: "100%" 
                        }}/>
                        :
                        <div/>
                      }
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
              : <></>
          }*/}

        </Stack>
        
      </Stack>
    </Box>
  </>
  );
  //#endregion
}



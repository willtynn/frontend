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
  IconButton
} from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {
  KubeConfirmButton
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
import SendIcon from '@mui/icons-material/Send';
import TaskIcon from '@/assets/TaskIcon.svg';

import { DataRow } from "./DataRow";
import { ServiceRow } from "./ServiceRow";
import { RouteTraceCanvas } from "./DataCanvas";


import dayjs from 'dayjs';

import {
  getRouteService,
  getRouteTrace,
  clearRouteTrace
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

  const [namespace, setNamespcae] = useState("");

  const [detailSpan, setDetailSpan] = useState(null);
  
  const [traceRow, setTraceRow] = useState([]);
  const [serviceRow, setServiceRow] = useState([]);

  const [servicePage, setServicePage] = useState(0);
  const [tracePage, setTracePage] = useState(0);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(-1);
  const [selectedTraceIndex, setSelectedTraceIndex] = useState(-1);


  const [openModal, setOpenModal] = useState(false);




  const dispatch = useDispatch();

  const {
    routeService,
    routeTrace
  } = useSelector(state => {
    return {
      routeService: state.Route.routeService,
      routeTrace: state.Route.routeTrace
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

  //HOOK-开始
  //#region

  useEffect(() => {
    if (serviceVisibleRows) {
      let maxWidths = serviceTableHeaders.map((item) => item.maxWidth);
      let row = serviceVisibleRows.map((item, index) => {
        return <ServiceRow key={item.id}
          selected={selectedServiceIndex === index}
          onRowClick={() => handleServiceClick(index)}
          rowData={{...item, spanNum: 99}} 
          maxWidth={maxWidths}/>;
      });
      setServiceRow(row);
      for(let i = row.length; i < serviceNumPerPage; i++)
      {
        row.push(<ServiceRow key={i} onRowClick={() => {}} rowData={null} />);
      }
    }
  }, [routeService, serviceVisibleRows, selectedServiceIndex]);

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
  }, [spanVisibleRows, selectedTraceIndex]);

  useEffect(() => {
    let now = dayjs();
    setStartTime(now - 3600000);
    setEndTime(now.valueOf());
    clearPage();
    dispatch(getRouteService(startTime, endTime));
    dispatch(clearRouteTrace());
  }, []);
  //#endregion
  //HOOK-结束

  //handle-开始
  //#region
  const handleSearchClick = (e) => {
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
      setStartTime(now - duration * 1000);
      setEndTime(now.valueOf());
    }
    //Custom
    else
    {
      setStartTime(startTimeValue.valueOf());
      setEndTime(endTimeValue.valueOf());
    }
    clearPage();
    dispatch(getRouteService(startTime, endTime));
    dispatch(clearRouteTrace());
  }


  const handleInputChange = (e) => {
    setNamespcae(e.target.value);
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

  const handleCloseModal = () => setOpenModal(false);

  //#endregion
  //handle-结束

  const styleModal = {
    position: 'absolute',
    left: "40%",
    transform: 'translate(-100%, -50%)',
    minWidth: "650px",
    maxWidth: "1150px",
    width: '60%',
    height: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #596A7C',
    boxShadow: 'inset -15px 0px  15px -15px #444444',
    p: 4,
  };


  //return
  //#region
  return (
    <>
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
      >
        <Slide direction="left" in={openModal} mountOnEnter unmountOnExit>
          <Box sx={styleModal}>
            <IconButton aria-label="back" color="black" onClick={handleCloseModal}>
              <ArrowBackIcon />
            </IconButton>
            {/* 依赖图 */}
            <Stack>
              <div style={{ height: "20px" }} />
              {(detailSpan)
                ?
                <>
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
                  <RouteTraceCanvas id={detailSpan.id} sx={{ 
                    width: "100%" 
                  }}/>
                </>
                :
                <></>
              }
            </Stack>
          </Box>
        </Slide>
      </Modal>
    
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
        <Stack direction="row" spacing={1}>
          <TaskIcon />
          <Box>
            <Typography sx={{
              fontWeight: 600,
              fontStyle: 'normal',
              color: '#242e42',
              textShadow: '0 4px 8px rgba(36,46,66,.1)',
              fontSize: "24px",
              lineHeight: "32px"
            }}>
              服务实例
            </Typography>
            <Typography sx={{
              fontWeight: 400,
              fontStyle: 'normal',
              color: '#79879c',
              fontSize: "12px",
              lineHeight: 1.67
            }}>
              服务（Service）提供一种抽象的方法，将运行在容器组（Pod）上的应用程序公开为网络服务。
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
          <Stack direction="row" spacing={2} style={{ width: "100%" }}>
              { /* Namespace */ }
              {/*
              <Stack>
                <SmallLightFont>
                  Namespace
                </SmallLightFont>
                <FormControl>
                  <Input
                    value={namespace}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Stack>*/
              }
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
                        serviceTableHeaders.map((item) => {
                          return (
                            <StyledTableRowCell key={item.key} align={item.align} 
                              sx={{ width: item.minWidth, minWidth: item.minWidth, maxWidth: item.maxWidth }}>
                                {item.text}
                            </StyledTableRowCell>);
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
                              sx={{ width: item.minWidth, minWidth: item.minWidth, maxWidth: item.maxWidth }}>
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



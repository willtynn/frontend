// imports
//#region
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteTraceCanvas } from "./DataCanvas";
import {
  FormControl,
  MenuItem,
  Box,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
} from "@mui/material"

import {
  KubeConfirmButton
} from "@/components/Button";
import {
  StyledDateTimePicker
} from "@/components/Input";

import {
  StyledTableRowCell,
  StyledTableContainer,
  StyledTableFooter
} from '@/components/DisplayTable';

import {
  SuperLargeBoldFont,
  LargeBoldFont,
  NormalFont,
  NormalFontBlack,
} from "@/components/Fonts";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import SendIcon from '@mui/icons-material/Send';

import { DataRow } from "./DataRow";
import { ServiceRow } from "./ServiceRow";

import {
  getRouteService,
  getRouteTrace,
  clearRouteTrace
} from "@/actions/routeAction";
import { StyledSelect } from "../../../components/Input";

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
  { key: 'api', align: 'center', text: '接口', minWidth: 150, maxWidth: 150 },
  { key: 'count', align: 'center', text: <>请求<br/>次数</>, minWidth: 30, maxWidth: 30 },
  { key: 'low', align: 'center', text: 'Low', minWidth: 60, maxWidth: 60 },
  { key: 'percentile50', align: 'center', text: '0.5', minWidth: 60, maxWidth: 60 },
  { key: 'percentile95', align: 'center', text: '0.95', minWidth: 60, maxWidth: 60 },
  { key: 'percentile99', align: 'center', text: '0.99', minWidth: 60, maxWidth: 60 },
  { key: 'high', align: 'center', text: 'High', minWidth: 60, maxWidth: 60 },
];

const serviceNumPerPage = 4;
const spanNumPerPage = 5;
//#endregion
//Constants


//自定义函数-开始
//#region

//#endregion
//自定义函数-结束


export default function RouteTrace() {

  //定义-开始
  //#region
  const [durationSelectIndex, setDurationSelectIndex] = useState(5);

  const [startTimeValue, setStartTimeValue] = useState(dayjs().add(-15, 'minute'));
  const [endTimeValue, setEndTimeValue] = useState(dayjs());

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const [namespace, setNamespcae] = useState("");

  //const [detailID, setDetailID] = useState(-1);
  const [detailSpan, setDetailSpan] = useState(null);
  
  const [tableRow, setTableRow] = useState([]);
  const [serviceRow, setServiceRow] = useState([]);

  const [servicePage, setServicePage] = useState(0);
  const [spanPage, setSpanPage] = useState(0);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(-1);
  const [selectedSpanIndex, setSelectedSpanIndex] = useState(-1);

  const dispatch = useDispatch();

  const {
    routeService,
    routeTrace
  } = useSelector(state => {
    return {
      routeService: state.Route.routeService,
      routeTraceDetail: state.Route.routeTraceDetail,
      routeTrace: state.Route.routeTrace
    };
  });

  const spanVisibleRows = React.useMemo(() => {
    const tmp = spanPage * spanNumPerPage;
    return routeTrace ? routeTrace.slice(tmp, tmp + spanNumPerPage) : [];
  }, [routeTrace, spanPage]);
  
  const serviceVisibleRows = React.useMemo(() => {
    const tmp = servicePage * serviceNumPerPage;
    return routeService ? routeService.slice(tmp, tmp + serviceNumPerPage) : [];
  }, [routeService, servicePage]);

  //#endregion
  //定义-结束

  //style-开始
  //#region

  //#endregion
  //style-结束

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
          selected={selectedSpanIndex === index}
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
      setTableRow(row);
    }
  }, [spanVisibleRows, selectedSpanIndex]);

  useEffect(() => {
    handleSearchClick();
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

    setSelectedServiceIndex(-1);
    setSelectedSpanIndex(-1);
    setServicePage(0);
    setSpanPage(0);
    //setDetailID(-1);
    setDetailSpan(null);

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
      setSelectedSpanIndex(-1);
      //setDetailSpan(null);
      setSpanPage(0);
    }
  };

  const handleSpanChangePage = (_, newPage) => {
    if(spanPage !== newPage)
    {
      setSelectedSpanIndex(-1);
      //setDetailSpan(null);
      setSpanPage(newPage);
    }
  };

  const handleServiceClick = (index) => {
    dispatch(getRouteTrace(startTime, endTime, routeService[index].service, routeService[index].api));
    setSelectedServiceIndex(index);
    setSelectedSpanIndex(-1);
    setDetailSpan(null);
    //TODO
  }

  const handleSpanClick = (index)=>{
    setSelectedSpanIndex(index);
    setDetailSpan(routeTrace[index]);
    //const id = routeTrace[index].id;
    //setDetailID(id);
  }

  //#endregion
  //handle-结束


  //return
  //#region
  return (
    
    <Box sx={{
        width: '100%',
        minHeight: "900px",
        minWidth: "1000px"
      }}>

      <Stack direction="row" spacing={2}>
        {/* 标题 */}
        <SuperLargeBoldFont sx={{
            ml: "12px",
            fontSize: "32px !important",
            lineHeight: "54px !important"
          }}>路由链路</SuperLargeBoldFont>
        
        {/* 搜索 */}
        <Stack direction="row" spacing={6}>
          
            
          <FormControl>
            <Stack direction="row" spacing={4} sx={{
              mb: "0px"
            }}>
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
              { /* Duration */ }
              {/*
              <InputLabel
                id="service_search_mode_label"
                sx={{
                  color: 'var(--gray-500, #596A7C)',
                  fontFamily: fontFamily,
                  fontStyle: 'normal',
                }}
              >
                Duration
              </InputLabel>
              */}
              <StyledSelect
                value={durationSelectIndex}
                onChange={handleDurationSelectChange}
                width="150px">
                {selectMenuItems.map((item, index) => {
                  return <MenuItem key={index} value={index}>{item}</MenuItem>;
                })}
              </StyledSelect>
              {
                durationSelectIndex === 11 ? 
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StyledDateTimePicker
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
              <KubeConfirmButton endIcon={<SendIcon />} 
                onClick={handleSearchClick}
                sx={{
                  mt: "6px !important",
                  width: "110px",
                  height: "40px"
                }}>
                Search
              </KubeConfirmButton>
            </Stack>
          </FormControl>
          
        </Stack>
      </Stack>


      {/* Main Body */}
      <Stack sx={{paddingLeft: "10px"}}>
        <div style={{height: "10px"}}/>

        { /*数据*/ }
        <Stack  direction="row" spacing={2}>
          <Stack>
            {/* Service 列表 */}
            <Stack>
              <StyledTableContainer sx={{ width: "950px" }}>
                <Table 
                  stickyHeader
                  size='small'
                  sx={{tableLayout: 'auto'}}>
                  <TableHead>
                    <TableRow>
                      {
                        serviceTableHeaders.map((item) => {
                          return <StyledTableRowCell key={item.key} align={item.align} sx={{ minWidth: item.minWidth, maxWidth: item.maxWidth }}>{item.text}</StyledTableRowCell>;
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
                rowsPerPageOptions={-1}
                page={servicePage}
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
                    <TableRow sx={{ backgroundColor: "#E3E3E3" }}>
                      <StyledTableRowCell>请求</StyledTableRowCell>
                      <StyledTableRowCell align="center">链路长度</StyledTableRowCell>
                      <StyledTableRowCell align="center">开始时间</StyledTableRowCell>
                      <StyledTableRowCell align="center">响应时间</StyledTableRowCell>
                      <StyledTableRowCell align="center">请求状态</StyledTableRowCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ borderBottom: "solid 2px #B8B5B7", borderTop: "solid 2px #B8B5B7" }}>
                    {tableRow}
                  </TableBody>
                  <TableFooter sx={{ backgroundColor: "#E3E3E3"}}>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={-1}
                        count={routeTrace ? routeTrace.length : 0}
                        rowsPerPage={spanNumPerPage}
                        page={spanPage}
                        onPageChange={handleSpanChangePage}/>
                    </TableRow>
                  </TableFooter>
                </Table>
              </StyledTableContainer>
            </Stack>
          </Stack>


          {/* 依赖详细和依赖图 */}
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
          }

        </Stack>
        
      </Stack>
    </Box>
  );
  //#endregion
}



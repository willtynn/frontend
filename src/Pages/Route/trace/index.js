// imports
//#region
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteTraceCanvas } from "./DataCanvas";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Stack,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Input,
  Typography
} from "@mui/material"
import styled from "@emotion/styled";
import { shadowStyle } from "@/utils/commonUtils";
import {
  SuperLargeBoldFont,
  SmallLightFont,
} from "@/components/Fonts";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import SendIcon from '@mui/icons-material/Send';

import { DataRow } from "./DataRow";

import {
  getRouteTraceDetail,
  getRouteTrace
} from "@/actions/routeAction";

//#endregion
//import


//Constants
//#region
const durationList = [60, 120, 300, 600, 1800, 3600, 10800, 21600, 43200, 86400, 604800];
//#endregion
//Constants


export default function RouteTrace() {

  //定义-开始
  //#region
  const [durationSelectIndex, setDurationSelectIndex] = useState(5);

  const [startTimeValue, setStartTimeValue] = useState(dayjs().add(-15, 'minute'));
  const [endTimeValue, setEndTimeValue] = useState(dayjs());
  const [traceIndex, setTraceIndex] = useState(0);
  const [traceDetail, setTraceDetail] = useState({});

  const [namespace, setNamespcae] = useState("");

  const [detailID, setDetailID] = useState(-1);
  
  const [traceElements, setTraceElements] = useState([]);
  const [tableRow, setTableRow] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const dispatch = useDispatch();

  const {
    routeTraceDetail,
    routeTrace
  } = useSelector(state => {
    return {
      routeTraceDetail: state.Route.routeTraceDetail,
      routeTrace: state.Route.routeTrace
    };
  });

  //#endregion
  //定义-结束

  //style-开始
  //#region

  const NormalTitleFont = styled(Typography)({
    color: '#262E35',
    fontSize: '18px',
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '27.5px',
  });

  //#endregion
  //style-结束

  //HOOK-开始
  //#region
  useEffect(() => {
    if (routeTrace) {
      let row = routeTrace.map((item, index) => {
        return <DataRow key={item.traceID} color={ index % 2 === 0 ? "#E8F3DE" : "white"} 
          selected={selectedIndex === index}
          onRowClick={() => handleSpanClick(index)}
          rowData={{
            service: item.service,
            spanNum: item.trace.spans.length,
            time: item.time,
            duration: item.trace.spans.map((span) => span.duration).reduce((a, b) => a + b, 0),
            status: 200
          }} />;
      });

      setTableRow(row);
    }
  }, [routeTrace, selectedIndex]);

  useEffect(() => {
    dispatch(getRouteTrace(0,1));//TODO
  }, []);
  //#endregion
  //HOOK-结束

  //自定义函数-开始
  //#region

  function calculateDuration(duration){
    //要显示小数点后三位
    if(duration < 1000){
      return duration + 'μs';
    }else if(duration < 1000000){
      return (duration / 1000).toFixed(3) + 'ms';
    }else{
      duration /= 1000000;
    }
    if(duration < 60){
      return duration.toFixed(3) + 's';
    }else if(duration < 3600){
      return (duration / 60).toFixed(3) + 'min';
    }else if(duration < 86400){
      return (duration / 3600).toFixed(3) + 'h';
    }else{
      return (duration / 86400).toFixed(3) + 'd';
    }
  }
  
  const getTraceDetail = (index) => {
    const detail = {};
    const item = routeTrace[index];
    const data = item.trace.spans[0];

    let fullNodeID = "";
    data.tags.forEach((tag) => {
      if(tag.key === "node_id")
      {
        fullNodeID = tag.value;
      }
    });
    detail.nodeID = fullNodeID.split("~")[2];
    detail.traceID = item.trace.traceID;
    detail.spanNum = item.trace.spans.length;
    detail.timeStamp = data.startTime;
    detail.duration = data.duration;
    
    setTraceDetail(detail);
  }

  const getNodesAndEdges = (index) => {
    const id = routeTrace[index].id;
    setDetailID(id);
  }

  //#endregion
  //自定义函数-结束

  //handle-开始
  //#region
  const handleTraceSearchClick = (e) => {
    let start = 0;
    let end = 0;
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
      let now = new Date();
      start = now.getTime() - duration * 1000;
      end = now.getTime();
    }
    //Custom
    else
    {

    }
    dispatch(getRouteTrace(0,1));
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

  const handleSpanClick = (index)=>{
    setTraceIndex(index);
    getTraceDetail(index);
    getNodesAndEdges(index);
    setSelectedIndex(index);
  }

  //#endregion
  //handle-结束


  //return
  //#region
  return (
    
    <Box sx={{
        width: '100%',
        minHeight: "600px",
        minWidth: "700px"
      }}>

      {/* 标题 */}
      <SuperLargeBoldFont sx={{
          ml: "12px",
          fontSize: "32px !important",
          lineHeight: "54px !important"
        }}>路由链路</SuperLargeBoldFont>

      {/* Main Body */}
      <Stack sx={{paddingLeft: "30px"}}>
        <Stack direction="row" spacing={6} sx={{ mb: "12px" }}>
          {/* 搜索 */}
          <Stack direction="row" spacing={4} sx={{
              mt: "24px"
            }}>
            { /* Namespace */ }
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
            </Stack>
            { /* Duration */ }
            <FormControl variant="standard">
              <InputLabel
                id="service_search_mode_label"
                sx={{
                  color: 'var(--gray-500, #596A7C)',
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                }}
              >
                Duration
              </InputLabel>
              <Select
                value={durationSelectIndex}
                onChange={handleDurationSelectChange}
                sx={{
                  minWidth: "120px"
                }}
              >
                <MenuItem value={0}>last 1 min</MenuItem>
                <MenuItem value={1}>last 2 min</MenuItem>
                <MenuItem value={2}>last 5 min</MenuItem>
                <MenuItem value={3}>last 10 min</MenuItem>
                <MenuItem value={4}>last 30 min</MenuItem>
                <MenuItem value={5}>last 1 hour</MenuItem>
                <MenuItem value={6}>last 3 hours</MenuItem>
                <MenuItem value={7}>last 6 hours</MenuItem>
                <MenuItem value={8}>last 12 hours</MenuItem>
                <MenuItem value={9}>last 1 day</MenuItem>
                <MenuItem value={10}>last 7 days</MenuItem>
                <MenuItem value={11}>Custom</MenuItem>
              </Select>
            </FormControl>
            {
              durationSelectIndex === 11 ? 
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  sx={{width: "200px"}}
                  label="Start Time"
                  ampm={false}
                  displayWeekNumber={true}
                  minDate={dayjs("2020-01-01")}
                  maxDate={dayjs().add(1, 'day')}
                  timeSteps={{ hours: 1, minutes: 1, seconds: 10 }}
                  value={startTimeValue}
                  onChange={handleStartTimeChange}
                  />
                  <DateTimePicker
                    sx={{width: "200px"}}
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
            <Button endIcon={<SendIcon />} variant="contained"
              onClick={handleTraceSearchClick}
              sx={{
                mt: "6px !important",
                width: "110px",
                height: "40px"
              }}>
              Search
            </Button>
            
          </Stack>
        </Stack>

        
        
        <Stack  direction="row" spacing={2} sx={{ width: "100%" }}>
          {/* Trace 列表 */}
          <Stack>
            <div style={{ height: "30px"}}/>
            <TableContainer component={Paper} sx={
                { 
                  minWidth: "510px", 
                  boxShadow: "2px 2px 7px 1px #726C6F", 
                  border: "solid 1px #959194" 
                }}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#DAD9DA" }}>
                    <TableCell>服务</TableCell>
                    <TableCell align="center" sx={{ borderLeft: "solid 1px #B8B5B7", borderRight: "solid 1px #B8B5B7" }}>链路长度</TableCell>
                    <TableCell align="center">开始时间</TableCell>
                    <TableCell align="center">响应时间</TableCell>
                    <TableCell align="center">请求状态</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableRow}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>


          {/* 依赖图 */}
          <Stack>
            <NormalTitleFont>链路信息</NormalTitleFont>
            <Box sx={shadowStyle}>
              <Stack direction="row" spacing={1} sx={{ minWidth: "450px", minHeight: "500px"}}>
                {
                  (detailID >= 0)
                    ?
                    <RouteTraceCanvas id={detailID} />
                    :
                    <></>
                }
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
  //#endregion
}



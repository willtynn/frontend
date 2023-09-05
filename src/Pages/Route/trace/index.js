import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { RouteDependencyCanvas } from "./canvas";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Stack,
  Button,
  Typography,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material"
import {
  SuperLargeBoldFont,
} from "@/components/Fonts";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import SendIcon from '@mui/icons-material/Send';
import { RouteTraceCard } from "@/components/RouteTraceCard";

import {
  UPDATE_ROUTE_TRACE,
  getRouteTrace
} from "@/actions/routeAction";


//#region
const durationList = [60, 120, 300, 600, 1800, 3600, 10800, 21600, 43200, 86400, 604800];
//#endregion


export default function RouteTrace() {

  //定义-开始
  //#region
  const [emptyError, setEmptyError] = useState(false);
  const [durationSelectIndex, setDurationSelectIndex] = useState(5);

  const [startTimeValue, setStartTimeValue] = useState(dayjs().add(-15, 'minute'));
  const [endTimeValue, setEndTimeValue] = useState(dayjs());
  const [openModal, setOpenModal] = React.useState(false);
  const [traceIndex, setTraceIndex] = useState(0);
  
  const [test, setTest] = useState(false);
  
  /*
   * 用于route的依赖图
   */
  const [traceElements, setTraceElements] = useState([]);

  const dispatch = useDispatch();

  const {
    queryResult,
    routeTrace
  } = useSelector(state => {
    return {
      queryResult: state.Route.queryResult,
      routeTrace: state.Route.routeTrace
    };
  });

  //#endregion
  //定义-结束

  //style-开始
  //#region
  

  const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  //#endregion
  //style-结束

  //HOOK-开始
  //#region
  useEffect(() => {
    if (routeTrace) {
      let timeSum = 0;
      routeTrace.map((item) => {
        timeSum += item.spans[0].duration;
      });
      
      let elements = routeTrace.map(
        (item, index) => {
          const data = item.spans[0];

          let fullNodeID = "";
          data.tags.forEach((tag) => {
            if(tag.key === "node_id")
            {
              fullNodeID = tag.value;
            }
          });
          const nodeID = fullNodeID.split("~")[2];

          return <RouteTraceCard 
              nodeID= {nodeID}
              traceId= {item.traceID}
              spanNum= {item.spans.length}
              timeStamp= {data.startTime}
              duration= {data.duration}
              progress= {data.duration / timeSum * 100}
              action= {()=>{setTraceIndex(index);handleOpenModal();}}
            />;
        }
      );
      setTraceElements(elements);
    }
  }, [routeTrace]);

  useEffect(() => {
    dispatch(getRouteTrace(0,1));//TODO
  }, []);
  //#endregion
  //HOOK-结束

  //自定义函数-开始
  //#region
  
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
    dispatch(dispatch(getRouteTrace(0,1)));
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

  const handleTest = (e) => {
    handleOpenModal();
  }

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  //#endregion
  //handle-结束


  //return
  //#region
  return (
    
    <Box sx={{
        width: '100%',
        minHeight: "600px",
        minWidth: "700px",
        m: "8px"
      }}>
      
      {/* Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
      >
        <Fade in={openModal}>
          <Box sx={styleModal}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {traceIndex}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Modal Content
            </Typography>
          </Box>
        </Fade>
      </Modal>

      {/* Main Body */}
      <Stack direction="row" spacing={6} sx={{
          mb: "12px"
        }}>
        
        {/* 标题 */}
        <SuperLargeBoldFont sx={{
            ml: "12px",
            fontSize: "32px !important",
            lineHeight: "54px !important"
          }}>路由链路</SuperLargeBoldFont>

        {/* 搜索 */}
        <Stack direction="row" spacing={4} sx={{
            mt: "24px"
          }}>
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
              labelId="service_search_mode_label"
              id="service_search_mode"
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
              <MenuItem value={6}>last 3 hour</MenuItem>
              <MenuItem value={7}>last 6 hour</MenuItem>
              <MenuItem value={8}>last 12 hour</MenuItem>
              <MenuItem value={9}>last 1 day</MenuItem>
              <MenuItem value={10}>last 7 day</MenuItem>
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
          <Button onClick={handleTest}>TEST</Button>
        </Stack>
      </Stack>

      
      {/* 链路 */}
      
      <Stack>
        <Stack spacing={1}>
          {
            (traceElements.length !== 0)
              ?
              traceElements
              :
              <></>
          }
        </Stack>
      </Stack>
      



      {/* 依赖图 */}
      {/*
      <Stack>
        <Box>
          <Stack direction="row" spacing={1}>
            {
              (nodes.length !== 0)
                ?
                <RouteDependencyCanvas nodes={nodes} links={links} handleNodeClick={null} handleLinkClick={null} />
                :
                <></>
            }
          </Stack>
        </Box>
      </Stack>
      */}

    </Box>
  );
  //#endregion
}



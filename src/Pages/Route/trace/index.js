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
  Input,
  Stack,
  Button
} from "@mui/material"
import {
  SuperLargeBoldFont,
  SmallLightFont
} from "@/components/Fonts";
import SendIcon from '@mui/icons-material/Send';
import { RouteTraceCard } from "@/components/RouteTraceCard";
//import { OutlinedButton } from "@/components/Button";
import {
  UPDATE_ROUTE_TRACE,
  getRouteTrace
} from "@/actions/routeAction";
import { DateTimePicker, LocalizationProvider, zhCN } from "@mui/x-date-pickers"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

//#region
const durationList = [60, 120, 300, 600, 1800, 3600, 10800, 21600, 43200, 86400, 604800];
//#endregion


export default function RouteTrace() {

  //定义-开始
  //#region
  //const [namespaceContent, setNamespaceContent] = useState("");
  const [emptyError, setEmptyError] = useState(false);
  const [durationSelectIndex, setDurationSelectIndex] = useState(5);
  
  
  /*
   * 用于route的依赖图
   */
  //const [nodes, setNodes] = useState([]);
  //const [links, setLinks] = useState([]);
  const [traces, setTraces] = useState([]);
  const [traceElements, setTraceElements] = useState([]);
  const [durationStartValue, setDurationStartValue] = useState(new Date());

  //const dependencyClick = useRef();

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

  //HOOK-开始
  //#region
  useEffect(() => {
    console.log("SA");
    if (routeTrace) {
      //transformServiceData(1, routeTrace);
      let elements = routeTrace.map(
        (item, index) => 
            <RouteTraceCard key={index} trace={item} />
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
  const transformServiceData = (id, data) => {
    if (!data || (data.invoked.length === 0 && data.invoking.length === 0)) {
      return
    }
    let nodes = []
    let links = []
    nodes.push(
      {
        id: id,
        label: id,
        type: "target"
      }
    )
    nodes = nodes.concat(data.invoked.map(
      (item, index) => {
        return {
          id: item.id,
          label: item.id,
          type: "invoked"
        }
      }
    ))
    nodes = nodes.concat(data.invoking.map(
      (item, index) => {
        return {
          id: item.id,
          label: item.id,
          type: "invoking"
        }
      }
    ))
    links = links.concat(data.invoked.map(
      (item, index) => {
        return {
          source: item.id,
          target: id,
          invoke_info: item.invoke_info
        }
      }
    ))
    links = links.concat(data.invoking.map(
      (item, index) => {
        return {
          source: id,
          target: item.id,
          invoke_info: item.invoke_info
        }
      }
    ))
    //setNodes(nodes)
    //setLinks(links)
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
    dispatch(dispatch(getRouteTrace(0,1)));
  }

  const handleDurationStartValue = (e) => {
    setDurationStartValue(e.target.value);
  }

  const handleDurationSelectChange = (e) => {
    setDurationSelectIndex(e.target.value);
  }

  //#endregion
  //handle-结束


  //return
  //#region
  return (
    <Box sx={{
        width: '100%',
        minHeight: "800px",
        m: "16px"
      }}>

      <Stack direction="row" spacing={6} sx={{
          mb: "12px"
        }}>
        
        {/* 标题 */}
        <SuperLargeBoldFont sx={{
            ml: "12px",
            fontSize: "32px !important",
            lineHeight: "54px !important"
          }}>路由链路</SuperLargeBoldFont>

        {/* 搜索框 */}
        <Stack direction="row" spacing={4} sx={{
            mt: "24px"
          }}>
          {/* Namespcae *}
          <Stack>
            <SmallLightFont>
                    Query
            </SmallLightFont>
            <FormControl>
              <Input
                id="namespace-input"
                aria-describedby="namespace-input-text"
                value={namespaceContent}
                onChange={handleNamespaceChange}
                error={emptyError}
              />
              {
                !emptyError
                  ?
                  <FormHelperText id="namespace-input-text"
                    sx={{
                      m: "3px 0px 0px 0px"
                    }}
                  >
                    Namespace
                  </FormHelperText>
                  :
                  <></>
              }
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
          //TODO
          /*
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={zhCN}>
            <DateTimePicker
              label="Start"
              value={durationStartValue}
              onChange={handleDurationStartValue}
            />
          </LocalizationProvider>*/
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



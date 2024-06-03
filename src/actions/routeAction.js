import { axios_instance } from "@/Pages/Route/trace/functions/axios_trace.js";

/*
import {test_service_data, test_data, test_detail_data} from "../Pages/Route/trace/test_data.js"

const data_service = JSON.parse(test_service_data)
const data_trace = JSON.parse(test_data)
const data_detail = JSON.parse(test_detail_data)*/

export const UPDATE_ROUTE_SERVICE = "UPDATE_ROUTE_SERVICE";
export const UPDATE_ROUTE_TRACE = "UPDATE_ROUTE_TRACE";
export const UPDATE_ROUTE_TRACE_DETAIL = "UPDATE_ROUTE_TRACE_DETAIL";

export const UPDATE_FAILED = "UPDATE_FAILED";

export const CLEAR_ROUTE_TRACE = "CLEAR_ROUTE_TRACE";
export const CHANGE_PAGE_SIZE = 'CHANGE_REQUEST_OF_SERVICE_PAGE_SIZE';
export const CHANGE_PAGE_NUM = 'CHANGE_REQUEST_OF_SERVICE_PAGE_NUM';


let getRouteServiceNum = 0;
export function getRouteService(start, end) {
  const url = "/trace/service";
  // 从localStorage中搜索
  // const data = localStorage.getItem("trace_service_" + start + end);
  // 从SessionStorage中搜索
  const data = sessionStorage.getItem("trace_service_" + start + end);
  // console.log("get trace_service_" + start + end, data);
  if (data) {
    return async dispatch => {
      dispatch({ type: UPDATE_ROUTE_SERVICE, data: JSON.parse(data) });
      dispatch({ type: UPDATE_FAILED, data: false });
    }
  }

  return async dispatch => {
    getRouteServiceNum++;
    const nowNum = getRouteServiceNum;
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            start: start,
            end: end
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      if (getRouteServiceNum !== nowNum) {
        return;
      }
      if (res.status === 200) {
        // 保存到localStorage中
        // localStorage.setItem("trace_service_" + start + end, JSON.stringify(res.data));
        // 保存到SessionStorage中
        sessionStorage.setItem("trace_service_" + start + end, JSON.stringify(res.data));
        // console.log("set trace_service_" + start + end, res.data);
        dispatch({ type: UPDATE_ROUTE_SERVICE, data: res.data });
      } else{
        dispatch({ type: UPDATE_ROUTE_SERVICE, data: [] });
      }
      dispatch({ type: UPDATE_FAILED, data: false });
    } catch {
      if (getRouteServiceNum !== nowNum) {
        return;
      }
      dispatch({ type: UPDATE_ROUTE_SERVICE, data: null });
      dispatch({ type: UPDATE_FAILED, data: true });
    }
  }
}

let getRouteTraceNum = 0;
export function getRouteTrace(start, end, service, api) {
  const url = "/trace";
  // 从sessionStorage中搜索
  const data = sessionStorage.getItem("trace_" + start + end + service + api);
  if (data) {
    return async dispatch => {
      dispatch({ type: UPDATE_ROUTE_TRACE, data: JSON.parse(data) });
      dispatch({ type: UPDATE_FAILED, data: false });
    }
  }
  return async dispatch => {
    getRouteTraceNum++;
    const nowNum = getRouteTraceNum;
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            start: start,
            end: end,
            service: service,
            api: api
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      if (getRouteTraceNum !== nowNum) {
        return;
      }
      if (res.status === 200) {
        // 保存到sessionStorage中
        sessionStorage.setItem("trace_" + start + end + service + api, JSON.stringify(res.data));
        dispatch({ type: UPDATE_ROUTE_TRACE, data: res.data });
      } else{
        dispatch({ type: UPDATE_ROUTE_TRACE, data: [] });
      }
      dispatch({ type: UPDATE_FAILED, data: false });
    } catch {
      if (getRouteTraceNum !== nowNum) {
        return;
      }
      dispatch({ type: UPDATE_ROUTE_TRACE, data: null });
      dispatch({ type: UPDATE_FAILED, data: true });
    }
  }
}


let getRouteTraceDetailNum = 0;
export function getRouteTraceDetail(id) {
  const url = "/trace/detail";
  // 从sessionStorage中搜索
  const data = sessionStorage.getItem("trace_detail_" + id);
  if (data) {
    return async dispatch => {
      dispatch({ type: UPDATE_ROUTE_TRACE_DETAIL, data: JSON.parse(data) });
      dispatch({ type: UPDATE_FAILED, data: false });
    }
  }

  return async dispatch => {
    getRouteTraceDetailNum++;
    const nowNum = getRouteTraceDetailNum;
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            id: id
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      if (getRouteTraceDetailNum !== nowNum) {
        return;
      }
      if (res.status === 200) {
        // 保存到sessionStorage中
        sessionStorage.setItem("trace_detail_" + id, JSON.stringify(res.data));
        dispatch({ type: UPDATE_ROUTE_TRACE_DETAIL, data: res.data });
      } else{
        dispatch({ type: UPDATE_ROUTE_TRACE_DETAIL, data: [] });
      }
      dispatch({ type: UPDATE_FAILED, data: false });
    } catch {
      if (getRouteTraceDetailNum !== nowNum) {
        return;
      }
      dispatch({ type: UPDATE_ROUTE_TRACE_DETAIL, data: null });
      dispatch({ type: UPDATE_FAILED, data: true });
    }
  }
}



export function clearRouteTrace() {
  return async dispatch => {
    dispatch({ type: CLEAR_ROUTE_TRACE, data: null });
    dispatch({ type: UPDATE_FAILED, data: false });
  }
}

export function clearFailed() {
  return async dispatch => {
    dispatch({ type: UPDATE_FAILED, data: false });
  }
}


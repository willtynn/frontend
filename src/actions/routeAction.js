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



export function getRouteService(start, end) {
  const url = "/trace/service";
  return async dispatch => {
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
      if (res.status === 200) {
        dispatch({ type: UPDATE_ROUTE_SERVICE, data: res.data });
      } else{
        dispatch({ type: UPDATE_ROUTE_SERVICE, data: [] });
      }
      dispatch({ type: UPDATE_FAILED, data: false });
    } catch {
      dispatch({ type: UPDATE_ROUTE_SERVICE, data: null });
      dispatch({ type: UPDATE_FAILED, data: true });
    }
  }
}

export function getRouteTrace(start, end, service, api) {
  const url = "/trace";
  return async dispatch => {
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
      if (res.status === 200) {
        dispatch({ type: UPDATE_ROUTE_TRACE, data: res.data });
      } else{
        dispatch({ type: UPDATE_ROUTE_TRACE, data: [] });
      }
      dispatch({ type: UPDATE_FAILED, data: false });
    } catch {
      dispatch({ type: UPDATE_ROUTE_TRACE, data: null });
      dispatch({ type: UPDATE_FAILED, data: true });
    }
  }
}


export function getRouteTraceDetail(id) {
  const url = "/trace/detail";
  return async dispatch => {
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
      if (res.status === 200) {
        dispatch({ type: UPDATE_ROUTE_TRACE_DETAIL, data: res.data });
      } else{
        dispatch({ type: UPDATE_ROUTE_TRACE_DETAIL, data: [] });
      }
      dispatch({ type: UPDATE_FAILED, data: false });
    } catch {
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


import { axios_instance } from "@/Pages/Route/trace/functions/axios_trace.js";


import {test_service_data, test_data, test_detail_data} from "../Pages/Route/trace/test_data.js"
const data_service = JSON.parse(test_service_data)
const data_trace = JSON.parse(test_data)
const data_detail = JSON.parse(test_detail_data)

export const UPDATE_ROUTE_SERVICE = "UPDATE_ROUTE_SERVICE";
export const UPDATE_ROUTE_TRACE = "UPDATE_ROUTE_TRACE";
export const UPDATE_ROUTE_TRACE_DETAIL = "UPDATE_ROUTE_TRACE_DETAIL";

export const CLEAR_ROUTE_TRACE = "CLEAR_ROUTE_TRACE";


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
      console.log(res)
      if (res.status === 200) {
        console.log(res.data)
        dispatch({ type: UPDATE_ROUTE_SERVICE, data: res.data });
      } else{
        //alert(res.data)
        console.log(res.data)
        dispatch({ type: UPDATE_ROUTE_SERVICE, data: [] });
      }
    } catch {
      dispatch({ type: UPDATE_ROUTE_SERVICE, data: null });
    }
    //dispatch({ type: UPDATE_ROUTE_SERVICE, data: data_service });
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
      console.log(res)
      if (res.status === 200) {
        console.log(res.data)
        dispatch({ type: UPDATE_ROUTE_TRACE, data: res.data });
      } else{
        //alert(res.data)
        console.log(res.data)
        dispatch({ type: UPDATE_ROUTE_TRACE, data: [] });
      }
    } catch {
      dispatch({ type: UPDATE_ROUTE_TRACE, data: null });
    }
    //dispatch({ type: UPDATE_ROUTE_TRACE, data: data_trace });
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
      console.log(res)
      if (res.status === 200) {
        console.log(res.data)
        dispatch({ type: UPDATE_ROUTE_TRACE_DETAIL, data: res.data });
      } else{
        //alert(res.data)
        console.log(res.data)
        dispatch({ type: UPDATE_ROUTE_TRACE_DETAIL, data: [] });
      }
    } catch {
      dispatch({ type: UPDATE_ROUTE_TRACE_DETAIL, data: null });
    }
    //dispatch({ type: UPDATE_ROUTE_TRACE_DETAIL, data: data_detail });
  }
}



export function clearRouteTrace(id) {
  return async dispatch => {
    dispatch({ type: CLEAR_ROUTE_TRACE, data: null });
  }
}


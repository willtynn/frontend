import * as actions from "../actions/routeAction";
import dayjs from 'dayjs';

const initState = {
  routeService: null,
  routeTrace: null,
  routeTraceDetail: null,
  routeFailed: false, // Failed 标志虽然在下一次成功调用后会被清除，但应该在处理后立刻清除
  pageNum: 1,
  pageSize: 10,
}

const orderRouteTrace = (data) => {
  data.sort((a, b) => {
    let aTime = dayjs(a.time);
    let bTime = dayjs(b.time);
    return aTime.isBefore(bTime) ? -1 : 1;
  });
  return data;
}

export default function RouteReducer(state = initState, action) {
  const { type, data } = action
  switch (type) {
    case actions.UPDATE_ROUTE_SERVICE:
      return {
        ...state,
        routeService: data
      }
    case actions.UPDATE_ROUTE_TRACE:
      if (data)
      {
        return {
          ...state,
          routeTrace: orderRouteTrace(data)
        }
      }
      return {
        ...state,
        routeTrace: null
      }
    case actions.UPDATE_ROUTE_TRACE_DETAIL:
      return {
        ...state,
        routeTraceDetail: data
      }
    
    case actions.UPDATE_FAILED:
      return {
        ...state,
        routeFailed: data
      }

    case actions.CLEAR_ROUTE_TRACE:
      return {
        ...state,
        routeTrace: null
      }

    case actions.CHANGE_PAGE_NUM:
      return {
        ...state,
        pageNum: data
      }

    case actions.CHANGE_PAGE_SIZE:
      return {
        ...state,
        pageSize: data
      }
    default:
      return state;
  }
}
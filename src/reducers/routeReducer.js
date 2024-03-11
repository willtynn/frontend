import * as actions from "../actions/routeAction";
import dayjs from 'dayjs';
import {UPDATE_CURRENT_NAMESPACE, UPDATE_NAMESPACES} from "../actions/instanceAction";
import * as routectl from "../actions/routectlActions"
import {UPDATE_SEARCH_SERVICE} from "../actions/serviceAction";

const initState = {
  routeService: null,
  routeTrace: null,
  routeTraceDetail: null,
  routeFailed: false, // Failed 标志虽然在下一次成功调用后会被清除，但应该在处理后立刻清除
  pageNum: 1,
  pageSize: 10,
  // For RouteCtl
  rules: [],
  // namespaces: [],
  // currentNamespace: null,
  services: [],
  currentService: null,

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
      // For RouteCtl
    // case UPDATE_NAMESPACES:
    //   return {
    //     ...state,
    //     namespaces: data
    //   }
    // case UPDATE_CURRENT_NAMESPACE:
    //   return {
    //     ...state,
    //     currentNamespace: data
    //   }
    case UPDATE_SEARCH_SERVICE:
      return {
        ...state,
        services: data.map(s=>s.name)
      }
    case routectl.UPDATE_CURRENT_SERVICE:
      return {
        ...state,
        currentService: data
      }
    case routectl.UPDATE_ROUTERULES:
      return {
        ...state,
        rules: data
      }
    default:
      return state;
  }
}
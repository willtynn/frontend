import * as actions from "../actions/routeAction";

const initState = {
  routeService: null,
  routeTrace: null,
  routeTraceDetail: null,
  routeFailed: false // Failed 标志虽然在下一次成功调用后会被清除，但应该在处理后立刻清除
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
      return {
        ...state,
        routeTrace: data
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
    default:
      return state;
  }
}
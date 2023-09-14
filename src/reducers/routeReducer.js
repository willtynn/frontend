import * as actions from "../actions/routeAction";

const initState = {
  routeService: null,
  routeTrace: null,
  routeTraceDetail: null
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

    case actions.CLEAR_ROUTE_TRACE:
      return {
        ...state,
        routeTrace: null
      }
    default:
      return state;
  }
}
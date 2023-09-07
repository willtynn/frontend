import * as actions from "../actions/routeAction";

const initState = {
  routeTrace: null,
  routeTraceDetail: null
}

export default function RouteReducer(state = initState, action) {
  const { type, data } = action
  switch (type) {
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
    default:
      return state;
  }
}
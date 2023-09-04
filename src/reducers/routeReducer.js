import * as actions from "../actions/routeAction";

const initState = {
  queryResult: null,
  routeTrace: null
}

export default function RouteReducer(state = initState, action) {
  const { type, data } = action
  switch (type) {
    case actions.UPDATE_ROUTE_TRACE:
      console.log(data);
      return {
        ...state,
        routeTrace: data
      }
    default:
      return state;
  }
}
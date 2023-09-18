import * as actions from "../actions/serviceAction";

const initState = {
  exactService: null,
  queryResult: null,
  dependency: null,
  serviceDependency: null,
  interfaceDependency: null,
}

export default function ServiceReducer(state = initState, action) {
  const { type, data } = action
  switch (type) {
    case actions.UPDATE_EXACT_SERVICE:
      return {
        ...state,
        exactService: data
      }
    case actions.UPDATE_SEARCH_SERVICE:
      return {
        ...state,
        queryResult: data
      }
    case actions.UPDATE_DEPENDENCY:
      return {
        ...state,
        dependency: data
      }
    case actions.UPDATE_SERVICE_DEPENDENCY:
      return {
        ...state,
        serviceDependency: data
      }
    case actions.UPDATE_INTERFACE_DEPENDENCY:
      return {
        ...state,
        interfaceDependency: data
      }
    default:
      return state
  }
}
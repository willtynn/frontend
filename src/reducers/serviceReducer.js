import * as actions from "../actions/serviceAction";

const initState = {
  exactService: null,
  queryResult: null,
  dependency: null,
  serviceDependency: null,
  interfaceDependency: null,
  pageSize: 10,
  pageNum: 1,
  pods: [],
  edgeData: {},
  edgeList: [],
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
    case actions.UPDATE_SEARCH_POD:
      return {
        ...state,
        pods: data
      }
    case actions.UPDATE_EDGE_DATA:
      return {
        ...state,
        edgeData: data
      }
    case actions.UPDATE_EDGE_LIST:
      return {
        ...state,
        edgeList: data
      }
    default:
      return state
  }
}
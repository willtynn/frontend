import * as actions from "../actions/instanceAction";

const initState = {
  gottenInstances: null,
  pageSize: 10,
  pageNum: 1,
  namespaces: [],
  currentNamespace: null,
}

export default function InstanceReducer(state = initState, action) {
  const { type, data } = action
  switch (type) {
    case actions.GET_INSTANCES:
      return {
        ...state,
        gottenInstances: data
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
    case actions.UPDATE_NAMESPACES:
      return {
        ...state,
        namespaces: data
      }
    case actions.UPDATE_CURRENT_NAMESPACE:
      return {
        ...state,
        currentNamespace: data
      }
    default:
      return state
  }
}
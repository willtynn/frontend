import * as actions from "../actions/instanceAction";

const initState = {
  gottenInstances: null,
  pageSize: 5,
  pageNum: 1
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
    default:
      return state
  }
}
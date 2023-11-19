import * as actions from "../actions/imageAction";

const initState = {
  imageList: [],
  pageSize: 10,
  pageNum: 1,
}

export default function ImageReducer(state = initState, action) {
  const { type, data } = action
  switch (type) {
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
    case actions.UPDATE_LIST:
      return {
        ...state,
        imageList: data
      }
    default:
      return state
  }
}
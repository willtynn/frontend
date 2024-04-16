import * as actions from '../actions/schemeAction';

const initState = {
  schemes: [],
  pageSize: 10,
  pageNum: 1,
  namespace: [],
  currentNamespace: null,
};

export default function SchemeReducer(state = initState, action) {
  const { type, data } = action;
  switch (type) {
    case actions.UPDATE_SCHEMES:
      return {
        ...state,
        schemes: data,
      };
    case actions.CHANGE_PAGE_NUM:
      return {
        ...state,
        pageNum: data,
      };
    case actions.CHANGE_PAGE_SIZE:
      return {
        ...state,
        pageSize: data,
      };
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
      return state;
  }
}

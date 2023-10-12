import * as actions from "../actions/instanceAction";

const initState = {
  
}

export default function ClusterReducer(state = initState, action) {
  const { type, data } = action
  switch (type) {
    case actions.UPDATE_CLUSTERS:
      return {
        ...state,
        clusters: data
      }
    default:
      return state
  }
}
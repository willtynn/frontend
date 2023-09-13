import * as actions from "../actions/clusterAction";

const initState = {
  clusters: null
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
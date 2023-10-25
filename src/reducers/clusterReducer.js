import * as actions from "../actions/clusterAction";

const initState = {
  clusters: null,
  selectedServer: null,
  selectedServerId: null,
  selectedInstanceName: null
}

export default function ClusterReducer(state = initState, action) {
  const { type, data } = action
  switch (type) {
    case actions.UPDATE_CLUSTERS:
      return {
        ...state,
        clusters: data
      }
    case actions.SELECT_SERVER:
      return {
        ...state,
        selectedServerId: data
      }
    case actions.UPDATE_SELECTED_SERVER:
      return {
        ...state,
        selectedServer: data
      }
    case actions.SELECT_INSTANCE:
      return {
        ...state,
        selectedInstanceName: data
      }
    default:
      return state
  }
}
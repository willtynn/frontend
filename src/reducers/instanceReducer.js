import * as actions from "../actions/instanceAction";

const initState = {
  gottenInstances: []
}

export default function InstanceReducer(state = initState, action) {
  const { type, data } = action
  switch (type) {
    case actions.GET_INSTANCES:
      return {
        ...state,
        gottenInstances: data
      }
    default:
      return state
  }
}
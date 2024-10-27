import * as actions from "../actions/langAction";

const initState = {
  locale: "zh-CN"
}

export default function LangReducer(state = initState, action) {
    const { type, data } = action
    switch (type) {
      case actions.UPDATE_LANGUAGE:
        return {
          ...state,
          locale: data
        }
      default:
        return state
    }
  }
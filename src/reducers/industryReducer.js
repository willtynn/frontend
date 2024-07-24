import { ADD_SERVICE, DELETA_SERVICE, GET_SERVICE_LIST, SET_ABNORMAL_SERVICE_COUNT, SET_PUBLISH_SERVICE_COUNT, SET_RUN_SERVICE_COUNT, SET_SERVICE_NAME_TO_ADD, SET_SERVICE_VERSION_TO_ADD, SET_STOP_SERVICE_COUNT, GET_IMAGE_LIST, UPDATE_IMAGE_LOG } from "../actions/industryAction"

const initState = {
  serviceList: [],
  imageList: [],
  serviceNameToAdd: '',
  serviceVersionToAdd: '',
  run: 0,
  publish: 0,
  abnormal: 0,
  stop: 0,
  imageLog: [],
}
export default function IndustryReducer(state = initState, action) {
  const { type, data } = action
  switch (type) {
    case ADD_SERVICE:
      return {
        ...state, serviceList: data
      }
    case DELETA_SERVICE:
      return {
        ...state, serviceList: data
      }
    case GET_SERVICE_LIST:
      return {
        ...state, serviceList: data
      }
    case SET_SERVICE_NAME_TO_ADD:
      return {
        ...state, serviceNameToAdd: data
      }
    case SET_SERVICE_VERSION_TO_ADD:
      return {
        ...state, serviceVersionToAdd: data
      }
    case SET_PUBLISH_SERVICE_COUNT:
      return {
        ...state, publish: data
      }
    case SET_RUN_SERVICE_COUNT:
      return {
        ...state, run: data
      }
    case SET_ABNORMAL_SERVICE_COUNT:
      return {
        ...state, abnormal: data
      }
    case SET_STOP_SERVICE_COUNT:
      return {
        ...state, stop: data
      }
    case GET_IMAGE_LIST:
      return {
        ...state, imageList: data
      }
    case UPDATE_IMAGE_LOG:
      return {
        ...state, imageLog: data
      }
    default:
      return state
  }
}
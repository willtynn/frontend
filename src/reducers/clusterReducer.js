/**
 * src\reducers\clusterReducer.js
 */
import * as actions from "../actions/clusterAction";

const initState = {
  clusters: null,
  selectedServer: null,
  selectedServerId: null,
  selectedInstanceName: null,
  networkControlInfo: [],
  exactnetworkControlInfo: null,
  bandwidthControl: null,
  pageSize: 10,  // 默认每页显示条数
  pageNum: 1,    // 默认当前页码
  local:'',
  target:'',
  bandwidth:'',
  ip:'',
  allNetworkControlInfo: [],
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
    case actions.UPDATE_NETWORK_CONTROL_INFO:
      return {
        ...state,
        networkControlInfo: data
      }
    case actions.UPDATE_EXACT_NETWORK_CONTROL_INFO:
      return {
        ...state,
        exactnetworkControlInfo: data
      }
    case actions.SET_BANDWIDTH_CONTROL:
      return {
        ...state,
        bandwidthControl: data
      }
    case actions.DELETE_BANDWIDTH_CONTROL:
      return {
        ...state,
        networkControlInfo: state.networkControlInfo.filter(
            control => control.localIp !== action.data.localIp || control.targetIp !== action.data.targetIp
        ),
      }
    case actions.CHANGE_PAGE_SIZE:
      return {
        ...state,
        pageSize: data
      }
    case actions.CHANGE_PAGE_NUM:
      return {
        ...state,
        pageNum: data
      }
    case actions.UPDATE_LOCAL:
      return {
        ...state,
        local: data
      }
    case actions.UPDATE_TARGET:
      return {
        ...state,
        target: data
      }
    case actions.UPDATE_BANDWIDTH:
      return {
        ...state,
        bandwidth: data
      }
    case actions.UPDATE_IP:
      return {
        ...state,
        ip: data
      }
    case actions.UPDATE_ALL_NETWORK_CONTROL_INFO:
      return {
        ...state,
        allNetworkControlInfo: data
      }
    default:
      return state
  }
}
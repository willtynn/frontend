/**
 * src\reducers\serviceReducer.js
 */

import * as actions from "../actions/serviceAction";

const initState = {
  exactService: null,
  queryResult: null,
  dependency: null,
  serviceDependency: null,
  interfaceDependency: null,
  pageSize: 10,
  pageNum: 1,
  pods: [],
  edgeData: {},
  edgeList: [],
  serviceID: '',
  serviceName: '',
  codeRepository: '',
  imageURLandTAG: '',
  major:'',
  minor:'',
  patch:'',
  idleCPU: 0.0 ,
  idleRAM: 0.0 ,
  idleDISK: 0.0 ,
  idleGPUCORE: 0.0 ,
  idleGPUMEM: 0.0 ,
  desiredCPU: 0.0 ,
  desiredRAM: 0.0 ,
  desiredDISK: 0.0 ,
  desiredGPUCORE: 0.0 ,
  desiredGPUMEM: 0.0 ,
  processCapability: 0 ,
  interfaces:[],
};

export default function ServiceReducer(state = initState, action) {
  const { type, data } = action;
  switch (type) {
    case actions.UPDATE_EXACT_SERVICE:
      return {
        ...state,
        exactService: data
      };
    case actions.UPDATE_SEARCH_SERVICE:
      return {
        ...state,
        queryResult: data
      };
    case actions.UPDATE_DEPENDENCY:
      return {
        ...state,
        dependency: data
      };
    case actions.UPDATE_SERVICE_DEPENDENCY:
      return {
        ...state,
        serviceDependency: data
      };
    case actions.UPDATE_INTERFACE_DEPENDENCY:
      return {
        ...state,
        interfaceDependency: data
      };
    case actions.CHANGE_PAGE_NUM:
      return {
        ...state,
        pageNum: data
      };
    case actions.CHANGE_PAGE_SIZE:
      return {
        ...state,
        pageSize: data
      };
    case actions.UPDATE_SEARCH_POD:
      return {
        ...state,
        pods: data
      };
    case actions.UPDATE_EDGE_DATA:
      return {
        ...state,
        edgeData: data
      };
    case actions.UPDATE_EDGE_LIST:
      return {
        ...state,
        edgeList: data
      };
    case actions.UPDATE_SERVICE_ID:
      return {
        ...state,
        serviceID: data
      };
    case actions.UPDATE_SERVICE_NAME:
      return {
        ...state,
        serviceName: data
      };
    case actions.UPDATE_SERVICE_CODEREPOSITORY:
      return {
        ...state,
        codeRepository: data
      };
    case actions.UPDATE_SERVICE_IMAGE_URL_AND_TAG:
      return {
        ...state,
        imageURLandTAG: data
      };

    case actions.UPDATE_SERVICE_MAJOR:
      return {
        ...state,
        major: data
      };

    case actions.UPDATE_SERVICE_MINOR:
      return {
        ...state,
        minor: data
      };

    case actions.UPDATE_SERVICE_PATCH:
      return {
        ...state,
        patch: data
      };
    case actions.UPDATE_SERVICE_IDELCPU:
      return {
        ...state,
        idleCPU: data
      };
    case actions.UPDATE_SERVICE_IDELRAM:
      return {
        ...state,
        idleRAM: data
      };
    case actions.UPDATE_SERVICE_IDELDISK:
      return {
        ...state,
        idleDISK: data
      };
    case actions.UPDATE_SERVICE_IDELGPUCORE:
      return {
        ...state,
        idleGPUCORE: data
      };
    case actions.UPDATE_SERVICE_IDELGPUMEM:
      return {
        ...state,
        idleGPUMEM: data
      };
    case actions.UPDATE_SERVICE_DESIREDCPU:
      return {
        ...state,
        desiredCPU: data
      };
    case actions.UPDATE_SERVICE_DESIREDRAM:
      return {
        ...state,
        desiredRAM: data
      };
    case actions.UPDATE_SERVICE_DESIREDDISK:
      return {
        ...state,
        desiredDISK: data
      };
    case actions.UPDATE_SERVICE_DESIREDGPUCORE:
      return {
        ...state,
        desiredGPUCORE: data
      };
    case actions.UPDATE_SERVICE_DESIREDGPUMEM:
      return {
        ...state,
        desiredGPUMEM: data
      };
    case actions.UPDATE_SERVICE_PROCESSCAPABILITY:
      return {
        ...state,
        processCapability: data
      };

    case actions.UPDATE_INTERFACES:
      return {
        ...state,
        interfaces: data
      };
    default:
      return state;
  }
}
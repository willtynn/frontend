import axios from 'axios';

export const ADD_SERVICE = 'ADD_SERVICE'
export const DELETA_SERVICE = 'DELETA_SERVICE'
export const GET_SERVICE_LIST = 'GET_SERVICE_LIST'
export const SET_SERVICE_NAME_TO_ADD = 'SET_SERVICE_NAME_TO_ADD'
export const SET_SERVICE_VERSION_TO_ADD = 'SET_SERVICE_VERSION_TO_ADD'
export const SET_PUBLISH_SERVICE_COUNT = 'SET_PUBLISH_SERVICE_COUNT'
export const SET_RUN_SERVICE_COUNT = 'SET_RUN_SERVICE_COUNT'
export const SET_ABNORMAL_SERVICE_COUNT = 'SET_ABNORMAL_SERVICE_COUNT'
export const SET_STOP_SERVICE_COUNT = 'SET_STOP_SERVICE_COUNT'
export const GET_IMAGE_LIST = 'GET_IMAGE_LIST'
export const UPDATE_IMAGE_LOG = 'UPDATE_IMAGE_LOG'

const baseURLLink = 'http://192.168.1.104:31963';
const axios_instance = axios.create({
  baseURL: baseURLLink,
  timeout: 30000,
  crossDomain: true,
});


export function addService(serviceName, serviceVersion) {

}
export function deleteService(serviceId) {

}
export function getServiceStatus() {
  const url = '/hitcs/getStatus';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {},
        }
      );
      if (res.status === 200) {
        dispatch({ type: SET_PUBLISH_SERVICE_COUNT, data: res.data.data.release});
        dispatch({ type: SET_RUN_SERVICE_COUNT, data: res.data.data.running});
        dispatch({ type: SET_ABNORMAL_SERVICE_COUNT, data: res.data.data.error});
        dispatch({ type: SET_STOP_SERVICE_COUNT, data: res.data.data.stop});
      }
      else {}
    }
    catch {}
  };
}
export function getServiceList() {
  const url = '/hitcs/selectAll';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {},
        }
      );
      if (res.status === 200) {
        dispatch({ type: GET_SERVICE_LIST, data: res.data });
      }
      else {}
    }
    catch {}
  };
}
export function getImageList() {
  const url = '/hitcs/getContainers';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {},
        }
      );
      if (res.status === 200) {
        dispatch({ type: GET_IMAGE_LIST, data: res.data.data });
      }
    }
    catch {}
  };
}

export function getImageLog(host, id) {
  const url = '/hitcs/getContainerLog';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            host: host,
            id: id
          },
        }
      );
      if (res.status === 200) {
        dispatch({ type: UPDATE_IMAGE_LOG, data: res.data.data });
      }
    }
    catch {}
  };
}

export function setServiceNameToAdd(serviceName) {
  return dispatch => {
    dispatch({ type: SET_SERVICE_NAME_TO_ADD, data: serviceName })
  }
}
export function setServiceVersionToAdd(serviceVersion) {
  return dispatch => {
    dispatch({ type: SET_SERVICE_VERSION_TO_ADD, data: serviceVersion })
  }
}
export function setPublishServiceCount(count) {
  return dispatch => {
    dispatch({ type: SET_PUBLISH_SERVICE_COUNT, data: count })
  }
}
export function setRunServiceCount(count) {
  return dispatch => {
    dispatch({ type: SET_RUN_SERVICE_COUNT, data: count })
  }
}
export function setAbnormalServiceCount(count) {
  return dispatch => {
    dispatch({ type: SET_ABNORMAL_SERVICE_COUNT, data: count })
  }
}
export function setStopServiceCount(count) {
  return dispatch => {
    dispatch({ type: SET_STOP_SERVICE_COUNT, data: count })
  }
}
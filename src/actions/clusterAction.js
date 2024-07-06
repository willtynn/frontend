/**
 * src\actions\clusterAction.js
 */
import axios from 'axios';
import { setSnackbarMessageAndOpen } from './snackbarAction';
import { SEVERITIES } from '../components/CommonSnackbar';

export const UPDATE_CLUSTERS = 'UPDATE_CLUSTERS';

export const UPDATE_SELECTED_SERVER = "UPDATE_SELECTED_SERVER";

export const SELECT_SERVER = "SELECT_SERVER";

export const SELECT_INSTANCE = "SELECT_INSTANCE";

export const UPDATE_CURRENT_CLUSTER = "UPDATE_CURRENT_CLUSTER";

export const UPDATE_NETWORK_CONTROL_INFO = "UPDATE_NETWORK_CONTROL_INFO";

export const UPDATE_EXACT_NETWORK_CONTROL_INFO = "UPDATE_EXACT_NETWORK_CONTROL_INFO";

export const SET_BANDWIDTH_CONTROL = 'SET_BANDWIDTH_CONTROL';

export const DELETE_BANDWIDTH_CONTROL = 'DELETE_BANDWIDTH_CONTROL';

export const CHANGE_PAGE_NUM = 'CHANGE_PAGE_NUM';

export const CHANGE_PAGE_SIZE = 'CHANGE_PAGE_SIZE';

export const RESET_CONTROL = 'RESET_CONTROL';

export const UPDATE_CONTROL_EDIT = 'UPDATE_CONTROL_EDIT';

export const UPDATE_LOCAL = 'UPDATE_LOCAL';

export const UPDATE_TARGET = 'UPDATE_TARGET';

export const UPDATE_BANDWIDTH = 'UPDATE_BANDWIDTH';

export const UPDATE_CONTROL_EDIT_INDEX = 'UPDATE_NETWORK_EDIT_INDEX';

export const UPDATE_CONTROL_CONFIG = 'UPDATE_CONTROL_CONFIG';

export const UPDATE_IP = 'UPDATE_IP';


const baseURLLink = 'http://100.105.103.116:32318';

const axios_instance = axios.create({
  baseURL: baseURLLink,
  timeout: 10000,
  // withCredentials: isCookie,
  crossDomain: true,
});

export function searchAllClusters() {
  const url = '/cluster/allClusters';
  return async dispatch => {
    try {
      const res = await axios_instance.post(
          url,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: UPDATE_CLUSTERS, data: res.data.data });
      } else if (res.data.code === 1) {
        // alert(res.data.message)
        dispatch(
            setSnackbarMessageAndOpen(
                'common.errorMessage',
                { msg: res.data.message },
                SEVERITIES.warning
            )
        );
        dispatch({ type: UPDATE_CLUSTERS, data: [] });
      } else {
        dispatch(
            setSnackbarMessageAndOpen(
                'cluster.clustersSearchError',
                {},
                SEVERITIES.warning
            )
        );
        dispatch({ type: UPDATE_CLUSTERS, data: null });
      }
    } catch {
      dispatch(
          setSnackbarMessageAndOpen(
              'cluster.clustersSearchError',
              {},
              SEVERITIES.warning
          )
      );
      dispatch({ type: UPDATE_CLUSTERS, data: null });
    }
  };
}

//查询网络节点控制信息
export function getNetworkControlInfo(ip) {
  const url = '/api/network/get/control';
  return async dispatch => {
    try {
      console.log(`Requesting network control info for IP: ${ip}`);
      const res = await axios_instance.get(
          url,
          {
            params: {
              ip: ip,
            },
          },
          {
            headers: {
              'Content-Type': 'application/json'
            },
          }
      );
      console.log(`Response for IP ${ip}:`, res.data);
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: UPDATE_NETWORK_CONTROL_INFO, data: res.data.data });
        return res.data.data;
      } else if (res.code === 40400){
        dispatch(
            setSnackbarMessageAndOpen(
            )
        );
        return {payload: []};
      }
    } catch (error) {
      console.error(`Error requesting network control info for IP ${ip}:`, error);
      dispatch(
          setSnackbarMessageAndOpen(
              'cluster.getNetworkControlInfoError',
              { msg: error.message },
              SEVERITIES.warning
          )
      );
      return { payload: null };
    }
  };
}

//设置带宽控制
export function setBandwidthControl(data) {
  const url = '/api/network/set/bandwidth';
  return async dispatch => {
    try {
      const res = await axios_instance.post(
          url,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: SET_BANDWIDTH_CONTROL, data: res.data.data });
        dispatch(
            setSnackbarMessageAndOpen(
                'cluster.setBandwidthSuccess',
                {},
                SEVERITIES.success
            )
        );
      } else if (res.data.code === 1) {
        dispatch(
            setSnackbarMessageAndOpen(
                'cluster.setBandwidthError',
                { msg: res.data.message },
                SEVERITIES.warning
            )
        );
      } else {
        dispatch(
            setSnackbarMessageAndOpen(
                'cluster.setBandwidthError',
                {},
                SEVERITIES.warning
            )
        );
      }
    } catch {
      dispatch(
          setSnackbarMessageAndOpen(
              'cluster.setBandwidthError',
              {},
              SEVERITIES.warning
          )
      );
    }
  };
}

// 删除带宽控制
export function deleteBandwidthControl(localIp, targetIp) {
  const url = '/api/network/delete/control';
  return async dispatch => {
    try {
      const res = await axios_instance.post(
          url,
          { localIp, targetIp },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: DELETE_BANDWIDTH_CONTROL, data: res.data.data });
        dispatch(
            setSnackbarMessageAndOpen(
                'cluster.deleteBandwidthSuccess',
                {},
                SEVERITIES.success
            )
        );
      } else if (res.data.code === 1) {
        dispatch(
            setSnackbarMessageAndOpen(
                'cluster.deleteBandwidthError',
                { msg: res.data.message },
                SEVERITIES.warning
            )
        );
      } else {
        dispatch(
            setSnackbarMessageAndOpen(
                'cluster.deleteBandwidthError',
                {},
                SEVERITIES.warning
            )
        );
      }
    } catch {
      dispatch(
          setSnackbarMessageAndOpen(
              'cluster.deleteBandwidthError',
              {},
              SEVERITIES.warning
          )
      );
    }
  };
}
// export function searchClusterById(id) {
//   const url = '/cluster/get';
//   return async dispatch => {
//     try {
//       const res = await axios_instance.post(
//         url,
//         {
//           serviceId: id,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       if (res.data.code === 200 || res.data.code === 0) {
//         dispatch({ type: UPDATE_SEARCH_SERVICE, data: res.data.data });
//       } else if (res.data.code === 1) {
//         // alert(res.data.message)
//         dispatch(
//           setSnackbarMessageAndOpen(
//             'serviceDependency.errorMessage',
//             { msg: res.data.message },
//             SEVERITIES.warning
//           )
//         );
//         dispatch({ type: UPDATE_SEARCH_SERVICE, data: [] });
//       } else {
//         dispatch(
//           setSnackbarMessageAndOpen(
//             'serviceDependency.searchServiceByIdEmptyError',
//             {},
//             SEVERITIES.warning
//           )
//         );
//         dispatch({ type: UPDATE_SEARCH_SERVICE, data: [] });
//       }
//     } catch {
//       dispatch(
//         setSnackbarMessageAndOpen(
//           'serviceDependency.queryError',
//           {},
//           SEVERITIES.warning
//         )
//       );
//       dispatch({ type: UPDATE_SEARCH_SERVICE, data: null });
//     }
//   };
// }

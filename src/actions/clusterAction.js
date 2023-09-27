import axios from 'axios';
import { setSnackbarMessageAndOpen } from './snackbarAction';
import { SEVERITIES } from '../components/CommonSnackbar';

export const UPDATE_CLUSTERS = 'UPDATE_CLUSTERS';

export const UPDATE_SELECTED_SERVER = "UPDATE_SELECTED_SERVER";

export const SELECT_SERVER = "SELECT_SERVER";

export const SELECT_INSTANCE = "SELECT_INSTANCE";

const baseURLLink = 'http://192.168.1.104:32454';

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

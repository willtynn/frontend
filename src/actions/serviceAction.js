import axios from 'axios';
import { setSnackbarMessageAndOpen } from './snackbarAction';
import { SEVERITIES } from '../components/CommonSnackbar';

export const UPDATE_EXACT_SERVICE = 'UPDATE_EXACT_SERVICE';

export const UPDATE_SEARCH_SERVICE = 'UPDATE_SEARCH_SERVICE';

export const UPDATE_SERVICE_DEPENDENCY = 'UPDATE_SERVICE_DEPENDENCY';

export const UPDATE_INTERFACE_DEPENDENCY = 'UPDATE_INTERFACE_DEPENDENCY';

export const UPDATE_DEPENDENCY = 'UPDATE_DEPENDENCY';

export const CHANGE_PAGE_SIZE = 'CHANGE_SERVICE_PAGE_SIZE';

export const CHANGE_PAGE_NUM = 'CHANGE_SERVICE_PAGE_NUM';

export const UPDATE_EDGE_DATA = 'UPDATE_EDGE_DATA';

export const UPDATE_EDGE_LIST = 'UPDATE_EDGE_LIST';

export const DELETE_SERVICE_REQUEST = 'DELETE_SERVICE_REQUEST';

export const DELETE_SERVICE_SUCCESS = 'DELETE_SERVICE_SUCCESS';

export const DELETE_SERVICE_FAILURE = 'DELETE_SERVICE_FAILURE';

// const baseURLLink = 'http://192.168.1.104:31931';
export const UPDATE_SEARCH_POD = 'UPDATE_SEARCH_POD';

const baseURLLink = 'http://192.168.1.104:30990';

const axios_instance = axios.create({
  baseURL: baseURLLink,
  timeout: 10000,
  // withCredentials: isCookie,
  crossDomain: true,
});

export function searchServiceExactlyById(id) {
  const url = '/service/getServiceByExactId';
  return async dispatch => {
    try {
      const res = await axios_instance.post(
        url,
        {
          serviceId: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        const serviceInfo = res.data.data;
        if (serviceInfo.length < 1) {
          dispatch({ type: UPDATE_EXACT_SERVICE, data: null });
        } else {
          dispatch({ type: UPDATE_EXACT_SERVICE, data: serviceInfo[0] });
        }
      } else if (res.data.code === 1) {
        // alert(res.data.message)
        dispatch(
          setSnackbarMessageAndOpen(
            'serviceDependency.errorMessage',
            { msg: res.data.message },
            SEVERITIES.warning
          )
        );
        dispatch({ type: UPDATE_EXACT_SERVICE, data: null });
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'serviceDependency.searchServiceByIdEmptyError',
            {},
            SEVERITIES.warning
          )
        );
        dispatch({ type: UPDATE_EXACT_SERVICE, data: null });
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'serviceDependency.queryError',
          {},
          SEVERITIES.warning
        )
      );
      dispatch({ type: UPDATE_EXACT_SERVICE, data: null });
    }
  };
}

export function searchServiceById(id) {
  const url = '/service/getById';
  return async dispatch => {
    try {
      const res = await axios_instance.post(
        url,
        {
          serviceId: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: UPDATE_SEARCH_SERVICE, data: res.data.data });
      } else if (res.data.code === 1) {
        // alert(res.data.message)
        dispatch(
          setSnackbarMessageAndOpen(
            'serviceDependency.errorMessage',
            { msg: res.data.message },
            SEVERITIES.warning
          )
        );
        dispatch({ type: UPDATE_SEARCH_SERVICE, data: [] });
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'serviceDependency.searchServiceByIdEmptyError',
            {},
            SEVERITIES.warning
          )
        );
        dispatch({ type: UPDATE_SEARCH_SERVICE, data: [] });
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'serviceDependency.queryError',
          {},
          SEVERITIES.warning
        )
      );
      dispatch({ type: UPDATE_SEARCH_SERVICE, data: null });
    }
  };
}

export function searchServiceByVersion(name, version) {
  const url = '/service/getByNameVersion';
  return async dispatch => {
    try {
      const res = await axios_instance.post(
        url,
        {
          name: name,
          version: version,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: UPDATE_SEARCH_SERVICE, data: res.data.data });
      } else if (res.data.code === 1) {
        // alert(res.data.message)
        dispatch(
          setSnackbarMessageAndOpen(
            'common.errorMessage',
            { msg: res.data.message },
            SEVERITIES.warning
          )
        );
        dispatch({ type: UPDATE_SEARCH_SERVICE, data: [] });
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'serviceDependency.searchServiceByNameVersionError',
            {},
            SEVERITIES.warning
          )
        );
        dispatch({ type: UPDATE_SEARCH_SERVICE, data: [] });
      }
    } catch {
      dispatch({ type: UPDATE_SEARCH_SERVICE, data: null });
      dispatch(
        setSnackbarMessageAndOpen(
          'serviceDependency.queryError',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function searchDependencies() {
  const url = '/service/getServiceDependencies';
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
        dispatch({ type: UPDATE_DEPENDENCY, data: res.data.data });
      } else {
        dispatch({ type: UPDATE_DEPENDENCY, data: null });
      }
    } catch {
      dispatch({ type: UPDATE_DEPENDENCY, data: null });
    }
  };
}

export function searchDependenciesByServiceId(id) {
  const url = '/service/getServiceInvocation';
  return async dispatch => {
    try {
      const res = await axios_instance.post(
        url,
        {
          id: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        if (
          (res.data.data.invoked.length &&
            res.data.data.invoked.length !== 0) ||
          (res.data.data.invoking.length && res.data.data.invoking.length !== 0)
        ) {
          dispatch({ type: UPDATE_SERVICE_DEPENDENCY, data: res.data.data });
        } else {
          dispatch(
            setSnackbarMessageAndOpen(
              'serviceDependency.serviceDependencyNotFound',
              {},
              SEVERITIES.warning
            )
          );
          dispatch({
            type: UPDATE_SERVICE_DEPENDENCY,
            data: { invoked: [], invoking: [] },
          });
        }
      } else {
        dispatch({ type: UPDATE_SERVICE_DEPENDENCY, data: null });
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'serviceDependency.queryError',
          {},
          SEVERITIES.warning
        )
      );
      dispatch({ type: UPDATE_SERVICE_DEPENDENCY, data: null });
    }
  };
}

export function searchDependenciesByInterfaceId(id) {
  const url = '/service/getInterfaceInvocation';
  return async dispatch => {
    try {
      const res = await axios_instance.post(
        url,
        {
          id: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: UPDATE_INTERFACE_DEPENDENCY, data: res.data.data });
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'serviceDependency.interfaceDependencyNotFound',
            {},
            SEVERITIES.warning
          )
        );
        dispatch({ type: UPDATE_INTERFACE_DEPENDENCY, data: null });
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'serviceDependency.queryError',
          {},
          SEVERITIES.warning
        )
      );
      dispatch({ type: UPDATE_INTERFACE_DEPENDENCY, data: null });
    }
  };
}

export function batchDeleteServices(serviceIds, cb=()=>{}) {
  const url = '/service/advancedDelete';
  return async dispatch => {
    try {
      const res = await axios_instance.post(
        url,
        {
          serviceIds: serviceIds,
          fuzzy: true
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.data.code === 200 || res.data.code === 0) {
        dispatch(
          setSnackbarMessageAndOpen(
            'serviceOverview.batchDeleteSuccess',
            {},
            SEVERITIES.warning
          )
        );
        cb();
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'serviceOverview.batchDeleteFail',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'serviceOverview.batchDeleteFail',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function searchPodsByServiceName(cluster, name) {
  const url = '/instance/status/service';
  const tmpInstance = axios.create({
    baseURL: 'http://192.168.1.104:31953',
    timeout: 10000,
    // withCredentials: isCookie,
    crossDomain: true,
  });
  return async dispatch => {
    try {
      const res = await tmpInstance.get(
        url,
        {
          params: {
            cluster: cluster,
            service: name,
          },
        }
        // {
        //   headers: {
        //     // 'Content-Type': 'application/json',
        //     'Accept': 'application/json'
        //   },
        // }
      );

      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: UPDATE_SEARCH_POD, data: res.data.data.items });
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'serviceDependency.podSearchError',
            {},
            SEVERITIES.warning
          )
        );
        dispatch({ type: UPDATE_SEARCH_POD, data: [] });
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'serviceDependency.podSearchError',
          {},
          SEVERITIES.warning
        )
      );
      dispatch({ type: UPDATE_INTERFACE_DEPENDENCY, data: [] });
    }
  };
}

export function deleteService(id) {
  const url = '/service/delete';
  const data = { serviceId: id };
  return async dispatch => {
    dispatch({ type: DELETE_SERVICE_REQUEST });
    try {
      const res = await axios_instance.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
      });
      console.log('Response:', res); // Debug log
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: DELETE_SERVICE_SUCCESS, data: res.data.data });
        dispatch(
            setSnackbarMessageAndOpen(
                'serviceDependency.deleteServiceSuccess',
                { msg: 'Service deleted successfully.' },
                SEVERITIES.success
            )
        );
      } else {
        dispatch({ type: DELETE_SERVICE_FAILURE, error: res.data.message });
        dispatch(
            setSnackbarMessageAndOpen(
                'serviceDependency.deleteServiceError',
                { msg: res.data.message },
                SEVERITIES.warning
            )
        );
      }
    } catch (error) {
      console.error('Error deleting service:', error); // Debug log
      dispatch({ type: DELETE_SERVICE_FAILURE, error: error.message });
      dispatch(
          setSnackbarMessageAndOpen(
              'serviceDependency.deleteServiceError',
              { msg: 'Error deleting service.' },
              SEVERITIES.error
          )
      );
    }
  };
}

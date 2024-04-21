import axios from 'axios';
import { setSnackbarMessageAndOpen } from './snackbarAction';
import { SEVERITIES } from '../components/CommonSnackbar';

export const UPDATE_SCHEMES = 'UPDATE_SCHEMES';
export const CHANGE_PAGE_SIZE = 'CHANGE_SCHEME_PAGE_SIZE';
export const CHANGE_PAGE_NUM = 'CHANGE_SCHEME_PAGE_NUM';
export const UPDATE_NAMESPACES = 'UPDATE_SCHEME_NAMESPACES';
export const UPDATE_CURRENT_NAMESPACE = 'UPDATE_CURRENT_SCHEME_NAMESPACE';
export const UPDATE_CURRENT_SCHEME = 'UPDATE_CURRENT_SCHEME';
const baseURLLink = 'http://192.168.1.104:30012';

const axios_instance = axios.create({
  baseURL: baseURLLink,
  timeout: 10000,
  // withCredentials: isCookie,
  crossDomain: true,
});

export function schemeAdd(name, namespace, scheme, cb) {
  const url = '/deployment/scheme/add';
  return async dispatch => {
    try {
      const res = await axios_instance.post(
        url,
        {
          name: name,
          namespace: namespace,
          scheme: scheme,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch(
          setSnackbarMessageAndOpen('scheme.addSuccess', {}, SEVERITIES.success)
        );
        cb();
      } else {
        dispatch(
          setSnackbarMessageAndOpen('scheme.addFail', {}, SEVERITIES.warning)
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen('scheme.addFail', {}, SEVERITIES.warning)
      );
    }
  };
}

export function getSchemes(cluster, namespace, name) {
  const url = '/deployment/scheme';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            cluster: cluster,
            namespace: namespace,
            name: name
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: UPDATE_SCHEMES, data: res.data.data });
      } else {
        dispatch({ type: UPDATE_SCHEMES, data: [] });
        dispatch(
          setSnackbarMessageAndOpen(
            'scheme.getFail',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch({ type: UPDATE_SCHEMES, data: [] });
      dispatch(
        setSnackbarMessageAndOpen(
          'scheme.getFail',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function schemeDeploy(id, name, namespace) {
  const url = '/deployment/scheme/deploy';
  return async dispatch => {
    try {
      const res = await axios_instance.post(
        url,
        {
          id: id,
          name: name,
          namespace: namespace
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch(
          setSnackbarMessageAndOpen('scheme.deploySuccess', {}, SEVERITIES.success)
        );
      } else {
        dispatch(
          setSnackbarMessageAndOpen('scheme.deployFail', {}, SEVERITIES.warning)
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen('scheme.deployFail', {}, SEVERITIES.warning)
      );
    }
  };
}


export function getScheme(id) {
  const url = '/deployment/scheme/detail';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            id: id
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: UPDATE_CURRENT_SCHEME, data: res.data.data });
      } else {
        dispatch({ type: UPDATE_CURRENT_SCHEME, data: null });
        dispatch(
          setSnackbarMessageAndOpen(
            'scheme.getFail',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch({ type: UPDATE_CURRENT_SCHEME, data: null });
      dispatch(
        setSnackbarMessageAndOpen(
          'scheme.getFail',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}


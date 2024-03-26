import axios from 'axios';
import { setSnackbarMessageAndOpen } from './snackbarAction';
import { SEVERITIES } from '../components/CommonSnackbar';

export const UPDATE_SCHEMES = 'UPDATE_SCHEMES';
export const CHANGE_PAGE_SIZE = 'CHANGE_SCHEME_PAGE_SIZE';
export const CHANGE_PAGE_NUM = 'CHANGE_SCHEME_PAGE_NUM';
export const UPDATE_NAMESPACES = 'UPDATE_NAMESPACES';
export const UPDATE_CURRENT_NAMESPACE = 'UPDATE_CURRENT_NAMESPACE';
const baseURLLink = 'http://10.1.1.104:32454';

const axios_instance = axios.create({
  baseURL: baseURLLink,
  timeout: 10000,
  // withCredentials: isCookie,
  crossDomain: true,
});

export function schemeDeploy(name, namespace, scheme) {
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



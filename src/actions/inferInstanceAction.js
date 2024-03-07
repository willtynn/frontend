import axios from 'axios';
import { setSnackbarMessageAndOpen } from './snackbarAction';
import { SEVERITIES } from '../components/CommonSnackbar';

export const DEPLOY_INSTANCE = 'DEPLOY_INSTANCE';
export const GET_INSTANCES = 'GET_INSTANCES';
export const GET_APPLICATIONS_DETAIL = 'GET_APPLICATIONS_DETAIL';
export const GET_APPLICATIONS_PODS = 'GET_APPLICATIONS_PODS';
export const CHANGE_PAGE_SIZE = 'CHANGE_INSTANCE_STATUS_PAGE_SIZE';
export const CHANGE_PAGE_NUM = 'CHANGE_INSTANCE_STATUS_PAGE_NUM';
export const UPDATE_NAMESPACES = 'UPDATE_NAMESPACES';
export const UPDATE_CURRENT_NAMESPACE = 'UPDATE_CURRENT_NAMESPACE';
const baseURLLink = 'http://192.168.1.104:30922';
// const baseURLLink = 'http://127.0.0.1:8080';

const axios_instance = axios.create({
  baseURL: baseURLLink,
  timeout: 10000,
  // withCredentials: isCookie,
  crossDomain: true,
});

export function deploy(
  serviceId,
  serviceName,
  namespace,
  imageUrl,
  replicas,
  ports,
  resources
) {
  const url = '/instance/deploy';
  return async dispatch => {
    try {
      const res = await axios_instance.post(
        url,
        {
          serviceId: serviceId,
          serviceName: serviceName,
          namespace: namespace,
          imageUrl: imageUrl,
          replicas: replicas,
          ports: ports,
          resources: resources,
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
            'instance.deploySuccess',
            {},
            SEVERITIES.success
          )
        );
      } else if (res.data.code === 1) {
        dispatch(
          setSnackbarMessageAndOpen(
            'instance.deployFailed',
            {},
            SEVERITIES.warning
          )
        );
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'instance.deployFailed',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'instance.deployFailed',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}


export function getNamaspaces(cluster) {
  const url = '/inference/application/namespaces';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            cluster: cluster,
            limit: 1000,
            page: 1
          },
        }
      );
      console.log(res)
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: UPDATE_NAMESPACES, data: res.data.data.items });
      } else if (res.data.code === 1) {
        dispatch({ type: UPDATE_NAMESPACES, data: [] });
        dispatch(
          setSnackbarMessageAndOpen(
            'instance.namespacesQueryError',
            {},
            SEVERITIES.warning
          )
        );
      } else {
        dispatch({ type: UPDATE_NAMESPACES, data: [] });
        dispatch(
          setSnackbarMessageAndOpen(
            'instance.namespacesQueryError',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch({ type: UPDATE_NAMESPACES, data: [] });
      dispatch(
        setSnackbarMessageAndOpen(
          'instance.namespacesQueryError',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function getInstanceStatus(cluster, namespace) {
  const url = '/inference/application/status';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            cluster: cluster,
            namespace: namespace
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: GET_INSTANCES, data: res.data.data });
      } else if (res.data.code === 1) {
        dispatch({ type: GET_INSTANCES, data: [] });
        dispatch(
          setSnackbarMessageAndOpen(
            'instance.namespacesQueryError',
            {},
            SEVERITIES.warning
          )
        );
      } else {
        dispatch({ type: GET_INSTANCES, data: [] });
        dispatch(
          setSnackbarMessageAndOpen(
            'instance.namespacesQueryError',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch({ type: GET_INSTANCES, data: [] });
      dispatch(
        setSnackbarMessageAndOpen(
          'instance.namespacesQueryError',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function getApplicationDetail(cluster, name){
  const url = '/inference/application/detail';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            cluster: cluster,
            name: name
          },
        }
      );
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: GET_APPLICATIONS_DETAIL, data: res.data.data });
      } else if (res.data.code === 1) {
        dispatch({ type: GET_APPLICATIONS_DETAIL, data: [] });
        dispatch(
          setSnackbarMessageAndOpen(
            'instance.namespacesQueryError',
            {},
            SEVERITIES.warning
          )
        );
      } else {
        dispatch({ type: GET_APPLICATIONS_DETAIL, data: [] });
        dispatch(
          setSnackbarMessageAndOpen(
            'instance.namespacesQueryError',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch({ type: GET_APPLICATIONS_DETAIL, data: [] });
      dispatch(
        setSnackbarMessageAndOpen(
          'instance.namespacesQueryError',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function getApplicationPods(cluster, namespace, name){
  const url = '/inference/application/pods';
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
        dispatch({ type: GET_APPLICATIONS_PODS, data: res.data.data });
      } else if (res.data.code === 1) {
        dispatch({ type: GET_APPLICATIONS_PODS, data: [] });
        dispatch(
          setSnackbarMessageAndOpen(
            'instance.namespacesQueryError',
            {},
            SEVERITIES.warning
          )
        );
      } else {
        dispatch({ type: GET_APPLICATIONS_PODS, data: [] });
        dispatch(
          setSnackbarMessageAndOpen(
            'instance.namespacesQueryError',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch({ type: GET_APPLICATIONS_PODS, data: [] });
      dispatch(
        setSnackbarMessageAndOpen(
          'instance.namespacesQueryError',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}
import axios from 'axios';
import { setSnackbarMessageAndOpen } from './snackbarAction';
import { SEVERITIES } from '../components/CommonSnackbar';

export const DEPLOY_INSTANCE = 'DEPLOY_INSTANCE';
export const GET_INSTANCES = 'GET_INSTANCES';
export const CHANGE_PAGE_SIZE = 'CHANGE_INSTANCE_STATUS_PAGE_SIZE';
export const CHANGE_PAGE_NUM = 'CHANGE_INSTANCE_STATUS_PAGE_NUM';
;
const baseURLLink = 'http://192.168.1.104:31931';

const axios_instance = axios.create({
  baseURL: baseURLLink,
  timeout: 10000,
  // withCredentials: isCookie,
  crossDomain: true,
});

export function searchAllClusters(serviceId, serviceName, imageUrl, serverId) {
  const url = '/instance/deploy';
  return async dispatch => {
    try {
      const res = await axios_instance.post(
        url,
        {
          serviceId: serviceId,
          serviceName: serviceName,
          imageUrl: imageUrl,
          serverId: serverId,
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
            { },
            SEVERITIES.warning
          )
        );
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'instance.deployFailed',
            {  },
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'instance.deployFailed',
          { },
          SEVERITIES.warning
        )
      );
    }
  };
}

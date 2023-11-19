import axios from 'axios';
import { setSnackbarMessageAndOpen } from './snackbarAction';
import { SEVERITIES } from '../components/CommonSnackbar';

export const CHANGE_PAGE_SIZE = 'CHANGE_INSTANCE_STATUS_PAGE_SIZE';
export const CHANGE_PAGE_NUM = 'CHANGE_INSTANCE_STATUS_PAGE_NUM';
export const UPDATE_LIST = 'UPDATE_LIST';

const baseURLLink = 'http://192.168.1.104:32611';

const axios_instance = axios.create({
  baseURL: baseURLLink,
  timeout: 10000,
  // withCredentials: isCookie,
  crossDomain: true,
});

export function getImageList(cluster) {
  const url = '/listImages';
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
      if (res.data.code === 200 || res.data.code === 0) {
        dispatch({ type: UPDATE_LIST, data: res.data.data });
      } else {
        dispatch({ type: UPDATE_LIST, data: [] });
        dispatch(
          setSnackbarMessageAndOpen(
            'image.listQueryError',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch({ type: UPDATE_LIST, data: [] });
      dispatch(
        setSnackbarMessageAndOpen(
          'image.listQueryError',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function deleteImage(imageName) {
  const url = '/deleteImage';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            imageName: imageName,
          },
        }
      );
      if (res.data.code === 200 ) {
      } else {
        dispatch(
          setSnackbarMessageAndOpen(
            'image.deleteError',
            {},
            SEVERITIES.warning
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'image.deleteError',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}

import axios from 'axios';
import { setSnackbarMessageAndOpen } from './snackbarAction';
import { SEVERITIES } from '../components/CommonSnackbar';

export const CHANGE_PAGE_SIZE = 'CHANGE_INSTANCE_STATUS_PAGE_SIZE';
export const CHANGE_PAGE_NUM = 'CHANGE_INSTANCE_STATUS_PAGE_NUM';
export const UPDATE_LIST = 'UPDATE_LIST';

const getUrl = (cluster) => {
  if (cluster === 'ices04'){
    return 'http://192.168.1.104:32340';
  }else if(cluster === 'icespve01'){
    return 'http://192.168.1.104:32665';
  }else if(cluster === 'icespve02'){
    return 'http://192.168.1.104:31831';
  }
  return 'http://192.168.1.104:31883';
}

export function getImageList(cluster) {
  const baseURLLink = getUrl(cluster);
  const axios_instance = axios.create({
    baseURL: baseURLLink,
    timeout: 10000,
    // withCredentials: isCookie,
    crossDomain: true,
  });
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
      if (res.status === 200) {
        const data = res.data.map(item => {
          return {
            ...item,
            node: cluster,
          }
        })
        const newData = data.filter((item) => {
          return item.imageVersion !=='';
        })
        dispatch({ type: UPDATE_LIST, data: newData });
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

export function deleteImage(imageName, cluster, version) {
  const baseURLLink = getUrl(cluster);
  const a_instance = axios.create({
    baseURL: baseURLLink,
    timeout: 10000,
    // withCredentials: isCookie,
    crossDomain: true,
  });

  const url = '/deleteImage';
  return async dispatch => {
    try {
      const res = await a_instance.get(
        url,
        {
          params: {
            imageName: imageName + ':'+ version,
          },
        }
      );
      if (res.status === 200 ) {
        dispatch(
          setSnackbarMessageAndOpen(
            'image.deleteSuccess',
            {},
            SEVERITIES.success
          )
        );
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

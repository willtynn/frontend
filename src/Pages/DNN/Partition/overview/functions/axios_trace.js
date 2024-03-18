import axios from 'axios';
import { getLocalStorage } from '@/utils/localStorageHandler';

export const baseURLLink = 'http://192.168.1.104:30161';
// export const baseURLLink = 'http://127.0.0.1:8001';

export const cookieSet = () => {
  var ACookie = getLocalStorage('isAcceptCookie');
  if (ACookie !== undefined && ACookie) {
    // console.log(ACookie)
    return ACookie;
  } else {
    return false;
  }
};

//const isCookie = cookieSet();

export const axios_instance = axios.create({
  baseURL: baseURLLink,
  timeout: 120000,
  // withCredentials: isCookie,
  crossDomain: true,
});

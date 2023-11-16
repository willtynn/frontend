/**
 * src\Pages\Route\trace\functions\axios_trace.js
 */
import axios from 'axios';
import { getLocalStorage } from '@/utils/localStorageHandler';

export const baseURLLink = "http://10.70.31.154:30458";
// export const baseURLLink = "http://192.168.1.104:30458";

export const cookieSet = () => {
  var ACookie = getLocalStorage('isAcceptCookie');
  if (ACookie !== undefined && ACookie) {
    return ACookie;
  } else {
    return false;
  }
};

//const isCookie = cookieSet();

export const axios_instance = axios.create({
  baseURL: baseURLLink,
  timeout: 10000,
  crossDomain: true,
});

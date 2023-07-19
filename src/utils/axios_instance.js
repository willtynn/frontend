import axios from 'axios';
import Config from '../configs/Config';
import { getLocalStorage } from '@/utils/localStorageHandler';

// export const baseURLLink =  "https://simtqa.wiley.cn";
// export const baseURLLink =  "https://simtdev.wiley.cn";
// export const baseURLLink =  "https://simtuat.wiley.cn";
// export const baseURLLink =  "http://47.103.142.157:2020";
// export const baseURLLink =  "https://simtqa.wiley.cn";
export const baseURLLink = Config.API_URL;
console.log('Now using base link: ', baseURLLink);

export const cookieSet = () => {
  var ACookie = getLocalStorage('isAcceptCookie');
  if (ACookie !== undefined && ACookie) {
    // console.log(ACookie)
    return ACookie;
  } else {
    return false;
  }
};

const isCookie = cookieSet();

const axios_instance = axios.create({
  baseURL: baseURLLink,
  timeout: 10000,
  withCredentials: isCookie, //getLocalStorage("isAcceptCookie"),
  crossDomain: true,
});
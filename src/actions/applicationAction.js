import axios from 'axios';
import { setSnackbarMessageAndOpen } from './snackbarAction';
import { SEVERITIES } from '../components/CommonSnackbar';


export const UPDATE_PLAN_NAME = "UPDATE_PLAN_NAME";
export const UPDATE_PLAN_COMMENT = "UPDATE_PLAN_COMMENT";
export const UPDATE_SERIALIZE_THREADGROUPS = "UPDATE_SERIALIZE_THREADGROUPS";
export const UPDATE_FUNCTIONAL_MODE = "UPDATE_FUNCTIONAL_MODE";
export const UPDATE_TEARDOWN_ON_SHUTDOWN = "UPDATE_TEARDOWN_ON_SHUTDOWN";

export const UPDATE_THREAD_GROUPS = "UPDATE_THREAD_GROUPS";

const baseURLLink = 'http://192.168.1.104:32454';

const axios_instance = axios.create({
  baseURL: baseURLLink,
  timeout: 10000,
  // withCredentials: isCookie,
  crossDomain: true,
});

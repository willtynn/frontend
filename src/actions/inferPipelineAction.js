import axios from 'axios';
import { setSnackbarMessageAndOpen } from './snackbarAction';
import { SEVERITIES } from '../components/CommonSnackbar';

// For pipeline 
export const PIPELINE_SEARCH = 'PIPELINE_SEARCH';
export const GET_SUBMODEL = 'GET_SUBMODEL';
// For infer
export const UPDATE_GROUP_EDIT = 'UPDATE_GROUP_EDIT';
export const RESET_GROUP = 'RESET_GROUP';
export const RESET_PLAN = 'RESET_PLAN';

export const UPDATE_PLAN_NAMESPACE = "UPDATE_PLAN_NAMESPACE";

export const UPDATE_TEST_PLAN_PAGE_SIZE = 'UPDATE_TEST_PLAN_PAGE_SIZE';
export const UPDATE_TEST_PLAN_PAGE_NUM = 'UPDATE_TEST_PLAN_PAGE_NUM';

export const UPDATE_GROUP_EDIT_INDEX = 'UPDATE_GROUP_EDIT_INDEX';
export const UPDATE_CURRENT_GROUP_EDIT_STAGE = 'UPDATE_CURRENT_GROUP_EDIT_STAGE';
  

const baseURLLink = 'http://192.168.1.104:32589';
// const baseURLLink = 'http://127.0.0.1:80';

const axios_instance = axios.create({
    baseURL: baseURLLink,
    timeout: 30000,
    // withCredentials: isCookie,
    crossDomain: true,
});

export function searchModelByName(name) {
    const url = '/model/list';
    return async dispatch => {
        try {
            const res = await axios_instance.post(
                url,
                {
                    "name": name
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (res.data.code === -1) {
                console.log(res.data.msg)
            } else {
                console.log(res.data)
                dispatch({ type: PIPELINE_SEARCH, data: res.data });
            }

        } catch {
            dispatch(
                setSnackbarMessageAndOpen(
                    'serviceDependency.queryError',
                    {},
                    SEVERITIES.warning
                )
            );
            dispatch({ type: PIPELINE_SEARCH, data: [] });
        }
    };
}

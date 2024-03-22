import axios from 'axios';
import { setSnackbarMessageAndOpen } from './snackbarAction';
import { SEVERITIES } from '../components/CommonSnackbar';

// For pipeline 
export const PIPELINE_SEARCH = 'PIPELINE_SEARCH';


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

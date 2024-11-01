/**
 * src\actions\dataSourceAction.js
 */
import axios from 'axios';
import {setSnackbarMessageAndOpen} from './snackbarAction';
import {SEVERITIES} from '../components/CommonSnackbar';

export const UPDATE_DATA_SOURCE = 'UPDATE_DATA_SOURCE';
export const SELECT_DATA_SOURCE = 'SELECT_DATA_SOURCE';
export const UPDATE_TABLE_DATA = 'UPDATE_TABLE_DATA';


const baseURLLink = 'http://192.168.1.104:31141';
//const baseURLLink = 'http://localhost:31141';

const axios_instance = axios.create({
    baseURL: baseURLLink,
    timeout: 10000,
    // withCredentials: isCookie,
    crossDomain: true,
});

// 获取全部数据源
export function fetchAllDataSources() {
    const url = '/data-source';
    return async dispatch => {
        try {
            const res = await axios_instance.get(
                url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (res.status === 200) {
                dispatch({type: UPDATE_DATA_SOURCE, data: res.data});
            } else {
                dispatch(
                    setSnackbarMessageAndOpen(
                        'dataSource.dataSourceFetchError',
                        {},
                        SEVERITIES.warning
                    )
                );
                dispatch({type: UPDATE_DATA_SOURCE, data: []});
            }
        } catch {
            dispatch(
                setSnackbarMessageAndOpen(
                    'dataSource.dataSourceFetchError',
                    {},
                    SEVERITIES.warning
                )
            );
            dispatch({type: UPDATE_DATA_SOURCE, data: []});
        }
    };
}

export function fetchDataSourceData(name, type, start, end) {
    const urlBuilder = new URL(`/data-source/${name}/data/${type}`,baseURLLink);
    if (start > 0) {
        urlBuilder.searchParams.append('start', start);
    }
    if (end > 0) {
        urlBuilder.searchParams.append('end', end);
    }
    const url = urlBuilder.href;
    return async dispatch => {
        try {
            const res = await axios_instance.get(
                url,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (res.status === 200) {
                dispatch({type: UPDATE_TABLE_DATA, data: res.data});
            } else {
                dispatch(
                    setSnackbarMessageAndOpen(
                        'dataSource.dataSourceDataFetchError',
                        {},
                        SEVERITIES.warning
                    )
                );
                dispatch({type: UPDATE_TABLE_DATA, data: []});
            }
        } catch {
            dispatch(
                setSnackbarMessageAndOpen(
                    'dataSource.dataSourceDataFetchError',
                    {},
                    SEVERITIES.warning
                )
            );
            dispatch({type: UPDATE_TABLE_DATA, data: []});
        }
    };
}

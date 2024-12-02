/**
 * src\actions\dataSourceAction.js
 */
import axios from 'axios';
import {setSnackbarMessageAndOpen} from './snackbarAction';
import {SEVERITIES} from '../components/CommonSnackbar';

export const UPDATE_DATA_SOURCE = 'UPDATE_DATA_SOURCE';
export const SELECT_DATA_SOURCE = 'SELECT_DATA_SOURCE';
export const UPDATE_TABLE_DATA = 'UPDATE_TABLE_DATA';
export const CLEAR_TABLE_DATA = 'CLEAR_TABLE_DATA';
export const REGISTER_DATA_SOURCE = 'REGISTER_DATA_SOURCE';
export const DELETE_DATA_SOURCE = 'DELETE_DATA_SOURCE';


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

// 根据数据源名称和数据源获取方式获取相应的具体数据
export function fetchDataQuery(dataSourceName, selectedType, queryParams, selectedTypeDetails) {
    const baseUrl = `/data-source/${dataSourceName}/data/${selectedType}`;
    const isPostRequest = selectedTypeDetails?.driver === 'http-post';

    return async dispatch => {
        try {
            const response = isPostRequest
                ? await axios_instance.post(`${baseUrl}/query`, { queryParameters: queryParams }, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                : await axios_instance.get(`${baseUrl}?${new URLSearchParams(queryParams).toString()}`, {
                    headers: { 'Accept': 'application/json' }
                });

            if (response.status === 200) {
                dispatch({ type: UPDATE_TABLE_DATA, data: response.data });
            } else {
                dispatch(
                    setSnackbarMessageAndOpen(
                        'dataSource.dataQueryFetchError',
                        {},
                        SEVERITIES.warning
                    )
                );
                dispatch({ type: UPDATE_TABLE_DATA, data: [] });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            dispatch(
                setSnackbarMessageAndOpen(
                    'dataSource.dataQueryFetchError',
                    {},
                    SEVERITIES.warning
                )
            );
            dispatch({ type: UPDATE_TABLE_DATA, data: [] });
        }
    };
}

// 清除图表中的数据
export function clearTableData() {
    return { type: CLEAR_TABLE_DATA };
}

// 注册数据源
export function registerDataSource(dataSource) {
    const url = '/data-source';
    return async dispatch => {
        try {
            const response = await axios_instance.post(
                url,
                dataSource,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                dispatch({
                    type: REGISTER_DATA_SOURCE,
                    data: response.data,
                });
                dispatch(
                    setSnackbarMessageAndOpen(
                        'dataSource.dataSourceRegisterSuccess',
                        {},
                        SEVERITIES.success
                    )
                );
            } else {
                dispatch(
                    setSnackbarMessageAndOpen(
                        'dataSource.dataSourceRegisterError',
                        {},
                        SEVERITIES.warning
                    )
                );
            }
        } catch (error) {
            console.error("Error registering data source:", error);
            dispatch(
                setSnackbarMessageAndOpen(
                    'dataSource.dataSourceRegisterError',
                    {},
                    SEVERITIES.error
                )
            );
        }
    };
}

// 删除数据源
export function deleteDataSource(dataSourceName) {
    const url = `/data-source/${dataSourceName}`;
    return async dispatch => {
        try {
            const response = await axios_instance.delete(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 || response.status === 204) {
                dispatch({
                    type: DELETE_DATA_SOURCE,
                    data: dataSourceName,
                });
                dispatch(
                    setSnackbarMessageAndOpen(
                        'dataSource.dataSourceDeleteSuccess',
                        {},
                        SEVERITIES.success
                    )
                );
            } else {
                dispatch(
                    setSnackbarMessageAndOpen(
                        'dataSource.dataSourceDeleteError',
                        {},
                        SEVERITIES.warning
                    )
                );
            }
        } catch (error) {
            console.error("Error deleting data source:", error);
            dispatch(
                setSnackbarMessageAndOpen(
                    'dataSource.dataSourceDeleteError',
                    {},
                    SEVERITIES.error
                )
            );
        }
    };
}


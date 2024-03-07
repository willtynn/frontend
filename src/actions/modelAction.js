import axios from 'axios';
import { setSnackbarMessageAndOpen } from './snackbarAction';
import { SEVERITIES } from '../components/CommonSnackbar';
import { da } from 'date-fns/locale';
export const UPDATE_SEARCH_SERVICE = 'UPDATE_SEARCH_MODEL';

export const CHANGE_PAGE_SIZE = 'CHANGE_MODEL_PAGE_SIZE';

export const CHANGE_PAGE_NUM = 'CHANGE_MODEL_PAGE_NUM';

export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST';

export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';

export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE';

export const DELETE_FILE_SUCCESS = 'DELETE_FILE_SUCCESS';

export const DELETE_FILE_FAILURE = 'DELETE_FILE_FAILURE';

export const UPDATE_EXACT_MODEL = 'UPDATE_EXACT_MODEL';

export const SET_GRAPH_HTML = 'SET_GRAPH_HTML';

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
                dispatch({ type: UPDATE_SEARCH_SERVICE, data: res.data });
            }

        } catch {
            dispatch(
                setSnackbarMessageAndOpen(
                    'serviceDependency.queryError',
                    {},
                    SEVERITIES.warning
                )
            );
            dispatch({ type: UPDATE_SEARCH_SERVICE, data: null });
        }
    };
}

export function uploadModel(name, file) {
    const url = '/model/upload';
    return async dispatch => {
        dispatch(
            setSnackbarMessageAndOpen(
                'modelOverview.uploading',
                {},
                SEVERITIES.info
            )
        );
        dispatch({ type: UPLOAD_FILE_REQUEST, data: null });
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('file', file)
            const res = await axios_instance.post(url, formData);
            if (res.data.code === -1) {
                console.log(res.data.msg)
            } else {
                console.log(res.data)
                dispatch({ type: UPLOAD_FILE_SUCCESS, data: res.data });
                dispatch(
                    setSnackbarMessageAndOpen(
                        'modelOverview.uploading',
                        {},
                        SEVERITIES.success
                    )
                );
            }
        } catch {
            dispatch(
                setSnackbarMessageAndOpen(
                    'modelOverview.uploading',
                    {},
                    SEVERITIES.warning
                )
            );
            dispatch({ type: UPLOAD_FILE_FAILURE, data: null });
        }
    };
}

export function deleteDetail(id) {
    const url = '/model/delete';
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('id', id)
            const res = await axios_instance.delete(
                url, 
                {
                    data: {
                        "id": id
                    }
                }
                );
            console.log(res)
            if (res.data.code === -1) {
                dispatch({ type: DELETE_FILE_FAILURE, data: null });
                dispatch(
                    setSnackbarMessageAndOpen(
                        'modelOverview.uploading',
                        {},
                        SEVERITIES.warning
                    )
                );
            } else {
                dispatch({ type: DELETE_FILE_SUCCESS, data: id });
                dispatch(
                    setSnackbarMessageAndOpen(
                        'modelOverview.uploading',
                        {},
                        SEVERITIES.success
                    )
                );
            }
        } catch {
            dispatch(
                setSnackbarMessageAndOpen(
                    'modelOverview.uploading',
                    {},
                    SEVERITIES.warning
                )
            );
            dispatch({ type: DELETE_FILE_FAILURE, data: null });
        }
    };

}

export function getModelDetail(id) {
    const url = '/model/detail';
    return async dispatch => {
        try {
            const res = await axios_instance.post(
                url,
                {
                    "id": id
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (res.data.code === -1) {
                dispatch({ type: UPDATE_EXACT_MODEL, data: null });
            } else {
                dispatch({ type: UPDATE_EXACT_MODEL, data: res.data });
            }
        } catch {
            dispatch(
                setSnackbarMessageAndOpen(
                    'modelOverview.uploading',
                    {},
                    SEVERITIES.warning
                )
            );
            dispatch({ type: UPDATE_EXACT_MODEL, data: null });
        }
    };

}

export function getModelGraphHtml(path) {
    const url = '/static';
    return async dispatch => {
        try {
            const res = await axios_instance.post(
                url,
                {
                    "modelPath": path
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (res.data.code === -1) {
                console.log(res.data.msg);
            } else {
                dispatch({ type: SET_GRAPH_HTML, data: res.data });
            }

        } catch {
            dispatch(
                setSnackbarMessageAndOpen(
                    'serviceDependency.queryError',
                    {},
                    SEVERITIES.warning
                )
            );
            dispatch({ type: SET_GRAPH_HTML, data: null });
        }
    };
}

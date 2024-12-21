/**
 * src\actions\algorithmAction.js
 */
import axios from 'axios';
import {setSnackbarMessageAndOpen} from './snackbarAction';
import {SEVERITIES} from '../components/CommonSnackbar';

// 算法管理
export const UPDATE_ALL_ALGORITHMS = 'UPDATE_ALL_ALGORITHMS'
export const ADD_ALGORITHM = 'ADD_ALGORITHM'
export const DELETE_ALGORITHM = 'DELETE_ALGORITHM'
export const QUERY_ALGORITHM = 'QUERY_ALGORITHM'
export const UPDATE_ALGORITHM = 'UPDATE_ALGORITHM'

// 实例管理
export const QUERY_INSTANCE = 'QUERY_INSTANCE';
export const ADD_INSTANCE = 'ADD_INSTANCE'


const baseURLLink = 'http://192.168.1.104:32758';
//const baseURLLink = 'http://localhost:32758';

const axios_instance = axios.create({
    baseURL: baseURLLink,
    timeout: 10000,
    // withCredentials: isCookie,
    crossDomain: true,
});

// 不带参数的查询算法数据
export function fetchAllAlgorithms() {
    const url = '/api/algorithm/query';
    return async dispatch => {
        try {
            const res = await axios_instance.post(
                url,
                {},  // 不传递任何查询参数，默认返回所有算法
                {
                    headers: {
                        'Content-Type': 'application/json',  // 请求类型是 JSON
                    },
                }
            );
            if (res.status === 200) {
                // 如果响应成功，更新算法数据
                dispatch({
                    type: UPDATE_ALL_ALGORITHMS,
                    data: res.data.data,  // 将返回的数据传递到 store
                });
            } else {
                // 响应状态码不为 200 时，处理错误
                dispatch(
                    setSnackbarMessageAndOpen(
                        'evolution.queryAllAlgorithmError',
                        {},
                        SEVERITIES.warning  // 警告级别
                    )
                );
                dispatch({
                    type: UPDATE_ALL_ALGORITHMS,
                    data: [],  // 返回空数据
                });
            }
        } catch (error) {
            // 捕获请求异常
            dispatch(
                setSnackbarMessageAndOpen(
                    'evolution.queryAllAlgorithmError',
                    {},
                    SEVERITIES.warning
                )
            );
            dispatch({
                type: UPDATE_ALL_ALGORITHMS,
                data: [],  // 返回空数据
            });
        }
    };
}

// 带参数的查询算法数据
export function queryAlgorithmsWithParams(queryParams) {
    const url = '/api/algorithm/query';
    return async dispatch => {
        try {
            const res = await axios_instance.post(
                url,
                queryParams,
                {
                    headers: {
                        'Content-Type': 'application/json',  // 请求类型是 JSON
                    },
                }
            );
            if (res.status === 200) {
                // 如果响应成功，更新算法数据
                dispatch({
                    type: QUERY_ALGORITHM,
                    data: res.data.data,  // 将返回的数据传递到 store
                });
            } else {
                // 响应状态码不为 200 时，处理错误
                dispatch(
                    setSnackbarMessageAndOpen(
                        'evolution.queryAlgorithmError',
                        {},
                        SEVERITIES.warning  // 警告级别
                    )
                );
                dispatch({
                    type: QUERY_ALGORITHM,
                    data: [],  // 返回空数据
                });
            }
        } catch (error) {
            // 捕获请求异常
            dispatch(
                setSnackbarMessageAndOpen(
                    'evolution.queryAlgorithmError',
                    {},
                    SEVERITIES.warning
                )
            );
            dispatch({
                type: QUERY_ALGORITHM,
                data: [],  // 返回空数据
            });
        }
    };
}


// 添加算法
export function addAlgorithm(payload) {
    const url = '/api/algorithm/add';
    return async dispatch => {
        try {
            const res = await axios_instance.post(
                url,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (res.status === 200 || res.status === 201) {
                dispatch({
                    type: ADD_ALGORITHM,
                    data: res.data,
                });
                dispatch(setSnackbarMessageAndOpen('evolution.addAlgorithmSuccess', {}, SEVERITIES.success));
            } else {
                dispatch(setSnackbarMessageAndOpen('evolution.addAlgorithmError', {}, SEVERITIES.warning));
            }
        } catch (error) {
            dispatch(setSnackbarMessageAndOpen('evolution.addAlgorithmError', {}, SEVERITIES.warning));
        }
    };
}


// 删除算法
export function deleteAlgorithm(id) {
    const url = '/api/algorithm/delete';
    return async dispatch => {
        try {
            const res = await axios_instance.post(
                url,
                { id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (res.status === 200) {
                dispatch({
                    type: DELETE_ALGORITHM,
                    data: res.data,
                });
                dispatch(setSnackbarMessageAndOpen('evolution.deleteAlgorithmSuccess', {}, SEVERITIES.success));
            } else {
                dispatch(setSnackbarMessageAndOpen('evolution.deleteAlgorithmError', {}, SEVERITIES.warning));
            }
        } catch (error) {
            dispatch(setSnackbarMessageAndOpen('evolution.deleteAlgorithmError', {}, SEVERITIES.warning));
        }
    };
}


// 更新算法
export function updateAlgorithm(payload) {
    const url = '/api/algorithm/update';
    return async dispatch => {
        try {
            const res = await axios_instance.post(
                url,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (res.status === 200) {
                dispatch({
                    type: UPDATE_ALGORITHM,
                    data: res.data,
                });
                dispatch(setSnackbarMessageAndOpen('evolution.updateAlgorithmSuccess', {}, SEVERITIES.success));
            } else {
                dispatch(setSnackbarMessageAndOpen('evolution.updateAlgorithmError', {}, SEVERITIES.warning));
            }
        } catch (error) {
            dispatch(setSnackbarMessageAndOpen('evolution.updateAlgorithmError', {}, SEVERITIES.warning));
        }
    };
}

// 查询实例数据（不带参数）
export function fetchAllInstances() {
    const url = '/api/instance/query';
    return async dispatch => {
        try {
            const res = await axios_instance.post(
                url,
                {}, // 不传递任何查询参数，默认返回所有实例
                {
                    headers: {
                        'Content-Type': 'application/json',  // 请求类型是 JSON
                    },
                }
            );
            if (res.status === 200) {
                // 如果响应成功，更新实例数据
                dispatch({
                    type: QUERY_INSTANCE,
                    data: res.data.data,  // 将返回的数据传递到 store
                });
            } else {
                // 响应状态码不为 200 时，处理错误
                dispatch(
                    setSnackbarMessageAndOpen(
                        'evolution.queryAllInstanceError',
                        {},
                        SEVERITIES.warning  // 警告级别
                    )
                );
                dispatch({
                    type: QUERY_INSTANCE,
                    data: [],  // 返回空数据
                });
            }
        } catch (error) {
            // 捕获请求异常
            dispatch(
                setSnackbarMessageAndOpen(
                    'evolution.queryAllInstanceError',
                    {},
                    SEVERITIES.warning
                )
            );
            dispatch({
                type: QUERY_INSTANCE,
                data: [],  // 返回空数据
            });
        }
    };
}

// 查询实例数据（带参数）
export function queryInstancesWithParams(queryParams) {
    const url = '/api/instance/query';
    return async dispatch => {
        try {
            const res = await axios_instance.post(
                url,
                queryParams,
                {
                    headers: {
                        'Content-Type': 'application/json',  // 请求类型是 JSON
                    },
                }
            );
            if (res.status === 200) {
                // 如果响应成功，更新实例数据
                dispatch({
                    type: QUERY_INSTANCE,
                    data: res.data.data,  // 将返回的数据传递到 store
                });
            } else {
                // 响应状态码不为 200 时，处理错误
                dispatch(
                    setSnackbarMessageAndOpen(
                        'evolution.queryInstanceError',
                        {},
                        SEVERITIES.warning  // 警告级别
                    )
                );
                dispatch({
                    type: QUERY_INSTANCE,
                    data: [],  // 返回空数据
                });
            }
        } catch (error) {
            // 捕获请求异常
            dispatch(
                setSnackbarMessageAndOpen(
                    'evolution.queryInstanceError',
                    {},
                    SEVERITIES.warning
                )
            );
            dispatch({
                type: QUERY_INSTANCE,
                data: [],  // 返回空数据
            });
        }
    };
}

// 运行算法（即创建算法运行实例）
export function runAlgorithm(payload) {
    const url = '/api/instance/run';
    return async dispatch => {
        try {
            const res = await axios_instance.post(
                url,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json', // 请求类型是 JSON
                    },
                }
            );
            if (res.status === 200 || res.status === 201) {
                // 如果响应成功
                dispatch(
                    setSnackbarMessageAndOpen(
                        'evolution.runAlgorithmSuccess',
                        {},
                        SEVERITIES.success // 成功级别
                    )
                );
                return res.data; // 返回成功的数据
            } else {
                // 响应状态码不为 200 或 201 时，处理错误
                dispatch(
                    setSnackbarMessageAndOpen(
                        res.data.message || 'evolution.runAlgorithmError',
                        {},
                        SEVERITIES.warning // 警告级别
                    )
                );
                return null;
            }
        } catch (error) {
            // 捕获请求异常
            dispatch(
                setSnackbarMessageAndOpen(
                    error.response?.data?.message || 'evolution.runAlgorithmError',
                    {},
                    SEVERITIES.error // 错误级别
                )
            );
            return null;
        }
    };
}

// 实例管理
export function runAlgorithm1(payload) {
    const url = '/api/instance/run';
    return async dispatch => {
        try {
            const res = await axios_instance.post(
                url,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (res.status === 200 || res.status === 201) {
                const instanceId = res.data.data; // 获取新实例的 ID

                // 显示成功消息
                dispatch(
                    setSnackbarMessageAndOpen(
                        'evolution.runAlgorithmSuccess',
                        {},
                        SEVERITIES.success
                    )
                );

                // 如果成功，可以将新创建的实例添加到全局实例列表
                dispatch({
                    type: ADD_INSTANCE,
                    data: {
                        id: instanceId,
                        runName: payload.runName,
                        algorithmId: payload.algorithmId,
                        input: payload.input,
                        parameter: payload.parameter,
                        createTime: new Date().toISOString(), // 模拟生成创建时间
                        updateTime: new Date().toISOString(), // 模拟生成更新时间
                    },
                });

                return res.data; // 返回响应数据
            } else {
                dispatch(
                    setSnackbarMessageAndOpen(
                        res.data.message || 'evolution.runAlgorithmError',
                        {},
                        SEVERITIES.warning
                    )
                );
                return null;
            }
        } catch (error) {
            dispatch(
                setSnackbarMessageAndOpen(
                    error.response?.data?.message || 'evolution.runAlgorithmError',
                    {},
                    SEVERITIES.error
                )
            );
            return null;
        }
    };
}

/**
 * 获取数据源的动态查询参数
 * @param {Object} payload 包含 `input` 和 `type` 的对象
 * @returns {Function} Redux thunk
 */
export function getQueryParameter(payload) {
    const url = '/api/datasource/get/params';

    return async (dispatch) => {
        try {
            const res = await axios_instance.post(
                url,
                payload, // 请求体包含 `input` 和 `type`
                {
                    headers: {
                        'Content-Type': 'application/json', // 请求类型为 JSON
                    },
                }
            );

            if (res.status === 200 && res.data.code === 0) {
                // 如果响应成功，返回数据
                return res.data.data; // 返回动态参数列表
            } else {
                // 处理非成功状态
                dispatch(
                    setSnackbarMessageAndOpen(
                        'evolution.getQueryParameterError', // 自定义国际化的错误提示
                        {},
                        SEVERITIES.warning // 警告级别
                    )
                );
                return [];
            }
        } catch (error) {
            // 捕获异常
            dispatch(
                setSnackbarMessageAndOpen(
                    error.response?.data?.message || 'evolution.getQueryParameterError',
                    {},
                    SEVERITIES.error // 错误级别
                )
            );
            return [];
        }
    };
}

/**
 * 查询实例运行结果
 * @param {Object} payload 包含 `id` 的对象，例如 { id: 123 }
 * @returns {Function} Redux thunk
 */
export function queryInstanceResult(payload) {
    const url = '/api/instance/result';

    return async (dispatch) => {
        try {
            const res = await axios_instance.post(
                url,
                payload, // 请求体包含 `id`
                {
                    headers: {
                        'Content-Type': 'application/json', // 请求类型为 JSON
                    },
                }
            );

            if (res.status === 200 && res.data.code === 0) {
                // 如果响应成功，返回数据
                return res.data.data; // 返回实例运行结果
            } else {
                // 处理非成功状态
                dispatch(
                    setSnackbarMessageAndOpen(
                        res.data.message || 'evolution.queryInstanceResultError', // 自定义国际化的错误提示
                        {},
                        SEVERITIES.warning // 警告级别
                    )
                );
                return null;
            }
        } catch (error) {
            // 捕获异常
            dispatch(
                setSnackbarMessageAndOpen(
                    error.response?.data?.message || 'evolution.queryInstanceResultError', // 自定义错误提示
                    {},
                    SEVERITIES.error // 错误级别
                )
            );
            return null;
        }
    };
}

// 删除实例
export function deleteInstance(id) {
    const url = '/api/instance/delete';
    return async dispatch => {
        try {
            const res = await axios_instance.post(
                url,
                { id }, // 请求参数
                {
                    headers: {
                        'Content-Type': 'application/json', // 请求类型是 JSON
                    },
                }
            );

            if (res.status === 200 && res.data.code === 0) {
                dispatch(
                    setSnackbarMessageAndOpen(
                        'evolution.deleteInstanceSuccess', // 成功消息的国际化 key
                        {},
                        SEVERITIES.success // 成功消息级别
                    )
                );
                return res.data.data; // 返回删除结果 (true/false)
            } else {
                dispatch(
                    setSnackbarMessageAndOpen(
                        res.data.message || 'evolution.deleteInstanceError', // 错误消息
                        {},
                        SEVERITIES.warning // 警告消息级别
                    )
                );
                return false;
            }
        } catch (error) {
            dispatch(
                setSnackbarMessageAndOpen(
                    error.response?.data?.message || 'evolution.deleteInstanceError', // 捕获错误消息
                    {},
                    SEVERITIES.error // 错误消息级别
                )
            );
            return false;
        }
    };
}








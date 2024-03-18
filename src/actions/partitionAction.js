import { axios_instance } from '@/Pages/DNN/Partition/overview/functions/axios_trace.js';
import {setSnackbarMessageAndOpen} from "./snackbarAction";
import {SEVERITIES} from "../components/CommonSnackbar";
import {UPDATE_SEARCH_SERVICE} from "./modelAction";

export const UPDATE_PARTITION_STRATEGY = 'UPDATE_PARTITION_STRATEGY';
export const UPDATE_SUB_MODELS = 'UPDATE_SUB_MODELS';
export const UPDATE_ROUTE_TRACE_DETAIL = 'UPDATE_ROUTE_TRACE_DETAIL';

export const UPDATE_FAILED = 'UPDATE_FAILED';

export const CLEAR_SUB_MODELS = 'CLEAR_SUB_MODELS';
export const CHANGE_PAGE_SIZE = 'CHANGE_REQUEST_OF_SERVICE_PAGE_SIZE';
export const CHANGE_PAGE_NUM = 'CHANGE_REQUEST_OF_SERVICE_PAGE_NUM';
export const EDIT_JSON_DATA = 'EDIT_JSON_DATA';
export const EDIT_STRATEGY_NAME = 'EDIT_STRATEGY_NAME';
export const EDIT_ORIGIN_MODEL_NAME = 'EDIT_ORIGIN_MODEL_NAME';
export const UPDATE_TEMP_STRATEGY_INFO = 'UPDATE_TEMP_STRATEGY_INFO';

export function getPartitionStrategy(start, end) {
  const url = '/partition/infos';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            start: start,
            end: end,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 200) {
        dispatch({ type: UPDATE_PARTITION_STRATEGY, data: res.data });
      } else {
        dispatch({ type: UPDATE_PARTITION_STRATEGY, data: [] });
      }
      dispatch({ type: UPDATE_FAILED, data: false });
    } catch {
      dispatch({ type: UPDATE_PARTITION_STRATEGY, data: null });
      dispatch({ type: UPDATE_FAILED, data: true });
    }
  };
}

export function deletePartitionStrategy(id) {
  const url = '/delete/partition';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            id: id,
          },
        },
      );
      if (res.status === 200) {
      } else {
      }
    } catch {
    }
  };
}

export function getSubModels(id) {
  const url = '/sub_models/infos/' + id;
  return async dispatch => {
    try {
      const res = await axios_instance.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 200) {
        dispatch({ type: UPDATE_SUB_MODELS, data: res.data });
      } else {
        dispatch({ type: UPDATE_SUB_MODELS, data: [] });
      }
      dispatch({ type: UPDATE_FAILED, data: false });
    } catch {
      dispatch({ type: UPDATE_SUB_MODELS, data: null });
      dispatch({ type: UPDATE_FAILED, data: true });
    }
  };
}

export function getModelDetail(id) {
  const url = '/trace/detail';
  return async dispatch => {
    try {
      const res = await axios_instance.get(
        url,
        {
          params: {
            id: id,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 200) {
        console.log(res.data);
        dispatch({ type: UPDATE_ROUTE_TRACE_DETAIL, data: res.data });
      } else {
        dispatch({ type: UPDATE_ROUTE_TRACE_DETAIL, data: [] });
      }
      dispatch({ type: UPDATE_FAILED, data: false });
    } catch {
      dispatch({ type: UPDATE_ROUTE_TRACE_DETAIL, data: null });
      dispatch({ type: UPDATE_FAILED, data: true });
    }
  };
}

export function addPartition(name, modelName, json) {
  const url = '/model/partition';
  return async dispatch => {
    try {
      const res = await axios_instance.post(
        url,
        {
          'partition_name': name,
          'origin_model': modelName,
          ...json
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 200) {
        dispatch(
          setSnackbarMessageAndOpen(
            'partition.addSuccess',
            {},
            SEVERITIES.success
          )
        );
      }
    } catch {
      dispatch(
        setSnackbarMessageAndOpen(
          'partition.addError',
          {},
          SEVERITIES.warning
        )
      );
    }
  };
}

export function clearSubModels() {
  return async dispatch => {
    dispatch({ type: CLEAR_SUB_MODELS, data: null });
    dispatch({ type: UPDATE_FAILED, data: false });
  };
}

export function clearFailed() {
  return async dispatch => {
    dispatch({ type: UPDATE_FAILED, data: false });
  };
}

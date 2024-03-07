import * as actions from '../actions/partitionAction';
import dayjs from 'dayjs';

const initState = {
  partitionStrategy: null,
  tempPartitionInfo: null, // 在子模型页面展示的拆分策略信息
  subModels: null,
  routeTraceDetail: null,
  routeFailed: false, // Failed 标志虽然在下一次成功调用后会被清除，但应该在处理后立刻清除
  pageNum: 1,
  pageSize: 10,
  jsonData: null,
  strategyName: null,
  originModelName: null,
};

const orderRouteTrace = data => {
  data.sort((a, b) => {
    let aTime = dayjs(a.time);
    let bTime = dayjs(b.time);
    return aTime.isBefore(bTime) ? -1 : 1;
  });
  return data;
};

export default function PartitionReducer(state = initState, action) {
  const { type, data } = action;
  switch (type) {
    case actions.UPDATE_PARTITION_STRATEGY:
      return {
        ...state,
        partitionStrategy: data,
      };
    case actions.UPDATE_SUB_MODELS:
      if (data) {
        return {
          ...state,
          subModels: data,
        };
      }
      return {
        ...state,
        subModels: null,
      };
    case actions.CLEAR_SUB_MODELS:
      return {
        ...state,
        subModels: null,
      };
    case actions.UPDATE_ROUTE_TRACE_DETAIL:
      return {
        ...state,
        routeTraceDetail: data,
      };
    case actions.UPDATE_FAILED:
      return {
        ...state,
        routeFailed: data,
      };
    case actions.CHANGE_PAGE_NUM:
      return {
        ...state,
        pageNum: data,
      };
    case actions.CHANGE_PAGE_SIZE:
      return {
        ...state,
        pageSize: data,
      };
    case actions.EDIT_JSON_DATA:
      return {
        ...state,
        jsonData: data,
      }
    case actions.EDIT_ORIGIN_MODEL_NAME:
      return {
        ...state,
        originModelName: data,
      }
    case actions.EDIT_STRATEGY_NAME:
      return {
        ...state,
        strategyName: data,
      }
    case actions.UPDATE_TEMP_STRATEGY_INFO:
      return {
        ...state,
        tempPartitionInfo: data,
      }
    default:
      return state;
  }
}

/**
 * src\reducers\dataSourceReducer.js
 */
import * as actions from "../actions/dataSourceAction";

const initState = {
    dataSources: null,
    selectedDataSource: null,
    tableData:null,
};

export default function DataSourceReducer(state = initState, action) {
    const { type, data } = action;
    switch (type) {
        case actions.UPDATE_DATA_SOURCE:
            return {
                ...state,
                dataSources: data
            }
        case actions.UPDATE_TABLE_DATA:
            return {
                ...state,
                tableData: data
            }
        case actions.CLEAR_TABLE_DATA:
            return {
                ...state,
                tableData: null
            }; // 将 tableData 清空
        case actions.SELECT_DATA_SOURCE:
            return {
                ...state,
                selectedDataSource: data
            }
        case actions.REGISTER_DATA_SOURCE:
            return {
                ...state,
                dataSources: state.dataSources
                    ? [...state.dataSources, data] // 添加新注册的数据源
                    : [data], // 如果 dataSources 为空，直接设置为数组
            };
        case actions.DELETE_DATA_SOURCE:
            return {
                ...state,
                dataSources: state.dataSources?.filter(source => source.name !== data) || [],
            };

        default:
            return state;
    }
}



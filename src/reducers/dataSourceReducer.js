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
        case actions.SELECT_DATA_SOURCE:
            return {
                ...state,
                selectedDataSource: data
            }
        default:
            return state;
    }
}



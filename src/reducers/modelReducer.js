import { ca } from "date-fns/locale";
import * as actions from "../actions/modelAction";

const initState = {
    exactModel: null,
    queryResult: null,
    pageSize: 5,
    pageNum: 1,
    isLoading: false,
    pods: [],
    graphHtml: null,
}

export default function ModelReducer(state = initState, action) {
    const { type, data } = action
    switch (type) {
        case actions.UPDATE_SEARCH_SERVICE:
            return {
                ...state,
                queryResult: data
            }
        case actions.CHANGE_PAGE_NUM:
            return {
                ...state,
                pageNum: data
            }
        case actions.CHANGE_PAGE_SIZE:
            return {
                ...state,
                pageSize: data
            }
        case actions.UPLOAD_FILE_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case actions.UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
        case actions.UPLOAD_FILE_FAILURE:
            return {
                ...state,
                isLoading: false,
            }
        case actions.UPDATE_EXACT_MODEL:
            return {
                ...state,
                exactModel: data
            }
        case actions.SET_GRAPH_HTML:
            return {
                ...state,
                graphHtml: data
            }
        case actions.DELETE_FILE_SUCCESS:
            return{
                ...state,
            }
        default:
            return state
    }
}
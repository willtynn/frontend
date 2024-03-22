import { ca } from "date-fns/locale";
import * as actions from "../actions/inferPipelineAction";

const initState = {
    queryResult: null
}

export default function InferPipelineReducer(state = initState, action) {
    const { type, data } = action
    switch (type) {
        case actions.PIPELINE_SEARCH:
            return {
                ...state,
                queryResult: data
            }
        default:
            return state
    }
}
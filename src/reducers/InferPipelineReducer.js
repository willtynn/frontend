import { ca } from "date-fns/locale";
import * as actions from "../actions/inferPipelineAction";

const initState = {
    queryResult: null,
    subModel: null 
}

export default function InferPipelineReducer(state = initState, action) {
    const { type, data } = action
    switch (type) {
        case actions.PIPELINE_SEARCH:
            return {
                ...state,
                queryResult: data
            }
        case actions.GET_SUBMODEL:
            console.log(data)
            return {
                ...state,
                subModel: data
            }
        default:
            return state
    }
}
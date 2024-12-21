/**
 * src\reducers\algorithmReducer.js
 */
import * as actions from "../actions/algorithmAction";

const initState = {
    allAlgorithms: [], // 存储算法数据
    algorithm: null, // 存储单个算法数据（例如更新后的算法）
    selectedAlgorithm: null,
    allInstances: [],  // 存储所有实例数据

};

export default function AlgorithmReducer(state = initState, action) {
    const { type, data } = action;
    switch (type) {
        case actions.UPDATE_ALL_ALGORITHMS:
            return {
                ...state,
                allAlgorithms: data,  // 更新所有算法数据
            }
        case actions.QUERY_ALGORITHM:
            return {
                ...state,
                algorithm: data,  // 更新查询结果数据
            }
        case actions.ADD_ALGORITHM:
            return {
                ...state,
                allAlgorithms: Array.isArray(state.allAlgorithms)
                    ? [...state.allAlgorithms, data]
                    : [data], // 确保安全追加
            };
        case actions.DELETE_ALGORITHM:
            return {
                ...state,
                allAlgorithms: state.allAlgorithms.filter(
                    algorithm => algorithm.id !== action.data.id  // 从列表中删除指定算法
                ),
            }
        case actions.UPDATE_ALGORITHM:
            return {
                ...state,
                allAlgorithms: state.allAlgorithms.map(algorithm =>
                    algorithm.id === action.data.id
                        ? { ...algorithm, ...action.data }  // 更新指定的算法
                        : algorithm
                ),
            };
        case actions.QUERY_INSTANCE:
            return {
                ...state,
                allInstances: data || [],  // 更新所有实例数据
            };
        default:
            return state;
    }
}



import { combineReducers } from 'redux';
import ServiceReducer from './serviceReducer';
import SnackbarReducer from './snackbarReducer';
import RouteReducer from './routeReducer';
import ClusterReducer from './clusterReducer';
const rootReducer = combineReducers({
    Service: ServiceReducer,
    Cluster: ClusterReducer,
    Route: RouteReducer,
    Snack: SnackbarReducer
});

export default rootReducer;
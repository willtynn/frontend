import { combineReducers } from 'redux';
import ServiceReducer from './serviceReducer';
import SnackbarReducer from './snackbarReducer';
import RouteReducer from './routeReducer';
import ClusterReducer from './clusterReducer';
import InstanceReducer from './instanceReducer';
import ApplicationReducer from './applicationReducer';
import ImageReducer from "./imageReducer";
import LangReducer from './langReducer';
import PartitionReducer from "./partitionReducer";
import ModelReducer from './modelReducer';

const rootReducer = combineReducers({
    Service: ServiceReducer,
    Cluster: ClusterReducer,
    Route: RouteReducer,
    Snack: SnackbarReducer,
    Instance: InstanceReducer,
    Application: ApplicationReducer,
    Image: ImageReducer,
    Lang: LangReducer,
    Partition: PartitionReducer,
    Model: ModelReducer,
});

export default rootReducer;
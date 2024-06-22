import { combineReducers } from 'redux';
import ServiceReducer from './serviceReducer';
import SnackbarReducer from './snackbarReducer';
import RouteReducer from './routeReducer';
import ClusterReducer from './clusterReducer';
import InstanceReducer from './instanceReducer';
import ApplicationReducer from './applicationReducer';
import ImageReducer from "./imageReducer";
import LangReducer from './langReducer';
import SchemeReducer from './schemeReducer';
import EvolutionReducer from './evolutionReducer';
const rootReducer = combineReducers({
    Service: ServiceReducer,
    Cluster: ClusterReducer,
    Route: RouteReducer,
    Snack: SnackbarReducer,
    Instance: InstanceReducer,
    Application: ApplicationReducer,
    Image: ImageReducer,
    Lang: LangReducer,
    Scheme: SchemeReducer,
    Evolution: EvolutionReducer,
});

export default rootReducer;
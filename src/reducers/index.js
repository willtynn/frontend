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
import DataSourceReducer from './dataSourceReducer';
import IndustryReducer from "./industryReducer";

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
    DataSource: DataSourceReducer,
    Industry: IndustryReducer,
});

export default rootReducer;
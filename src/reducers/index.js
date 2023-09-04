import { combineReducers } from 'redux';
import ServiceReducer from './serviceReducer';
import SnackbarReducer from './snackbarReducer';
import RouteReducer from './routeReducer';
const rootReducer = combineReducers({
    Service: ServiceReducer,
    Route: RouteReducer,
    Snack: SnackbarReducer
});

export default rootReducer;
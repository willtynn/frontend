import { combineReducers } from 'redux';
import ServiceReducer from './serviceReducer';
import SnackbarReducer from './snackbarReducer';
const rootReducer = combineReducers({
    Service: ServiceReducer,
    Snack: SnackbarReducer
});

export default rootReducer;
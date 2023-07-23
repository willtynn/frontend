import { combineReducers } from 'redux';
import ServiceReducer from './serviceReducer';
const rootReducer = combineReducers({
    Service: ServiceReducer
});

export default rootReducer;
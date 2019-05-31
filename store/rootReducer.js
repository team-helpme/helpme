import { combineReducers } from 'redux';
import { handleModalReducer } from '../components/TimeLine';

const rootReducer = combineReducers({
    handleModalReducer,
});

export default rootReducer;

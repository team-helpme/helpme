import { combineReducers } from 'redux';
import { handleModalReducer, profileDataReducer, updateStatus } from '../components/TimeLine';

const rootReducer = combineReducers({
    handleModalReducer, profileDataReducer, updateStatus,
});

export default rootReducer;

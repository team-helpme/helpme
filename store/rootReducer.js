import { combineReducers } from 'redux';
import { handleModalReducer, profileDataReducer } from '../components/TimeLine';

const rootReducer = combineReducers({
    handleModalReducer, profileDataReducer,
});

export default rootReducer;

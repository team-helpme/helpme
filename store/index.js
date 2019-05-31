import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const makeStore = initialState => createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

export default makeStore;

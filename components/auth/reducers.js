import {
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    GET_PROFILE
} from './actionTypes';

const initialState = {
    isAuthenticated: false,
    userProfile: null,
};

export default (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
    case LOGIN_FAILURE:
        return { ...state, isAuthenticated: false };
    case LOGIN_SUCCESS:
        return { ...state, isAuthenticated: true };
    case GET_PROFILE:
        return { ...state, userProfile: payload };
    default:
        return state;
    }
};

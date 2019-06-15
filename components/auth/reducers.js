import actionTypes from './actionTypes';

const {
    GET_PROFILE,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
} = actionTypes;

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
        console.log('payload', payload);
        // return { ...state, userProfile: payload };
    default:
        return state;
    }
};

import actionTypes from './actionTypes';

const {
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    GET_PROFILE,
} = actionTypes;

export const loginFailure = () => ({
    type: LOGIN_FAILURE,
});

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS,
});

export const getProfile = payload => ({
    payload,
    type: GET_PROFILE,
});

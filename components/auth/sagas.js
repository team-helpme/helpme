import {
    takeEvery, call, put
} from 'redux-saga/effects';
import actionTypes from './actionTypes';
import {
    getProfile
} from './actions';

const { LOGIN_SUCCESS } = actionTypes;

function* handleGetUserProfile(payload) {
    yield put(getProfile(payload));
}

export default function* watchProfileDataLoad() {
    yield takeEvery(LOGIN_SUCCESS, handleGetUserProfile);
}

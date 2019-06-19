import { takeEvery, call, put } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import {
    setUsersProfileSuccess,
    setTimeLineError,
    setTimeLineData,
    setOnlineFriendsData,
    setOnlineFriendsError,
    setUsersProfileError,
    postProfileDataToDatabaseError,
    postProfileDataToDatabaseSuccess
} from './actions';

const PROFILE_DATA_URL = '/api/profile';
const TIMELINE_DATA_URL = '/api/posts';
const PROFILE_URL = '../../../static/data/profiles.json';
const {
    REQUEST_LOAD_TIMELINE_DATA,
    REQUEST_LOAD_ONLINE_FRIENDS_DATA,
    POST_PROFILE_DATA_TO_DATABASE,
    REQUEST_LOAD_USERS_PROFILE,
} = actionTypes;

function* handleSetUsersProfile({ payload }) {
    const id = payload;
    const response = yield call(fetch, `${PROFILE_DATA_URL}/${id}`);
    console.log('id', id);
    if (response) {
        const responseData = yield response.json();
        console.log('responseData', responseData);
        // yield put(setUsersProfileSuccess(responseData));
    } else {
        yield put(setUsersProfileError(response.statusText));
    }
}

function* handleTimeLineDataLoad() {
    const response = yield call(fetch, TIMELINE_DATA_URL);
    if (response) {
        const responseData = yield response.json();
        const { data } = responseData;
        yield put(setTimeLineData(data));
    } else {
        yield put(setTimeLineError(response.statusText));
    }
}

function* handleProfileDataLoad() {
    const response = yield call(fetch, PROFILE_URL);
    if (response.ok) {
        const data = yield response.json();
        yield put(setOnlineFriendsData(data));
    } else {
        yield put(setOnlineFriendsError(response));
    }
}

function* handleProfileDataPost({ payload }) {
    const response = yield call(fetch, PROFILE_DATA_URL, {
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    });
    const data = yield response.json();
    const { status, message } = data;
    if (status === 'success') {
        yield put(postProfileDataToDatabaseSuccess(data));
    } else {
        yield put(postProfileDataToDatabaseError(message));
    }
}

// watcher
export default function* watchTimelineDataLoad() {
    yield takeEvery(REQUEST_LOAD_USERS_PROFILE, handleSetUsersProfile);
    yield takeEvery(REQUEST_LOAD_TIMELINE_DATA, handleTimeLineDataLoad);
    yield takeEvery(REQUEST_LOAD_ONLINE_FRIENDS_DATA, handleProfileDataLoad);
    yield takeEvery(POST_PROFILE_DATA_TO_DATABASE, handleProfileDataPost);
}

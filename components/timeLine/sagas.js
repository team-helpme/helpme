import { takeEvery, call, put } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import {
    addPostToTimelineSuccess,
    addPostToTimelineFailure,
    handlePostCommentFailure,
    handlePostCommentSuccess,
    likeButtonClickedFailure,
    likeButtonClickedSuccess,
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
const LIKE_URL = 'api/posts/like';
const UNLIKE_URL = 'api/posts/unlike';
const COMMENT_URL = 'api/posts/comment';

const {
    REQUEST_LOAD_TIMELINE_DATA,
    REQUEST_LOAD_ONLINE_FRIENDS_DATA,
    POST_PROFILE_DATA_TO_DATABASE,
    REQUEST_LOAD_USERS_PROFILE,
    ADD_POST_TO_TIMELINE,
    ADD_COMMENT_TO_POST,
    TOGGLE_LIKE_BUTTON_CLICKED,
} = actionTypes;

function* handleSetUsersProfile({ payload }) {
    const id = payload;
    const response = yield call(fetch, `${PROFILE_DATA_URL}/${id}`);
    if (response) {
        const responseData = yield response.json();
        yield put(setUsersProfileSuccess(responseData));
    } else {
        yield put(setUsersProfileError(response.statusText));
    }
}

function* handleTimeLineDataLoad(id) {
    const response = yield call(fetch, TIMELINE_DATA_URL);
    const { statusText, status } = response;
    if (status < 400) {
        const responseData = yield response.json();
        const { data } = responseData;
        const { postFound } = data;
        yield put(setTimeLineData({ postFound, ...id }));
    } else {
        yield put(setTimeLineError(statusText));
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
        yield put(postProfileDataToDatabaseSuccess(data.data));
    } else {
        yield put(postProfileDataToDatabaseError(message));
    }
}

function* handleAddPostToTimeline({ payload }) {
    const response = yield call(fetch, TIMELINE_DATA_URL, {
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    });
    const data = yield response.json();
    const { status, errors } = data;
    if (status === 'success') {
        yield put(addPostToTimelineSuccess(data.data));
    } else {
        yield put(addPostToTimelineFailure(errors));
    }
}

function* handleLikeButtonClicked({ payload }) {
    const { _id, liked, user } = payload;
    let response;
    const body = {
        body: JSON.stringify({ id: user }),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'PUT',
    };

    if (liked) {
        response = yield call(fetch, `${UNLIKE_URL}/${_id}`, body);
    } if (!liked) {
        response = yield call(fetch, `${LIKE_URL}/${_id}`, body);
    }

    const likeData = yield response.json();
    const { status, message, data } = likeData;
    if (status === 'success') {
        yield put(likeButtonClickedSuccess(data));
        yield call(handleTimeLineDataLoad);
    } else {
        yield put(likeButtonClickedFailure(message));
    }
}

function* handleAddCommentToPost({ payload }) {
    const { body, postId } = payload;
    const response = yield call(fetch, `${COMMENT_URL}/${postId}`, {
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    });
    const data = yield response.json();
    const { status, errors } = data;
    if (status === 'success') {
        const postData = data.data.postSaved;
        yield put(handlePostCommentSuccess(postData));
    } else {
        yield put(handlePostCommentFailure(errors.text));
    }
}

// watcher
export default function* watchTimelineDataLoad() {
    yield takeEvery(REQUEST_LOAD_TIMELINE_DATA, handleTimeLineDataLoad);
    yield takeEvery(REQUEST_LOAD_USERS_PROFILE, handleSetUsersProfile);
    yield takeEvery(REQUEST_LOAD_ONLINE_FRIENDS_DATA, handleProfileDataLoad);
    yield takeEvery(POST_PROFILE_DATA_TO_DATABASE, handleProfileDataPost);
    yield takeEvery(ADD_POST_TO_TIMELINE, handleAddPostToTimeline);
    yield takeEvery(TOGGLE_LIKE_BUTTON_CLICKED, handleLikeButtonClicked);
    yield takeEvery(ADD_COMMENT_TO_POST, handleAddCommentToPost);
}

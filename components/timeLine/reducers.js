/* eslint-disable no-underscore-dangle */
import actionTypes from './actionTypes';

const {
    ADD_POST_TO_TIMELINE,
    ADD_POST_TO_TIMELINE_FAILURE,
    ADD_POST_TO_TIMELINE_SUCCESS,
    ADD_COMMENT_TO_POST,
    ADD_COMMENT_TO_POST_FAILURE,
    ADD_COMMENT_TO_POST_SUCCESS,
    POST_PROFILE_DATA_TO_DATABASE,
    POST_PROFILE_DATA_TO_DATABASE_SUCCESS,
    POST_PROFILE_DATA_TO_DATABASE_ERROR,
    REQUEST_LOAD_TIMELINE_DATA,
    REQUEST_SET_TIMELINE_ERROR,
    REQUEST_SET_TIMELINE_DATA_SUCCESS,
    REQUEST_SET_ONLINE_FRIENDS_ERROR,
    REQUEST_LOAD_ONLINE_FRIENDS_DATA,
    REQUEST_SET_ONLINE_FRIENDS_DATA,
    REQUEST_LOAD_USERS_PROFILE,
    SET_USERS_PROFILE_SUCCESS,
    TOGGLE_LIKE_BUTTON_CLICKED_FAILURE,
    TOGGLE_LIKE_BUTTON_CLICKED_SUCCESS,
    TOGGLE_COMMENT_BUTTON_CLICKED,
} = actionTypes;

const initialState = {
    error: null,
    isAuthenticated: false,
    isCommentOpen: false,
    isOnlineFriendsFetching: false,
    isTimelineFetching: false,
    isUserProfileComplete: false,
    isUserProfileFetching: false,
    isUserProfilePresent: false,
    onlineFriendsData: [],
    timelineData: [],
    usersProfile: null,
};
export default (state = initialState, action) => {
    const {
        type, error, payload,
    } = action;
    let liked;
    let newPost;
    let postIndex;
    let newTimeLineData;
    let loggedUserId;
    let newArray = [];

    switch (type) {
    case REQUEST_LOAD_USERS_PROFILE:
        return { ...state, isUserProfileFetching: true, isUserProfilePresent: false };

    case SET_USERS_PROFILE_SUCCESS:
        if (typeof payload.profile === 'undefined' || payload.profile.length === 0) {
            return {
                ...state,
                isUserProfileFetching: false,
                isUserProfilePresent: true,
                usersProfile: { ...payload, id: payload._id },
            };
        }
        return {
            ...state,
            isUserProfileComplete: true,
            isUserProfileFetching: false,
            isUserProfilePresent: true,
            usersProfile: { ...payload, id: payload._id },
        };

    case REQUEST_LOAD_TIMELINE_DATA:
        return { ...state, isTimelineFetching: true };

    case REQUEST_SET_TIMELINE_DATA_SUCCESS:
        // const { postFound } = payload;
        loggedUserId = payload.payload;
        newTimeLineData = [...payload.postFound];
        // const { isCommentOpen } = initialState;
        // map through the array and check if  the likes array contains the users id,
        // if it does, pass a liked state to the data and render

        payload.postFound.map(post => {
            const { likes } = post;
            likes.map(item => {
                const { user } = item;
                if (JSON.stringify(loggedUserId) === JSON.stringify(user)) {
                    liked = true;
                    newPost = { ...post, isCommentOpen: false, liked };
                    postIndex = payload.postFound.indexOf(post);
                    newTimeLineData[postIndex] = newPost;
                    return newTimeLineData;
                }
                return newTimeLineData;
            });
            return newTimeLineData;
        });
        // pass a !liked state to the redux store.
        newTimeLineData.map((post, i) => {
            if (post.liked === undefined) {
                post = { ...post, isCommentOpen: false, liked: false };
                newTimeLineData[i] = post;
                return newTimeLineData;
            }
            return newTimeLineData;
        });
        return { ...state, isTimelineFetching: false, timelineData: newTimeLineData };

    case REQUEST_SET_TIMELINE_ERROR:
        return { ...state, error: payload, isTimelineFetching: false };

    case REQUEST_LOAD_ONLINE_FRIENDS_DATA:
        return { ...state, isOnlineFriendsFetching: true };

    case REQUEST_SET_ONLINE_FRIENDS_DATA:
        return { ...state, isOnlineFriendsFetching: false, onlineFriendsData: payload };

    case REQUEST_SET_ONLINE_FRIENDS_ERROR:
        return { ...state, error, isOnlineFriendsFetching: false };

    case ADD_POST_TO_TIMELINE:
        return payload.post !== ''
            ? { ...state, isTimelineFetching: true } : state;

    case ADD_POST_TO_TIMELINE_SUCCESS:
        return payload.post !== ''
            ? {
                ...state,
                isTimelineFetching: false,
                timelineData: [payload.postCreated, ...state.timelineData],
            } : state;

    case ADD_POST_TO_TIMELINE_FAILURE:
        return payload.post !== ''
            ? { ...state, error: payload.text, isTimelineFetching: false } : { ...state };

    case ADD_COMMENT_TO_POST:
        return payload.post !== ''
            ? { ...state, isTimelineCommentFetching: true } : state;

    case ADD_COMMENT_TO_POST_SUCCESS:
        newTimeLineData = [...state.timelineData];
        newTimeLineData.map(post => {
            if (JSON.stringify(post._id) === JSON.stringify(payload._id)) {
                post.comments = payload.comments;
                return post;
            }
            return post;
        });

        return { ...state, isTimelineCommentFetching: false, timelineData: newTimeLineData };

    case ADD_COMMENT_TO_POST_FAILURE:
        return payload.post !== ''
            ? { ...state, error: payload } : state;

    case TOGGLE_LIKE_BUTTON_CLICKED_SUCCESS:
        newArray = state.timelineData.map(item => {
            const { id, likes } = item;
            if (id === payload) {
                item.liked = !item.liked;
                item.likes = item.liked ? likes - 1 : likes + 1;
            }
            return item;
        });
        return {
            ...state,
            timelineData: [...newArray],
        };

    case TOGGLE_LIKE_BUTTON_CLICKED_FAILURE:
        return { ...state, error: payload };

    case TOGGLE_COMMENT_BUTTON_CLICKED:
        newArray = state.timelineData.map(item => {
            const { _id, isCommentOpen } = item;
            if (_id === payload) {
                item.isCommentOpen = !isCommentOpen;
            }
            return item;
        });
        return { ...state, timelineData: [...newArray] };

    case POST_PROFILE_DATA_TO_DATABASE: return { ...state, isProfileUpdating: true };

    case POST_PROFILE_DATA_TO_DATABASE_SUCCESS:
        return {
            ...state,
            isUserProfileComplete: true,
            isUserProfileFetching: false,
            isUserProfilePresent: true,
            usersProfile: { ...payload, id: payload._id },
        };
    case POST_PROFILE_DATA_TO_DATABASE_ERROR:
        return { ...state, error: payload, isProfileUpdating: false };

    default:
        return state;
    }
};

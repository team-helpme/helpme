import actionTypes from './actionTypes';

const initialState = {
    error: undefined,
    isFetching: false,
    isOpen: false,
    statusValue: '',
    timelineData: [],
};
export const reducers = (state = initialState, action) => {
    const {
        CLEAR_STATUS_FIELD,
        FETCH_PROFILE_REQUEST,
        FETCH_PROFILE_DATA_FAILURE,
        FETCH_PROFILE_DATA_SUCCESS,
        TOGGLE_MODAL,
        UPDATE_STATUS,
        ADD_POST_TO_TIMELINE,
        TOGGLE_POST_LIKE,
        TOGGLE_POST_FAV, TOGGLE_COMMENT_BUTTON,
    } = actionTypes;

    const {
        type, error, payload, timelineData,
    } = action;

    const { isOpen } = state;

    switch (type) {
    case FETCH_PROFILE_REQUEST:
        return { ...state, isFetching: true };

    case FETCH_PROFILE_DATA_SUCCESS:
        return { ...state, isFetching: false, timelineData };

    case FETCH_PROFILE_DATA_FAILURE:
        return { ...state, error, isFetching: false };

    case TOGGLE_MODAL:
        return { ...state, isOpen: !isOpen };

    case ADD_POST_TO_TIMELINE:
        return payload.post !== ''
            ? { ...state, timelineData: [payload, ...state.timelineData] } : state;

    case UPDATE_STATUS:
        return { ...state, statusValue: payload };

    case CLEAR_STATUS_FIELD:
        return { ...state, statusValue: '' };

    case TOGGLE_POST_LIKE:
        state.timelineData.map(item => {
            const { id, liked, likes } = item;
            item.liked = id === payload ? !liked : liked;
            item.likes = liked ? likes + 1 : likes - 1;
            return liked;
        });
        return {
            ...state,
            timelineData: [...state.timelineData],
        };

    case TOGGLE_POST_FAV:
        state.timelineData.map(item => {
            let { id, favourited, favouriteCount } = item;
            if (id === payload) {
                item.favourited = !favourited;
                item.favouriteCount = favourited ? favouriteCount += 1 : favouriteCount -= 1;
            }
            return { favouriteCount, favourited };
        });
        return { ...state, timelineData: [...state.timelineData] };

    case TOGGLE_COMMENT_BUTTON:
        state.timelineData.map(item => {
            const { id, isCommentOpen } = item;
            if (id === payload) {
                item.favouriteCount = !isCommentOpen;
            }
            return isCommentOpen;
        });
        return { ...state, timelineData: [...state.timelineData] };
    default:
        return state;
    }
};

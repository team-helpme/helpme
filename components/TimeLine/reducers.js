import actionTypes from './actionTypes';

const initialState = {
    error: undefined,
    isFetching: false,
    isOpen: false,
    timelineData: [],
};

export const profileDataReducer = (state = initialState, action) => {
    const {
        FETCH_PROFILE_REQUEST,
        FETCH_PROFILE_DATA_FAILURE,
        FETCH_PROFILE_DATA_SUCCESS,
    } = actionTypes;

    switch (action.type) {
    case FETCH_PROFILE_REQUEST:
        return { ...state, isFetching: true };
    case FETCH_PROFILE_DATA_SUCCESS:
        return { ...state, isFetching: false, timelineData: action.timelineData };
    case FETCH_PROFILE_DATA_FAILURE:
        return { ...state, error: action.error, isFetching: false };
    default:
        return state;
    }
};

export const handleModalReducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.TOGGLE_MODAL:
        return { ...state, isOpen: !state.isOpen };
    default:
        return state;
    }
};

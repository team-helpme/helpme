import actionTypes from './actionTypes';

const initialState = {
    error: undefined,
    isFetching: false,
    isOpen: false,
    statusValue: '',
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
    const { type } = action;
    const { TOGGLE_MODAL } = actionTypes;
    const { isOpen } = state;

    switch (type) {
    case TOGGLE_MODAL:
        return { ...state, isOpen: !isOpen };
    default:
        return state;
    }
};

export const updateStatus = (state = initialState, action) => {
    const { type, payload } = action;
    const { UPDATE_STATUS } = actionTypes;

    switch (type) {
    case UPDATE_STATUS:
        return { ...state, statusField: payload };
    default:
        return state;
    }
};

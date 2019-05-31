import { TOGGLE_MODAL } from './constant';
import actionTypes from './actionTypes';

const initialState = {
    isOpen: false,
};

export const handleModalReducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.TOGGLE_MODAL:
        return { ...state, isOpen: !state.isOpen };
    default:
        return state;
    }
};

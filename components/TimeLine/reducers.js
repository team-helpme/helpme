import { TOGGLE_MODAL } from './constant';

const initialState = {
    isOpen: false,
};

export const handleModalToggle = (state = initialState, action = {}) => {
    switch (action.type) {
    case TOGGLE_MODAL:
        return { ...state, isOpen: action.payload };
        break;
    default:
        return state;
    }
};

import { TOGGLE_MODAL } from './constant';

export const controlModal = () => ({
    type: TOGGLE_MODAL,
    payload: !state.isOpen,
});

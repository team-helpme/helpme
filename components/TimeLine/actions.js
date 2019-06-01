import actionTypes from './actionTypes';

const {
    TOGGLE_MODAL, FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_DATA_FAILURE,
    FETCH_PROFILE_DATA_SUCCESS,
} = actionTypes;

export const controlModal = () => ({ type: TOGGLE_MODAL });

// Instead of plain objects, we are returning function.
export const fetchProfileData = () => dispatch => {
    // Dispatching REQUEST action, which tells our app, that we are started requesting todos.
    dispatch({
        type: FETCH_PROFILE_REQUEST,
    });
    return fetch('../../static/data/timelineData.json')
    // Here, we are getting json body from server response
    // And providing `response` and `body` variables to the next chain.
        .then(response => response.json()
            .then(body => ({ body, response })))
        .then(({ response, body }) => {
            if (!response.ok) {
                // If request was failed, dispatching FAILURE action.
                dispatch({
                    error: body.error,
                    type: FETCH_PROFILE_DATA_FAILURE,
                });
            } else {
                // When everything is ok, dispatching SUCCESS action.
                dispatch({
                    timelineData: body,
                    type: FETCH_PROFILE_DATA_SUCCESS,
                });
            }
        });
};

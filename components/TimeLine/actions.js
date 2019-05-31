import { log } from 'util';
import actionTypes from './actionTypes';

const {
    TOGGLE_MODAL, FETCH_PROFILE_DATA,
    FETCH_PROFILE_DATA_FAILURE,
    PROFILE_DATA_SUCCESS,
} = actionTypes;

export const controlModal = () => ({ type: TOGGLE_MODAL });

export const fetchProfileData = () =>
// Instead of plain objects, we are returning function.
    dispatch => {
        // Dispatching REQUEST action, which tells our app, that we are started requesting todos.
        dispatch({
            type: FETCH_PROFILE_DATA,
        });
        return fetch('../../static/data/timelineData.json')
        // Here, we are getting json body(in our case it will contain `data` or `error` prop, depending on request was failed or not) from server response
        // And providing `response` and `body` variables to the next chain.
            .then(response => response.json().then(body => ({ body, response })))
            .then(({ response, body }) => {
                if (!response.ok) {
                    // If request was failed, dispatching FAILURE action.
                    dispatch({
                        error: body.error,
                        type: FETCH_PROFILE_DATA_FAILURE,
                    });
                } else {
                    // When everything is ok, dispatching SUCCESS action.
                    console.log(body);
                    dispatch({
                        profile: body,
                        type: PROFILE_DATA_SUCCESS,
                    });
                }
            });
    };

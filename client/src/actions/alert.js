import uuid from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from './types';

// because of thunk, dispatch
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = uuid.v4(); //random unique id
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id}
    })

    // clear alert after 5 seconds
    setTimeout( () => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
}
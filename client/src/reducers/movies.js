import {
    ADD_MOVIE,
    DELETE_MOVIE,
    UPDATE_REVIEW,
    CLEAR_MOVIES
} from './../actions/types';

const initState = {
    token: localStorage.getItem('token'),
    movies: []
}

export default function(state = initState, action) {
    const { type, payload } = action
    switch (type) {
        case ADD_MOVIE:
        case UPDATE_REVIEW:
        case DELETE_MOVIE:
            return {
                ...state,
                movies: payload
            }
        case CLEAR_MOVIES:
            return {
                ...state,
                movies: []
            }
        default:
            return state;
    }
}

// 3. Receive data from action and update state 
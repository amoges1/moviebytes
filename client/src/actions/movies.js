import axios from 'axios';
import { setAlert } from './alert'
import {
    MOVIES_LOADED,
    ADD_MOVIE,
    DELETE_MOVIE,
    UPDATE_REVIEW
} from './types';
import setAuthToken from '../utils/setAuthToken'

export const loadMovies = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/profile/me')
        console.log("here:...", res.data);
        
        dispatch({
            type: MOVIES_LOADED,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
        
        // const errors = err.response.data.errors; //errors array
        // if(errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

    }
}
// Add Movie
export const addMovieToUser = (movie) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // console.log("ADD MOVIE: ", movie);
    
    const body = JSON.stringify({movie})
    
    try {
        //set up API endpoint to receive movie information,
        //receive full movie list array to pass to dispatch
        const res = await axios.put('/api/profile/addmovie', body, config)
        // console.log("this is: ",res.data);
        

        dispatch({
            type: ADD_MOVIE,
            payload: res.data
        }) 

    } catch (err) {
        const errors = err.response.data.errors; //errors array
        if(errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        
    }
}

//2. Perform your actions, receive new data, then dispatch 


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
        const res = await axios.get('/api/profile/user')
        dispatch({
            type: MOVIES_LOADED,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
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
    
    const body = JSON.stringify({movie})
    
    try {
        
        const res = await axios.put('/api/profile/movies/add', body, config)
        
        dispatch({
            type: ADD_MOVIE,
            payload: res.data
        }) 

    } catch (err) {
        const errors = err.response.data.errors; //errors array
        if(errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        
    }
}
// Update Moview Review
export const updateMovieReview = (updates) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({updates})
 
    try {
        const res = await axios.put('/api/profile/movies/update', body, config)
        
        dispatch({
            type: UPDATE_REVIEW,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
}

export const deleteMovie = (movie) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({movie})
    console.log("movie: ", body);

    try {
        const res = await axios.delete('/api/profile/movies/delete', body, config)
        
        dispatch({
            type: DELETE_MOVIE,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
}
//2. Request to RestAPI, Receive new data, Pass to dispatch to update data store 


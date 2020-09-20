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
        //set up API endpoint to receive movie information,
        //receive full movie list array to pass to dispatch

        // check if movie is in collection
        const check = null;
        const res = await axios.put('/api/profile/addmovie', body, config)
        
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
export const updateMovieReview = (movieID, updates) => async dispatch => {
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
        const res = await axios.put(`/api/profile/updatemovie/${movieID}`, body, config)
        
        dispatch({
            type: UPDATE_REVIEW,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
}

export const deleteMovie = (movieID) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    
    try {
        const res = await axios.delete(`/api/profile/${movieID}`)
        
        dispatch({
            type: DELETE_MOVIE,
            payload: res.data
        })
    } catch (err) {
        console.error(err);
    }
}
//2. Request to RestAPI, Receive new data, Pass to dispatch to update data store 


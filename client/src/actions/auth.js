import axios from 'axios';
import { setAlert } from './alert'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    CLEAR_MOVIES,
    LOGIN_FAIL,
    LOGOUT
} from './types';
import { loadMovies } from './movies'
import setAuthToken from '../utils/setAuthToken'

// Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }
    const body = JSON.stringify({ name, email, password })
    try {
        const res = await axios.post('/api/users/register', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors; //errors array
        if (errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

        dispatch({ type: REGISTER_FAIL })
    }
}

// Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'X-Requested-With': '*'
        }
    }
    try {
        const res = await axios.get('api/users/user', config)
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        dispatch(loadMovies())
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}


// Login User
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }
    const body = JSON.stringify({ email, password })
    try {
        const res = await axios.post('/api/users/login', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())

    } catch (err) {
        const errors = err.response.data.errors; //errors array
        if (errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

        dispatch({
            type: LOGIN_FAIL
        })

    }
}

// Logout / Clear Profile
export const logout = () => dispatch => {
    dispatch({
        type: CLEAR_MOVIES
    })
    dispatch({
        type: LOGOUT
    })
}

// Logout / Delete User
export const deactivate = async() => {
  
    const config = {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
    try {
        await axios.delete("api/users/deactivate", config)
        logout()
    } catch (err) {
        console.log(err.message);
    }

}
import { combineReducers } from 'redux';
import alert from './alert'
import auth from './auth'
import movies from './movies'
//https://redux.js.org/api/combinereducers/
export default combineReducers({
    alert,
    auth,
    movies
})
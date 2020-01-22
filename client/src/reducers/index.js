import { combineReducers } from 'redux';
import alert from './alert'
import auth from './auth'
//https://redux.js.org/api/combinereducers/
export default combineReducers({
    alert,
    auth,
    movies
})
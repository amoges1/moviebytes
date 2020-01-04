import axios from 'axios';

//apply token to x-auth-token header
const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete axios.defaults.header.common['x-auth-token']
    }
}

export default setAuthToken
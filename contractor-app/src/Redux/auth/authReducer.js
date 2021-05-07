import axios from 'axios';
import { LOGIN_USER, LOGOUT_USER } from './authReduxActions';
import jwt_decode from 'jwt-decode';

const initialState = {
    isAuthenticated: false,
    user: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            let token = action.payload;
            try {
                const decoded = jwt_decode(token);
                const currentTime = Date.now() / 1000;
                if (decoded.exp > currentTime) {
                    console.log("Logged in as ", decoded)
                    localStorage.setItem('jwtToken', token);
                    axios.defaults.headers.common['Authorization'] = token;
                    return {
                        ...state,
                        isAuthenticated: true,
                        user: action.payload,
                    };
                }
            }
            catch (err) { } // Falls through to LOGOUT_USER case if there's an error

        // else it falls through to the LOGOUT_USER case
        case LOGOUT_USER:
            localStorage.removeItem('jwtToken');
            delete axios.defaults.headers.common['Authorization'];
            console.log('Logged Out')
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
}
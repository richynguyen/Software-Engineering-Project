import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../actions/types";

const intialState = {
    token: localStorage.getItem('token'),        // get user token from localstorage
    isAuthenticated: null,                       // if user is authenticate
    isLoading: false,                            // if user is loading
    user: null                                  // the user itself
};

export default function (state = intialState, action) {
    switch (action.type) {
        case USER_LOADING:                       // Point of getting user from the backend
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload         // we sent the user as the payload so set it here
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token); // set the token sent from user and set to local storage
            return {
                ...state,
                ...action.payload,            // holds the user and the token
                isAuthenticated: true,
                isLoading: false,
                user: action.payload         // we sent the user as the payload so set it here
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,                // clear out the token
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        default:
            return state;
    }
}
import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";
// Important note: When you see dispatch it's calling the appropiate reducer -> switch case based on action type
// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING })                       // Calls the authReducer = store

  axios.get('/api/auth/user', tokenConfig(getState))     // fetch the user from our backend = DB
    .then(res => dispatch({                         // Now that we fetched the user we want to store that into the store
      type: USER_LOADED,                            // action type
      payload: res.data                            // user and token, note that res = to the object fethced from the DB
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));                   // errors function to add error info into the error state in errorReducer
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = ({ name, email, password, streetAddress, cityAddress, stateAddress, zipCode }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ name, email, password, streetAddress, cityAddress, stateAddress, zipCode })

  axios.post('/api/users', body, config)        // POST to the backend the new user
    .then(res => dispatch({
      type: REGISTER_SUCCESS,                   // Everything went okay and the user was created
      payload: res.data                         // returns the user and token which is sent to the reducer
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
      dispatch({
        type: REGISTER_FAIL                    // Since the registration failed need to set everything in the reducer back to default = null
      });
    });
}

// Login User
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ email, password })

  axios.post('/api/auth', body, config)        // POST to the backend the new user
    .then(res => dispatch({
      type: LOGIN_SUCCESS,                   // Everything went okay and the user was created
      payload: res.data                         // returns the user and token which is sent to the reducer
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
      dispatch({
        type: LOGIN_FAIL                    // Since the registration failed need to set everything in the reducer back to default = null
      });
    });
}

// Logoout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get the token from the state meaning the token in our intialstate in authReducer
  const token = getState().auth.token;

  // Headers
  const config = {                                  // Object
    headers: {                                      // attribute of object of JSON type
      "Content-type": "application/json"
    }
  }

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;    // add the token to it that's in local storage
  }

  return config;
}
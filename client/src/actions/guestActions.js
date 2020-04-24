import axios from 'axios';
import {
  GUEST_LOADING,
  GUEST_LOADED,
  GUEST_SUCCESS
} from "./types";

// We want to check the token, then fetch the user
export const loadGuest = () => (dispatch, getState) => {
  // Call the gues reducer and tell him we are fetching the guest
  dispatch({ type: GUEST_LOADING });

  // Load the guest from the backend
  axios.get('/api/guests/user', tokenConfig(getState))
    .then(guest => dispatch({
      type: GUEST_LOADED,               // tell the reducer the guest is loaded 
      payload: guest.data              // store the guest & token in the reducer store
    }));
}

export const tokenConfig = (getState) => {
  // Get the token from the state in guest reducer
  const token = getState().guest.token;

  // We create a headers, just like postman -> Axios = talk to our backend
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }

  // If there's a token, add the token to headers
  if (token) {
    config.headers['x-auth-token'] = token;     // add the token that's in local storage/ guest reducer
  }

  return config;
}

export const createGuest = () => (dispatch) => {
  axios.post('/api/guests')
    .then(guest => dispatch({
      type: GUEST_SUCCESS,
      payload: guest.data
    }));
} 
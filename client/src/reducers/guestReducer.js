// Guest Reducer = Guest Store
// Holds the state
import {
  GUEST_LOADING,
  GUEST_LOADED,
  GUEST_SUCCESS
} from "../actions/types";

// This is the store, holds information of the guest
const intialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,             // if the guest is still being loaded from backend
  guest: null                   // the guest itself
}

export default function (state = intialState, action) {
  switch (action.type) {
    case GUEST_LOADING:             // Point of getting the guest from the backend
      return {
        ...state,                   // current state
        isLoading: true
      };

    case GUEST_LOADED:             // used for every request => has to be continous because how JWT works = stateless
      return {
        ...state,                  // current state
        isAuthenticated: true,     // we validate the guest based on the token
        isLoading: false,
        guest: action.payload      // we send the guest in the payload
      };

    case GUEST_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,         // here, we get the guest and token from the backend
        isLoading: false,
        guest: action.payload
      };

    default:
      return state;
  }
}
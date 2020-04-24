import { GET_ERRORS, CLEAR_ERRORS } from './types';

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {  // call the error reducer and put everything into the state
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }                      // payload is an object with all 3
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

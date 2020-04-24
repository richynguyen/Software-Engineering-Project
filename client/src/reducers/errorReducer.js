// Errors State
import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

// create our initial state, which is an object
const intialState = {
  msg: {},                         // JSON object, empty since comes from server
  status: null,
  id: null
};

// Takes in a state which comes from server and an action that comes from the actions file
export default function (state = intialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {                                     // returns an JSON object with
        msg: action.payload.msg,                   // message that's in the payload
        status: action.payload.status,            // status that's in the payload
        id: action.payload.id                     // id that's in the payload -> Good for debugging
      }
    case CLEAR_ERRORS:                            // Set everything to default 
      return {                                   // so we don't want old errors hanging out in our state
        msg: {},
        status: null,
        id: null
      }
    default:
      return state;
  }
}
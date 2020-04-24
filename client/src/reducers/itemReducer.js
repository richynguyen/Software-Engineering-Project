//Where our actual state actually goes
//where we check our actions, getItems action for ex

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

// this is the store, holds all the information
const intialState = {
  items: [],                                              // empty array, since it comes from the server = DB
  loading: false                                          // when fetching data it can take a few ms
}
// Create a case for each type of action in ItemAction.js
export default function (state = intialState, action) {     // state is from above for now, action has a type
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,                // making a copy of the state of the current state
        items: action.payload,   // we add items to the current state that come from action.payload
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id != action.payload)
      }
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]    // add new item to the existing state items
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;            // returns initial state for now
  }
}
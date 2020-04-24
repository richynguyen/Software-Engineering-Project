import {
  GET_GUEST_ITEMS,
  ADD_GUEST_ITEMS,
  DELETE_GUEST_ITEMS,
  GUEST_ITEMS_LOADING
} from '../actions/types';

const intialState = {
  items: [],
  loading: false
}

export default function (state = intialState, action) {
  switch (action.type) {
    case GET_GUEST_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case DELETE_GUEST_ITEMS:
      return {
        ...state,
        items: state.items.filter(item => item._id != action.payload)
      };
    case ADD_GUEST_ITEMS:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    case GUEST_ITEMS_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}
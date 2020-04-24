import {
  ADD_ORDER,
  GET_ORDER,
  ORDER_LOADING
} from '../actions/types';

const initialState = {
  orders: null,
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        orders: action.payload,
        loading: false
      };
    case ADD_ORDER:
      return {
        ...state,
        ...action.payload,
        orders: action.payload
      };
    case ORDER_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}
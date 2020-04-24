// Product Reducer = Product Store 
// Holds the state

import { GET_PRODUCTS, PRODUCTS_LOADING } from '../actions/types';

// This is the store, holds all information of the products
const initialState = {
  products: [],                    // Array of products that we can bring in from the backend
  loading: false                  // determines whether the products are still being loaded in from the backend
}

// This function takes in the current state of the store, i.e it can change
// This function takes in a type of action that we want to do the store
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,                    // Make a copy of the store
        products: action.payload,    // Attach the payload which holds the data sent = products from backend
        loading: false
      }
    case PRODUCTS_LOADING:
      return {
        ...state,                  // Make a copy of the store
        loading: true              // Currently loading the products from the backend
      }
    default:
      return state;
  }
}
// Make our requests to the products backend
import { GET_PRODUCTS, PRODUCTS_LOADING } from './types';
import axios from 'axios';

export const getProducts = () => dispatch => {
  dispatch(setProductsLoading());                  // Tell the store that the products are loading from the backend

  axios.get('/api/products')                     // Get the products from the backend
    .then(res => dispatch({                      // res = the products from the backend
      type: GET_PRODUCTS,                        // dispatch calls the reducer and we return to it the object with all fields
      payload: res.data
    }))
}

export const setProductsLoading = () => {
  return {
    type: PRODUCTS_LOADING
  }
}
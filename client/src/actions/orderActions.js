import {
  ADD_ORDER,
  GET_ORDER,
  ORDER_LOADING
} from './types';

import axios from 'axios';

export const setOrderLoading = () => {
  return {
    type: ORDER_LOADING
  }
}

export const getOrder = (orderID) => dispatch => {
  dispatch(setOrderLoading());

  axios.get(`/api/orders/${orderID}`)
    .then(order =>
      dispatch({
        type: GET_ORDER,
        payload: order.data
      }))
}

export const addOrder = order => dispatch => {
  axios.post('/api/orders', order)
    .then(res => dispatch({
      type: ADD_ORDER,
      payload: res.data
    }))
}
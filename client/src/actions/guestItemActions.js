// Here we make the request to the backend and update the Guest Items Store
import {
  GET_GUEST_ITEMS,
  ADD_GUEST_ITEMS,
  DELETE_GUEST_ITEMS,
  GUEST_ITEMS_LOADING
} from './types';
import axios from 'axios';

export const setGuestItemsLoading = () => {
  return {
    type: GUEST_ITEMS_LOADING
  }
}

export const getGuestItems = (id) => dispatch => {
  dispatch(setGuestItemsLoading());
  axios.get(`/api/guestItems/${id}`)
    .then(guestItem => dispatch({
      type: GET_GUEST_ITEMS,
      payload: guestItem.data
    }))
}

export const addGuestItem = guestItem => (dispatch) => {
  axios.post('/api/guestItems', guestItem)
    .then(res => dispatch({
      type: ADD_GUEST_ITEMS,
      payload: res.data
    }))
}

export const deleteGuestItem = guestID => (dispatch) => {
  axios.delete(`/api/guestItems/${guestID}`)
    .then(res => dispatch({
      type: DELETE_GUEST_ITEMS,
      payload: guestID
    }))
}
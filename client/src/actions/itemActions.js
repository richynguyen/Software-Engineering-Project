// make our requests to our backend
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';    // Gets token from local storage
import { returnErrors } from './errorActions';

// each returns an action object with a type (and payload) field(s)

// Component makes an action -> we use dispatch to send data from our backend 
export const getItems = (id) => dispatch => {
  dispatch(setItemsLoading());                     // dispatch() to send the type to the reducer -> returns whatever is in the state and sets loading to true     
  axios.get(`/api/items/${id}`)                          // get request to 'api/items' which is our backend
    .then(res => dispatch({                       // this gives us a response 
      type: GET_ITEMS,
      payload: res.data                         // the data that comes from the backend
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteItem = (id) => (dispatch, getState) => {     // takes in id to know which item to delete
  axios.delete(`/api/items/${id}`, tokenConfig(getState)).then(res =>      // Takes care of delete for the server = DB
    dispatch({                                      // dispatch takes care of the delete for the reducer = store
      type: DELETE_ITEM,
      payload: id
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
// adding item from modal component -> action to post on backend -> item sent to the backend and saved
export const addItem = item => (dispatch, getState) => {
  axios.post('/api/items', item, tokenConfig(getState))                // add items to the backend
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data                    // data to be added to the backend
      }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}
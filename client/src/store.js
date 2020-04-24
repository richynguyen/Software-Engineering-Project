// Entry point to our redux store
// Holds the state of our application
// Only way to change the state is do an action on it: ADD_ITEM, DELETE_ITEM ETC
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const intialState = {};         //empty object to represent intial state

const middleware = [thunk];    //any middleware we use in array, in this case just thunk

const store = createStore(rootReducer, intialState, compose(
    applyMiddleware(...middleware)
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;
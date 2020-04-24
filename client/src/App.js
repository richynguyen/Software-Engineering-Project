import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';       //includes bootstrap css
import './App.css';
import AppNavbar from './components/AppNavbar';      //include the appnavbar we created
import ShoppingList from './components/ShoppingList'; //include the shoppin list we created
import { Provider } from 'react-redux';               // binds react to redux
import store from './store';
import ItemModal from './components/ItemModal';
import {
  Container, NavItem, Button, Nav,
  NavLink
} from 'reactstrap';
import { loadUser } from './actions/authActions';
import ShoppingCartModal from './components/ShoppingCartModal';
import ProductsList from './components/ProductsList';
import CheckoutModal from './components/CheckoutModal';
import { loadGuest, createGuest } from './actions/guestActions';
import GuestLoginPage from './components/GuestLoginPage';
import { connect } from 'react-redux';
import {
  Fragment
} from 'react';
import LoginModal from './components/auth/LoginModal';

import { Router, BrowserRouter, Switch, Link, Route } from "react-router-dom";
//import { Router, Route, IndexRoute } from 'react-router';

import LoginButton from './components/LoginButton';



let showContents = false;

// main pokemon wallpaper 
var sectionStyle = {
  backgroundImage: 'url(https://images7.alphacoders.com/381/381583.jpg)',
  backgroundSize: 'cover',
  height: '750px'
}


class App extends Component {
  componentDidUpdate() {
    //store.dispatch(createGuest());
    store.dispatch(loadUser());                  // loads user continously
    //store.dispatch(loadGuest());
  }


  render() {
    return (
      <Provider store={store}>
        <div className="App" style={sectionStyle}>
          <script src="http://localhost:6000/"></script>
          <AppNavbar />
          <BrowserRouter>

            <Link to="/Users/josejuarez/Desktop/UH/Software Engineering/Project/client/src/components/LoginButton.js">
            </Link>
            <Route path="/" component={LoginButton} />

          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}



const mapStateToProps = (state) => ({        // property: index reducer
  user: state.auth.user,                    // property: index reducer
  guest: state.guest
});

export default App;

// React component to store a user's selected items to a cart modal
import React, { Component, Fragment } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Container
} from 'reactstrap';

//Container = component that's hooked to redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProductsList from '../components/ProductsList';
import ShoppingCartModal from '../components/ShoppingCartModal';
import LoginModal from '../components/auth/LoginModal';
import { loadUser } from '../actions/authActions';
import { createGuest } from '../actions/guestActions';

import { Router, BrowserRouter, Switch, Link, Route } from "react-router-dom";



class LoginButton extends Component {
  state = {
    user: ''
  }

  handleGuest = e => {
    e.preventDefault();

    this.props.createGuest();

    this.forceUpdate();
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <Container>
        {this.props.user.isAuthenticated || this.props.guest.guest ?
          <Container>
            <BrowserRouter>
              <div>
                <Link to="/Users/josejuarez/Desktop/UH/Software Engineering/Project/client/src/components/ShoppingCartModal.js">
                </Link>
                <Link to="/Users/josejuarez/Desktop/UH/Software Engineering/Project/client/src/components/ProductsList.js"></Link>
                <Route path="/" component={ShoppingCartModal} />
                <Route path="/" component={ProductsList} />
              </div>
            </BrowserRouter>
          </Container>
          :
          <Fragment>
            <Container>
              <Button
                color='outline-dark'
                style={{ marginBottom: '2rem' }}
                block
              >
                <LoginModal>

                </LoginModal>
              </Button>
            </Container>
            <Container>
              <Button
                color='dark'
                style={{ marginBottom: '2rem' }}
                block
                onClick={this.handleGuest}>
                Continue as Guest
              </Button>
            </Container>
          </Fragment>

        }
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth,
  guest: state.guest
});

export default connect(mapStateToProps, { loadUser, createGuest })(LoginButton);
import React, { Component } from 'react';
import {
  Container,
  Button,
  Label,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import { connect } from 'react-redux';
import { createGuest } from '../actions/guestActions';
import LoginModal from '../components/auth/LoginModal';

import ShoppingCartModal from '../components/ShoppingCartModal.js';
import ProductsList from '../components/ProductsList.js';
import ShoppingList from './ShoppingList';


class GuestLoginPage extends Component {
  state = {

  }

  handleGuest = e => {
    e.preventDefault();

    this.props.createGuest()
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Container>
          <NavItem>
            <NavLink href="#">Link</NavLink>
          </NavItem>
          <Button
            color='dark'
            style={{ marginBottom: '2rem' }}
            onClick={this.handleClick}
          >
            <LoginModal />
          </Button>
        </Container>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  user: state.auth,
  guest: state.guest
})

export default connect(mapStateToProps, { createGuest })(GuestLoginPage);
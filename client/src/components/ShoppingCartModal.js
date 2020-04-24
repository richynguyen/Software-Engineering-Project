// React component to store a user's selected items to a cart modal
import React, { Component } from 'react';
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
import { addItem } from '../actions/itemActions';
import uuid from 'react-uuid';
import ShoppingList from './ShoppingList';
import CheckoutModal from './CheckoutModal';
import GuestShoppingList from './GuestShoppingList';
import GuestCheckoutModal from './GuestCheckoutModal';
import { loadUser } from '../actions/authActions';

class ShoppingCartModal extends Component {
  state = {
    modal: false
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();

    this.toggle();
  }

  handleClick = e => {
    e.preventDefault();

    console.log("Clicked the href");
  }

  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >
          Shopping Cart
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
          >
            <ModalHeader toggle={this.toggle}>Shopping Cart</ModalHeader>
            <ModalBody>
              {this.props.user.user ?
                <Container>
                  <ShoppingList />
                  <CheckoutModal />
                </Container>
                :
                <Container>
                  <GuestShoppingList />
                  <GuestCheckoutModal />
                </Container>
              }
            </ModalBody>
          </Modal>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth
});

export default connect(mapStateToProps, { loadUser })(ShoppingCartModal);
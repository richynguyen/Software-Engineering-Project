// Checkout component that we want to render on the UI
// Concept: Modal displayed after customer hits the Checkout Button
//          Check out button will be rendered in the Shopping Cart Modal

import React, { Component } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label
} from 'reactstrap';
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';

import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { loadUser } from '../actions/authActions';
import PropTypes from 'prop-types';
import LoggedInOrders from './LoggedInOrders';

class CheckoutModal extends Component {
  // State of the component
  state = {
    modal: false
  }

  // Prop-types to document the inteded types of properties passed to components
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired
  };

  // Toggle the modal to open and close
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    this.props.getItems(this.props.user.user._id);
    this.props.loadUser();
  }

  render() {
    const { items } = this.props.item;
    const { user } = this.props.user;


    return (
      <Container>
        <Button
          color="dark"
          style={{ marginTop: '2rem' }}
          block
          onClick={this.toggle}>
          Proceed to Checkout
          </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}> Checkout</ModalHeader>
          <ModalBody>
            <Label> Review Items</Label>

            <ListGroup>
              <TransitionGroup className="checkout-list">
                {items.map(({ _id, name }) => (
                  <CSSTransition key={_id} timeout={500} classNames="fade">
                    <ListGroupItem>
                      {name}
                    </ListGroupItem>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ListGroup>
            <Container>
              Shipping Address
              <Container>{user.streetAddress}</Container>
              <Container>{user.cityAddress}</Container>
              <Container>{user.stateAddress}</Container>
              <Container>{user.zipCode}</Container>
            </Container>
            <Container>
              <LoggedInOrders></LoggedInOrders>
            </Container>

          </ModalBody>
        </Modal>
      </Container>
    )

  }

}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth
});

export default connect(mapStateToProps, { getItems, loadUser })(CheckoutModal);

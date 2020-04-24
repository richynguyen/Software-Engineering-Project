// Guest checkout component
// Modal to be displayed after customer hits the checkout Button

import React, { Component } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Alert
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getGuestItems } from '../actions/guestItemActions';
import { loadGuest } from '../actions/guestActions';
import PropTypes from 'prop-types';
import ShippingAddressModal from './ShippingAddressModal';
import Orders from './Orders';
import { getOrder } from '../actions/orderActions';


class GuestCheckoutModal extends Component {
  // State of the component
  state = {
    modal: false,
    name: '',
    email: '',
    streetAddres: '',
    cityAddress: '',
    stateAddress: '',
    zipcode: '',
    correctAddress: true
  };

  // Prop-types to document the intended types of properties passed to components
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    loadGuest: PropTypes.func.isRequired
  }

  // Toggle the modal to open and close
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      correctAddress: this.props.guest.guest.guest.shippingAddress
    });

  }

  componentDidUpdate(prevProps) {
    if (prevProps.guest.guest.guest.shippingAddress == this.props.guest.guest.guest.shippingAddress) {

    }
  }

  /*
  componentDidMount() {
    this.props.getGuestItems(this.props.guest.guest.guest._id);
    console.log(this.props.guest.guest.guest._id);
  }
  */

  render() {
    return (
      <Container>
        <Button
          color="dark"
          style={{ marginTop: '2rem' }}
          block
          onClick={this.toggle}
        >
          Proceed to Checkout
          </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}> Checkout</ModalHeader>
          <ModalBody>

            <Label>Reivew Items</Label>
            <ListGroup>
              <TransitionGroup className="guest-checkout-list">
                {this.props.item.items.map(({ _id, name }) => (
                  <CSSTransition key={_id} timeout={500} classNames="fade">
                    <ListGroupItem>
                      {name}
                    </ListGroupItem>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ListGroup>
            <Row>
              <Container>

              </Container>
            </Row>
            <Container>
              <Row>
                <Col>
                  <Label style={{ marginTop: '4rem', marginLeft: '4rem' }}> Provide Valid Shipping Address to Checkout</Label>
                  <ShippingAddressModal></ShippingAddressModal>
                </Col>
              </Row>
            </Container>
            <Container>

            </Container>
            <Container>
              <Orders></Orders>
            </Container>
          </ModalBody>
        </Modal>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  item: state.guestItems,
  guest: state.guest,
  order: state.orders
})

export default connect(mapStateToProps, { getGuestItems, loadGuest, getOrder })(GuestCheckoutModal);
import React, { Component, Fragment } from 'react';
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

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getGuestItems } from '../actions/guestItemActions';
import { loadGuest } from '../actions/guestActions';
import { getOrder, addOrder } from '../actions/orderActions';
import { loadUser } from '../actions/authActions';

let mainPage = false;

class Orders extends Component {
  state = {
    modal: false,
    guest: ''
  }

  goToMainPage = (e) => {
    e.preventDefault();

    window.location.reload(false)

    mainPage = true;

    console.log(mainPage);
    this.toggle();
    this.forceUpdate();
  }

  toggle = () => {
    if (this.props.guest.guest.guest.shippingAddress != '' ||
      this.props.item.items.length != 0) {
      this.setState({
        modal: !this.state.modal,
      });

      const newOrder = {
        orderID: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        userID: this.props.guest.guest.guest._id
      }

      this.props.addOrder(newOrder);
    }

  }

  componentDidUpdate() {

  }

  render() {
    return (
      <Container>
        {!mainPage ?
          <Fragment>
            <Button
              color='dark'
              style={{ marginBottom: '2rem', marginTop: '4rem' }}
              block
              onClick={this.toggle}
            >
              Place Order
        </Button>

            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
            >
              <ModalHeader toggle={this.toggle}> Order Information</ModalHeader>
              <ModalBody>
                <Label> Items Purchased </Label>
                <ListGroup>
                  <TransitionGroup className="order-items-list">
                    {this.props.item.items.map(({ _id, name }) => (
                      <CSSTransition key={_id} timeout={500} classNames="fade">
                        <ListGroupItem>
                          {name}
                        </ListGroupItem>
                      </CSSTransition>
                    ))}
                  </TransitionGroup>
                </ListGroup>
                <Container>
                  <Label>Order ID: {this.props.order.orderID}</Label>
                  <Label> Shipping Address: {this.props.guest.guest.guest.shippingAddress}</Label>
                </Container>
                <Container>
                  <Label style={{ marginLeft: '9rem', marginTop: '6rem' }}>Success: Click OK</Label>

                  <Button
                    color='dark'
                    style={{ marginBottom: '2rem', marginTop: '2rem' }}
                    block
                    onClick={this.goToMainPage}
                  >
                    OK
              </Button>
                </Container>
              </ModalBody>
            </Modal>
          </Fragment>
          :
          <Container>
            Please Provide a Valid Address to Complete Order
            </Container>

        }

      </Container>
    )
  }
}

const mapStateToProps = state => ({
  item: state.guestItems,
  guest: state.guest,
  order: state.orders
})

export default connect(mapStateToProps, { getGuestItems, loadGuest, addOrder, loadUser })(Orders);
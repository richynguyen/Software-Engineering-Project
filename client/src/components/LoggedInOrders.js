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
import { getItems } from '../actions/itemActions';
import { loadUser } from '../actions/authActions';
import { getOrder, addOrder } from '../actions/orderActions';

let mainPage = false;

class LoggedInOrders extends Component {
  state = {
    modal: false,
    user: ''
  }

  goToMainPage = (e) => {
    e.preventDefault();

    window.location.reload(false)
  }

  toggle = () => {
    if (this.props.user.user.shippingAddress != '') {
      this.setState({
        modal: !this.state.modal,
      });

      const newOrder = {
        orderID: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        userID: this.props.user.user._id
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
              style={{ marginBottom: '2rem' }}
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
                  <Label> Shipping Address: {this.props.user.user.streetAddress}{this.props.user.user.cityAddress}</Label>
                </Container>
                <Container>
                  Success: Click OK
            <Button
                    color='dark'
                    style={{ marginBottom: '2rem' }}
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
  item: state.item,
  user: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  order: state.orders
})

export default connect(mapStateToProps, { getItems, loadUser, addOrder })(LoggedInOrders);
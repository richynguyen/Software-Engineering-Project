// Product component that we want to render on the UI
// Concept: Components let you split UI into independed pieces
//          props are inputs
//          Return what we want to appear on the screen
import React, { Component } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form
} from 'reactstrap';
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';

import { connect } from 'react-redux'; // connect the product store to the react component
import { getProducts } from '../actions/productActions';
import PropTypes from 'prop-types';
import { addItem } from '../actions/itemActions';
import { createGuest, loadGuest } from '../actions/guestActions';
import { addGuestItem } from '../actions/guestItemActions';
import CheckoutModal from './CheckoutModal';

var sectionStyle = {
  backgroundImage: 'url(https://wallpaperaccess.com/full/866025.jpg)',
  backgroundSize: 'percentage',
  height: '500px',
  width: '100px'
}


class ProductsList extends Component {
  // State of the component
  state = {
    modal: false,
    name: '',
    userID: '',
    guest: ''
  }

  // prop-types to document the intended types of properties passed to components
  static propTypes = {
    getProducts: PropTypes.func.isRequired,
  };

  // Toggle the modal to open and close
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  openModal = (itemName, id) => {
    this.setState({
      name: itemName,
      userID: id
    });

    // If the user is not logged in
    if (this.props.user == null) {
      // If the guest added his/her first item to the shopping cart
      // then create the guest
      if (this.props.guest.guest == null) {

        this.props.createGuest()

        //this.state.guest = this.props.createGuest();
      }
      else {
        this.props.loadGuest();
      }
    }

    this.toggle();
  }

  onSubmit = (event) => {
    event.preventDefault();



    // If the user is logged in 
    if (this.props.user != null) {
      const newItem = {
        name: this.state.name,
        userID: this.props.user._id
      }

      // Add item via addItem action
      this.props.addItem(newItem);
    }
    // If not, continue as guest
    else {
      //this.props.loadGuest();
      const newItem = {
        name: this.state.name,
        userID: this.props.guest.guest.guest._id
      }
      console.log(newItem);

      this.props.addGuestItem(newItem);
    }

    // Close Modal
    this.toggle();
  }

  // Product component is rendered for the first time
  componentDidMount() {
    this.props.getProducts();
  }

  // Here we define the actual product component we want to render to the UI
  render() {
    const { products } = this.props.products;

    return (
      <div className="ProductsList">
        <Container>
          <ListGroup>
            <TransitionGroup className="products-list" style={sectionStyle} color='dark'>
              {products.map(({ productID, name }) => (
                <CSSTransition key={productID} timeout={500} classNames="fade">
                  <ListGroupItem color='white'>
                    <Button
                      className="addToCart-btn"
                      color="dark"
                      size="sm"
                      onClick={this.openModal.bind(productID, name)}>
                      {name}
                    </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                      <ModalHeader toggle={this.toggle}> Add {this.state.name} to Shopping Cart?</ModalHeader>
                      <ModalBody>
                        <Button
                          className="yes"
                          color="dark"
                          size="sm"
                          onClick={(e) => this.onSubmit(e)}>
                          YES
                        </Button>
                      </ModalBody>
                    </Modal>
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        </Container>
      </div>
    );
  }
}

// Mapping the desired redux states(stores) from index.js to this component
const mapStateToProps = (state) => ({
  products: state.product,                 // property: index reducer
  user: state.auth.user,                    // property: index reducer
  guest: state.guest
});

// Connect the Store to this component
export default connect(mapStateToProps, { getProducts, addItem, createGuest, addGuestItem, loadGuest })(ProductsList);
import React, { Component } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap';
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';
import { connect } from 'react-redux';           // get state from redux into a react component
import { getItems, deleteItem } from '../actions/itemActions';
import { loadUser } from '../actions/authActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
  state = {
    modal: false
  }

  // shopping list object will have the redux action getItems and will have item = our state
  static propTypes = {
    getItems: PropTypes.func.isRequired,      // set the type to a function that is required
    item: PropTypes.object.isRequired,        // object that represents our state
    isAuthenticated: PropTypes.bool,
    getUser: PropTypes.func.isRequired
  };

  componentDidMount() {    // runs when component mounts such as making an API request
    this.props.getItems(this.props.user.user._id); // calls the redux (store) action to get all the items in the store
    this.props.loadUser();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  }



  render() {
    const { items } = this.props.item;   // {} = destructoring, we pull items from this.state and put into variable items
    //const user = this.props.user.user._id;
    console.log(items);

    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ? <Button
                    className="remove-btn"
                    color="dark"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >
                    &times;
                            </Button> : null}

                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}


// takes in state and pass in an object(state.item), the function then returns an object with the field item which holds the state.item
const mapStateToProps = state => ({
  item: state.item,                       // based on reducer in index.js
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth
});

// since we are using connect to get state from redux we need to export using connect
export default connect(mapStateToProps,
  { getItems, deleteItem, loadUser })          // any action you bring from import put here as well
  (ShoppingList);
//                   function, any actions we want to use, the component
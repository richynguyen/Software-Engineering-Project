import React, { Component } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getGuestItems, deleteGuestItem } from '../actions/guestItemActions';
import { loadGuest } from '../actions/guestActions';
import PropTypes from 'prop-types';

class GuestShoppingList extends Component {
  state = {
    guest: ''
  }

  static propTypes = {
    getGuestItems: PropTypes.func.isRequired,
    items: PropTypes.object.isRequired,
    getGuest: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.loadGuest();
    console.log(this.props.guest.guest.guest._id);
    this.props.getGuestItems(this.props.guest.guest.guest._id);
  }

  onDelete = (id) => {
    this.props.deleteGuestItem(id);
  }

  render() {
    const gItems = this.props.items.items;
    console.log(gItems);

    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="guest-shopping-list">
            {gItems.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="dark"
                    size="sm"
                    onClick={this.onDelete.bind(this, _id)}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  guest: state.guest,
  isAuthenticated: state.auth.isAuthenticated,
  items: state.guestItems
});

export default connect(mapStateToProps,
  { getGuestItems, deleteGuestItem, loadGuest })
  (GuestShoppingList);
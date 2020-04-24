// Item component that we want to render to the UI
// Once a user clicks on a product they will see this Item modal component
// Yes = add product to the user's shopping cart
// No = close the modal
import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

// Connect the item store = itemReducer to this react component
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
  // State of the component
  state = {
    modal: false,
    name: ''
  }

  // prop-types to document the intended types of properties passed to components
  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  // Toggle the modal to open and close
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  //  Takes event from user input
  onChange = (e) => {                           // whatever was added to add item on UI
    this.setState({ [e.target.name]: e.target.value }); // e.target.name get's name from line 68, which comes from input to UI
  }

  onSubmit = e => {                         // get input from UI button
    e.preventDefault();                    // prevent form actually submitting

    const newItem = {                     // create new item 
      name: this.state.name,            //whatever is typed into the input is update into state.name
      userID: this.props.user._id
    }

    //Add item via addItem action
    this.props.addItem(newItem);

    //close modal
    this.toggle();
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >AddItem</Button> : <h4 className="mb-3 ml-4">Please log in to manage items</h4>}

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                  onChange={this.onChange}
                >
                </Input>
                <Button
                  color="dark"
                  style={{ marginTop: '2rem' }}
                  block
                >
                  Add Item
                        </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
// Here we can bring in any reducer from index.js
const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { addItem })(ItemModal);
// React component to register users 
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
  NavLink,
  Alert
} from 'reactstrap';

//Container = component that's hooked to redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usAutocomplete.Lookup;

let websiteKey = "18911612130131961";
const credentials = new SmartyStreetsCore.SharedCredentials(websiteKey);

let client = SmartyStreetsCore.buildClient.usAutocomplete(credentials);

let solidAddress = true;

class RegisterModal extends Component {
  // state of the component
  state = {
    modal: false,                  // represents if the modal is open or not
    name: '',
    email: '',
    password: '',
    streetAddress: '',
    cityAddress: '',
    stateAddress: '',
    zipCode: '',
    msg: null
  };

  // prop-types to document the intended types of properties passed to component
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  //is invoked immediately after updating occurs. This method is not called for the initial render
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props

    if (this.state.cityAddress) {
      if (this.state.streetAddress) {
        let lookup = new Lookup(this.state.streetAddress + ", " + this.state.cityAddress);

        client.send(lookup)
          .then(handleSuccess)
          .catch(handleError);

        async function handleSuccess(response) {
          response.result.length != 0 ?
            solidAddress = true : solidAddress = false;
        }

        async function handleError(response) {
          console.log(response);
          solidAddress = false;
        }

        if (error != prevProps.error) {
          // Check for register error
          if (error.id == 'REGISTER_FAIL') {
            this.setState({ msg: error.msg.msg });
          } else {
            this.setState({ msg: null });
          }
        }
        // If the user is authenticated then close the modal
        if (this.state.modal == true) {
          if (isAuthenticated && solidAddress) {
            this.toggle();
          }
        }
      }

    }
  }

  toggle = () => {
    // Clear Errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = (e) => {                           // whatever was added to add item on UI
    this.setState({ [e.target.name]: e.target.value }); // e.target.name get's name from line 68, which comes from input to UI
  }

  onSubmit = e => {                         // get input from UI button
    e.preventDefault();                    // prevent form actually submitting
    if (solidAddress) {
      const { name, email, password, streetAddress, cityAddress, stateAddress, zipCode } = this.state;

      // Create user object
      const newUser = {
        name,
        email,
        password,
        streetAddress,
        cityAddress,
        stateAddress,
        zipCode,
      };

      // Attempt to register
      this.props.register(newUser);
    }
    else {
      this.forceUpdate();
    }

  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {!solidAddress ? <Alert color="danger">{this.state.streetAddres} Not A Valid Address</Alert> : null}
            {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="mb-3"
                  onChange={this.onChange}
                >

                </Input>
                <Label for="name">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.onChange}
                >
                </Input>

                <Label for="name">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="pasword"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}
                >
                </Input>

                <Label for="name">Street Address</Label>
                <Input
                  type="streetAddress"
                  name="streetAddress"
                  id="streetAddress"
                  placeholder="streetAddress"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>

                <Label for="name">City Address</Label>
                <Input
                  type="cityAddress"
                  name="cityAddress"
                  id="cityAddress"
                  placeholder="cityAddress"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>

                <Label for="name">State Address</Label>
                <Input
                  type="stateAddress"
                  name="stateAddress"
                  id="stateAddress"
                  placeholder="stateAddress"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>

                <Label for="name">Zip Code</Label>
                <Input
                  type="zipCode"
                  name="zipCode"
                  id="zipCode"
                  placeholder="zipCode"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>

                <Button
                  color="dark"
                  style={{ marginTop: '2rem' }}
                  block
                >
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);
// React Component to verify user or guest shipping address
import React, { Component } from 'react';
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';

import { connect } from 'react-redux';
import { loadGuest } from '../actions/guestActions';

const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usAutocomplete.Lookup;

let websiteKey = "18911612130131961";
const credentials = new SmartyStreetsCore.SharedCredentials(websiteKey);

let client = SmartyStreetsCore.buildClient.usAutocomplete(credentials);

let solidAddress = true;

class ShippingAddressModal extends Component {
  // State of the component
  state = {
    modal: false,
    streetAddress: '',
    cityAddress: '',
    stateAddress: '',
    zipcode: '',
    correctAddress: null
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  updateCorrectAddress = (solidAddress) => {
    this.setState({
      correctAddress: solidAddress
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();

    console.log("AM I IN THE ONSUBMIT");

    if (solidAddress) {
      console.log("IN THE SUBMIT")
      let fullAddress = this.state.streetAddress + ", " +
        this.state.cityAddress + ', ' + this.state.zipcode;
      console.log(fullAddress);

      this.props.guest.guest.guest.shippingAddress = fullAddress;

      this.toggle();
    }
    else {
      this.forceUpdate();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.cityAddress) {
      if (this.state.streetAddress) {
        //console.log("In the request");
        let lookup = new Lookup(this.state.streetAddress + ", " + this.state.cityAddress);

        client.send(lookup)
          .then(handleSuccess)
          //.then(this.updateCorrectAddress(solidAddress))
          .catch(handleError);


        async function handleSuccess(response) {

          //console.log(response.result);
          //console.log(response);
          //console.log(response.result.length);

          response.result.length != 0 ?
            solidAddress = true : solidAddress = false;

        }

        async function handleError(response) {
          console.log(response);
          solidAddress = false;
        }
      }
    }
  }

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginTop: '2rem' }}
          block
          onClick={this.toggle}
        >
          Shipping Address : {this.props.guest.guest.guest.shippingAddress}

          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
          >
            <ModalHeader toggle={this.toggle}> Provide Shipping Address</ModalHeader>
            <ModalBody>
              <Container>
                {!solidAddress ? <Alert color="danger">{this.state.streetAddres} Not A Valid Address</Alert> : null}
                <Form onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label for="name"> Street Address </Label>
                    <Input
                      type="streetAddres"
                      name="streetAddress"
                      id="streetAddress"
                      placeholder="streetAddress"
                      className="mb-3"
                      onChange={this.onChange}>
                    </Input>
                    <Label for="name"> City</Label>
                    <Input
                      type="cityAddress"
                      name="cityAddress"
                      id="cityAddress"
                      placeholder="city"
                      className="mb-3"
                      onChange={this.onChange}>
                    </Input>
                    <Label for="name"> State</Label>
                    <Input
                      type="stateAddress"
                      name="stateAddress"
                      id="stateAddress"
                      placeholder="state"
                      className="mb-3"
                      onChange={this.onChange}>
                    </Input>
                    <Label for="name"> Zip Code</Label>
                    <Input
                      type="zipcode"
                      name="zipcode"
                      id="zipcode"
                      placeholder="zipcode"
                      className="mb-3"
                      onChange={this.onChange}>
                    </Input>
                    <Button
                      color="dark"
                      style={{ marginTop: '2rem' }}
                      block
                      onClick={this.onSubmit}>
                      Place your order
                    </Button>
                  </FormGroup>
                </Form>
              </Container>
            </ModalBody>
          </Modal>
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  guest: state.guest
})

export default connect(mapStateToProps, { loadGuest })(ShippingAddressModal);
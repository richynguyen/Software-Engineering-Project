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
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

// small login pic
var sectionStyle = {
  backgroundImage: 'url(https://images2.alphacoders.com/119/119342.jpg)',
  backgroundSize: 'contain',
  height: '100px',
  width: '-50px'
}

class LoginModal extends Component {
  state = {
    modal: false,                  // represents if the modal is open or not
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props
    if (error != prevProps.error) {
      // Check for register error
      if (error.id == 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    // If the user is authenticated then close the modal
    if (this.state.modal == true) {
      if (isAuthenticated) {
        this.toggle();
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

    const { email, password } = this.state;  // from component state, meaning whatever is filled in the fields on the UI

    const user = {
      email,
      password
    }

    // Attempt to login
    this.props.login(user);

  };

  render() {
    return (
      <div className="LoginModal" style={sectionStyle}>
        <NavLink onClick={this.toggle} href="#">
          Login
        </NavLink>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
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

                <Button
                  color="dark"
                  style={{ marginTop: '2rem' }}
                  block
                >
                  Login
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

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
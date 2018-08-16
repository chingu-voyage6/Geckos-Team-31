import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import $ from 'jquery';
import { authorizeUser } from '../actions';
import Form from './_common/Form';
import Input from './_common/Input';
import Button from './_common/Button';

const customModalStyles = {
  content: {
    height: '300px',
    width: '400px',
  },
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoginView: true,
      isSignUpModalOpen: false,
      username: '',
      email: '',
    };
  }

  componentDidMount() {
    const { dispatch, history } = this.props;
    const token = localStorage.getItem('user');
    if (token) {
      dispatch(authorizeUser({ token }))
        .then((response) => {
          if (response) {
            history.push('/talk');
          }
        });
    }
  }

  userSignUp() {
    const email = document.querySelector('[name="email"]').value;
    const username = document.querySelector('[name="username"]').value;
    const password = document.querySelector('[name="password"]').value;
    const passwordConf = document.querySelector('[name="passwordConf"]').value;
    fetch('/api/register', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        email,
        username,
        password,
        passwordConf,
      }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .catch(error => console.log(error.reason))
      .then((response) => {
        this.setState({
          username: response.user.username,
          email: response.user.email,
        }, () => this.setState({
          isSignUpModalOpen: true,
        }));
      });
  };

  userLogin() {
    const { history, dispatch } = this.props;
    const email = document.querySelector('[name="emailLogin"]').value;
    const password = document.querySelector('[name="passwordLogin"]').value;
    return fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .catch(() => console.log('Login Failed'))
      .then((res) => {
        if (res) {
          localStorage.setItem('user', res.token);
          dispatch(authorizeUser({ token: res.token }))
            .then(() => history.push('/talk'));
        }
      });
  }


  switchView() {
    const { isLoginView } = this.state;
    if (isLoginView) {
      const form = $('#log-in-form');
      form[0].reset();
    } else {
      const form = $('#sign-up-form');
      form[0].reset();
    }
    this.setState({
      isLoginView: !isLoginView,
    });
  }

  closeSignUpModal() {
    this.switchView();
    this.setState({
      isSignUpModalOpen: false,
    });
  }

  renderSignUpModal() {
    const { username, isSignUpModalOpen } = this.state;
    return (
      <Modal
        ariaHideApp={false}
        isOpen={isSignUpModalOpen}
        onRequestClose={this.closeSignUpModal}
        contentLabel="You have succesfully signed up!"
        style={customModalStyles}
      >
        <div className="Modal--closeBar" />
        <div className="ModalBody">
          <h3>
          Welcome {username}
          </h3>
          <p>
          Thanks for signing up for Talk Board. Log in to get started
          </p>
          <Button
            label="Log in"
            theme="success"
            onClick={() => this.closeSignUpModal()}
          />
        </div>
      </Modal>
    )
  }


  render() {
    const { isLoginView, email } = this.state;
    return (
      <div className="Login">
        <div className="Login--form">
          <h1>
            Talk Board
          </h1>
          {!isLoginView
            ? (
              <Form id="sign-up-form">
                <Input
                  label="Email address"
                  name="email"
                  type="text"
                  defaultValue={email || null}
                />
                <Input
                  label="Username"
                  name="username"
                  type="text"
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                />
                <Input
                  label="Confirm password"
                  name="passwordConf"
                  type="password"
                />
                <Button
                  label="Create account"
                  onClick={() => this.userSignUp()}
                />
                <Button
                  label="Already have an account?"
                  onClick={() => this.switchView()}
                  theme="link"
                />
              </Form>
            )
            : (
              <Form id="log-in-form">
                <Input
                  label="Email address"
                  name="emailLogin"
                  type="text"
                />
                <Input
                  label="Password"
                  name="passwordLogin"
                  type="password"
                />
                <Button
                  label="Log in"
                  onClick={() => this.userLogin()}

                />
                <Button
                  label="Need to sign up?"
                  onClick={() => this.switchView()}
                  theme="link"
                />
              </Form>)}
          {this.renderSignUpModal()}
        </div>
      </div>);
  }
}

Login.propTypes = {
  // eslint-disable-next-line
  history: PropTypes.object,
  dispatch: PropTypes.func,
};

Login.defaultProps = {
  history: undefined,
  dispatch: undefined,
};
export default connect()(Login);

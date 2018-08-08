import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authorizeUser } from '../actions';
import Form from './_common/Form';
import Input from './_common/Input';
import Button from './_common/Button';
import Header from './_common/Header';


const userSignUp = () => {
  const username = document.querySelector('[name="username"]').value;
  const email = document.querySelector('[name="email"]').value;
  const password = document.querySelector('[name="password"]').value;
  const passwordConf = document.querySelector('[name="passwordConf"]').value;
  fetch('/api/register', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify({
      username,
      email,
      password,
      passwordConf,
    }), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
    .catch(error => console.log(error.reason))
    .then(response => console.log(response));
};

class Login extends React.Component {
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

  userLogin() {
    const { history, dispatch } = this.props;
    const username = document.querySelector('[name="usernameLogin"]').value;
    const password = document.querySelector('[name="passwordLogin"]').value;
    return fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
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

  render() {
    return (
      <div className="Login">
        <Form id="sign-up" onSubmit={() => userSignUp()}>
          <Header
            heading="Sign up"
          />
          <Input
            label="Email"
            name="email"
            type="text"
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
            label="Password confirm"
            name="passwordConf"
            type="password"
          />
          <Button
            label="Sign up"
            type="submit"
          />
        </Form>
        <Form id="sign-up" onSubmit={() => this.userLogin()}>
          <Header
            heading="Log in"
          />
          <Input
            label="Username"
            name="usernameLogin"
            type="text"
          />
          <Input
            label="Password"
            name="passwordLogin"
            type="password"
          />
          <Button
            label="Sign up"
            type="submit"
          />
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  // eslint-disable-next-line
  history: PropTypes.object,
};

Login.defaultProps = {
  history: undefined,

};

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

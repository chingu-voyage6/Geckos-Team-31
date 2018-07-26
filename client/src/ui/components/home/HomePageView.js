import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../_common/NavBar';
import Form from '../_common/Form';
import Input from '../_common/Input';
import Button from '../_common/Button';

const userSignUp = () => {
  const username = document.querySelector('[name="username"]').value;
  const email = document.querySelector('[name="email"]').value;
  const password = document.querySelector('[name="password"]').value;
  const passwordConf = document.querySelector('[name="passwordConf"]').value;
  console.log(username)
  fetch('/api/sign-up', {
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
    .catch(error => console.log(error))
    .then(response => console.log(response));

};

class HomePageView extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="HomePageView">
        <NavBar />
        <Form id="sign-up" onSubmit={() => userSignUp()}>
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

      </div>
    );
  }
}

HomePageView.propTypes = {

};

HomePageView.defaultProps = {

};

export default HomePageView;

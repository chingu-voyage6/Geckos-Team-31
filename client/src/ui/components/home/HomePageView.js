import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../_common/NavBar';
import Button from '../_common/Button';

const logout = (userId) => {
  fetch('/api/logout', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify({
      userId,
    }), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const HomePageView = props => (
  <div className="HomePageView">
    <NavBar />
    <Button
      onClick={() => logout(props.userId)}
      label="Logout"
    />
  </div>
);


HomePageView.propTypes = {
  userId: PropTypes.string,
};

HomePageView.defaultProps = {
  userId: undefined,
};

export default HomePageView;

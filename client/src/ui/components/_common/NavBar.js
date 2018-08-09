/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearUser } from '../../actions';

const NavBar = (props) => {
  const logout = () => {
    const { history, dispatch } = props;
    const token = localStorage.getItem('user');
    fetch('/api/logout', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    })
      .then(res => res.json(res))
      .then(() => {
        localStorage.clear();
        dispatch(clearUser());
        history.push('/');
      })
      .catch(error => console.log(error));
  };
  return (
    <div className="NavBar">
      <Link
        to="/talk"
      >
      Talk board
      </Link>
      <Link
        to="/add-images"
      >
      Add images
      </Link>
      <a
        onClick={() => logout()}
      >
      Log out
      </a>
    </div>
  );
};

NavBar.propTypes = {
  // eslint-disable-next-line
  history: PropTypes.object,
  dispatch: PropTypes.func,

};

NavBar.defaultProps = {
  dispatch: undefined,
  history: undefined,
};

export default connect()(NavBar);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearUser } from '../../actions';
import NavBar from '../_common/NavBar';
import Button from '../_common/Button';


const HomePageView = (props) => {
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
    <div className="HomePageView">
      <NavBar />
      <Button
        onClick={() => logout()}
        label="Logout"
      />
    </div>
  );
};


HomePageView.propTypes = {
  // eslint-disable-next-line
  history: PropTypes.object,
  dispatch: PropTypes.func,
};

HomePageView.defaultProps = {
  history: undefined,
  dispatch: undefined,
};

export default connect()(HomePageView);

import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../_common/NavBar';
import Button from '../_common/Button';

const HomePageView = (props) => {
  const logout = () => {
    const { history } = props;
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
};

HomePageView.defaultProps = {
  history: undefined,
};

export default HomePageView;

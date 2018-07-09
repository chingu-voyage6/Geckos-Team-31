import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../_common/NavBar';


class HomePageView extends React.Component {

  render() {
    return (
      <div className="HomePageView">
      <NavBar />
      
      </div>
    );
  }
}

HomePageView.propTypes = {

};

HomePageView.defaultProps = {

};

export default HomePageView;

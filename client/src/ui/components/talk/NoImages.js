import React from 'react';
import PropTypes from 'prop-types';

class NoImages extends React.Component {

  render() {
    return (
      <div className="NoCurrentImage">
        <h2>Sorry! No images here.</h2>
        <p>Try adding images or creating a category!</p>
      </div>
    );
  }
}

NoImages.propTypes = {

};

NoImages.defaultProps = {

};

export default NoImages;

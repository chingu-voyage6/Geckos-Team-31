import React from 'react';
import PropTypes from 'prop-types';
import Header from '../_common/Header';


const ImageGallery = (props) => {
  const { gallery } = props;
  return (
    <div className="ImageGallery">
      <Header
        heading="Add images from gallery"
        size="large"
      />
      <div className="ImageGallery--images">
        {gallery.map(image => <img src={image} alt={image} key={image} />)}
      </div>
    </div>
  );
};


ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.string),
};

ImageGallery.defaultProps = {
  gallery: undefined,
};

export default ImageGallery;

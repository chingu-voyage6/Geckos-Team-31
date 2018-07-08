import React from 'react';
import PropTypes from 'prop-types';
import ImageCard from '../_common/ImageCard';


const ImageGallery = (props) => {
  const { gallery } = props;
  return (
    <div className="ImageGallery">
      {gallery.map(image => <img src={image} alt={image} />)}
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

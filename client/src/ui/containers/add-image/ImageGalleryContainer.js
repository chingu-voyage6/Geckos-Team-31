import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from '../../components/add-image/ImageGallery';
import getGallery from '../../../modules/get-gallery';

// HOC or Container Component, gets the data to display in the core componenet

const ImageGalleryContainer = (props) => {
  const gallery = getGallery();
  const {
    toggleBackgroundFade,
  } = props;
  return (
    <ImageGallery
      gallery={gallery}
      toggleBackgroundFade={toggleBackgroundFade}
    />);
};

ImageGalleryContainer.propTypes = {
  toggleBackgroundFade: PropTypes.func,
};

ImageGalleryContainer.defaultProps = {
  toggleBackgroundFade: undefined,
};

export default ImageGalleryContainer;

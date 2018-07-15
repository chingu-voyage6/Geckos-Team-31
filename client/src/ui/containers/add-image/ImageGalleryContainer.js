import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from '../../components/add-image/ImageGallery';
import handleGetGallery from '../../../modules/handle-get-gallery';

// HOC or Container Component, gets the data to display in the core componenet

class ImageGalleryContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      gallery: [],
    };
  }

  componentDidMount() {
    handleGetGallery()
      .then((response) => {
        this.setState({
          gallery: response,
        });
      })
      .catch(error => error);
  }

  render() {
    const {
      toggleBackgroundFade,
    } = this.props;
    const { gallery } = this.state;
    return (
      <ImageGallery
        gallery={gallery}
        toggleBackgroundFade={toggleBackgroundFade}
      />);
  }
}

ImageGalleryContainer.propTypes = {
  toggleBackgroundFade: PropTypes.func,
};

ImageGalleryContainer.defaultProps = {
  toggleBackgroundFade: undefined,
};

export default ImageGalleryContainer;

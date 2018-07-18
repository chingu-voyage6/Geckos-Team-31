import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from '../../components/add-image/ImageGallery';
import handleGetGallery from '../../../modules/handle-get-gallery';
import handleGetUserGallery from '../../../modules/handle-get-user-gallery';
import userId from '../../../testData';
// HOC or Container Component, gets the data to display in the core componenet

class ImageGalleryContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      gallery: [],
      userGallery: [],
    };
  }

  componentDidMount() {
    handleGetGallery()
      .then((response) => {
        this.setState({
          gallery: response,
        });
      })
      .catch(error => console.log(error));
    handleGetUserGallery({ userId: userId() })
      .then((response) => {
        this.setState({
          userGallery: response,
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const {
      toggleBackgroundFade,
    } = this.props;
    const { gallery, userGallery } = this.state;
    console.log(userGallery.length)
    return (
      <ImageGallery
        key={userGallery.length}
        gallery={gallery}
        userGallery={userGallery}
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

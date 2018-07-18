/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

class GalleryImage extends React.Component {
  constructor(props) {
    super(props);
    const { isOwnedByUser } = this.props;
    this.state = {
      isOwnedByUser,
    };
  }

  render() {
    const { isOwnedByUser } = this.state;
    const { image, openImageModal, removeImage } = this.props;
    return (
      <div
        className={isOwnedByUser ? 'ImageGallery--user-image' : 'ImageGallery--image'}
        onClick={!isOwnedByUser ? () => openImageModal(image) : () => removeImage(image)}
        key={image}
      >
        <img
          src={image}
          alt={image}
        />
      </div>
    );
  }
}

GalleryImage.propTypes = {
  image: PropTypes.string,
  isOwnedByUser: PropTypes.bool,
  openImageModal: PropTypes.func,
  removeImage: PropTypes.func,
};

GalleryImage.defaultProps = {
  image: undefined,
  isOwnedByUser: false,
  openImageModal: undefined,
  removeImage: undefined,
};

export default GalleryImage;

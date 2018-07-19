/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Modal from 'react-modal';
import _ from 'underscore';
import PropTypes from 'prop-types';
import GalleryImage from './GalleryImage';
import userId from '../../../testData';
import handleAddImage from '../../../modules/handle-add-image';
import handleRemoveImage from '../../../modules/handle-remove-image';
import Header from '../_common/Header';
import Form from '../_common/Form';
import Input from '../_common/Input';
import Button from '../_common/Button';


class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    const { userGallery } = this.props;
    this.state = {
      isAddImageModalOpen: false,
      currentImage: '',
      userGallery,
    };
    this.openImageModal = this.openImageModal.bind(this);
    this.closeImageModal = this.closeImageModal.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }

  openImageModal(image) {
    this.setState({
      isAddImageModalOpen: true,
      currentImage: image,
    });
  }

  closeImageModal() {
    this.setState({
      isAddImageModalOpen: false,
      currentImage: '',
    });
  }

  removeImage(image) {
    const { userGallery } = this.state;
    console.log(image)
    handleRemoveImage({ image, userId: userId() })
    .then(() => {
      const newUserGallery = _.without(userGallery, image);
    this.setState({
      userGallery: newUserGallery,
    })
  })
    .catch(error => console.log(error));
  }


  addImage() {
    const { currentImage, userGallery } = this.state;
    // const { userId } = this.props;
    const category = document.querySelector('[name="categoryName"]').value;
    console.log(currentImage)
    handleAddImage({ image: currentImage, category, userId: userId() })
      .then((response) => {
        const newUserGallery = userGallery;
        newUserGallery.push(response.fileName)
        this.setState({
          userGallery: newUserGallery,
        })
        console.log(`You add the image: ${response.image}`);
        this.closeImageModal();
      })
      .catch(error => console.log(error));
  }

  renderAddImageModal() {
    const { isAddImageModalOpen, currentImage } = this.state;
    return (
      <Modal
        isOpen={isAddImageModalOpen}
        onRequestClose={this.closeImageModal}
        className="Modal"
        contentLabel="Add Image Details"
        shouldCloseOnOverlayClick
        ariaHideApp={false}
      >
        <div
          className="AddImageModal"
        >
          <img src={currentImage} alt={currentImage} />
          <Form id="add-image">
            <Input
              type="text"
              name="categoryName"
              label="Category Name"
            />
            <Button
              label="Add Image"
              onClick={() => this.addImage()}
            />
          </Form>
        </div>
      </Modal>
    );
  }


  render() {
    const { gallery } = this.props;
    const { userGallery } = this.state;
    return (
      <div className="ImageGallery">
        <Header
          heading="Add images from gallery"
          size="large"
        />
        <div className="ImageGallery--images">
          {gallery.map((image) => {
            let isOwnedByUser = false;
            if (_.contains(userGallery, image)) {
              isOwnedByUser = true;
            }
            return (
              <GalleryImage
                key={image + isOwnedByUser}
                image={image}
                isOwnedByUser={isOwnedByUser}
                removeImage={this.removeImage}
                openImageModal={this.openImageModal}
              />);
          })}
        </div>
        {this.renderAddImageModal()}
      </div>
    );
  }
}


ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.string),
  userGallery: PropTypes.arrayOf(PropTypes.string),
};

ImageGallery.defaultProps = {
  gallery: undefined,
  userGallery: undefined,
};

export default ImageGallery;

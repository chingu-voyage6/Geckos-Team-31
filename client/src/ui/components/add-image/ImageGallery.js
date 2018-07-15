/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import $ from 'jquery';
import handleAddImage from '../../../modules/handle-add-image';
import Header from '../_common/Header';
import Form from '../_common/Form';
import Input from '../_common/Input';
import Button from '../_common/Button';


class ImageGallery extends React.Component {
  constructor() {
    super();
    this.state = {
      isAddImageModalOpen: false,
      currentImage: '',
    };
    this.openImageModal = this.openImageModal.bind(this);
    this.closeImageModal = this.closeImageModal.bind(this);
  }

  componentDidMount() {

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

  addImage() {
    const { currentImage } = this.state;
    // const { userId } = this.props;
    const userId = '5b4b31cc5e0d13fa72316796';
    const category = document.querySelector('[name="categoryName"]').value;
    handleAddImage({ image: currentImage, category, userId })
      .then((response) => {
        console.log(response);
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
    return (
      <div className="ImageGallery">
        <Header
          heading="Add images from gallery"
          size="large"
        />
        <div className="ImageGallery--images">
          {gallery.map(image => (
            <div
              className="ImageGallery--image"
              onClick={() => this.openImageModal(image)}
              key={image}
            >
              <img
                src={image}
                alt={image}
              />
            </div>))}
        </div>
        {this.renderAddImageModal()}
      </div>
    );
  }
}


ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.string),
};

ImageGallery.defaultProps = {
  gallery: undefined,
};

export default ImageGallery;

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
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
          <Form>
            <Input
              type="text"
              label="Category Name"
            />
            <Button
              label="Add Image"
              isSubmit
            />
          </Form>
        </div>
      </Modal>
    );
  }


  render() {
    const { gallery } = this.props;
    // const { userId } = this.props;
    const userId = '5b4b31cc5e0d13fa72316796';
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

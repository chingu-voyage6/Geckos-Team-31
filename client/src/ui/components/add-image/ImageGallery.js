/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Modal from 'react-modal';
import _ from 'underscore';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GalleryImage from './GalleryImage';
import userId from '../../../testData';
import { loadCategories, loadUserGallery } from '../../actions';
import handleAddImage from '../../../modules/handle-add-image';
import handleAddCategory from '../../../modules/handle-add-category';
import handleRemoveImage from '../../../modules/handle-remove-image';
import handleRemoveCategory from '../../../modules/handle-remove-category';
import Select from '../_common/Select';
import Header from '../_common/Header';
import Form from '../_common/Form';
import Input from '../_common/Input';
import Button from '../_common/Button';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddImageModalOpen: false,
      currentImage: '',
      isUpdateCategoryModalOpen: false,
    };
    this.openImageModal = this.openImageModal.bind(this);
    this.closeImageModal = this.closeImageModal.bind(this);
    this.closeUpdateCategoryModal = this.closeUpdateCategoryModal.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }

  openUpdateCategoryModal() {
    this.setState({
      isUpdateCategoryModalOpen: true,
    });
  }

  closeUpdateCategoryModal() {
    this.setState({
      isUpdateCategoryModalOpen: false,
    });
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
    const { dispatch } = this.props;
    handleRemoveImage({ image, userId: userId() })
      .then(() => {
        dispatch(loadUserGallery());
      })
      .catch(error => console.log(error));
  }

  removeCategory() {
    const { dispatch } = this.props;
    const category = document.querySelector('[name="removeCategory"]').value;
    handleRemoveCategory({ category, userId: userId() })
      .then((response) => {
        console.log(`Category ${response} removed`)
        dispatch(loadCategories());
        this.closeUpdateCategoryModal();
      })
      .catch(error => console.log(error));
  }

  addCategory() {
    // const { userId } = this.props;
    const { dispatch } = this.props;
    const category = document.querySelector('[name="categoryName"]').value;
    handleAddCategory({ category, userId: userId() })
      .then((response) => {
        this.closeUpdateCategoryModal();
        dispatch(loadCategories());
        console.log(`You added the category: ${response}`);
      })
      .catch(error => console.log(error));
  }


  addImage() {
    const { currentImage } = this.state;
    const { dispatch } = this.props;
    // const { userId } = this.props;
    const category = document.querySelector('[name="categoryName"]').value;
    handleAddImage({ image: currentImage, category, userId: userId() })
      .then((response) => {
        this.closeImageModal();
        dispatch(loadUserGallery());
        console.log(`You added the image: ${response.fileName}`);
      })
      .catch(error => console.log(error));
  }

  renderUpdateCategoryModal() {
    const { isUpdateCategoryModalOpen } = this.state;
    const { categories } = this.props;
    return (
      <Modal
        isOpen={isUpdateCategoryModalOpen}
        onRequestClose={this.closeUpdateCategoryModal}
        className="Modal"
        contentLabel="Add Image Details"
        shouldCloseOnOverlayClick
        ariaHideApp={false}
      >
        <div
          className="UpdateCategoryModal"
        >
          <Form id="add-category">
            <p>
              Add new
            </p>
            <Input
              type="text"
              name="categoryName"
              label="Category Name"
            />
            <Button
              label="Add category"
              onClick={() => this.addCategory()}
            />
          </Form>
          <Form id="remove-category">
            <p>
              Remove category
            </p>
            <Select name="removeCategory">
              {categories ? categories.map(category => (
                <option value={category} key={category}>
                  {category}
                </option>
              )) : null}
            </Select>
            <Button
              label="Remove category"
              onClick={() => this.removeCategory()}
            />
          </Form>
        </div>
      </Modal>
    );
  }

  renderAddImageModal() {
    const { isAddImageModalOpen, currentImage } = this.state;
    const { categories } = this.props;
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
          <Select
            label="Select a category"
            name="categoryName"
          >
            {categories ? categories.map(category => (
              <option
                value={category}
                key={category}
              >
                {category}
              </option>
            )) : null}
          </Select>
          <Form id="add-image">
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
    const { gallery, userGallery } = this.props;
    return (
      <div className="ImageGallery">
        <Header
          heading="Add images from gallery"
          size="large"
        />
        <Header
          heading="Add and remove category titles"
          size="small"
        />
        <Button
          label="Update Categories"
          onClick={() => this.openUpdateCategoryModal()}
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
        {this.renderUpdateCategoryModal()}
      </div>
    );
  }
}


ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.string),
  userGallery: PropTypes.arrayOf(PropTypes.string),
  categories: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func,
};

ImageGallery.defaultProps = {
  gallery: undefined,
  userGallery: undefined,
  categories: undefined,
  dispatch: undefined,
};

export default connect()(ImageGallery);

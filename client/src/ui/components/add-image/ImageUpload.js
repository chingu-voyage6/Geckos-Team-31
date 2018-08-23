import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../_common/Form';
import Select from '../_common/Select';
import Button from '../_common/Button';
import Header from '../_common/Header';
import handleAddImage from '../../../modules/handle-add-image';
import { loadUserGallery } from '../../actions';

class ImageUpload extends React.Component {
  addNewUserImage() {
    const { userId, closeUploadImageModal, dispatch } = this.props;
    const file = document.querySelector('[name="newImageFile"]').value;
    const category = document.querySelector('[name="imageCategory"]').value;
    const userSubmitted = true;
    handleAddImage({
      image: file, category, userId, userSubmitted,
    })
      .then(() => {
        dispatch(loadUserGallery({ userId }));
        closeUploadImageModal();
      })
      .catch(error => console.log(error));
  }

  render() {
    const { closeUploadImageModal, categories } = this.props;
    return (
      // eslint-disable-next-line
      <div className="ImageUpload">
        <Header
          heading="Upload your own image"
          size="large"
        />
        <Form id="upload-image-form">
          <Select
            name="imageCategory"
            label="Remove category"
          >
            {categories ? categories.map(category => (
              <option value={category} key={category}>
                {category}
              </option>
            )) : null}
          </Select>
          {/* eslint-disable-next-line */ }
          <input type="hidden" role="uploadcare-uploader" name="newImageFile" />
          <Button
            label="Submit file"
            theme="success"
            onClick={() => this.addNewUserImage()}
          />
          <Button
            label="Cancel"
            onClick={() => closeUploadImageModal()}
            theme="link"
            type="button"
          />
        </Form>
      </div>
    );
  }
}

ImageUpload.propTypes = {
  userId: PropTypes.string,
  closeUploadImageModal: PropTypes.func,
  dispatch: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.string),
};

ImageUpload.defaultProps = {
  userId: undefined,
  closeUploadImageModal: undefined,
  dispatch: undefined,
  categories: undefined,
};

export default connect()(ImageUpload);

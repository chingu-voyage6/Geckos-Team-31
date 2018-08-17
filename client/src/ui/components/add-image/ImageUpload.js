import React from 'react';
import PropTypes from 'prop-types';
import Form from '../_common/Form';
import Input from '../_common/Input';
import Button from '../_common/Button';
import Header from '../_common/Header';
import handleAddImage from '../../../modules/handle-add-image';

class ImageUpload extends React.Component {
  addNewUserImage() {
    const { userId } = this.props;
    const file = document.querySelector('[name="newImageFile"]').value;
    const category = document.querySelector('[name="imageCategory"]').value;
    const userSubmitted = true;
    handleAddImage({
      image: file, category, userId, userSubmitted,
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  render() {
    const { closeImageUploadModal } = this.props;
    return (
      // eslint-disable-next-line
      <div className="ImageUpload">
        <Header
          heading="Upload your own image"
          size="large"
        />
        <Form id="upload-image-form">
          <Input
            label="Image Category"
            name="imageCategory"
            type="text"
            className="Input--invert"
          />
          {/* eslint-disable-next-line */ }
          <input type="hidden" role="uploadcare-uploader" name="newImageFile" />
          <Button
            label="Submit file"
            theme="success"
            onClick={() => this.addNewUserImage()}
          />
          <Button
            label="Cancel"
            onClick={() => closeImageUploadModal()}
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
  closeImageUploadModal: PropTypes.func,
};

ImageUpload.defaultProps = {
  userId: undefined,
  closeImageUploadModal: undefined,
};

export default ImageUpload;

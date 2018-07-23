import React from 'react';
import PropTypes from 'prop-types';
import Form from '../_common/Form';
import Input from '../_common/Input';
import Button from '../_common/Button';
import Header from '../_common/Header';
import userId from '../../../testData';
import handleAddImage from '../../../modules/handle-add-image';

const addNewUserImage = () => {
  const file = document.querySelector('[name="newImageFile"]').value;
  const category = document.querySelector('[name="imageCategory"]').value;
  const userSubmitted = true;
  handleAddImage({
    image: file, category, userId: userId(), userSubmitted
  })
    .then(response => console.log(response))
    .catch(error => console.log(error));
};

class ImageUpload extends React.Component {
  render() {
    return (
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
          />
          <input type="hidden" role="uploadcare-uploader" name="newImageFile" />
          <Button
            label="Submit file"
            onClick={() => addNewUserImage()}
          />
        </Form>

      </div>
    );
  }
}

ImageUpload.propTypes = {

};

ImageUpload.defaultProps = {

};

export default ImageUpload;

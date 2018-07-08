import React from 'react';
import PropTypes from 'prop-types';
import Form from '../_common/Form';
import Input from '../_common/Input';
import Button from '../_common/Button';

class ImageUpload extends React.Component {

  render() {
    return (
      <div className="ImageUpload">
        <Form id ="upload-image-form">
          <h1>Upload your own image</h1>
          <Button
            label="Upload Image"
            theme="upload"
             />
          <Input
            label="Image Category"
            name="imageCategory"
            type="text"
            />
            <Input
              label="Image Name"
              name="imageName"
              type="text"
              />
            <Button
              theme="submit"
              label="Submit"
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

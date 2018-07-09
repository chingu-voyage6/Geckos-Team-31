import React from 'react';
import PropTypes from 'prop-types';
import Form from '../_common/Form';
import Input from '../_common/Input';
import Button from '../_common/Button';
import Header from '../_common/Header';

class ImageUpload extends React.Component {

  render() {
    return (
      <div className="ImageUpload">
        <Header
          heading="Upload your own image"
          size="large"
        />
        <Form id ="upload-image-form">
          <Button
            label="Upload Image"
            theme="list"
            type="file"
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
              theme="success"
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

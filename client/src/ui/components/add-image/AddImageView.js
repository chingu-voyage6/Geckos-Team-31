import React from 'react';
import NavBar from '../_common/NavBar';
import ImageGalleryContainer from '../../containers/add-image/ImageGalleryContainer';
import ImageUpload from './ImageUpload';

const AddImageView = props => (
  <div className="AddImageView--wrapper">
    <NavBar {...props} />
    <div className="AddImageView">
      <ImageGalleryContainer />
      <ImageUpload />
    </div>
  </div>
);

AddImageView.propTypes = {

};

AddImageView.defaultProps = {

};

export default AddImageView;

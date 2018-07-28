import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../_common/NavBar';
import ImageGalleryContainer from '../../containers/add-image/ImageGalleryContainer';
import ImageUpload from './ImageUpload';


const AddImageView = () => {
  return (
    <div className="AddImageView--wrapper">
      <NavBar />
      <div className="AddImageView">
        <ImageGalleryContainer />
        <ImageUpload />
      </div>
    </div>
  );
};

AddImageView.propTypes = {

};

AddImageView.defaultProps = {

};

export default AddImageView;

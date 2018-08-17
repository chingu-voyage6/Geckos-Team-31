import React from 'react';
import NavBar from '../_common/NavBar';
import ImageGalleryContainer from '../../containers/add-image/ImageGalleryContainer';

const AddImageView = props => (
  // eslint-disable-next-line
  <div className="AddImageView--wrapper">
    <NavBar {...props} />
    <div className="AddImageView">
      <ImageGalleryContainer />
    </div>
  </div>
);

AddImageView.propTypes = {

};

AddImageView.defaultProps = {

};

export default AddImageView;

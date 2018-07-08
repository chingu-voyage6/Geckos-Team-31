import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../_common/NavBar';
import ImageGalleryContainer from '../../containers/add-image/ImageGalleryContainer';
import ImageUpload from './ImageUpload';


class AddImageView extends React.Component {

  render() {
    return (
      <div className="AddImageView--wrapper">
      <NavBar />
      <div className="AddImageView">
      <ImageGalleryContainer />
      </div>
      <ImageUpload />
      </div>
    );
  }
}

AddImageView.propTypes = {

};

AddImageView.defaultProps = {

};

export default AddImageView;

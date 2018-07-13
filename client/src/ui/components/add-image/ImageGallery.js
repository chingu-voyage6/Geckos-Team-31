import fetch from 'isomorphic-fetch';
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../_common/Header';

class ImageGallery extends React.Component {
  constructor() {
    super();
    this.state = {
      gallery: [],
    };
  }

  componentDidMount() {
    fetch('/api/images')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then((response) => {
        this.setState({
          gallery: response,
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    const { gallery } = this.state;
    return (
      <div className="ImageGallery">
        <Header
          heading="Add images from gallery"
          size="large"
        />
        <div className="ImageGallery--images">
          {gallery.map(image => <img src={`${image}`} alt={image} key={image} />)}
        </div>
      </div>
    );
};
}


ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.string),
};

ImageGallery.defaultProps = {
  gallery: undefined,
};

export default ImageGallery;

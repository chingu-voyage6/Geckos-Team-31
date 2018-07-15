import fetch from 'isomorphic-fetch';
import React from 'react';
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
        });
      })
      .catch(error => console.log(error));
  }

  addImageToUserAccount(image) {
    const { gallery } = this.state;
    console.log(image)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/api/add-image-to-account', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        value: image,
    }));
    xhr.onload = (data)  => {
      console.log("HELLO")
      console.log(data.currentTarget.response);
  }

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
          {gallery.map(image => (
            <img
              onClick={() => this.addImageToUserAccount(image)}
              src={`${image}`}
              alt={image}
              key={image}
              />)
            )}
        </div>
      </div>
    );
  }
}


ImageGallery.propTypes = {
};

ImageGallery.defaultProps = {
};

export default ImageGallery;

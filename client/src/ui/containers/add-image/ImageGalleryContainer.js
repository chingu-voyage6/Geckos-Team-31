import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import ImageGallery from '../../components/add-image/ImageGallery';
import handleGetGallery from '../../../modules/handle-get-gallery';
import handleGetUserGallery from '../../../modules/handle-get-user-gallery';
import handleGetCategories from '../../../modules/handle-get-categories';
import userId from '../../../testData';
// HOC or Container Component, gets the data to display in the core componenet

class ImageGalleryContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      gallery: [],
      userGallery: [],
      categories: [],
    };
    this.updateNewImage = this.updateNewImage.bind(this);
    this.updateRemoveImage = this.updateRemoveImage.bind(this);
    this.updateNewCategory = this.updateNewCategory.bind(this);
    this.updateRemoveCategory = this.updateRemoveCategory.bind(this);
  }

  componentDidMount() {
    handleGetGallery()
      .then((response) => {
        this.setState({
          gallery: response,
        });
      })
      .catch(error => console.log(error));
    handleGetUserGallery({ userId: userId() })
      .then((response) => {
        this.setState({
          userGallery: response,
        });
      })
      .catch(error => console.log(error));
    handleGetCategories({ userId: userId() })
      .then((response) => {
        this.setState({
          categories: response.categories,
        });
      })
      .catch(error => console.log(error));
  }

  updateRemoveCategory(response) {
    const { categories } = this.state;
    const newCategories = categories.filter(category => category !== response);
    this.setState({
      categories: newCategories,
    });
  }


  updateNewCategory(response) {
    const { categories } = this.state;
    const newCategories = categories;
    categories.push(response);
    this.setState({
      categories: newCategories,
    });
  }

  updateRemoveImage(image) {
    const { userGallery } = this.state;
    const newUserGallery = _.without(userGallery, image);
    this.setState({
      userGallery: newUserGallery,
    });
  }

  updateNewImage(response) {
    const { userGallery } = this.state;
    const newUserGallery = userGallery;
    newUserGallery.push(response.fileName);
    this.setState({
      userGallery: newUserGallery,
    });
  }

  render() {
    const {
      toggleBackgroundFade,
    } = this.props;
    const { gallery, userGallery, categories } = this.state;
    return (
      <ImageGallery
        key={userGallery.length}
        gallery={gallery}
        userGallery={userGallery}
        toggleBackgroundFade={toggleBackgroundFade}
        categories={categories}
        updateNewImage={this.updateNewImage}
        updateRemoveImage={this.updateRemoveImage}
        updateNewCategory={this.updateNewCategory}
        updateRemoveCategory={this.updateRemoveCategory}
      />);
  }
}

ImageGalleryContainer.propTypes = {
  toggleBackgroundFade: PropTypes.func,
};

ImageGalleryContainer.defaultProps = {
  toggleBackgroundFade: undefined,
};

export default ImageGalleryContainer;

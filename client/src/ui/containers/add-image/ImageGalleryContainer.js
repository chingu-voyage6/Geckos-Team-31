import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUserGallery, loadCategories } from '../../actions';
import ImageGallery from '../../components/add-image/ImageGallery';
import handleGetGallery from '../../../modules/handle-get-gallery';
// HOC or Container Component, gets the data to display in the core componenet

const mapStateToProps = state => ({
  userGallery: state.userGallery,
  categories: state.categories,
  userId: state.userId,
});

class ImageGalleryContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      gallery: [],
    };
    // this.updateNewImage = this.updateNewImage.bind(this);
    // this.updateRemoveImage = this.updateRemoveImage.bind(this);
    // this.updateNewCategory = this.updateNewCategory.bind(this);
    // this.updateRemoveCategory = this.updateRemoveCategory.bind(this);
  }

  componentDidMount() {
    const { dispatch, userId } = this.props;
    handleGetGallery()
      .then((response) => {
        this.setState({
          gallery: response,
        });
      })
      .catch(error => console.log(error));
    dispatch(loadUserGallery({ userId }));
    dispatch(loadCategories({ userId }));
  }

  render() {
    const {
      toggleBackgroundFade,
      userGallery,
      categories,
    } = this.props;
    const { gallery } = this.state;
    return (
      <ImageGallery
        gallery={gallery}
        userGallery={userGallery}
        categories={categories}
        toggleBackgroundFade={toggleBackgroundFade}
      />);
  }
}

ImageGalleryContainer.propTypes = {
  toggleBackgroundFade: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.string),
  userGallery: PropTypes.arrayOf(PropTypes.string),
  userId: PropTypes.string,
  dispatch: PropTypes.func,
};

ImageGalleryContainer.defaultProps = {
  toggleBackgroundFade: undefined,
  categories: undefined,
  userGallery: undefined,
  userId: undefined,
  dispatch: undefined,
};

export default connect(mapStateToProps)(ImageGalleryContainer);

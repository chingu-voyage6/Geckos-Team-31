import React from 'react';
import PropTypes from 'prop-types';
import TalkBoardSelect from '../components/talk/TalkBoardSelect';
import handleGetCategoryImages from '../../modules/handle-get-category-images';

// HOC or Container Component, gets the data to display in the core componenet

class TalkBoardSelectContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryImages: [],
    };
  }

  componentDidMount() {
    const { category } = this.props;
    // const { userId } = this.props;
    const userId = '5b4b31cc5e0d13fa72316796';
    handleGetCategoryImages({ userId, category })
      .then((response) => {
        const images = [];
        response.images.forEach((image) => {
          if (image.category.toLowerCase() === category.toLowerCase()) {
            images.push(image.fileName);
          }
        });
        this.setState({
          categoryImages: images,
        });
      })
      .catch(error => error);
  }

  render() {
    const {
      toggleBackgroundFade,
    } = this.props;
    const { categoryImages } = this.state;
    return (
      <TalkBoardSelect
        categoryImages={categoryImages}
        toggleBackgroundFade={toggleBackgroundFade}
      />
    );
  }
}

TalkBoardSelectContainer.propTypes = {
  toggleBackgroundFade: PropTypes.func,
  category: PropTypes.string,
};

TalkBoardSelectContainer.defaultProps = {
  toggleBackgroundFade: undefined,
  category: undefined,
};

export default TalkBoardSelectContainer;

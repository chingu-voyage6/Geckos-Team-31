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
    const { category, userId } = this.props;
    handleGetCategoryImages({ userId, category })
      .then((response) => {
        this.setState({
          categoryImages: response,
        });
      })
      .catch(error => error);
  }

  render() {
    const {
      toggleBackgroundFade, category,
    } = this.props;
    const { categoryImages } = this.state;
    return (
      <TalkBoardSelect
        key={category}
        categoryImages={categoryImages}
        toggleBackgroundFade={toggleBackgroundFade}
      />
    );
  }
}

TalkBoardSelectContainer.propTypes = {
  toggleBackgroundFade: PropTypes.func,
  category: PropTypes.string,
  userId: PropTypes.string,
};

TalkBoardSelectContainer.defaultProps = {
  toggleBackgroundFade: undefined,
  category: undefined,
  userId: undefined,
};

export default TalkBoardSelectContainer;

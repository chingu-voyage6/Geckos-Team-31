import React from 'react';
import PropTypes from 'prop-types';
import ImageCard from '../_common/ImageCard';
import TalkBoardStory from './TalkBoardStory';

class TalkBoardSelect extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const {
      categoryImages,
      toggleBackgroundFade,
    } = this.props;
    return (
      <div
        className="TalkBoardSelect"
      >
        <div
          className="TalkBoardSelect--Images"
        >
          {categoryImages.map(image => (
            <ImageCard
              key={image}
              image={image}
              toggleBackgroundFade={toggleBackgroundFade}
              isStoryBoardItem={false}
            />))}
        </div>
        <TalkBoardStory />
      </div>
    );
  }
}

TalkBoardSelect.propTypes = {
  categoryImages: PropTypes.arrayOf(PropTypes.string),
  toggleBackgroundFade: PropTypes.func,
};

TalkBoardSelect.defaultProps = {
  categoryImages: undefined,
  toggleBackgroundFade: undefined,
};

export default TalkBoardSelect;

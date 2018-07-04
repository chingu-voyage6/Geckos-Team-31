import React from 'react';
import PropTypes from 'prop-types';
import ImageCard from './ImageCard';
import TalkBoardStory from './TalkBoardStory';

class TalkBoardSelect extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const {
      images,
      toggleBackgroundFade,
    } = this.props;
    return (
      <div
        className="TalkBoardSelect"
      >
        <div
          className="TalkBoardSelect--Images"
        >
          {images.map(image => (
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
  images: PropTypes.arrayOf(PropTypes.string),
  toggleBackgroundFade: PropTypes.func,
};

TalkBoardSelect.defaultProps = {
  images: undefined,
  toggleBackgroundFade: undefined,
};

export default TalkBoardSelect;

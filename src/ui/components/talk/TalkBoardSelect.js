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
      onDrop,
      onDragOver,
      onDragStart,
      onDropOverImage,
      removeImageFromBoard,
      images,
      toggleBackgroundFade,
    } = this.props;
    return (
      <div className="TalkBoardSelect">
        <div className="TalkBoardSelect--Images">
          {images.map(image => (
            <ImageCard
              key={image}
              image={image}
              onDragStart={onDragStart}
              toggleBackgroundFade={toggleBackgroundFade}
            />))}
        </div>
        <TalkBoardStory
          onDragOver={onDragOver}
          onDrop={onDrop}
          onDragStart={onDragStart}
          onDropOverImage={onDropOverImage}
          removeImageFromBoard={removeImageFromBoard}
        />
      </div>
    );
  }
}

TalkBoardSelect.propTypes = {
  onDrop: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragStart: PropTypes.func,
  onDropOverImage: PropTypes.func,
  removeImageFromBoard: PropTypes.func,
  images: PropTypes.arrayOf(PropTypes.string),
  toggleBackgroundFade: PropTypes.func,
};

TalkBoardSelect.defaultProps = {
  onDrop: undefined,
  onDragOver: undefined,
  onDropOverImage: undefined,
  onDragStart: undefined,
  removeImageFromBoard: undefined,
  images: undefined,
  toggleBackgroundFade: undefined,
};

export default TalkBoardSelect;

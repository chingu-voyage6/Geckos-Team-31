import React from 'react';
import PropTypes from 'prop-types';
import ImageCard from './ImageCard';
import TalkBoardStory from './TalkBoardStory';

// test images


class TalkBoardSelect extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const {
      onDragLeave,
      onDrop,
      onDragOver,
      onDragStart,
      onDropOverImage,
      removeImageFromBoard,
      images,
    } = this.props;
    return (
      <div className="TalkBoardSelect">
        <div className="TalkBoardSelect--Images">
          {images.map(image => (
            <ImageCard
              key={image}
              image={image}
              onDragStart={onDragStart}
            />))}
        </div>
        <TalkBoardStory
          onDragOver={onDragOver}
          onDrop={onDrop}
          onDragStart={onDragStart}
          onDragLeave={onDragLeave}
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
  onDragLeave: PropTypes.func,
  onDropOverImage: PropTypes.func,
  removeImageFromBoard: PropTypes.func,
  images: PropTypes.arrayOf(PropTypes.string),
};

TalkBoardSelect.defaultProps = {
  onDrop: undefined,
  onDragOver: undefined,
  onDropOverImage: undefined,
  onDragStart: undefined,
  onDragLeave: undefined,
  removeImageFromBoard: undefined,
  images: undefined,
};

export default TalkBoardSelect;

import React from 'react';
import PropTypes from 'prop-types';
import ImageCard from './ImageCard';
import StoryBoardContext from './StoryBoardContext';

// Test images
const TalkBoardStory = (props) => {
  const {
    onDragOver,
    onDrop,
    onDragStart,
    onDropOverImage,
    dragInProcess,
    removeImageFromBoard,
  } = props;
  return (
    <div
      className="TalkBoardStory"
      droppable="true"
      onDragOver={e => onDragOver({ e })}
      onDrop={e => onDrop({ e })}
    >
      <StoryBoardContext.Consumer>
        {state => (
          state.storyBoard.map(image => (
            <ImageCard
              key={image}
              image={image}
              onDragStart={onDragStart}
              dragInProcess={dragInProcess}
              onDropOverImage={onDropOverImage}
              removeImageFromBoard={removeImageFromBoard}
            />)))}
      </StoryBoardContext.Consumer>
    </div>
  );
};

TalkBoardStory.propTypes = {
  onDragOver: PropTypes.func,
  onDrop: PropTypes.func,
  onDragStart: PropTypes.func,
  dragInProcess: PropTypes.bool,
  onDropOverImage: PropTypes.func,
  removeImageFromBoard: PropTypes.func,
};

TalkBoardStory.defaultProps = {
  onDragOver: undefined,
  onDrop: undefined,
  onDragStart: undefined,
  dragInProcess: undefined,
  onDropOverImage: undefined,
  removeImageFromBoard: undefined,
};


export default TalkBoardStory;

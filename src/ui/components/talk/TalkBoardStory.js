import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import PropTypes from 'prop-types';
import ImageCard from './ImageCard';

// Test images
class TalkBoardStory extends React.Component {
  onDrop({ e }) {
    const { dispatch, storyBoard } = this.props;
    const image = e.dataTransfer.getData('text');
    const duplicate = _.contains(storyBoard, image);
    if (!duplicate && storyBoard.length < 3) {
      dispatch({ type: 'STORYBOARD__ADD-IMAGE', image });
    }
  }

  render() {
    const {
      onDragOver,
      onDragStart,
      onDropOverImage,
      dragInProcess,
      removeImageFromBoard,
      storyBoard,
    } = this.props;
    return (
      <div className="TalkBoardStory--wrapper">
        <div
          className="TalkBoardStory"
          droppable="true"
          onDragOver={e => onDragOver({ e })}
          onDrop={e => this.onDrop({ e })}
        >
          {storyBoard.map(image => (
            <ImageCard
              key={image}
              image={image}
              onDragStart={onDragStart}
              dragInProcess={dragInProcess}
              onDropOverImage={onDropOverImage}
              removeImageFromBoard={removeImageFromBoard}
            />))}
        </div>
      </div>
    );
  }
}


TalkBoardStory.propTypes = {
  onDragOver: PropTypes.func,
  onDragStart: PropTypes.func,
  dragInProcess: PropTypes.bool,
  onDropOverImage: PropTypes.func,
  removeImageFromBoard: PropTypes.func,
  storyBoard: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func,
};

TalkBoardStory.defaultProps = {
  onDragOver: undefined,
  onDragStart: undefined,
  dragInProcess: undefined,
  onDropOverImage: undefined,
  removeImageFromBoard: undefined,
  storyBoard: undefined,
  dispatch: undefined,
};

const mapStateToProps = state => ({
  storyBoard: state.storyBoard,
});

export default connect(mapStateToProps)(TalkBoardStory);

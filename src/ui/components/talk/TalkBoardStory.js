import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import PropTypes from 'prop-types';
import ImageCard from './ImageCard';
import StoryBoardContext from './StoryBoardContext';




// Test images
class TalkBoardStory extends React.Component {
  constructor(props) {
    super(props);
  }

  onDrop({ e }) {
    const { dispatch, state } = this.props;
    const image = e.dataTransfer.getData('text');
    console.log(image)
    const duplicate = _.contains(state.storyBoard, image);
    if (!duplicate && state.storyBoard.length < 3) {
      dispatch({ type: 'STORYBOARD__ADD-IMAGE', image });
      // const newBoard = storyBoard;
      // newBoard.push(image);
      // this.setState({
      //   storyBoard: newBoard,
      // });
    }
  }

  render() {
    const {
      onDragOver,
      onDragStart,
      onDropOverImage,
      dragInProcess,
      removeImageFromBoard,
      state,
    } = this.props;
    console.log(state.storyBoard);
    return (
    <div className="TalkBoardStory--wrapper">
      <div
        className="TalkBoardStory"
        droppable="true"
        onDragOver={e => onDragOver({ e })}
        onDrop={e => this.onDrop({ e })}
      >
        {state.storyBoard.map(image => (
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
  state,
});

export default connect(mapStateToProps)(TalkBoardStory);

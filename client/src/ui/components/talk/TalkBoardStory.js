import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import PropTypes from 'prop-types';
import ImageCard from '../_common/ImageCard';

const mapStateToProps = state => ({
  storyBoard: state.storyBoard,
});

const onDragOver = ({ e }) => {
  e.preventDefault();
};


class TalkBoardStory extends React.Component {
  onDrop({ e }) {
    const { dispatch, storyBoard } = this.props;
    const image = e.dataTransfer.getData('text');
    const duplicate = _.contains(storyBoard, image);
    if (!duplicate && storyBoard.length < 4) {
      dispatch({ type: 'STORYBOARD__ADD-IMAGE', image });
    }
  }

  render() {
    const {
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
              isStoryBoardItem
            />))}
          <div className="TalkBoardStory--bar" />
        </div>
      </div>
    );
  }
}


TalkBoardStory.propTypes = {
  storyBoard: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func,
};

TalkBoardStory.defaultProps = {
  storyBoard: undefined,
  dispatch: undefined,
};

export default connect(mapStateToProps)(TalkBoardStory);

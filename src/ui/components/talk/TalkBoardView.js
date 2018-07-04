import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import TalkBoardSelectContainer from '../../containers/TalkBoardSelectContainer';
import CategoriesList from './CategoriesList';
import StoryBoardContext from './StoryBoardContext';
import getCategories from '../../../modules/get-categories';


const onDragStart = ({ e, image }) => {
  e.dataTransfer.setData('text/plain', image);
};

const onDragOver = ({ e }) => {
  e.preventDefault();
};


class TalkBoardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storyBoard: [],
      category: getCategories()[0].toLowerCase(),
      fadeBackground: false,
    };
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDropOverImage = this.onDropOverImage.bind(this);
    this.removeImageFromBoard = this.removeImageFromBoard.bind(this);
    this.switchCategories = this.switchCategories.bind(this);
    this.toggleBackgroundFade = this.toggleBackgroundFade.bind(this);
  }

  onDragLeave({ e }) {
    const { storyBoard } = this.state;
    const image = e.dataTransfer.getData('text');
    const newBoard = storyBoard;
    const board = newBoard.filter(img => image === img);
    this.setState({
      storyBoard: board,
    });
  }

  onDropOverImage({ e, image }) {
    const { storyBoard } = this.state;
    const newBoard = storyBoard;
    const board = newBoard.filter(img => e.dataTransfer.getData('text') !== img);
    const index = newBoard.indexOf(image);
    if (index >= 0) {
      board.splice(index, 0, e.dataTransfer.getData('text'));
      this.setState({
        storyBoard: board,
      });
    }
  }

  toggleBackgroundFade({ fade }) {
    this.setState({
      fadeBackground: fade,
    });
  }

  switchCategories({ category }) {
    this.setState({
      category,
    });
  }

  removeImageFromBoard(image) {
    const { storyBoard } = this.state;
    const newBoard = storyBoard;
    const board = newBoard.filter(img => image !== img);
    this.setState({
      storyBoard: board,
    });
  }


  render() {
    const { category, fadeBackground } = this.state;
    return (
      <div
        className="TalkBoardView"
      >
        <CategoriesList
          switchCategories={this.switchCategories}
        />
        <TalkBoardSelectContainer
          onDrop={this.onDrop}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragLeave={this.onDragLeave}
          onDropOverImage={this.onDropOverImage}
          removeImageFromBoard={this.removeImageFromBoard}
          category={category}
          toggleBackgroundFade={this.toggleBackgroundFade}
        />
        {fadeBackground ? <div className="TalkBoardView__overlay" /> : null}
      </div>
    );
  }
}


TalkBoardView.propTypes = {
  dispatch: PropTypes.func,
};

TalkBoardView.defaultProps = {
  dispatch: undefined,

};


export default TalkBoardView;

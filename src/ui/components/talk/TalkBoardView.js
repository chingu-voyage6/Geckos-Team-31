import React from 'react';
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
    this.onDrop = this.onDrop.bind(this);
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

  onDrop({ e }) {
    const { storyBoard } = this.state;
    const image = e.dataTransfer.getData('text');
    const duplicate = _.contains(storyBoard, image);
    if (!duplicate && storyBoard.length < 3) {
      const newBoard = storyBoard;
      newBoard.push(image);
      this.setState({
        storyBoard: newBoard,
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
        <StoryBoardContext.Provider value={this.state}>
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
        </StoryBoardContext.Provider>
        {fadeBackground ? <div className="TalkBoardView__overlay" /> : null}
      </div>
    );
  }
}

export default TalkBoardView;

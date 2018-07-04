import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { connect } from 'react-redux';
import TalkBoardSelectContainer from '../../containers/TalkBoardSelectContainer';
import CategoriesList from './CategoriesList';
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
      category: getCategories()[0].toLowerCase(),
      fadeBackground: false,
    };
    this.onDropOverImage = this.onDropOverImage.bind(this);
    this.removeImageFromBoard = this.removeImageFromBoard.bind(this);
    this.switchCategories = this.switchCategories.bind(this);
    this.toggleBackgroundFade = this.toggleBackgroundFade.bind(this);
  }

  onDropOverImage({ e, image }) {
    const { dispatch, storyBoard } = this.props;
    if (_.contains(storyBoard, e.dataTransfer.getData('text'))) {
      dispatch({ type: 'STORYBOARD__ARRANGE-IMAGES', targetImage: image, replacementImage: e.dataTransfer.getData('text') });
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
    const { dispatch } = this.props;
    dispatch({ type: 'STORYBOARD__REMOVE_IMAGE', image });
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

const mapStateToProps = state => ({
  storyBoard: state.storyBoard,
});


TalkBoardView.propTypes = {
  dispatch: PropTypes.func,
  storyBoard: PropTypes.func,
};

TalkBoardView.defaultProps = {
  dispatch: undefined,
  storyBoard: undefined,
};


export default connect(mapStateToProps)(TalkBoardView);

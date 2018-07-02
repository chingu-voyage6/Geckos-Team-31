import React from 'react';
import PropTypes from 'prop-types';
import fetchImages from '../../modules/fetch-images';
import TalkBoardSelect from '../components/talk/TalkBoardSelect';

// HOC or Container Component, gets the data to display in the core componenet

const TalkBoardSelectContainer = (props) => {
  const { category } = props;
  const images = fetchImages({ category });
  const {
    onDragLeave,
    onDrop,
    onDragOver,
    onDragStart,
    onDropOverImage,
    removeImageFromBoard,
    toggleBackgroundFade,
  } = props;
  return (
    <TalkBoardSelect
      images={images}
      onDrop={onDrop}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDropOverImage={onDropOverImage}
      removeImageFromBoard={removeImageFromBoard}
      toggleBackgroundFade={toggleBackgroundFade}
    />);
};

TalkBoardSelectContainer.propTypes = {
  onDrop: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDropOverImage: PropTypes.func,
  removeImageFromBoard: PropTypes.func,
  category: PropTypes.string,
  toggleBackgroundFade: PropTypes.func,
};

TalkBoardSelectContainer.defaultProps = {
  onDrop: undefined,
  onDragOver: undefined,
  onDropOverImage: undefined,
  onDragStart: undefined,
  onDragLeave: undefined,
  removeImageFromBoard: undefined,
  category: undefined,
  toggleBackgroundFade: undefined,
};

export default TalkBoardSelectContainer;

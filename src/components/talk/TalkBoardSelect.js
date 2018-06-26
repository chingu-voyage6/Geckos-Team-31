import React from 'react';
import PropTypes from 'prop-types';
import ImageCard from './ImageCard';
import TalkBoardStory from './TalkBoardStory';

// test images

import afternoon from '../../assets/images/afternoon.jpg';
import bacon from '../../assets/images/bacon.jpg';
import birthday from '../../assets/images/birthday.jpg';
import bowl from '../../assets/images/bowl.jpg';
import dog from '../../assets/images/dog.jpg';
import horse from '../../assets/images/horse.jpg';
import knee from '../../assets/images/knee.jpg';
import shirt from '../../assets/images/shirt.jpg';
import strawberry from '../../assets/images/strawberry.jpg';


class TalkBoardSelect extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [bowl, bacon, birthday, dog, horse, knee, shirt, afternoon, strawberry],
    };
  }

  render() {
    const {
      images,
    } = this.state;
    const {
      storyBoard,
      onDragLeave,
      onDrop,
      onDragOver,
      onDragStart,
      onDropOverImage,
      removeImageFromBoard,
    } = this.props;
    return (
      <div className="TalkBoardSelect">
        {images.map(image => (
          <ImageCard
            key={image}
            image={image}
            onDragStart={onDragStart}
          />))}
        <TalkBoardStory
          onDragOver={onDragOver}
          onDrop={onDrop}
          storyBoard={storyBoard}
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
  storyBoard: PropTypes.arrayOf(PropTypes.string),
  onDragStart: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDropOverImage: PropTypes.func,
  removeImageFromBoard: PropTypes.func,
};

TalkBoardSelect.defaultProps = {
  onDrop: undefined,
  onDragOver: undefined,
  onDropOverImage: undefined,
  storyBoard: undefined,
  onDragStart: undefined,
  onDragLeave: undefined,
  removeImageFromBoard: undefined,
};

export default TalkBoardSelect;

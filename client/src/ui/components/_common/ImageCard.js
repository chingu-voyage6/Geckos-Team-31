import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'underscore';

const mapStateToProps = state => ({
  storyBoard: state.storyBoard,
});

const onDragStart = ({ e, image }) => {
  e.dataTransfer.setData('text/plain', image);
};

class ImageCard extends React.Component {
  constructor() {
    super();
    this.state = {
      highlightedImage: false,
    };
  }

  // look into this
  onDropOffBoard({ event }) {
    event.preventDefault();
    const { dispatch } = this.props;
    const image = event.dataTransfer.getData('text');
    dispatch({ type: 'STORYBOARD__REMOVE-IMAGE', image });
  }

  onDropOverImage({ e, image }) {
    const { dispatch, storyBoard } = this.props;
    if (_.contains(storyBoard, e.dataTransfer.getData('text'))) {
      dispatch({ type: 'STORYBOARD__ARRANGE-IMAGES', targetImage: image, replacementImage: e.dataTransfer.getData('text') });
    } else dispatch({ type: 'STORYBOARD__SWAP', targetImage: image, replacementImage: e.dataTransfer.getData('text') });
  }

  nextImage() {
  }

  removeImageFromBoard(image) {
    const { dispatch } = this.props;
    dispatch({ type: 'STORYBOARD__REMOVE-IMAGE', image });
  }

  highlightCard(image) {
    const { highlightedImage } = this.state;
    const { toggleBackgroundFade } = this.props;
    if (!highlightedImage) {
      this.setState({ highlightedImage: image });
      toggleBackgroundFade({ fade: true });
    } else {
      this.setState({ highlightedImage: '' });
      toggleBackgroundFade({ fade: false });
    }
  }

  renderHighlightedImage() {
    const { highlightedImage } = this.state;
    return highlightedImage ? (
      <div
        role="button"
        tabIndex={-1}
        draggable
        onKeyDown={() => this.nextImage()}
        droppable="true"
        onDragStart={e => onDragStart({ e, image: highlightedImage })}
        onDrop={e => this.onDropOverImage({ e, image: highlightedImage })}
        className="ImageCard__highlight"
        onClick={() => this.highlightCard()}
      >
        <img src={highlightedImage} alt={highlightedImage} />
      </div>) : null;
  }

  render() {
    const {
      image,
      isStoryBoardItem,
    } = this.props;
    const cardStyle = 'ImageCard';
    return (
      <React.Fragment>
        <div
          role="button"
          tabIndex={-1}
          className={cardStyle}
          draggable
          droppable="true"
          onKeyDown={() => this.nextImage()}
          onDragStart={e => onDragStart({ e, image })}
          onDrop={isStoryBoardItem ? e => this.onDropOverImage({ e, image })
            : e => this.onDropOffBoard({ e })}
          onClick={isStoryBoardItem ? () => this.removeImageFromBoard(image)
            : () => this.highlightCard(image)}
        >
          <img src={image} alt={image} />
        </div>
        {this.renderHighlightedImage()}
      </React.Fragment>
    );
  }
}

ImageCard.propTypes = {
  image: PropTypes.string,
  toggleBackgroundFade: PropTypes.func,
  dispatch: PropTypes.func,
  storyBoard: PropTypes.arrayOf(PropTypes.string),
  isStoryBoardItem: PropTypes.bool,
};

ImageCard.defaultProps = {
  image: undefined,
  toggleBackgroundFade: undefined,
  dispatch: undefined,
  storyBoard: undefined,
  isStoryBoardItem: undefined,
};

export default connect(mapStateToProps)(ImageCard);

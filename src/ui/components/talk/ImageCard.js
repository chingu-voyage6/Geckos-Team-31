import React from 'react';
import PropTypes from 'prop-types';

class ImageCard extends React.Component {
  constructor() {
    super();
    this.state = {
      highlightedImage: false,
    };
  }

  onKeyDown() {

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
    const { onDropOverImage, onDragStart } = this.props;
    return highlightedImage ? (
      <div
        role="button"
        tabIndex={-1}
        draggable
        droppable="true"
        onDragStart={e => onDragStart({ e, image: highlightedImage })}
        onDrop={e => onDropOverImage({ e, image: highlightedImage })}
        onKeyDown={() => this.onKeyDown()}
        className="ImageCard__highlight"
        onClick={() => this.highlightCard()}
      >
        <img src={highlightedImage} alt={highlightedImage} />
      </div>) : null;
  }

  render() {
    const {
      image,
      onDragStart,
      onDropOverImage,
      removeImageFromBoard,
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
          onDragStart={e => onDragStart({ e, image })}
          onDrop={e => onDropOverImage({ e, image })}
          onKeyDown={() => this.onKeyDown()}
          onClick={removeImageFromBoard ? () => removeImageFromBoard(image)
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
  onDragStart: PropTypes.func,
  onDropOverImage: PropTypes.func,
  removeImageFromBoard: PropTypes.func,
  toggleBackgroundFade: PropTypes.func,
};

ImageCard.defaultProps = {
  image: undefined,
  onDragStart: undefined,
  onDropOverImage: undefined,
  removeImageFromBoard: undefined,
  toggleBackgroundFade: undefined,
};

export default ImageCard;

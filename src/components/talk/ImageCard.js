import React from 'react';
import PropTypes from 'prop-types';

class ImageCard extends React.Component {
  constructor() {
    super();
    this.state = {
      highlight: false,
    };
  }

  highlightCard() {
    const { highlight } = this.state;
    this.setState({
      highlight: !highlight,
    });
  }

  render() {
    const {
      image,
      onDragStart,
      onDropOverImage,
      removeImageFromBoard,
    } = this.props;
    const { highlight } = this.state;
    const cardStyle = highlight ? 'ImageCard--highlight' : 'ImageCard';
    return (
      <div
        role="button"
        tabIndex={-1}
        className={cardStyle}
        draggable
        droppable="true"
        onDragStart={e => onDragStart({ e, image })}
        onDrop={e => onDropOverImage({ e, image })}
        onKeyDown={removeImageFromBoard ? () => removeImageFromBoard(image)
          : () => this.highlightCard()}
        onClick={removeImageFromBoard ? () => removeImageFromBoard(image)
          : () => this.highlightCard()}
      >
        <img src={image} alt={image} />
      </div>
    );
  }
}

ImageCard.propTypes = {
  image: PropTypes.string,
  onDragStart: PropTypes.func,
  onDropOverImage: PropTypes.func,
  removeImageFromBoard: PropTypes.func,
};

ImageCard.defaultProps = {
  image: undefined,
  onDragStart: undefined,
  onDropOverImage: undefined,
  removeImageFromBoard: undefined,
};

export default ImageCard;

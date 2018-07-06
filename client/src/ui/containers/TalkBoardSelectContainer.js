import React from 'react';
import PropTypes from 'prop-types';
import fetchImages from '../../modules/fetch-images';
import TalkBoardSelect from '../components/talk/TalkBoardSelect';

// HOC or Container Component, gets the data to display in the core componenet

const TalkBoardSelectContainer = (props) => {
  const { category } = props;
  const images = fetchImages({ category });
  const {
    toggleBackgroundFade,
  } = props;
  return (
    <TalkBoardSelect
      images={images}
      toggleBackgroundFade={toggleBackgroundFade}
    />);
};

TalkBoardSelectContainer.propTypes = {
  category: PropTypes.string,
  toggleBackgroundFade: PropTypes.func,
};

TalkBoardSelectContainer.defaultProps = {
  category: undefined,
  toggleBackgroundFade: undefined,
};

export default TalkBoardSelectContainer;

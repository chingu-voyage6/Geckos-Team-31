import React from 'react';
import TalkBoardSelectContainer from '../../containers/TalkBoardSelectContainer';
import CategoriesList from './CategoriesList';
import getCategories from '../../../modules/get-categories';


class TalkBoardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: getCategories()[0].toLowerCase(),
      fadeBackground: false,
    };
    this.switchCategories = this.switchCategories.bind(this);
    this.toggleBackgroundFade = this.toggleBackgroundFade.bind(this);
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
          category={category}
          toggleBackgroundFade={this.toggleBackgroundFade}
        />
        {fadeBackground ? <div className="TalkBoardView__overlay" /> : null}
      </div>
    );
  }
}

export default TalkBoardView;

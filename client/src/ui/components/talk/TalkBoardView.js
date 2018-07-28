import React from 'react';
import TalkBoardSelectContainer from '../../containers/TalkBoardSelectContainer';
import CategoriesList from './CategoriesList';
import handleGetCategories from '../../../modules/handle-get-categories';
import userId from '../../../testData';


class TalkBoardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      fadeBackground: false,
      categories: [],
    };
    this.switchCategories = this.switchCategories.bind(this);
    this.toggleBackgroundFade = this.toggleBackgroundFade.bind(this);
  }

  componentDidMount() {
    handleGetCategories({ userId: userId() })
      .then((response) => {
        this.setState({
          category: response.categories[0],
          categories: response.categories,
        });
      })
      .catch(error => console.log(error));
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
    const { category, fadeBackground, categories } = this.state;
    return (
      <div
        className="TalkBoardView"
      >
        <CategoriesList
          switchCategories={this.switchCategories}
          categories={categories}
        />
        {category
          ? (
            <TalkBoardSelectContainer
              key={category}
              category={category}
              toggleBackgroundFade={this.toggleBackgroundFade}
            />
          ) : null
          }
        {fadeBackground ? <div className="TalkBoardView__overlay" /> : null}
      </div>
    );
  }
}

export default TalkBoardView;

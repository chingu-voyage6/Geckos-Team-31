import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TalkBoardSelectContainer from '../../containers/TalkBoardSelectContainer';
import CategoriesList from './CategoriesList';
import handleGetCategories from '../../../modules/handle-get-categories';

const mapStateToProps = state => ({
  userId: state.userId,
});

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
    const { userId } = this.props;
    handleGetCategories({ userId })
      .then((response) => {
        this.setState({
          category: response.categories ? response.categories[0] : '',
          categories: response.categories ? response.categories : [''],
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
    const { userId } = this.props;
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
              userId={userId}
            />
          ) : null
          }
        {fadeBackground ? <div className="TalkBoardView__overlay" /> : null}
      </div>
    );
  }
}

TalkBoardView.propTypes = {
  userId: PropTypes.string,
};

TalkBoardView.defaultProps = {
  userId: undefined,
};


export default connect(mapStateToProps)(TalkBoardView);

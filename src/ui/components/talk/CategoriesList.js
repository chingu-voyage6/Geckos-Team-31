import React from 'react';
import PropTypes from 'prop-types';
import getCategories from '../../../modules/get-categories';

class CategoriesList extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: getCategories(),
    };
  }

  render() {
    const { categories } = this.state;
    const { switchCategories } = this.props;
    return (
      <div className="CategoriesList">
        {categories.map(category => <button onClick={() => switchCategories({category: category.toLowerCase()})} style={{width:'150px'}} key={category}>{category}</button>)}
      </div>
    );
  }
}

CategoriesList.propTypes = {
  switchCategories: PropTypes.func,
};

CategoriesList.defaultProps = {
  switchCategories: undefined,
};

export default CategoriesList;

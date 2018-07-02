import React from 'react';
import PropTypes from 'prop-types';
import getCategories from '../../../modules/get-categories';
import Button from '../_common/Button';

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
        {categories.map(category => (
          <Button
              onClick={() => switchCategories({ category: category.toLowerCase()})}
              label={category}
              key={category}
            >
              {category}
            </Button>
        ))
        }
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

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../_common/Button';

const CategoriesList = (props) => {
  const { categories } = props;
  const { switchCategories } = props;
  return (
    <div className="CategoriesList">
      {categories.map(category => (
        <Button
          onClick={() => switchCategories({ category: category.toLowerCase() })}
          label={category}
          key={category}
        />
      ))}
    </div>
  );
};

CategoriesList.propTypes = {
  switchCategories: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.string),
};

CategoriesList.defaultProps = {
  switchCategories: undefined,
  categories: undefined,
};

export default CategoriesList;

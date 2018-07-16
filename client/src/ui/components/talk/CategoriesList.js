import React from 'react';
import PropTypes from 'prop-types';
import handleGetCategories from '../../../modules/handle-get-categories';
import Button from '../_common/Button';
import userId from '../../../testData';

class CategoriesList extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log('hello')
    handleGetCategories({ userId: '5b4b31cc5e0d13fa72316796' })
      .then((response) => {
        console.log(response)
        this.setState({
          categories: response.categories,
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { categories } = this.props;
    const { switchCategories } = this.props;
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
  }
}

CategoriesList.propTypes = {
  switchCategories: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.string),
};

CategoriesList.defaultProps = {
  switchCategories: undefined,
  categories: undefined,
};

export default CategoriesList;

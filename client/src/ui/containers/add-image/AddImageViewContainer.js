import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';

import _ from 'underscore';
import AddImageView from '../../components/add-image/AddImageView';
import handleGetUserGallery from '../../../modules/handle-get-user-gallery';
import handleGetCategories from '../../../modules/handle-get-categories';
import userId from '../../../testData';

const initialState = {
  userGallery: [],
  categories: [],
};

function reducer(state = initialState, action) {
  if (action.type === 'USER-GALLERY__LOAD-GALLERY') {
    const userGallery = action.gallery;
    const newState = {
      userGallery,
    }
    return newState;
  }
  if (action.type === 'USER-GALLERY__LOAD-CATEGORIES') {
    console.log(action.categories)
    const categories = action.categories;
    const newState = {
      categories,
    }
    return newState;
  }
  if (action.type === 'USER-GALLERY__ADD-IMAGE') {
    const userGallery = state.userGallery.concat(action.fileName);
    const newState = {
      userGallery,
    };
    return newState;
  }
  if (action.type === 'USER-GALLERY__REMOVE-IMAGE') {
    const userGallery = _.without(state.userGallery, action.image);
    const newState = {
      userGallery,
    };
    return newState;
  }
  if (action.type === 'USER-GALLERY__ADD-CATEGORY') {
    const categories = state.categories.concat(action.category);
    const newState = {
      categories,
    };
    return newState;
  }
  if (action.type === 'USER-CATEGORY__REMOVE-CATEGORY') {
    const categories = _.without(state.categories, action.category);
    const newState = {
      categories,
    };
    return newState;
  }
  return state;
}
const store = createStore(reducer);


class AddImageViewContainer extends React.Component {
  componentDidMount() {
    handleGetUserGallery({ userId: userId() })
      .then((response) => {
        store.dispatch({ type: 'USER-GALLERY__LOAD-GALLERY', gallery: response });
      })
      .catch(error => console.log(error));
    handleGetCategories({ userId: userId() })
      .then((response) => {
        store.dispatch({ type: 'USER-GALLERY__LOAD-CATEGORIES', categories: response.categories });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AddImageView />
        </div>
      </Provider>
    );
  }
}

AddImageViewContainer.propTypes = {
};

AddImageViewContainer.defaultProps = {
};

export default AddImageViewContainer;

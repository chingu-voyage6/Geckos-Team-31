import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import _ from 'underscore';
import AddImageView from '../../components/add-image/AddImageView';

const initialState = {
  userGallery: [],
  categories: [],
};

function reducer(state = initialState, action) {
  if (action.type === 'USERGALLERY__LOADGALLERY') {
    const userGallery = action.gallery;
    return Object.assign({}, state, {
      userGallery,
    });
  }
  if (action.type === 'USERGALLERY__LOADCATEGORIES') {
    const { categories } = action;
    return Object.assign({}, state, {
      categories,
    });
  }
  return state;
}
const store = createStore(reducer, applyMiddleware(thunk));


const AddImageViewContainer = () => (
  <Provider store={store}>
    <div className="App">
      <AddImageView />
    </div>
  </Provider>
);

AddImageViewContainer.propTypes = {
};

AddImageViewContainer.defaultProps = {

};

export default AddImageViewContainer;

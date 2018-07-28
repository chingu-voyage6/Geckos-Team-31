import handleGetUserGallery from '../modules/handle-get-user-gallery';
import handleGetCategories from '../modules/handle-get-categories';
import userId from '../testData';

const USERGALLERY__LOADGALLERY = 'USERGALLERY__LOADGALLERY';
const USERGALLERY__LOADCATEGORIES = 'USERGALLERY__LOADCATEGORIES';
const USERGALLERY__ADDIMAGE = 'USERGALLERY__ADDIMAGE';
const USERGALLERY__REMOVEIMAGE = 'USERGALLERY__REMOVEIMAGE';
const USERGALLERY__ADDCATEGORY = 'USERGALLERY__ADDIMAGE';
const USERGALLERY__REMOVECATEGORY = 'USERGALLERY__REMOVEIMAGE';

export const loadUserGallery = () => function loadGallery(dispatch) {
  return handleGetUserGallery({ userId: userId() })
    .then(response => dispatch({ type: USERGALLERY__LOADGALLERY, gallery: response }))
    .catch(error => console.log(error));
};

export const loadCategories = () => function loadCat(dispatch) {
  return handleGetCategories({ userId: userId() })
    .then(response => dispatch({
      type: USERGALLERY__LOADCATEGORIES, categories: response.categories,
    }))
    .catch(error => console.log(error));
};


export const addImage = (image) => {
  const action = {
    type: USERGALLERY__ADDIMAGE,
    image,
  };
  return action;
};
export const removeImage = (image) => {
  const action = {
    type: USERGALLERY__REMOVEIMAGE,
    image,
  };
  return action;
};

export const addCategory = (category) => {
  const action = {
    type: USERGALLERY__ADDCATEGORY,
    category,
  };
  return action;
};
export const removeCategory = (category) => {
  const action = {
    type: USERGALLERY__REMOVECATEGORY,
    category,
  };
  return action;
};

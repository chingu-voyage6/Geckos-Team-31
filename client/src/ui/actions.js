import handleGetUserGallery from '../modules/handle-get-user-gallery';
import handleGetCategories from '../modules/handle-get-categories';
import handleAuthorizeUser from '../modules/handle-authorize-user';

const USERGALLERY__LOADGALLERY = 'USERGALLERY__LOADGALLERY';
const USERGALLERY__LOADCATEGORIES = 'USERGALLERY__LOADCATEGORIES';
const USERGALLERY__ADDIMAGE = 'USERGALLERY__ADDIMAGE';
const USERGALLERY__REMOVEIMAGE = 'USERGALLERY__REMOVEIMAGE';
const USERGALLERY__ADDCATEGORY = 'USERGALLERY__ADDIMAGE';
const USERGALLERY__REMOVECATEGORY = 'USERGALLERY__REMOVEIMAGE';

const AUTHORIZE_USER = 'AUTHORIZE_USER';
const AUTHORIZE__CLEAR_USER_TOKEN = 'AUTHORIZE__CLEAR_USER_TOKEN';

export const authorizeUser = ({ token }) => function userAuthentication(dispatch) {
  return handleAuthorizeUser({ token })
    .then(response => dispatch({
      type: AUTHORIZE_USER, user: response,
    }))
    .catch((error) => {
      console.log(error);
      localStorage.clear();
      return dispatch({ type: AUTHORIZE__CLEAR_USER_TOKEN });
    });
};

export const loadUserGallery = ({ userId }) => function loadGallery(dispatch) {
  return handleGetUserGallery({ userId })
    .then(response => dispatch({ type: USERGALLERY__LOADGALLERY, gallery: response }))
    .catch(error => console.log(error));
};

export const loadCategories = ({ userId }) => function loadCat(dispatch) {
  return handleGetCategories({ userId })
    .then(response => dispatch({
      type: USERGALLERY__LOADCATEGORIES, categories: response.categories,
    }))
    .catch(error => console.log(error));
};

export const clearUser = () => {
  const action = {
    type: AUTHORIZE__CLEAR_USER_TOKEN,
  };
  return action;
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

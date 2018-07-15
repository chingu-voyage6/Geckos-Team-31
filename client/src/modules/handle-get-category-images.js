import fetch from 'isomorphic-fetch';

let modulePromise;

const getCategoryImages = ({ userId, category }, promise) => {
  modulePromise = promise;
  try {
    const url = '/api/user-gallery';
    fetch(url, {
      method: 'GET',
      body: JSON.stringify({
        userId,
        category,
      }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
      .then((response) => {
        modulePromise.resolve(response);
      })
      .catch((error) => {
        modulePromise.reject({
          type: 'handleGetCategoryImages.getCategoryImages',
          error: error.reason,
        });
      });
  } catch (exception) {
    modulePromise.reject({
      type: 'handleGetUserGallery.getCategoryImages',
      reason: exception,
    });
  }
};

const handleGetCategoryImages = ({ userId, category }) => new Promise((resolve, reject) => {
  getCategoryImages({ userId, category }, { resolve, reject });
});

export default handleGetCategoryImages;

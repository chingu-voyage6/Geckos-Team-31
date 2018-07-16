import fetch from 'isomorphic-fetch';

let modulePromise;

const getCategories = ({ userId }, promise) => {
  modulePromise = promise;
  try {
    fetch('/api/categories', {
      method: 'POST',
      body: JSON.stringify({
        userId,
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
      type: 'handleGetCategories.handleGetCategories',
      reason: exception,
    });
  }
};

const handleGetCategories = ({ userId }) => new Promise((resolve, reject) => {
  getCategories({ userId }, { resolve, reject });
});

export default handleGetCategories;

import fetch from 'isomorphic-fetch';

let modulePromise;

const removeCategory = ({ userId, category }, promise) => {
  modulePromise = promise;
  try {
    const url = '/api/remove-category';
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        userId,
        category,
      }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .catch((error) => {
        modulePromise.reject({
          type: 'handleRemoveCategory.removeCategory',
          reason: error.message,
        });
      })
      .then((response) => {
        modulePromise.resolve(response);
      });
  } catch (exception) {
    modulePromise.reject({
      type: 'handleRemoveCategory.removeCategory',
      reason: exception,
    });
  }
};

const handleRemoveCategory = ({ userId, category }) => new Promise((resolve, reject) => {
  removeCategory({ userId, category }, { resolve, reject });
});

export default handleRemoveCategory;

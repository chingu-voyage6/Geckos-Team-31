import fetch from 'isomorphic-fetch';

let modulePromise;

const addCategory = ({ userId, category }, promise) => {
  modulePromise = promise;
  try {
    const url = '/api/add-category';
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
          type: 'handleAddCategory.addCategory',
          reason: error.message,
        });
      })
      .then((response) => {
        modulePromise.resolve(response);
      });
  } catch (exception) {
    modulePromise.reject({
      type: 'handleAddCategory.addCategory',
      reason: exception,
    });
  }
};

const handleAddCategory = ({ userId, category }) => new Promise((resolve, reject) => {
  addCategory({ userId, category }, { resolve, reject });
});

export default handleAddCategory;

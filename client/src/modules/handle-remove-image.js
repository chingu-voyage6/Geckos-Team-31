import fetch from 'isomorphic-fetch';

let modulePromise;

const removeCategory = ({ userId, category }) => {
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
          type: 'handleAddImage.addCategory',
          reason: error.message,
        });
      })
      .then((response) => {
        modulePromise.resolve(response);
      });
  } catch (exception) {
    modulePromise.reject({
      type: 'handleAddImage.addCategory',
      reason: exception,
    });
  }
};

const removeImage = ({ image, userId, category }, promise) => {
  modulePromise = promise;
  try {
    const url = '/api/remove-image-from-account';
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        image,
        userId,
      }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .catch((error) => {
        modulePromise.reject({
          type: 'handleAddImage.addImage',
          reason: error.message,
        });
      })
      .then((response) => {
        modulePromise.resolve(response);
      });
    // removeCategory({ userId, category });
  } catch (exception) {
    modulePromise.reject({
      type: 'handleAddImage.addImage',
      reason: exception,
    });
  }
};

const handleRemoveImage = ({ image, userId, category }) => new Promise((resolve, reject) => {
  removeImage({ image, userId, category }, { resolve, reject });
});

export default handleRemoveImage;

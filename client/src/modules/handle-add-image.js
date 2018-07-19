import fetch from 'isomorphic-fetch';

let modulePromise;

const addCategory = ({ userId, category }) => {
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

const addImage = ({ image, userId, category }, promise) => {
  modulePromise = promise;
  try {
    const url = '/api/add-image-to-account';
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        image,
        userId,
        category,
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
    // addCategory({ userId, category });
  } catch (exception) {
    modulePromise.reject({
      type: 'handleAddImage.addImage',
      reason: exception,
    });
  }
};

const handleAddImage = ({ image, userId, category }) => new Promise((resolve, reject) => {
  addImage({ image, userId, category }, { resolve, reject });
});

export default handleAddImage;

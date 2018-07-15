import fetch from 'isomorphic-fetch';

let modulePromise;

const addImage = ({ image, userId }, promise) => {
  modulePromise = promise;
  try {
    const url = '/api/add-image-to-account';
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
          reason: error.reason,
        });
      })
      .then((response) => {
        modulePromise.resolve(response);
      });
  } catch (exception) {
    modulePromise.reject({
      type: 'handleAddImage.addImage',
      reason: exception,
    });
  }
};

const handleAddImage = ({ image, userId }) => new Promise((resolve, reject) => {
  addImage({ image, userId }, { resolve, reject });
});

export default handleAddImage;

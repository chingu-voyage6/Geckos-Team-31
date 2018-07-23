import fetch from 'isomorphic-fetch';

let modulePromise;

const addUserImage = ({ userId, category, image }, promise) => {
  modulePromise = promise;
  try {
    const url = '/api/add-user-image';
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        userId,
        image,
        category,
      }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .catch((error) => {
        modulePromise.reject({
          type: 'handleAddUserImage.addUserImage',
          reason: error.message,
        });
      })
      .then((response) => {
        modulePromise.resolve(response);
      });
  } catch (exception) {
    modulePromise.reject({
      type: 'handleAddUserImage.addUserImage',
      reason: exception,
    });
  }
};


const handleAddUserImage = ({ image, userId, category }) => new Promise((resolve, reject) => {
  addUserImage({ image, userId, category }, { resolve, reject });
});

export default handleAddUserImage;

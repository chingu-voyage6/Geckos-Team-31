import fetch from 'isomorphic-fetch';

let modulePromise;

const getUserGallery = ({ userId }, promise) => {
  modulePromise = promise;
  try {
    const url = '/api/user-gallery';
    fetch(url, {
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
        const allImageFileNames = response.images.map(image => image.fileName);
        modulePromise.resolve(allImageFileNames);
      })
      .catch((error) => {
        modulePromise.reject({
          type: 'handleGetUserGallery.getUserGallery',
          error: error.reason,
        });
      });
  } catch (exception) {
    modulePromise.reject({
      type: 'handleGetUserGallery.getUserGallery',
      reason: exception,
    });
  }
};

const handleGetUserGallery = ({ userId }) => new Promise((resolve, reject) => {
  getUserGallery({ userId }, { resolve, reject });
});

export default handleGetUserGallery;

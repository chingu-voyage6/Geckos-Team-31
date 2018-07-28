import fetch from 'isomorphic-fetch';

let modulePromise;

const getGallery = (promise) => {
  modulePromise = promise;
  try {
    fetch('/api/images')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then((response) => {
        modulePromise.resolve(response)
      })
      .catch((error) => {
        modulePromise.reject({
          type: 'handleGetGallery.getGallery',
          error: error.reason,
        });
      });
  } catch (exception) {
    modulePromise.reject({
      type: 'handleGetGallery.handleGetGallery',
      reason: exception,
    });
  }
};

const handleGetGallery = () => new Promise((resolve, reject) => {
  getGallery({ resolve, reject });
});

export default handleGetGallery;

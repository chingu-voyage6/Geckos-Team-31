import fetch from 'isomorphic-fetch';

let modulePromise;

const getCategoryImages = ({ userId, category }, promise) => {
  modulePromise = promise;
  try {
    const url = '/api/user-category';
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
        const categoryImages = [];
        response.images.forEach((image) => {
          if (image.category.toLowerCase() === category.toLowerCase()) {
            categoryImages.push(image.fileName);
          }
        });
        modulePromise.resolve(categoryImages);
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

import fetch from 'isomorphic-fetch';

let modulePromise;

const addImage = ({ image, userId, category, userSubmitted }, promise) => {
  modulePromise = promise;
  try {
    const url = '/api/add-image-to-account';
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        image,
        userId,
        category,
        userSubmitted,
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
  } catch (exception) {
    modulePromise.reject({
      type: 'handleAddImage.addImage',
      reason: exception,
    });
  }
};

const handleAddImage = ({
  image, userId, category, userSubmitted
}) => new Promise((resolve, reject) => {
  addImage({
    image, userId, category, userSubmitted
  }, { resolve, reject });
});

export default handleAddImage;

let modulePromise;

const authorizeUser = (promise) => {
  modulePromise = promise;
  try {
    const url = '/api/auth';
    fetch(url, {
      method: 'GET',
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
        modulePromise.resolve(response);
      })
      .catch((error) => {
        modulePromise.reject({
          type: 'handleAuthorizeUser.authorizeUser',
          error: error.message,
        });
      });
  } catch (exception) {
    modulePromise.reject({
      type: 'handleAuthorizeUser.authorizeUser',
      reason: exception,
    });
  }
};

const handleAuthorizeUser = () => new Promise((resolve, reject) => {
  authorizeUser({ resolve, reject });
});

export default handleAuthorizeUser;

let modulePromise;

const authorizeUser = ({ token }, promise) => {
  modulePromise = promise;
  try {
    const url = '/api/auth';
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json(response);
    })
      .then((response) => {
        const { user } = response;
        modulePromise.resolve(user._id);
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

const handleAuthorizeUser = ({ token }) => new Promise((resolve, reject) => {
  authorizeUser({ token }, { resolve, reject });
});

export default handleAuthorizeUser;

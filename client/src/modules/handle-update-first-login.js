let modulePromise;

const updateFirstLogin = ({ userId }, promise) => {
  modulePromise = promise;
  try {
    const url = '/api/update-first-login';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
      }),
    }).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json(response);
    })
      .then(() => {
        // eslint-disable-next-line
        modulePromise.resolve({ success: true });
      })
      .catch((error) => {
        modulePromise.reject({
          type: 'handleUpdateFirstLogin.updateFirstLogin',
          error: error.message,
        });
      });
  } catch (exception) {
    modulePromise.reject({
      type: 'handleUpdateFirstLogin.updateFirstLogin',
      reason: exception,
    });
  }
};

const handleUpdateFirstLogin = ({ userId }) => new Promise((resolve, reject) => {
  updateFirstLogin({ userId }, { resolve, reject });
});

export default handleUpdateFirstLogin;

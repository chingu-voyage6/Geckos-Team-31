import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import TalkBoardMain from '../ui/components/talk/TalkBoardMain';
import HomePageView from '../ui/components/home/HomePageView';
import AddImageViewContainer from '../ui/containers/add-image/AddImageViewContainer';
import handleAuthorizeUser from '../modules/handle-authorize-user';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const verify = (userId) => {
  fetch('/api/verify', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify({
      userId,
    }), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json(res))
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch(error => console.log(error));
};


const PrivateRoute = ({
  component: Component, ...rest, authenticated, userId
}) => (
  <Route
    {...rest}
    render={props => (
      authenticated && verify(userId)
        ? <Component {...props} />
        : <Redirect to="/" />
    )}
  />
);


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: '',
    };
    this.authorizeUser = this.authorizeUser.bind(this);
  }

  authorizeUser(sessionId) {
    this.setState({
      userId: sessionId,
    });
  }

  render() {
    const { userId } = this.state;
    return (
      <Router>
        <div>
          <Route exact path="/" render={props => <Login {...props} authorizeUser={this.authorizeUser} />} />
          <PrivateRoute authenticated={userId} userId={userId} exact path="/home" component={HomePageView} />
          <PrivateRoute authenticated={userId} userId={userId} exact path="/talk" component={TalkBoardMain} />
          <PrivateRoute authenticated={userId} userId={userId} exact path="/add-images" component={AddImageViewContainer} />
        </div>
      </Router>
    );
  }
}

export default App;

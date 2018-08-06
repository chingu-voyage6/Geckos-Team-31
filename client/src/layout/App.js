import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from '../ui/components/Login';
import TalkBoardMain from '../ui/components/talk/TalkBoardMain';
import HomePageView from '../ui/components/home/HomePageView';
import AddImageViewContainer from '../ui/containers/add-image/AddImageViewContainer';

require('es6-promise').polyfill();
require('isomorphic-fetch');


const PrivateRoute = ({
  // eslint-disable-next-line
  component: Component, ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      localStorage.getItem('user')
        ? <Component {...props} />
        : <Redirect to="/" />
    )}
  />
);


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('user');
    fetch('/api/auth', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    })
      .then(res => res.json(res))
      .then((response) => {
        console.log(response);
      })
      .catch(() => {
        localStorage.clear();
        return <Redirect to="/" />;
      });
  }

  render() {
    const { userId, auth } = this.state;
    return (
      <Router>
        <div>
          <Route exact path="/" render={props => <Login {...props} />} />
          <PrivateRoute path="/home" component={HomePageView} auth={auth} />
          <PrivateRoute path="/talk" component={TalkBoardMain} auth={auth} />
          <PrivateRoute userId={userId} path="/add-images" component={AddImageViewContainer} auth={auth} />
        </div>
      </Router>
    );
  }
}

export default App;

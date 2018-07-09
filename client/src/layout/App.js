import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import fetch from 'isomorphic-fetch';
import TalkBoardMain from '../ui/components/talk/TalkBoardMain';
import HomePageView from '../ui/components/home/HomePageView';
import AddImageView from '../ui/components/add-image/AddImageView';

require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      response: '',
    };
  }

  componentDidMount() {
    fetch('/api/hello')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then((response) => {
        console.log(response)
      });
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePageView} />
          <Route exact path="/talk" component={TalkBoardMain} />
          <Route exact path="/add-images" component={AddImageView} />
        </div>
      </Router>
    );
  }
}

export default App;

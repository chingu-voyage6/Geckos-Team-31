import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TalkBoardMain from '../ui/components/talk/TalkBoardMain';
import HomePageView from '../ui/components/home/HomePageView';
import AddImageViewContainer from '../ui/containers/add-image/AddImageViewContainer';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={HomePageView} />
      <Route exact path="/talk" component={TalkBoardMain} />
      <Route exact path="/add-images" component={AddImageViewContainer} />
    </div>
  </Router>
);

export default App;

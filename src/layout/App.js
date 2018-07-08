import React from 'react';
import '../styles/main.css';
<<<<<<< HEAD:src/layout/App.js
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TalkBoardMain from '../ui/components/talk/TalkBoardMain';
import HomePageView from '../ui/components/home/HomePageView';
import AddImageView from '../ui/components/add-image/AddImageView';
=======
import TalkBoardView from '../ui/components/talk/TalkBoardView';
import NavBar from '../ui/components/_common/NavBar';

const initialState = {
  storyBoard: [],
};

function reducer(state = initialState, action) {
  if (action.type === 'STORYBOARD__ADD-IMAGE') {
    const storyBoard = state.storyBoard.concat(action.image);
    const newState = {
      storyBoard,
    };
    return newState;
  }
  if (action.type === 'STORYBOARD__REMOVE-IMAGE') {
    const storyBoard = state.storyBoard.filter(img => action.image !== img);
    const newState = {
      storyBoard,
    };
    return newState;
  }
  if (action.type === 'STORYBOARD__ARRANGE-IMAGES') {
    const index = state.storyBoard.indexOf(action.targetImage);
    if (index >= 0) {
      const storyBoard = state.storyBoard.filter(img => action.replacementImage !== img);
      storyBoard.splice(index, 0, action.replacementImage);
      const newState = {
        storyBoard,
      };
      return newState;
    }
  }
  if (action.type === 'STORYBOARD__SWAP') {
    const index = state.storyBoard.indexOf(action.targetImage);
    let { storyBoard } = state;
    storyBoard.splice(index, 0, action.replacementImage);
    storyBoard = state.storyBoard.filter(img => action.targetImage !== img);
    const newState = {
      storyBoard,
    };
    return newState;
  }
  return state;
}
const store = createStore(reducer);
>>>>>>> 9a50addf7bd433b5bbdd02b771a1ce66204e5569:client/src/layout/App.js


const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={HomePageView} />
      <Route exact path="/talk" component={TalkBoardMain} />
      <Route exact path="/add-images" component={AddImageView} />
    </div>
  </Router>
);

export default App;

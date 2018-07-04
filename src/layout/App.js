import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import '../styles/main.css';
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
    console.log(action.image)
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


const App = () => (
  <Provider store={store}>
    <div className="App">
      <NavBar />
      <TalkBoardView />
    </div>
  </Provider>
);

export default App;

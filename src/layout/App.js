import React, { Component } from 'react';
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
  return state;
}
const store = createStore(reducer);


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <NavBar />
          <TalkBoardView />
        </div>
      </Provider>
    );
  }
}

export default App;

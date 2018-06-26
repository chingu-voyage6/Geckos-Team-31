import React, { Component } from 'react';
import logo from './logo.svg';
import '../styles/main.css';
import TalkBoardView from '../components/talk/TalkBoardView';
import NavBar from '../components/_common/NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <TalkBoardView />
      </div>
    );
  }
}

export default App;

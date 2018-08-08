import React from 'react';
import '../../../styles/main.css';
import TalkBoardView from './TalkBoardView';
import NavBar from '../_common/NavBar';


const TalkBoardMain = () => (
  <div className="TalkBoardMain">
    <NavBar />
    <TalkBoardView />
  </div>
);

export default TalkBoardMain;

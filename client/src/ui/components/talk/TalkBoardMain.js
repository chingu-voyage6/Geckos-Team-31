import React from 'react';
import '../../../styles/main.css';
import TalkBoardView from './TalkBoardView';
import NavBar from '../_common/NavBar';


const TalkBoardMain = props => (
  <div className="TalkBoardMain">
    <NavBar {...props} />
    <TalkBoardView />
  </div>
);

export default TalkBoardMain;

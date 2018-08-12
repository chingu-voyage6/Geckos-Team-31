import React from 'react';
import '../../../styles/main.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TalkBoardView from './TalkBoardView';
import NavBar from '../_common/NavBar';

const mapStateToProps = state => ({
    userOnboarding: state.userOnboarding,
});

const TalkBoardMain = props => (
  <div className="TalkBoardMain">
    <NavBar {...props} />
    <TalkBoardView
      firstLogin={props.userOnboarding.firstLogin}/>
  </div>
);

TalkBoardMain.propTypes = {
  // eslint-disable-next-line
  userOnboarding: PropTypes.object,
};

TalkBoardMain.defaultProps = {
  userOnboarding: undefined,
};

export default connect(mapStateToProps)(TalkBoardMain);

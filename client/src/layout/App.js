import React from 'react';
import Loading from 'react-loading-components';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import Login from '../ui/components/Login';
import TalkBoardMain from '../ui/components/talk/TalkBoardMain';
import AddImageView from '../ui/components/add-image/AddImageView';
import { authorizeUser } from '../ui/actions';
import NotFound from '../ui/components/NotFound';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const initialState = {
  userId: '',
  userOnboarding: {},
  token: '',
  userGallery: [],
  categories: [],
  storyBoard: [],
};

function reducer(state = initialState, action) {
  if (action.type === 'AUTHORIZE_USER') {
    console.log(action)
    const userId = action.user.userId;
    const userOnboarding = action.user.userOnboarding;
    return Object.assign({}, state, {
      userId,
      userOnboarding,
    });
  }
  if (action.type === 'AUTHORIZE__CLEAR_USER_TOKEN') {
    return Object.assign({}, state, {
      userId: '',
      userOnboarding: {},
    });
  }
  if (action.type === 'USERGALLERY__LOADGALLERY') {
    const userGallery = action.gallery;
    return Object.assign({}, state, {
      userGallery,
    });
  }
  if (action.type === 'USERGALLERY__LOADCATEGORIES') {
    const { categories } = action;
    return Object.assign({}, state, {
      categories,
    });
  }
  if (action.type === 'STORYBOARD__ADD-IMAGE') {
    const storyBoard = state.storyBoard.concat(action.image);
    return Object.assign({}, state, {
      storyBoard,
    });
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
      return Object.assign({}, state, {
        storyBoard,
      });
    }
  }
  if (action.type === 'STORYBOARD__SWAP') {
    const index = state.storyBoard.indexOf(action.targetImage);
    let { storyBoard } = state;
    storyBoard.splice(index, 0, action.replacementImage);
    storyBoard = state.storyBoard.filter(img => action.targetImage !== img);
    return Object.assign({}, state, {
      storyBoard,
    });
  }
  return state;
}
const store = createStore(reducer, applyMiddleware(thunk));


const PrivateRoute = ({
  // eslint-disable-next-line
  component: Component, ...rest, auth,
}) => (
  <Route
    {...rest}
    render={props => (
      // eslint-disable-next-line
      localStorage.getItem('user')
        ? auth ? <Component {...props} /> : <Loading className="loading" type="tail_spin" width={100} height={100} fill="#f44242" />
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
    store.dispatch(authorizeUser({ token }))
      .then((res) => {
        if (res) {
          this.setState({ auth: true });
        }
      });
  }

  render() {
    const { auth } = this.state;
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" render={props => <Login {...props} />} />
            <PrivateRoute path="/talk" component={TalkBoardMain} auth={auth} />
            <PrivateRoute path="/add-images" component={AddImageView} auth={auth} />
            <Route exact path="/*" component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;

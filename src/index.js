import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global/index.css';
import './styles/_variables.scss'
import App from './layout/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

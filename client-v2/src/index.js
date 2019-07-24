// Applies global styling, and adds a serviceWorker for faster rendering
// Also grabs global enviornment variables from the .env file located in
// the root of the project
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './assets/styles/font.css';
import './assets/styles/normalize.css';

require('dotenv').config();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

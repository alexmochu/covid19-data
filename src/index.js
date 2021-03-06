import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import Router from './routes';
import configureStore from './store';
import initialState from './reducers/initialState';
import * as serviceWorker from './serviceWorker';

const store = configureStore(initialState);

const rootElement = document.getElementById('root')
ReactDOM.render(<Provider store={store}>
    <Router />
  </Provider>, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import 'normalize.css';
import 'whatwg-fetch';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';

import rootReducer from './reducers/index';
import App from './containers/app/app';

const store = createStore(rootReducer, applyMiddleware(promiseMiddleware));

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

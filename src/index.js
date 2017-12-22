import 'normalize.css';
import 'whatwg-fetch';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import { injectGlobal } from 'styled-components';

import rootReducer from './reducers/index';
import App from './containers/app';

injectGlobal`
  @import url("https://use.typekit.net/mwt6lgp.css");
  
  * {
    box-sizing: border-box;
  }
  
  body,
  button {
    font-family: "brother-1816", Helvetica, Arial, sans-serif;
  }
  
  select {
    max-width: 100%;
  }
`;

const store = createStore(rootReducer, applyMiddleware(promiseMiddleware));

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

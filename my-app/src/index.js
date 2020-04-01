import 'react-app-polyfill/ie11'; import 'react-app-polyfill/stable';
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css';
import { store } from './_helpers'
import App from './App'


ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

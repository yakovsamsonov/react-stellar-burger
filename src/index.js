import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from './services/store';
import { Provider } from 'react-redux';
import App from './components/app/app';

const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

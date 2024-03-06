/**
 * src\index.js
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>

  </React.StrictMode>
);

reportWebVitals();

export default store;

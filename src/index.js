import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { messages } from './lang/intl';
import { IntlProvider } from 'react-intl';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const root = ReactDOM.createRoot(document.getElementById('root'));

const locale = 'cn';

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider
        locale={locale}
        defaultLocale='cn'
        messages={messages[locale]}
      >
        <App />
      </IntlProvider>
    </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default store;

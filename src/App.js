/**
 * src\App.js
 */
import './App.css';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './Route';
import { useSelector } from 'react-redux';
import { messages } from './lang/intl';
import { IntlProvider } from 'react-intl';



function App() {

  const { locale } = useSelector(state => {
    return {
      locale: state.Lang.locale,
    };
  });

  return (
    <IntlProvider
      locale={locale}
      defaultLocale='zh-CN'
      messages={messages[locale]}
    >
      <div className='Myindex' style={{ backgroundColor: '#EFF4F9' }}>
        <BrowserRouter>
          <MyRoutes />
        </BrowserRouter>
      </div>
    </IntlProvider>
  );
}

export default App;

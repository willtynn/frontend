/**
 * src\App.js
 */
import './App.css';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './Route';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { messages } from './lang/intl';
import { IntlProvider } from 'react-intl';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const selectLocale = createSelector(
  state => state.Lang.locale,
  locale => ({ locale }) // 返回一个对象
);

function App() {
  const dispatch = useDispatch();
  // read i18nextLng
  useEffect(() => {
    const lang = localStorage.getItem('lang');
    if (lang) {
      dispatch({ type: 'UPDATE_LANGUAGE', data: lang });
    } else {
      dispatch({ type: 'UPDATE_LANGUAGE', data: 'zh-CN' });
    }
  }, []);

  const { locale } = useSelector(selectLocale);

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

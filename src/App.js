import './App.css';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './Route';

function App() {
  return (
    <div className='Myindex'>
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;

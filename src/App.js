import './App.css';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './Route';

function App() {
  return (
    <div className='Myindex' style={{backgroundColor: "#EFF4F9"}}>
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;

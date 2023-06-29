import './App.css';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './Route';

function App() {
  return (
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  );
}

export default App;

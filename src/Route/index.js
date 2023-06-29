import { Route, Routes } from 'react-router-dom';
import Menu from '../Pages/Menu/Menu';

export default function newRoute() {
  return (
    <Routes>
      <Route path='*' element={<Menu />} />
    </Routes>
  );
}

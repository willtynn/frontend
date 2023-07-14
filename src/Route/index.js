import { Route, Routes } from 'react-router-dom';
import Menu from '../Pages/Menu/index';
import BasicTable from '../Pages/TestPages';
import CustomizedTables from '../Pages/TestPages/table2'

export default function newRoute() {
  return (
    <Routes>
      <Route path='/test/' element={<Menu />} >
        <Route path='table1' element={<BasicTable/>} />
        <Route path='table2' element={<CustomizedTables/>} />
      </Route>
    </Routes>
  );
}

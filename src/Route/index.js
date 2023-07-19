import { Route, Routes } from 'react-router-dom';
import Menu from '../Pages/Menu/index';
import BasicTable from '../Pages/TestPages';
import CustomizedTables from '../Pages/TestPages/table2'
import ServiceOverview from '@/Pages/Service/overview';

export default function newRoute() {
  return (
    <Routes>
      <Route path='/test/' element={<Menu />} >
        <Route path='table1' element={<BasicTable/>} />
        <Route path='table2' element={<CustomizedTables/>} />
      </Route>
      <Route path='/home/' element={<Menu />} >
        <Route path='cluster/overview' element={<BasicTable/>} />
        <Route path='cluster/node' element={<CustomizedTables/>} />
        <Route path='service/overview' element={<ServiceOverview />} />
        <Route path='service/set' element={<CustomizedTables/>} />
        <Route path='service/link' element={<CustomizedTables/>} />
      </Route>
    </Routes>
  );
}

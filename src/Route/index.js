import { Route, Routes } from 'react-router-dom';
import Menu from '../Pages/Menu/index';
import BasicTable from '../Pages/TestPages';
import CustomizedTables from '../Pages/TestPages/table2'
import ServiceOverview from '@/Pages/Service/overview';
import ServiceQuery from '@/Pages/Service/query';
import ServiceDependency from '@/Pages/Service/dependency';

export default function newRoute() {
  return (
    <Routes>
      <Route path='/home/' element={<Menu />} >
        <Route path='cluster/'>
          <Route path='overview' element={<BasicTable />} />
          <Route path='node' element={<CustomizedTables />} />
        </Route>
        <Route path='service/'>
          <Route path='overview' element={<ServiceOverview />} />
          <Route path='query' element={<ServiceQuery />} />
          <Route path='dependency' element={<ServiceDependency />} />
          <Route path='link' element={<CustomizedTables />} />
        </Route>

      </Route>
    </Routes>
  );
}

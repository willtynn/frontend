import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Menu from '../Pages/Menu/index';
import BasicTable from '../Pages/TestPages';
import ClusterOverview from '../Pages/Cluster/overview';
import CustomizedTables from '../Pages/TestPages/table2'
import ServiceQuery from '@/Pages/Service/query';
import ServiceDependency from '@/Pages/Service/dependency';
import RouteTrace from '../Pages/Route/trace';

export default function newRoute() {
  return (
    <Routes>
      <Route path='*' element={<Navigate replace to='cluster/overview' />} />
      <Route path='/' element={<Menu />} >
        <Route path='/' element={<Navigate replace to='cluster/overview' />} />
        <Route path='cluster/'>
          <Route path='overview' element={<ClusterOverview />} />
          <Route path='node' element={<CustomizedTables />} />
        </Route>
        <Route path='service/'>
          {/* <Route path='overview' element={<ServiceOverview />} /> */}
          <Route path='query' element={<ServiceQuery />} />
          <Route path='dependency' element={<ServiceDependency />} />
          <Route path='link' element={<CustomizedTables />} />
        </Route>
        <Route path='route/'>
          <Route path='trace' element={<RouteTrace />} />
        </Route>

      </Route>
    </Routes>
  );
}

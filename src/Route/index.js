import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Menu from '../Pages/Menu/index';
import BasicTable from '../Pages/TestPages';
import ClusterOverview from '../Pages/Cluster/overview';
import CustomizedTables from '../Pages/TestPages/table2';
import ServiceQuery from '@/Pages/Service/query';
import ServiceDependency from '@/Pages/Service/dependency';
import RouteTrace from '../Pages/Route/trace';
import InstanceDeploy from '../Pages/Cluster/deploy';
import { HeadBar } from '../Pages/Menu/HeadBar';
import { ServiceDetail } from '../Pages/Service/detail';

export default function MyRoute() {
  return (
    <Routes>
      <Route path='*' element={<Navigate replace to='cluster/overview' />} />
      <Route path='detail/' element={<HeadBar />}>
        <Route path='service/:serviceId' element={<ServiceDetail />}/>

      </Route>
      <Route path='/' element={<Menu />}>
        <Route path='/' element={<Navigate replace to='cluster/overview' />} />
        <Route path='cluster/'>
          <Route path='overview' element={<ClusterOverview />} />
          <Route path='node' element={<CustomizedTables />} />
          <Route path='deploy' element={<InstanceDeploy />} />
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

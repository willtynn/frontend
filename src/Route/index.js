/**
 * src\Route\index.js
 */
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Menu from '../Pages/Menu/index';
import ClusterOverview from '../Pages/Cluster/overview';
import CustomizedTables from '../Pages/TestPages/table2';
import ServiceQuery from '@/Pages/Service/query';
import ServiceDependency from '@/Pages/Service/dependency';
import RouteTrace from '../Pages/Route/trace';
import RouteControlling from '../Pages/Route/RouteControlling';
import InstanceDeploy from '../Pages/Cluster/deploy';
import { HeadBar } from '../Pages/Menu/HeadBar';
import { ServiceDetail } from '../Pages/Service/detail';
import { RouteTraceInfoPage } from '../Pages/Route/trace/RouteTraceInfoPage';
import StressTesting from '../Pages/Application/StressTesting';
import ImagesList from '../Pages/Image';
import { TestPlanDetail } from '../Pages/Application/StressTesting/Detail';
import { ResultDetail } from '../Pages/Application/StressTesting/ResultDetail';
import SchemeDeploy from '../Pages/Cluster/scheme';
import EvolutionPlan from '../Pages/Evolution';
import { EvolutionPlanDetail } from '../Pages/Evolution/Detail';

export default function MyRoute() {
  return (
    <Routes>
      <Route path='*' element={<Navigate replace to='cluster/overview' />} />

      {/* 不存在导航栏 */}
      <Route path='detail/' element={<HeadBar />}>
        <Route path='service/:serviceId' element={<ServiceDetail />}/>
        <Route path='testplan/:testPlanId' element={<TestPlanDetail />}/>
        <Route path='evolutionplan/:evolutionPlanId' element={<EvolutionPlanDetail />}/>
        <Route path='planresult/:testResultId' element={<ResultDetail />}/>
        <Route path='trace/:start/:end/:traceId' element={<RouteTraceInfoPage />}/>
      </Route>

      {/* 存在导航栏 */}
      <Route path='/' element={<Menu />}>
        <Route path='/' element={<Navigate replace to='cluster/overview' />} />
        <Route path='cluster/'>
          <Route path='overview' element={<ClusterOverview />} />
          <Route path='scheme' element={<SchemeDeploy />} />
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
          <Route path='controlling' element={<RouteControlling />} />
        </Route>
        <Route path='application/'>
          <Route path="stress_testing" element={<StressTesting />} />
        </Route>
        <Route path='images/'>
          <Route path="list" element={<ImagesList />} />
        </Route>
        <Route path='evolution/'>
          <Route path="plan" element={<EvolutionPlan />} />
        </Route>
      </Route>
    </Routes>
  );
}

/**
 * src\Pages\Service\detail\DetailInfo.js
 */
import { Box } from '@mui/material';
import { Tabs } from '@mui/base/Tabs';
import {
  StyledTab,
  StyledTabsList,
  StyledTabPanel,
} from '../../../components/Tab';
import Information from './DetailBlocks/Information';
import RequestMonitor from './DetailBlocks/RequestMonitor';
import ServiceRequest from './DetailBlocks/ServiceRequest';
import ResourceMonitor from './DetailBlocks/ResourceMonitor';
import { useSelector } from 'react-redux';

export function DetailInfo(props) {
  const { instancesList, currentApplication } = useSelector(state => {
    return {
      instancesList: state.InferInstance.instancesList,
      currentApplication: state.InferInstance.currentApplication
    };
  });
  return (
    <Box
      sx={{
        width: 'calc(100% - 380px)',
        height: '300px',
      }}
    >
      <Tabs defaultValue={1}>
        <StyledTabsList>
          <StyledTab value={1}>详细信息</StyledTab>
          <StyledTab value={2}>服务请求情况</StyledTab>
          <StyledTab value={3}>请求监控</StyledTab>
          <StyledTab value={4}>资源监控</StyledTab>
        </StyledTabsList>
        <StyledTabPanel value={1}>
          <Information service={instancesList} />
        </StyledTabPanel>
        <StyledTabPanel value={2}>
          <ServiceRequest service={currentApplication} />
        </StyledTabPanel>
        <StyledTabPanel value={3}>
          <RequestMonitor service={currentApplication} />
        </StyledTabPanel>
        <StyledTabPanel value={4}>
          <ResourceMonitor service={currentApplication} />
        </StyledTabPanel>
      </Tabs>
      {/* </Stack> */}
    </Box>
  );
}

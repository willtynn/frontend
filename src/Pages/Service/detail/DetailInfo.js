import { Box } from '@mui/material';
import { Tabs } from '@mui/base/Tabs';
import {
  StyledTab,
  StyledTabsList,
  StyledTabPanel,
} from '../../../components/Tab';
import Information from './DetailBlocks/Information';
import RequestMonitor from './DetailBlocks/RequestMonitor';
import ResourceStatus from './DetailBlocks/ResourceStatus';
import ServiceRequest from './DetailBlocks/ServiceRequest';
import ResourceMonitor from './DetailBlocks/ResourceMonitor';
import { useSelector } from 'react-redux';

export function DetailInfo(props) {

  
  const { exactService } = useSelector(state => {
    return {
      exactService: state.Service.exactService,
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
          <StyledTab value={2}>资源状态</StyledTab>
          <StyledTab value={3}>服务请求情况</StyledTab>
          <StyledTab value={4}>请求监控</StyledTab>
          <StyledTab value={5}>资源监控</StyledTab>
        </StyledTabsList>
        <StyledTabPanel value={1}>
          <Information service={exactService}/>
        </StyledTabPanel>
        <StyledTabPanel value={2}>
          <ResourceStatus service={exactService}/>
        </StyledTabPanel>
        <StyledTabPanel value={3}>
          <ServiceRequest service={exactService}/>
        </StyledTabPanel>
        <StyledTabPanel value={4}>
          <RequestMonitor service={exactService}/>
        </StyledTabPanel>
        <StyledTabPanel value={5}>
          <ResourceMonitor service={exactService}/>
        </StyledTabPanel>
      </Tabs>
      {/* </Stack> */}
    </Box>
  );
}

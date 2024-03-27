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
import ResourceStatus from './DetailBlocks/ResourceStatus';
import ServiceRequest from './DetailBlocks/ServiceRequest';
import ResourceMonitor from './DetailBlocks/ResourceMonitor';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

export function DetailInfo(props) {
  const { exactService } = useSelector(state => {
    return {
      exactService: state.Service.exactService,
    };
  });

  const intl = useIntl();
  return (
    <Box
      sx={{
        width: 'calc(100% - 380px)',
        height: '300px',
      }}
    >
      <Tabs defaultValue={1}>
        <StyledTabsList>
          <StyledTab value={1}>{intl.messages['common.detailedInfo']}</StyledTab>
          <StyledTab value={2}>{intl.messages['serviceOverview.resourceStatus']}</StyledTab>
          <StyledTab value={3}>{intl.messages['serviceOverview.serviceRequestStatus']}</StyledTab>
          <StyledTab value={4}>{intl.messages['serviceOverview.requestMonitor']}</StyledTab>
          <StyledTab value={5}>{intl.messages['serviceOverview.resourceMonitor']}</StyledTab>
        </StyledTabsList>
        <StyledTabPanel value={1}>
          <Information service={exactService} />
        </StyledTabPanel>
        <StyledTabPanel value={2}>
          <ResourceStatus service={exactService} />
        </StyledTabPanel>
        <StyledTabPanel value={3}>
          <ServiceRequest service={exactService} />
        </StyledTabPanel>
        <StyledTabPanel value={4}>
          <RequestMonitor service={exactService} />
        </StyledTabPanel>
        <StyledTabPanel value={5}>
          <ResourceMonitor service={exactService} />
        </StyledTabPanel>
      </Tabs>
      {/* </Stack> */}
    </Box>
  );
}

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
import PartitionInfo from './DetailBlocks/Information';
import ServiceRequest from './DetailBlocks/ServiceRequest';
import { useSelector } from 'react-redux';
import { PartitionData } from './data';

export function DetailInfo(props) {
  const { instancesList, currentApplication } = useSelector(state => {
    return {
      instancesList: state.Instance.instancesList,
      currentApplication: state.Instance.currentApplication
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
          <StyledTab value={1}>拆分方案</StyledTab>
          <StyledTab value={2}>应用实例</StyledTab>
        </StyledTabsList>
        <StyledTabPanel value={1}>
          <PartitionInfo service={PartitionData} />
        </StyledTabPanel>
        <StyledTabPanel value={2}>
          <ServiceRequest service={currentApplication} />
        </StyledTabPanel>
      </Tabs>
      {/* </Stack> */}
    </Box>
  );
}

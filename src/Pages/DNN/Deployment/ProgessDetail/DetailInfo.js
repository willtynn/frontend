
import { Box } from '@mui/material';
import { Tabs } from '@mui/base/Tabs';
import {
  StyledTab,
  StyledTabsList,
  StyledTabPanel,
} from '@/components/Tab';
// import { Information } from './DetailBlocks/Information';
// import { TestResult } from './DetailBlocks/TestResult';
// import { AggregateReport } from './DetailBlocks/AggregateReport';
import PartitionInformation from '../SubPage/PartitionView/PartitionInformation';
import DeploymentInformation from '../SubPage/DeploymentView/DeploymentInformation'
import { useIntl } from 'react-intl';

export default function DetailInfo() {

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
          <StyledTab value={1}>{'拆分方案'}</StyledTab>
          <StyledTab value={2}>{'部署方案'}</StyledTab>
        </StyledTabsList>
        <StyledTabPanel value={1}>
          <PartitionInformation />
        </StyledTabPanel>
        <StyledTabPanel value={2}>
          <DeploymentInformation />
        </StyledTabPanel>
      </Tabs>
      {/* </Stack> */}
    </Box>
  );
}
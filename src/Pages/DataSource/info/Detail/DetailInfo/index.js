import { Box } from '@mui/material';
import { Tabs } from '@mui/base/Tabs';
import {
  StyledTab,
  StyledTabsList,
  StyledTabPanel,
} from '@/components/Tab';
import { Information } from './Information';
import { useIntl } from 'react-intl';

export default function DetailInfo({ dataSourceName }) {

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
          <StyledTab value={1}>{intl.messages['dataSource.dataDetailInfo']}</StyledTab>
        </StyledTabsList>
        <StyledTabPanel value={1}>
          {/* 将 dataSourceName 传递给 Information */}
          <Information dataSourceName={dataSourceName} />
        </StyledTabPanel>
      </Tabs>
    </Box>
  );
}
import { Box, Stack } from "@mui/material";
import SummaryBox, { SUMMARY_TYPE } from "../../components/SummaryBox";
import ServiceListTable from "../../ServiceManagement/ServiceListTable";

import { useIntl } from 'react-intl';

export function ServiceList() {
  const intl = useIntl();

  return (
    <Stack sx={{
      backgroundColor:'#fff',
      height:'100%',
      flexGrow:10
    }}>
      <SummaryBox title={intl.messages['industry.overviews.serviceList']} type={SUMMARY_TYPE.TABLE} children={
        <Box sx={{
          overflow:'auto',
          height:'100%'
        }}>
          <ServiceListTable/>
        </Box>
      }/>
    </Stack>
  )
}
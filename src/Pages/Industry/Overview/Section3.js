import { Box, Stack } from "@mui/material";
import SummaryBox, { SUMMARY_TYPE } from "../components/SummaryBox";
import ServiceListTable from "../ServiceManagement/ServiceListTable";
export function Section3() {
  return (
    <Stack sx={{
      backgroundColor:'#fff',
      height:'100%',
      flexGrow:10
    }}
    onMouseDown={(e) => {
      e.stopPropagation()
      if (e.currentTarget !== e.target) {
        return
      }
    }}>
      <SummaryBox title={'服务列表'} type={SUMMARY_TYPE.TABLE} children={
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
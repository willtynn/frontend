import { Stack } from "@mui/material";
import SummaryBox, { SUMMARY_TYPE } from "../../components/SummaryBox";
import BarChart from "../../components/ECharts/BarChar";
import { useSelector } from "react-redux";

export function CpuRank() {
  const { serviceList } = useSelector(state => state.Industry)
  if (serviceList){
    var services = serviceList.map(item => item.name)
    var cpuUsed = serviceList.map(item => item.cpu)
  } else {
    var services = []
    var cpuUsed = []
  }
  const dataLength = services.length

  return (
    <Stack sx={{
      width: '100%',
      height: '100%',
      flexGrow:7,
    }}
    onMouseDown={(e) => {
      e.stopPropagation()
      if (e.currentTarget !== e.target) {
        return
      }
    }}>
      <SummaryBox title={"服务CPU占用排名"} type={SUMMARY_TYPE.GRAPH} children={
        <BarChart label={services} value={cpuUsed} num={dataLength} />
      }/>
    </Stack>
  )
}
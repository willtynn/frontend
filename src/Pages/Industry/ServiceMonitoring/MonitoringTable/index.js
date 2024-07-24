import { Table, TableBody, TablePagination, TableRow } from "@mui/material";
import { StyledTableBodyCell, StyledTableHead, createTableHeadCell } from "../../components/StyledTable";

export default function MonitoringTable() {
  const headRowCells = [
    createTableHeadCell({ label: "服务名称" }),
    createTableHeadCell({ label: "响应时间" }),
    createTableHeadCell({ label: "错误率" }),
    createTableHeadCell({ label: "吞吐量" }),
    createTableHeadCell({ label: "CPU利用率" }),
    createTableHeadCell({ label: "内存利用率" }),
    createTableHeadCell({ label: "磁盘IO" }),
    createTableHeadCell({ label: "网络带宽" })
  ]
  return (
    <Table>
      <StyledTableHead headRowCells={headRowCells}/>
      <TableBody>
        <TableRow>
          <StyledTableBodyCell>路径管理</StyledTableBodyCell>
          <StyledTableBodyCell>6489</StyledTableBodyCell>
          <StyledTableBodyCell>4%</StyledTableBodyCell>
          <StyledTableBodyCell>134</StyledTableBodyCell>
          <StyledTableBodyCell>89%</StyledTableBodyCell>
          <StyledTableBodyCell>75%</StyledTableBodyCell>
          <StyledTableBodyCell>1256</StyledTableBodyCell>
          <StyledTableBodyCell>790</StyledTableBodyCell>
        </TableRow>
        <TableRow>
          <StyledTableBodyCell>机械臂配置</StyledTableBodyCell>
          <StyledTableBodyCell>3422</StyledTableBodyCell>
          <StyledTableBodyCell>3%</StyledTableBodyCell>
          <StyledTableBodyCell>367</StyledTableBodyCell>
          <StyledTableBodyCell>45%</StyledTableBodyCell>
          <StyledTableBodyCell>65%</StyledTableBodyCell>
          <StyledTableBodyCell>123</StyledTableBodyCell>
          <StyledTableBodyCell>634</StyledTableBodyCell>
        </TableRow>
        <TableRow>
          <TablePagination sx={{ borderBottom: 'none' }} page={0} rowsPerPage={10} count={100} />
        </TableRow>
      </TableBody>
    </Table>
  )
}
export const createMonitoringTableBodyRow=(data)=>{
  
}
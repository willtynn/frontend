import { Table, TableBody, TablePagination, TableRow } from "@mui/material";
import { StyledTableBodyCell, StyledTableHead, createTableHeadCell } from "../../components/StyledTable";

export default function ConfigurationTable() {
  const headRowCells = [
    createTableHeadCell({ label: "服务名称" }),
    createTableHeadCell({ label: "环境" }),
    createTableHeadCell({ label: "数据库类型" }),
    createTableHeadCell({ label: "数据库名称" }),
    createTableHeadCell({ label: "数据库用户名" }),
    createTableHeadCell({ label: "数据库密码" }),
    createTableHeadCell({ label: "日志输出路径" }),
    createTableHeadCell({ label: "运行主机" }),
    createTableHeadCell({ label: "服务端口" })
  ]
  return (
    <Table>
      <StyledTableHead headRowCells={headRowCells} />
      <TableBody>
        <TableRow>
          <StyledTableBodyCell>路径管理</StyledTableBodyCell>
          <StyledTableBodyCell>dev</StyledTableBodyCell>
          <StyledTableBodyCell>Mysql</StyledTableBodyCell>
          <StyledTableBodyCell>route</StyledTableBodyCell>
          <StyledTableBodyCell>root</StyledTableBodyCell>
          <StyledTableBodyCell>hitices_route</StyledTableBodyCell>
          <StyledTableBodyCell>/log/route/</StyledTableBodyCell>
          <StyledTableBodyCell>192.10.168.34</StyledTableBodyCell>
          <StyledTableBodyCell>8764</StyledTableBodyCell>
        </TableRow>
        <TableRow>
          <StyledTableBodyCell>机械臂配置</StyledTableBodyCell>
          <StyledTableBodyCell>test</StyledTableBodyCell>
          <StyledTableBodyCell>Nosql</StyledTableBodyCell>
          <StyledTableBodyCell>robotic_arm</StyledTableBodyCell>
          <StyledTableBodyCell>root</StyledTableBodyCell>
          <StyledTableBodyCell>hitices_robotic</StyledTableBodyCell>
          <StyledTableBodyCell>/log/robotic/</StyledTableBodyCell>
          <StyledTableBodyCell>192.10.168.67</StyledTableBodyCell>
          <StyledTableBodyCell>7423</StyledTableBodyCell>
        </TableRow>
        <TableRow>
          <TablePagination sx={{ borderBottom: 'none' }} page={0} rowsPerPage={10} count={100} />
        </TableRow>
      </TableBody>
    </Table>
  )
}
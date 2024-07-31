import { Table, TableBody, TablePagination, TableRow } from "@mui/material";
import { StyledTableBodyCell, StyledTableHead, createTableHeadCell } from "../../components/StyledTable";
import { useDispatch, useSelector } from "react-redux";
import { getServiceList } from "../../../../actions/industryAction";
import {useEffect} from "react";
import moment from 'moment';

export default function ServiceListTable() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getServiceList())
  }, [])

  const { serviceList } = useSelector(state => state.Industry)
  const headRowCells = [
    createTableHeadCell({ label: "服务ID" }),
    createTableHeadCell({ label: "服务名称" }),
    createTableHeadCell({ label: "状态" }),
    createTableHeadCell({ label: "发布时间" }),
    createTableHeadCell({ label: "版本" })
  ]

  const convertW2C = (word) => {
    if(word === 'release') return "已发布"
    else if (word === 'stop') return "已停止"
    else if (word === 'running') return "运行中"
    else return "异常"
  }

  return (
    <Table sx={{height: '200px'}}>
      <StyledTableHead headRowCells={headRowCells} />
      <TableBody>
        {serviceList ? serviceList.map(item => {
          return(
            <TableRow>
              <StyledTableBodyCell>{item.id}</StyledTableBodyCell>
              <StyledTableBodyCell>{item.name}</StyledTableBodyCell>
              <StyledTableBodyCell>{convertW2C(item.status)}</StyledTableBodyCell>
              <StyledTableBodyCell>{moment(item.releaseTime).format('YYYY-MM-DD HH:mm:ss')}</StyledTableBodyCell>
              <StyledTableBodyCell>{item.version}</StyledTableBodyCell>
            </TableRow>
          )
        }) : null}
        <TableRow>
          <TablePagination sx={{ borderBottom: 'none' }} page={0} rowsPerPage={10} count={100}  onPageChange={() => {}}/>
        </TableRow>
      </TableBody>
    </Table>
  )
}
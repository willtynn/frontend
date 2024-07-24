import {
  Box,
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Table,
  TableBody,
  TablePagination,
  TableRow
} from "@mui/material";
import { StyledTableBodyCell, StyledTableHead, createTableHeadCell } from "../../components/StyledTable";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getImageList, getImageLog} from "../../../../actions/industryAction";

export default function LogTable() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getImageList())
  }, [])

  const { imageList, imageLog } = useSelector(state => state.Industry)
  const headRowCells = [
    createTableHeadCell({label:"容器ID"}),
    createTableHeadCell({label:"容器名称"}),
    createTableHeadCell({label:"状态"}),
    createTableHeadCell({label:"服务名称"}),
    createTableHeadCell({label:"实例位置"}),
  ]
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleRowClick = (item) => {
    dispatch(getImageLog(item.host, item.containerId));
    setOpen(true);
  };
  return (
    <>
      <Table>
        <StyledTableHead headRowCells={headRowCells}/>
        <TableBody>
          {imageList.map(item => {
            return(
              <TableRow
                key={item.containerId}
                onClick={() => handleRowClick(item)}
              >
                <StyledTableBodyCell>{item.containerId.substring(0, 10)}</StyledTableBodyCell>
                <StyledTableBodyCell>{item.name}</StyledTableBodyCell>
                <StyledTableBodyCell>{item.status}</StyledTableBodyCell>
                <StyledTableBodyCell>{item.service}</StyledTableBodyCell>
                <StyledTableBodyCell>{item.host}</StyledTableBodyCell>
              </TableRow>
            )
          })}
          <TableRow>
            <TablePagination sx={{ borderBottom: 'none' }} page={0} rowsPerPage={10} count={100} onPageChange={() => {}}/>
          </TableRow>
        </TableBody>
      </Table>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Dialog
          open={open} onClose={() => {setOpen(false)}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={'1000px'}
        >
          <DialogTitle id="alert-dialog-title" sx={{backgroundColor: '#253ba8', color:'#FFF'}}>
            {"容器日志"}
          </DialogTitle>
          <DialogContent sx={{backgroundColor:'#2b2929'}}>
            <DialogContentText id="alert-dialog-description">
              {imageLog.map(item => {
                return <Box sx={{color:'#FFF'}}>{item}</Box>
              })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{setOpen(false)}}>关闭</Button>
          </DialogActions>
        </Dialog>
      </Modal>
    </>

  )
}
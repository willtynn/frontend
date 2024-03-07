import React, {useState} from 'react';
import {Button, IconButton, TableRow, Tooltip} from '@mui/material';
import { SmallLightFont } from '@/components/Fonts';
import { StyledTableBodyCell } from '@/components/DisplayTable';
import { calculateDuration } from '../functions/func.js';
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {StyledModal} from "../../../../components/Modal";

const defaultMinWidth = ['100px', '100px', '300px', '300px', '50px', '200px', '50px'];

export function StrategyRow(props) {
  const { key, rowData, onRowClick, onRowDeleteClick, selected, minWidth, showRows } = props;
  const [delOpen, setDelOpen] = useState(false);
  let _minWidth = minWidth;
  if (!minWidth) {
    _minWidth = defaultMinWidth;
  }
  if (rowData) {
    return (
      <React.Fragment>
        <StyledModal open={delOpen} onClose={() => {setDelOpen(false)}} >
          <Dialog
            open={delOpen} onClose={() => {setDelOpen(false)}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"确认删除拆分策略吗?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                删除拆分策略可能会影响到其他依赖该策略的功能和应用。在删除前，请确保您已经与相关团队和用户沟通，并了解潜在的风险和影响
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>{setDelOpen(false)}}>取消</Button>
              <Button
                onClick={()=>{
                  onRowDeleteClick(rowData.id);
                  setDelOpen(false);
                }}
                autoFocus>
                确认
              </Button>
            </DialogActions>
          </Dialog>
        </StyledModal>

        <TableRow
          hover
          selected={selected}
          key={key}
          sx={{
            position: 'sticky',
            backgroundColor: '#FFFFFF',
          }}
        >
          {showRows[0] ? (
            <StyledTableBodyCell
              component='th'
              scope='row'
              align='center'
              sx={{ width: _minWidth[0] }}
              onClick={onRowClick}
            >
              <Tooltip title={rowData.id} placement='top-end'>
                <SmallLightFont
                  style={{
                    color: 'black',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <>{rowData.id}</>
                </SmallLightFont>
              </Tooltip>
            </StyledTableBodyCell>
          ) : (
            <></>
          )}
          {showRows[1] ? (
            <StyledTableBodyCell
              align='center'
              sx={{ width: _minWidth[1] }}
              onClick={onRowClick}
            >
              <Tooltip title={rowData.partition_name} placement='top-end'>
                <SmallLightFont
                  style={{
                    color: 'black',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <>{rowData.partition_name}</>
                </SmallLightFont>
              </Tooltip>
            </StyledTableBodyCell>
          ) : (
            <></>
          )}
          {showRows[2] ? (
            <StyledTableBodyCell
              align='center'
              sx={{ width: _minWidth[2] }}
              onClick={onRowClick}
            >
              <Tooltip title={rowData.model_name} placement='top-end'>
                <>{rowData.model_name}</>
              </Tooltip>
            </StyledTableBodyCell>
          ) : (
            <></>
          )}
          {showRows[3] ? (
            <StyledTableBodyCell
              align='center'
              sx={{ width: _minWidth[3] }}
              onClick={onRowClick}
            >
              <Tooltip title={rowData.model_path} placement='top-end'>
                <>{rowData.model_path}</>
              </Tooltip>
            </StyledTableBodyCell>
          ) : (
            <></>
          )}
          {showRows[4] ? (
            <StyledTableBodyCell
              align='center'
              sx={{ width: _minWidth[4] }}
              onClick={onRowClick}
            >
              <Tooltip title={rowData.sub_item} placement='top-end'>
                <>{rowData.sub_item}</>
              </Tooltip>
            </StyledTableBodyCell>
          ) : (
            <></>
          )}
          {showRows[5] ? (
            <StyledTableBodyCell
              align='center'
              sx={{ width: _minWidth[5] }}
              onClick={onRowClick}
            >
              <Tooltip title={rowData.time} placement='top-end'>
                <>{rowData.time}</>
              </Tooltip>
            </StyledTableBodyCell>
          ) : (
            <></>
          )}
          {/* delete button */}
          {showRows[6] ? (
            <StyledTableBodyCell
              align='center'
              sx={{ width: _minWidth[6] }}
            >
              <Tooltip title="Delete">
                <IconButton aria-label="delete"
                  onClick={() => {setDelOpen(true)}}
                >
                  <DeleteIcon size='small'
                    sx={{color: '#79879c', ':hover': {color:'#36435c'}}}
                  />
                </IconButton>
              </Tooltip>
            </StyledTableBodyCell>
          ) : (
            <></>
          )}
        </TableRow>
      </React.Fragment>
    );
  } else {
    //统计列数
    let num = showRows.reduce((total, item) => {
      return total + (item & 1);
    }, 0);
    let cells = [];
    for (let i = 1; i < num; i++) {
      cells.push(
        <StyledTableBodyCell
          align='center'
          sx={{ minWidth: _minWidth[i], color: 'transparent' }}
        >
          -
        </StyledTableBodyCell>
      );
    }
    return (
      <React.Fragment>
        <TableRow
          onClick={onRowClick}
          hover
          selected={selected}
          sx={{
            position: 'sticky',
            backgroundColor: '#FFFFFF',
          }}
        >
          <StyledTableBodyCell
            component='th'
            scope='row'
            sx={{ minWidth: _minWidth[0], color: 'transparent' }}
          >
            -
          </StyledTableBodyCell>
          {cells}
        </TableRow>
      </React.Fragment>
    );
  }
}

import React from "react";
import dayjs from "dayjs";
import {
  TableCell,
  TableRow,
} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';

/*const hoverTheme = createTheme({
  components: {
    // Name of the component
    MuiTableRow: {
      styleOverrides: {
        // Name of the slot
        root: {
          '&$hover:hover': {
            backgroundColor: '#11FF22',
          },
        },
        hover: {
          backgroundColor: '#11FF22',
        },
      },
    },
  },
});
*/


export function DataRow(props) {
    const { rowData, color, onRowClick, selected } = props;

    function calculateDuration(duration){
      //要显示小数点后三位
      if(duration < 1000){
        return duration + 'μs';
      }else if(duration < 1000000){
        return (duration / 1000).toFixed(3) + 'ms';
      }else{
        duration /= 1000000;
      }
      if(duration < 60){
        return duration.toFixed(3) + 's';
      }else if(duration < 3600){
        return (duration / 60).toFixed(3) + 'min';
      }else if(duration < 86400){
        return (duration / 3600).toFixed(3) + 'h';
      }else{
        return (duration / 86400).toFixed(3) + 'd';
      }
      //return 'Infinity';
    }
    return (
      <React.Fragment>
        <TableRow onClick={onRowClick} sx={{ backgroundColor: color }} hover selected={selected}>
          <TableCell component="th" scope="row">{rowData.service}</TableCell>
          <TableCell align="center" sx={{ borderLeft: "solid 1px #B8B5B7", borderRight: "solid 1px #B8B5B7" }}>
            {rowData.spanNum}
          </TableCell>
          <TableCell align="center">{dayjs(rowData.time).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
          <TableCell align="center">{calculateDuration(rowData.duration)}</TableCell>
          <TableCell align="center">{rowData.status}</TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
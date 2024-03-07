/**
 * src\Pages\Service\detail\DetailBlocks\Information.js
 */
import {
  Stack,
  Tooltip,
  Table,
  TableHead,
  TableRow,
  IconButton,
  TableBody,
  TableCell,
} from '@mui/material';
import { useEffect, useState, useRef, useMemo } from 'react';
import { fontFamily, formatDatetimeString } from '@/utils/commonUtils';
import { KubeSimpleCard } from '@/components/InfoCard';
import {
  StyledTableBodyCell,
  StyledTableRowCell,
  StyledTableContainer,
} from '@/components/DisplayTable';
import PolylineIcon from '@mui/icons-material/Polyline';
import { useNavigate } from 'react-router';
import { setSnackbarMessageAndOpen } from '@/actions/snackbarAction';
import { SEVERITIES } from '@/components/CommonSnackbar';
import { useDispatch } from 'react-redux';
import Question from '@/assets/Question.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';

function createRow(
  id,
  label,
  isOrder = true,
  minWidth = '110px',
  maxWidth = '220px',
  show = true,
  align = 'center',
  colSpan = 1,
  rowSpan = 1
) {
  return {
    id,
    label,
    isOrder,
    minWidth,
    maxWidth,
    show,
    align,
    colSpan,
    rowSpan,
  };
}

export default function PartitionInfo(props) {
  const { service } = props;
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const headRow = [
    createRow('id', '拆分方案ID', true, '40px', '40', true, 'left'),
    createRow('name', '拆分方案名称', false, '40px', '40px', true, 'left'),
    createRow('path', '模型路径', false, '40px', '40px', true, 'left'),
    createRow('sub', '子模型个数', false, '40px', '40px', true, 'left'),
    createRow('time', '时间', false, '40px', '40px', true, 'left'),
  ];

 useEffect(() => {
    if (service === null) {
      return;
    }
    const tmpData = service.map((value, index) => {
      return {
        id: value.id,
        path: value.model_path,
        name: value.partition_name,
        sub: value.sub_item,
        time: value.time
      };
    });
    // setCount(tmpData.length);
    setTableData(tmpData);
  }, [service]);

  return (
    <Stack direction='column' spacing={1.5}>
      <KubeSimpleCard title='拆分方案'>
        <StyledTableContainer sx={{ maxHeight: '680px' }}>
          <Table
            stickyHeader
            size='small'
            sx={{
              tableLayout: 'auto',
              minWidth: '100%',
            }}
          >
            <TableHead>
              <TableRow>
                {headRow.map((item, index) => (
                  <StyledTableRowCell
                    key={item.id}
                    align={item.align}
                    sx={{
                      maxWidth: item.maxWidth,
                      minWidth: item.minWidth,
                    }}
                  >
                    {item.label}
                  </StyledTableRowCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData !== null ? (
                tableData.map((row, index) => (
                  <TableRow
                    key={row.id + '' + index}
                    aria-checked={false}
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                      fontWeight: 600,
                      maxWidth: '110px',
                      position: 'sticky',
                      left: 0,
                      zIndex: 6,
                      backgroundColor: '#FFF !important',
                    }}
                    selected={false}
                  >
                    <StyledTableBodyCell
                      align={headRow[0].align}
                      sx={{
                        maxWidth: headRow[0].maxWidth,
                        minWidth: headRow[0].minWidth,
                      }}
                    >
                      {row.id}
                      {/* {decodeInterfaceSymbol(row.id)[1]} */}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[1].align}
                      sx={{
                        maxWidth: headRow[1].maxWidth,
                        minWidth: headRow[1].minWidth,
                      }}
                    >
                      {row.name}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[2].align}
                      sx={{
                        maxWidth: headRow[2].maxWidth,
                        minWidth: headRow[2].minWidth,
                      }}
                    >
                      {row.path}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[3].align}
                      sx={{
                        maxWidth: headRow[3].maxWidth,
                        minWidth: headRow[3].minWidth,
                      }}
                    >
                      {row.sub}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[4].align}
                      sx={{
                        maxWidth: headRow[4].maxWidth,
                        minWidth: headRow[4].minWidth,
                      }}
                    >
                      {formatDatetimeString(row.time)}
                    </StyledTableBodyCell>
                  </TableRow>
                ))
              ) : (
                <TableRow style={{ height: '220px' }}>
                  <TableCell
                    colSpan={5}
                    sx={{
                      textAlign: 'center',
                      fontSize: '20px',
                      fontFamily: fontFamily,
                      fontStyle: 'normal',
                    }}
                  >
                    <Question />
                    <NormalBoldFont>无数据</NormalBoldFont>

                    <SmallLightFont>您可以尝试刷新数据</SmallLightFont>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </KubeSimpleCard>
    </Stack>
  );
}

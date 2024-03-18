/**
 * src\Pages\Service\detail\DetailBlocks\Information.js
 */
import {
  Stack,
  Table,
  TableHead,
  TableRow,
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
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import Question from '@/assets/Question.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import RunningIcon from '@/assets/RunningIcon.svg';
import PendingIcon from '@/assets/PendingIcon.svg';
import FailedIcon from '@/assets/FailedIcon.svg';
import SucceededIcon from '@/assets/SucceededIcon.svg';

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

export const RUNNING = 'Running';
export const PENDING = 'Pending';
export const FAILED = 'Failed';
export const SUCCEEDED = 'Succeeded';

const StatusIcon = phase => {
  if (phase === RUNNING) {
    return <RunningIcon />;
  }
  if (phase === PENDING) {
    return <PendingIcon />;
  }
  if (phase === FAILED) {
    return <FailedIcon />;
  }
  return <SucceededIcon />;
};

const StatusText = phase => {
  if (phase === RUNNING) {
    return <span>Running&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>;
  }
  if (phase === PENDING) {
    return <span>Pending&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>;
  }
  if (phase === FAILED) {
    return (
      <span>Failed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    );
  }
  return <span>Succeeded</span>;
};

export default function Information(props) {
  const { service } = props;
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const headRow = [
    createRow('name', '名称', false, '40px', '40px', true, 'left'),
    createRow('phase', '状态', false, '40px', '40px', true, 'left'),
    createRow('hostIP', 'Host IP', false, '40px', '40px', true, 'left'),
    createRow('podIP', 'Pod IP', false, '40px', '40px', true, 'left'),
    createRow('startTime', '启动时间', false, '40px', '40px', true, 'left'),
  ];

 useEffect(() => {
    if (service === null || !service.items) {
      return;
    }
    const items = service.items;
    const tmpData = items.map((value, index) => {
      return {
        name: value.metadata.name,
        phase: value.status.phase,
        hostIP: value.status.hostIP,
        podIP: value.status.podIP,
        startTime: value.status.startTime,
      };
    });
    // setCount(tmpData.length);
    setTableData(tmpData);
  }, [service]);

  return (
    <Stack direction='column' spacing={1.5}>
      <KubeSimpleCard title='实例集合'>
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
                      {row.name}
                      {/* {decodeInterfaceSymbol(row.id)[1]} */}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[1].align}
                      sx={{
                        maxWidth: headRow[1].maxWidth,
                        minWidth: headRow[1].minWidth,
                      }}
                    >
                      <Stack
                        alignItems='center'
                        direction='row'
                        justifyContent='left'
                        spacing={2}
                      >
                        {StatusIcon(row.phase)}
                        <span
                          style={{
                            height: '30px',
                            lineHeight: '30px',
                          }}
                        >
                          {StatusText(row.phase)}
                        </span>
                      </Stack>
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[2].align}
                      sx={{
                        maxWidth: headRow[2].maxWidth,
                        minWidth: headRow[2].minWidth,
                      }}
                    >
                      {row.hostIP}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[3].align}
                      sx={{
                        maxWidth: headRow[3].maxWidth,
                        minWidth: headRow[3].minWidth,
                      }}
                    >
                      {row.podIP}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[4].align}
                      sx={{
                        maxWidth: headRow[4].maxWidth,
                        minWidth: headRow[4].minWidth,
                      }}
                    >
                      {formatDatetimeString(row.startTime)}
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

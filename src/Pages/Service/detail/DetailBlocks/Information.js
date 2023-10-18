import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Box,
  Input,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
  Tooltip,
  Table,
  TableHead,
  TableRow,
  IconButton,
  TableBody,
} from '@mui/material';
import { SmallLightFont, SuperLargeBoldFont } from '@/components/Fonts';
import {
  OutlinedButton,
  KubeConfirmButton,
  KubeCancelButton,
} from '@/components/Button';
import { checkVersionFormat } from '@/utils/commonUtils';
import { fontFamily } from '@/utils/commonUtils';
import { KubeSimpleCard } from '../../../../components/InfoCard';
import {
  StyledTableBodyCell,
  StyledTableRowCell,
  StyledTableBox,
  StyledTableContainer,
} from '@/components/DisplayTable';
import PolylineIcon from '@mui/icons-material/Polyline';
import { useNavigate } from 'react-router';

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

export default function Information(props) {
  const { service } = props;
  const navigate = useNavigate();

  const headRow = [
    createRow('id', '接口ID', false, '50px', '50px', true, 'left'),
    createRow('path', '请求的路径', false, '50px', '50px', true, 'center'),
    createRow(
      'inputSize',
      '输入数据大小',
      false,
      '50px',
      '50px',
      true,
      'center'
    ),
    createRow(
      'outputSize',
      '输出数据大小',
      false,
      '50px',
      '50px',
      true,
      'center'
    ),
    createRow('dependency', '接口依赖', false, '30px', '30px', true, 'center'),
  ];

  const resourceAndCapabilityHeadRow = [
    createRow('cpu', 'cpu资源', false, '70px', '120px', true, 'center'),
    createRow('ram', 'ram资源', false, '70px', '120px', true, 'center'),
    createRow('disk', '硬盘资源', false, '70px', '120px', true, 'center'),
    createRow(
      'gpuCore',
      'gpu-core资源',
      false,
      '70px',
      '120px',
      true,
      'center'
    ),
    createRow('gpuMem', 'gpu内存资源', false, '70px', '120px', true, 'center'),
  ];

  const handleInterfaceDependencyClick = id => {
    navigate(`/service/dependency?type=interface&by=0&id=${id}`);
  };
  return (
    <Stack direction='column' spacing={1.5}>
      <KubeSimpleCard title='接口集合'>
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
              {service !== null ? (
                service.interfaces.map((row, index) => (
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
                    <StyledTableBodyCell align={headRow[0].align}>
                      {row.id}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align={headRow[1].align}>
                      {row.path}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align={headRow[2].align}>
                      {row.inputSize}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align={headRow[3].align}>
                      {row.outputSize}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align={headRow[4].align}>
                      <Tooltip title='查看依赖'>
                        <IconButton
                          onClick={() => {
                            handleInterfaceDependencyClick(row.id);
                          }}
                          size='small'
                        >
                          <PolylineIcon fontSize='small' />
                        </IconButton>
                      </Tooltip>
                    </StyledTableBodyCell>
                  </TableRow>
                ))
              ) : (
                <TableRow style={{ height: '120px' }}>
                  <StyledTableBodyCell
                    colSpan={5}
                    sx={{
                      textAlign: 'center',
                      fontSize: '20px',
                      fontFamily: fontFamily,
                      fontStyle: 'normal',
                    }}
                  >
                    There are no results
                  </StyledTableBodyCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </KubeSimpleCard>
      <KubeSimpleCard title='资源与能力'>
        <StyledTableContainer
          sx={{ maxHeight: '680px', overflow: 'auto', width: '100%' }}
        >
          <Table
            stickyHeader
            aria-label='simple table'
            size='small'
            sx={{
              tableLayout: 'auto',
              minWidth: '100%',
            }}
          >
            <TableHead>
              <TableRow>
                <StyledTableRowCell align='left'>Type</StyledTableRowCell>
                {resourceAndCapabilityHeadRow.map((item, index) => (
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
            {service !== null ? (
              <TableBody>
                <TableRow
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
                  <StyledTableBodyCell align='left'>
                    空闲时占用资源
                  </StyledTableBodyCell>
                  {service &&
                    resourceAndCapabilityHeadRow.map((item, index) => (
                      <StyledTableBodyCell
                        align='center'
                        sx={{
                          maxWidth: item.maxWidth,
                          minWidth: item.minWidth,
                        }}
                      >
                        {service.idleResource[item.id]}
                      </StyledTableBodyCell>
                    ))}
                </TableRow>
                <TableRow
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
                  <StyledTableBodyCell align='left'>
                    期望资源
                  </StyledTableBodyCell>
                  {service &&
                    resourceAndCapabilityHeadRow.map((item, index) => (
                      <StyledTableBodyCell
                        key={item.id}
                        align='center'
                        sx={{
                          maxWidth: item.maxWidth,
                          minWidth: item.minWidth,
                        }}
                      >
                        {service.desiredResource[item.id]}
                      </StyledTableBodyCell>
                    ))}
                </TableRow>
                <TableRow
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
                  <StyledTableBodyCell align='left'>
                    处理能力
                  </StyledTableBodyCell>
                  <StyledTableBodyCell align='center' colSpan={5}>
                    {service && service.desiredCapability}
                  </StyledTableBodyCell>
                  {/* {
                    resourceAndCapabilityHeadRow.map((item, index) =>
                      <StyledTableCell
                        key={item.id}
                        align='center'
                      >
                        {data.desiredCapability[item.id]}
                      </StyledTableCell>
                    )
                  } */}
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                <TableRow style={{ height: '120px' }}>
                  <StyledTableBodyCell
                    colSpan={6}
                    sx={{
                      textAlign: 'center',
                      fontSize: '20px',
                      fontFamily: fontFamily,
                      fontStyle: 'normal',
                    }}
                  >
                    There are no results
                  </StyledTableBodyCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </StyledTableContainer>
      </KubeSimpleCard>
    </Stack>
  );
}

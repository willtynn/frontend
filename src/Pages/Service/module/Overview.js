import { useState } from 'react';
import {
  StyledTableBodyCell,
  StyledTableRowCell,
  StyledTableBox,
  StyledTableContainer,
} from '@/components/DisplayTable';
import {
  CircularProgress,
  TableRow,
  TableHead,
  Box,
  Table,
  TableCell,
  TableContainer,
  Typography,
  IconButton,
  Tooltip,
  Toolbar,
  TableBody,
  tableCellClasses,
} from '@mui/material';
import { styled } from '@mui/system';
import { transformVersion, shadowStyle } from '@/utils/commonUtils';
import { fontFamily } from "@/utils/commonUtils";

function TextLabel(props) {
  const { text } = props;
  return (
    <Box>
      <Tooltip title={text}>
        <Box
          component='div'
          sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {text}
        </Box>
      </Tooltip>
    </Box>
  );
}

function createRow(
  id,
  label,
  isOrder = true,
  minWidth = '110px',
  maxWidth = '220px',
  show = true,
  colSpan = 1,
  rowSpan = 1
) {
  return { id, label, isOrder, minWidth, maxWidth, show, colSpan, rowSpan };
}

const headFirstRow = [
  createRow('id', '服务ID', false, '240px', '280px', true, 1, 1),
  createRow('name', '服务名称', false, '190px', '190px', true, 1, 1),
  createRow('repo', '代码仓库地址', false, '200px', '240px', true, 1, 1),
  createRow(
    'imageUrl',
    '镜像仓库地址&Tag',
    false,
    '150px',
    '150px',
    true,
    1,
    1
  ),
  createRow('version', '服务版本', false, '170px', '200px', true, 1, 1),
  createRow('interfaces', '接口集合', false, '170px', '200px', true, 1, 1),
  // createRow('idleResource', '空闲时占用资源', false, '170px', '200px', true, 5, 1),
  // createRow('desiredResource', '期望资源', false, '170px', '200px', true, 5, 1),
  // createRow('desiredCapability', '处理能力', false, '170px', '200px', true, 5, 1),
];

const headSecondRow = [
  createRow('major', '大版本号', false, '240px', '280px', true),
  createRow('minor', '小版本号', false, '190px', '190px', true),
  createRow('patch', 'Patch版本号', false, '200px', '240px', true),
  // createRow('idleCpu', 'cpu资源', false, '150px', '150px', true),
  // createRow('idleRam', 'ram资源', false, '170px', '200px', true),
  // createRow('idleDisk', '硬盘资源', false, '170px', '200px', true),
  // createRow('idleGpuCore', 'gpu-core资源', false, '170px', '200px', true),
  // createRow('idleGpuMem', 'gpu内存资源', false, '170px', '200px', true),
  // createRow('desiredCpu', 'cpu资源', false, '150px', '150px', true),
  // createRow('desiredRam', 'ram资源', false, '170px', '200px', true),
  // createRow('desiredDisk', '硬盘资源', false, '170px', '200px', true),
  // createRow('desiredGpuCore', 'gpu-core资源', false, '170px', '200px', true),
  // createRow('desiredGpuMem', 'gpu内存资源', false, '170px', '200px', true),
  // createRow('desiredCapabilityCpu', 'cpu资源', false, '150px', '150px', true),
  // createRow('desiredCapabilityRam', 'ram资源', false, '170px', '200px', true),
  // createRow('desiredCapabilityDisk', '硬盘资源', false, '170px', '200px', true),
  // createRow('desiredCapabilityCore', 'gpu-core资源', false, '170px', '200px', true),
  // createRow('desiredCapabilityMem', 'gpu内存资源', false, '170px', '200px', true),
];

const versionKey = ['major', 'minor', 'patch'];

const resourceKey = ['cpu', 'ram', 'disk', 'gpuCore', 'gpuMem'];

export default function ServiceOverview(props) {
  const { data, setIndex, selectedIndex } = props;
  const [orderType, setOrderType] = useState('version'); //排序的表头
  const [orderAs, setOrderAs] = useState('asc'); //排序的顺序
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleRequestSort = (_event, property) => {
    const isAsc = orderType === property && orderAs === 'asc';
    setOrderAs(isAsc ? 'desc' : 'asc');
    setOrderType(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = event => {
    setDense(event.target.checked);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  return (
    <StyledTableBox id='BasicTableBox'>
      <StyledTableContainer
        sx={{
          maxHeight: '680px',
        }}
      >
        <Table
          stickyHeader
          size='small'
          sx={{
            tableLayout: 'auto',
          }}
        >
          <TableHead>
            <TableRow>
              {headFirstRow.map((item, index) => (
                <StyledTableRowCell
                  key={item.id}
                  align='center'
                  rowSpan={item.rowSpan}
                  colSpan={item.colSpan}
                >
                  {item.label}
                </StyledTableRowCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && data !== null && data.length !== 0 ? (
              data.map((row, index) => {
                return (
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
                      backgroundColor:
                        index === selectedIndex
                          ? '#E8EDFB !important'
                          : '#F1F3F5 !important',
                    }}
                    selected={false}
                    onClick={() => {
                      setIndex(index);
                    }}
                  >
                    <StyledTableBodyCell align='center'>
                      {row.id}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align='center'>
                      <TextLabel text={row.name} />
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align='center'>
                      <TextLabel text={row.repo} />
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align='center'>
                      <TextLabel text={row.imageUrl} />
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align='center'>
                      <TextLabel text={transformVersion(row.version)} />
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align='center'>
                      <TextLabel text={row.interfaces.length} />
                    </StyledTableBodyCell>
                  </TableRow>
                );
              })
            ) : !loading ? (
              <TableRow style={{ height: '120px' }}>
                <TableCell
                  colSpan={6}
                  sx={{
                    textAlign: 'center',
                    fontSize: '20px',
                    fontFamily: fontFamily,
                    fontStyle: 'normal',
                  }}
                >
                  There are no results
                </TableCell>
              </TableRow>
            ) : (
              <div></div>
            )}
          </TableBody>
        </Table>
        {loading && (
          <Box
            sx={{
              width: 'auto',
              marginTop: '150px',
              marginLeft: '50%',
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </StyledTableContainer>
    </StyledTableBox>
  );
}

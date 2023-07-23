import { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {
  MyTableHeader,
  TableFooter,
  StyledTableCell,
  NewStyledTableCell
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

function TextLabel(props) {
  const { text } = props;
  return (
    <Box>
      <Tooltip
        title={text}
      >
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

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
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

const servicesInfo = [
  {
    id: "aaa",
    name: "service_a",
    repo: "https://github.com/aaa/service_a",
    imageUrl: "https://github.com/aaa/service_a",
    version: {
      major: "1",
      minor: "2",
      patch: "3"
    },
    interfaces: [
      {
        id: "interfact_1",
        path: "service_a/interfact_1",
        inputSize: 123,
        outputSize: "456"
      }
    ],
    idleResource: {
      cpu: 1,
      ram: 2,
      disk: 3,
      gpuCore: 4,
      gpuMem: 5
    },
    desiredResource: {
      cpu: 1,
      ram: 2,
      disk: 3,
      gpuCore: 4,
      gpuMem: 5
    },
    desiredCapability: {
      cpu: 1,
      ram: 2,
      disk: 3,
      gpuCore: 4,
      gpuMem: 5
    }
  }
]

const headFirstRow = [
  createRow('id', '服务ID', false, '240px', '280px', true, 1, 2),
  createRow('name', '服务名称', false, '190px', '190px', true, 1, 2),
  createRow('repo', '代码仓库地址', false, '200px', '240px', true, 1, 2),
  createRow('imageUrl', '镜像仓库地址&Tag', false, '150px', '150px', true, 1, 2),
  createRow('version', '服务版本', false, '170px', '200px', true, 3, 1),
  createRow('interfaces', '接口集合', false, '170px', '200px', true, 1, 2),
  createRow('idleResource', '空闲时占用资源', false, '170px', '200px', true, 5, 1),
  createRow('desiredResource', '期望资源', false, '170px', '200px', true, 5, 1),
  createRow('desiredCapability', '处理能力', false, '170px', '200px', true, 5, 1),
];

const headSecondRow = [
  createRow('major', '大版本号', false, '240px', '280px', true),
  createRow('minor', '小版本号', false, '190px', '190px', true),
  createRow('patch', 'Patch版本号', false, '200px', '240px', true),
  createRow('idleCpu', 'cpu资源', false, '150px', '150px', true),
  createRow('idleRam', 'ram资源', false, '170px', '200px', true),
  createRow('idleDisk', '硬盘资源', false, '170px', '200px', true),
  createRow('idleGpuCore', 'gpu-core资源', false, '170px', '200px', true),
  createRow('idleGpuMem', 'gpu内存资源', false, '170px', '200px', true),
  createRow('desiredCpu', 'cpu资源', false, '150px', '150px', true),
  createRow('desiredRam', 'ram资源', false, '170px', '200px', true),
  createRow('desiredDisk', '硬盘资源', false, '170px', '200px', true),
  createRow('desiredGpuCore', 'gpu-core资源', false, '170px', '200px', true),
  createRow('desiredGpuMem', 'gpu内存资源', false, '170px', '200px', true),
  createRow('desiredCapabilityCpu', 'cpu资源', false, '150px', '150px', true),
  createRow('desiredCapabilityRam', 'ram资源', false, '170px', '200px', true),
  createRow('desiredCapabilityDisk', '硬盘资源', false, '170px', '200px', true),
  createRow('desiredCapabilityCore', 'gpu-core资源', false, '170px', '200px', true),
  createRow('desiredCapabilityMem', 'gpu内存资源', false, '170px', '200px', true),
];

const versionKey = [
  "major",
  "minor",
  "patch"
]

const resourceKey = [
  "cpu",
  "ram",
  "disk",
  "gpuCore",
  "gpuMem"
]

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export default function ServiceOverview() {
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;


  return (
    <Box
      id='BasicTableBox'
      sx={{
        width: "100%",
        overflow: "hidden"
      }}
    >
      <TableContainer
        sx={{ maxHeight: '680px', overflow: "auto", width: "100%" }}
      >
        <Table
          stickyHeader
          aria-label='simple table'
          size='small'
          sx={{
            // tableLayout: 'fixed',
            tableLayout: 'auto',
            minWidth: "100%"
            // width: '100%',
            // maxWidth: 'none',

          }}
        >
          <TableHead>
            <TableRow>
              {headFirstRow.map((item, index) =>
                <NewStyledTableCell
                  key={item.id}
                  align="center"
                  rowSpan={item.rowSpan}
                  colSpan={item.colSpan}
                >
                  {item.label}
                </NewStyledTableCell>
              )}
            </TableRow>
            <TableRow>
              {headSecondRow.map((item, index) =>
                <NewStyledTableCell
                  key={item.id}
                  align="center"
                  rowSpan={item.rowSpan}
                  colSpan={item.colSpan}
                >
                  {item.label}
                </NewStyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading &&
              servicesInfo != null ? (
              servicesInfo.map((row, index) => {
                return (
                  <TableRow
                    key={row.id + '' + index}
                    aria-checked={false}
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0
                      },
                      fontWeight: 600,
                      maxWidth: '110px',
                      position: 'sticky',
                      left: 0,
                      zIndex: 6,
                      backgroundColor: '#F1F3F5 !important',
                    }}
                    selected={false}
                  >
                    <StyledTableCell
                      align='center'
                    >
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                    >
                      <TextLabel
                        text={row.name}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                    >
                      <TextLabel
                        text={row.repo}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                    >
                      <TextLabel
                        text={row.imageUrl}
                      />
                    </StyledTableCell>
                    {versionKey.map((key, index) =>
                      <StyledTableCell
                        key={key}
                        align='center'
                      >
                        <TextLabel
                          text={row.version[key]}
                        />
                      </StyledTableCell>
                    )}

                    <StyledTableCell
                      align='center'
                    >
                      <TextLabel
                        text={row.interfaces.length}
                      />
                    </StyledTableCell>

                    {resourceKey.map((key, index) =>
                      <StyledTableCell
                        key={"idle" + key}
                        align='center'
                      >
                        <TextLabel
                          text={row.idleResource[key]}
                        />
                      </StyledTableCell>
                    )}

                    {resourceKey.map((key, index) =>
                      <StyledTableCell
                        key={"desired" + key}
                        align='center'
                      >
                        <TextLabel
                          text={row.desiredResource[key]}
                        />
                      </StyledTableCell>
                    )}

                    {resourceKey.map((key, index) =>
                      <StyledTableCell
                        key={"desiredCapability" + key}
                        align='center'
                      >
                        <TextLabel
                          text={row.desiredCapability[key]}
                        />
                      </StyledTableCell>
                    )}
                  </TableRow>
                );
              })

            ) : !loading ? (
              <TableRow
                style={{ height: '200px' }}
              >
                <TableCell
                  colSpan={6}
                  sx={{ textAlign: 'center', fontSize: '20px' }}
                >
                  There are no results
                </TableCell>
              </TableRow>
            ) : (
              <div></div>
            )
            }
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
      </TableContainer>
    </Box >
  );
}
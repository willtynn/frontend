/**
 * src\Pages\Image\index.js
 */
import { useEffect, useState, useMemo } from 'react';
import {
  StyledTableContainer,
  StyledTableBodyCell,
  StyledTableHead,
} from '@/components/DisplayTable';
import {
  TableRow,
  Box,
  Table,
  Typography,
  Tooltip,
  TableBody,
  Stack,
} from '@mui/material';
// import Task from '@/assets/Task.svg';
import ServiceQuery from '@/assets/ServiceQuery.svg';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_SEARCH_SERVICE, UPDATE_EXACT_SERVICE } from '../../actions/serviceAction';
import GeneralService from '@/assets/GeneralService.svg';
import { KubeCheckbox } from '../../components/Checkbox';

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
  maxWidth = '120px',
  show = true,
  colSpan = 1,
  rowSpan = 1,
  align,
) {
  return { id, label, isOrder, minWidth, maxWidth, show, colSpan, rowSpan, align };
}

export const RUNNING = 'Running';
export const PENDING = 'Pending';
export const FAILED = 'Failed';
export const SUCCEEDED = 'Succeeded';

function createData(name, version) {
    return { name, version };
}

const rows = [
    createData('192.168.1.104:5000/buildservice', '2.0'),
    createData('192.168.1.104:5000/cloud-collaboration-platform/cluster-service', '0.1.1'),
    createData('192.168.1.104:5000/cloud-collaboration-platform/real-route-control-service', '0.1'),
    createData('192.168.1.104:5000/cloud-collaboration-platform/svc-service', '0.3.1'),
    createData('192.168.1.104:5000/ht_k8s_test_image', '0.1'),
];

export default function ImagesList(props) {
  const { data, setIndex, selectedIndex } = props;
  const [projectList, setProjectList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(0);
  const [searchSelectAnchorEl, setSearchSelectAnchorEl] = useState(null);
  const [searchBy, setSearchBy] = useState(['名称', 'ID']);
  const [checkAll, setCheckAll] = useState(false);

  const dispatch = useDispatch();

  const { queryResult } = useSelector(state => {
    return {
      queryResult: state.Service.queryResult
    };
  });

  // service/query左侧表格表头
  const headFirstRow = [
    createRow('name', '镜像名', false, '150px', '170px', true, 1, 1, 'left'),
    createRow('version', '版本', false, '120px', '130px', true, 1, 1, 'left'),
  ];

  useEffect(() => {
    dispatch({ type: UPDATE_SEARCH_SERVICE, data: data });
  }, []);

  useEffect(() => {
    if (projectList.length < 1) {
      return;
    }
    // setProject(projectList[0]);
  }, [projectList]);

  // 搜索栏提示list的更新
  useEffect(() => {
    if (searchList.length == 2) {
      setSearchBy([]);
      return;
    }
    if (searchList.length == 0) {
      setSearchBy(['名称', 'ID']);
      return;
    }
    if (searchList[0].startsWith('ID:')) {
      setSearchBy(['名称']);
    } else {
      setSearchBy(['ID']);
    }
  }, [searchList]);

  useEffect(() => {
    if (!queryResult) {
      return;
    }
    const items = rows
    const tmpData = items.map((value, index) => {
      return {
        name: value.name,
        version: value.version,
      };
    });
    if (tmpData) {
      setCount(tmpData.length);
      setTableData(tmpData);
    }
  }, [queryResult]);

  return (
    <>
        <Box
        sx={{
          borderRadius: '4px',
          backgroundColor: '#FFFFFF',
          padding: '24px 20px',
          width: 'calc(100% - 40px)',
          height: '58px',
          mb: '12px',
        }}
      >
        <Stack direction='row' spacing={1}>
        <GeneralService />
          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontStyle: 'normal',
                color: '#242e42',
                textShadow: '0 4px 8px rgba(36,46,66,.1)',
                fontSize: '24px',
                lineHeight: '32px',
              }}
            >
              镜像列表
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontStyle: 'normal',
                color: '#79879c',
                fontSize: '12px',
                lineHeight: 1.67,
              }}
            >
              镜像列表
            </Typography>
          </Box>
        </Stack>
      </Box>
          <StyledTableContainer sx={{ bgcolor: '#FFF' }}>
          <Table
            stickyHeader
            size='small'
            sx={{
              tableLayout: 'auto',
            }}
          >
            <StyledTableHead
              headRow={headFirstRow}
              selectAll={true}
              checkAll={checkAll}
              setCheckAll={setCheckAll}
            />

            <TableBody>
              {rows.map((row) => (
                    <TableRow
                      key={row.name}
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
                      }}
                      selected={false}
                    >
                      <StyledTableBodyCell
                        align='center'
                        sx={{
                          p: '0px 16px !important',
                        }}
                      >
                        <KubeCheckbox
                          sx={{
                            bgcolor: 'transparent !important',
                          }}
                          disableRipple
                          size="small"
                        />
                      </StyledTableBodyCell>

                      {/* id */}
                      <StyledTableBodyCell
                        align={'left'}
                        // align='center'
                        sx={{
                          padding: '6px 16px !important',
                        }}
                      >
                        <Stack alignItems='center' direction='row' spacing={2}>
                          {/* <Task /> */}
                          <ServiceQuery />
                          {/* <button >点击跳转</button> */}
                          <Box
                            sx={{
                              height: '30px',
                              lineHeight: '30px',
                              fontWeight: 600,
                              cursor: "pointer",
                              "&:hover": {
                                color: "#55bc8a"
                              }
                            }}
                            onClick={() => {}}
                          >
                            {row.name}
                          </Box>
                        </Stack>
                      </StyledTableBodyCell>

                      {/* 服务名称 */}
                      <StyledTableBodyCell
                        align={'left'}
                        // align='center'
                      >
                        {row.version}
                      </StyledTableBodyCell>

                    </TableRow>
                  ))};
            </TableBody>
          </Table>
        </StyledTableContainer>
    </>
  );
}

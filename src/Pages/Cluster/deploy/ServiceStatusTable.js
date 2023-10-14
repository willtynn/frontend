import { useEffect, useState, useRef } from 'react';
import {
  Box,
  Stack,
  Autocomplete,
  TextField,
  Table,
  TableHead,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Typography,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { GET_INSTANCES } from '../../../actions/instanceAction';

import {
  StyledTableBox,
  StyledTableContainer,
  StyledTableRowCell,
  StyledTableBodyCell,
  StyledTableFooter,
} from '../../../components/DisplayTable';
import {
  StyledAutocomplete,
  StyledTextFiled,
  ChipTextField,
} from '../../../components/Input';
import { EclipseTransparentButton } from '../../../components/Button';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { formatDatetimeString } from '../../../utils/commonUtils';
import {
  CHANGE_PAGE_NUM,
  CHANGE_PAGE_SIZE,
} from '../../../actions/instanceAction';
import { fontFamily } from '@/utils/commonUtils';
import Task from '@/assets/Task.svg';
import RunningIcon from '@/assets/RunningIcon.svg';
import PendingIcon from '@/assets/PendingIcon.svg';
import FailedIcon from '@/assets/FailedIcon.svg';
import SucceededIcon from '@/assets/SucceededIcon.svg';

const data = {
  items: [
    {
      metadata: {
        name: 'jagger-es-index-cleaner-28242715-psq9k',
        labels: {
          app: 'jaeger',
          'app.kubernetes.io/managed-by': 'jaeger-operator',
          'job-name': 'jagger-es-index-cleaner-28242715',
          'app.kubernetes.io/name': 'jagger-es-index-cleaner',
          'app.kubernetes.io/part-of': 'jaeger',
          'app.kubernetes.io/instance': 'jagger',
          'controller-uid': '081a6c72-dac8-4909-8f10-936d81bc39fc',
          'app.kubernetes.io/component': 'cronjob-es-index-cleaner',
        },
      },
      status: {
        phase: 'Succeeded',
        hostIP: '192.168.1.173',
        podIP: '10.244.6.130',
        startTime: '2023-09-12T23:55:00.000+00:00',
      },
    },
    {
      metadata: {
        name: 'jagger-es-index-cleaner-28239835-8s2nl',
        labels: {
          app: 'jaeger',
          'app.kubernetes.io/managed-by': 'jaeger-operator',
          'job-name': 'jagger-es-index-cleaner-28239835',
          'app.kubernetes.io/name': 'jagger-es-index-cleaner',
          'app.kubernetes.io/part-of': 'jaeger',
          'app.kubernetes.io/instance': 'jagger',
          'controller-uid': '601ac280-4909-485b-a24c-84f0504caff0',
          'app.kubernetes.io/component': 'cronjob-es-index-cleaner',
        },
      },
      status: {
        phase: 'Succeeded',
        hostIP: '192.168.1.173',
        podIP: '10.244.6.162',
        startTime: '2023-09-10T23:55:08.000+00:00',
      },
    },
    {
      metadata: {
        name: 'mysql-558bcb5f99-n4hsk',
        labels: {
          app: 'mysql',
          'pod-template-hash': '558bcb5f99',
        },
      },
      status: {
        phase: 'Running',
        hostIP: '192.168.1.173',
        podIP: '10.244.6.176',
        startTime: '2023-08-14T08:16:14.000+00:00',
      },
    },
    {
      metadata: {
        name: 'kubefed-controller-manager-5c65ff8499-gj6kj',
        labels: {
          'pod-template-hash': '5c65ff8499',
          'kubefed-control-plane': 'controller-manager',
        },
      },
      status: {
        phase: 'Failed',
        hostIP: '192.168.1.173',
        podIP: '10.244.6.174',
        startTime: '2023-08-14T07:42:47.000+00:00',
      },
    },
    {
      metadata: {
        name: 'logstash-58486bb89b-4hpsh',
        labels: {
          app: 'logstash',
          'pod-template-hash': '58486bb89b',
        },
      },
      status: {
        phase: 'Pending',
        hostIP: '192.168.1.173',
        podIP: '10.244.6.181',
        startTime: '2023-08-08T06:17:16.000+00:00',
      },
    },
    {
      metadata: {
        name: 'jagger-query-7b86944786-ntx7w',
        labels: {
          app: 'jaeger',
          'app.kubernetes.io/managed-by': 'jaeger-operator',
          'app.kubernetes.io/name': 'jagger-query',
          'app.kubernetes.io/part-of': 'jaeger',
          'pod-template-hash': '7b86944786',
          'app.kubernetes.io/instance': 'jagger',
          'app.kubernetes.io/component': 'query',
        },
      },
      status: {
        phase: 'Running',
        hostIP: '192.168.1.173',
        podIP: '10.244.6.175',
        startTime: '2023-08-08T04:01:53.000+00:00',
      },
    },
    {
      metadata: {
        name: 'es-es-default-0',
        labels: {
          'elasticsearch.k8s.elastic.co/node-ml': 'true',
          'elasticsearch.k8s.elastic.co/version': '7.14.1',
          'controller-revision-hash': 'es-es-default-79899f447c',
          'elasticsearch.k8s.elastic.co/node-transform': 'true',
          'elasticsearch.k8s.elastic.co/node-data_frozen': 'true',
          'elasticsearch.k8s.elastic.co/node-data_content': 'true',
          'elasticsearch.k8s.elastic.co/node-data_hot': 'true',
          'elasticsearch.k8s.elastic.co/statefulset-name': 'es-es-default',
          'elasticsearch.k8s.elastic.co/http-scheme': 'http',
          'elasticsearch.k8s.elastic.co/node-ingest': 'true',
          'elasticsearch.k8s.elastic.co/node-master': 'true',
          'common.k8s.elastic.co/type': 'elasticsearch',
          'elasticsearch.k8s.elastic.co/node-data_warm': 'true',
          'elasticsearch.k8s.elastic.co/node-voting_only': 'false',
          'elasticsearch.k8s.elastic.co/node-remote_cluster_client': 'true',
          'elasticsearch.k8s.elastic.co/node-data_cold': 'true',
          'statefulset.kubernetes.io/pod-name': 'es-es-default-0',
          'elasticsearch.k8s.elastic.co/cluster-name': 'es',
          'elasticsearch.k8s.elastic.co/node-data': 'true',
        },
      },
      status: {
        phase: 'Running',
        hostIP: '192.168.1.173',
        podIP: '10.244.6.177',
        startTime: '2023-08-08T03:31:13.000+00:00',
      },
    },
    {
      metadata: {
        name: 'filebeat-beat-filebeat-9lkrk',
        labels: {
          'controller-revision-hash': '696668bf7',
          'pod-template-generation': '4',
          'beat.k8s.elastic.co/name': 'filebeat',
          'beat.k8s.elastic.co/version': '7.14.1',
          'common.k8s.elastic.co/type': 'beat',
        },
      },
      status: {
        phase: 'Running',
        hostIP: '192.168.1.173',
        podIP: '192.168.1.173',
        startTime: '2023-08-08T03:25:37.000+00:00',
      },
    },
  ],
  totalItems: 18,
};

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
    return "运行中";
  }
  if (phase === PENDING) {
    return "等待中";
  }
  if (phase === FAILED) {
    return <span>错误&nbsp;&nbsp;&nbsp;</span>;
  }
  return "已完成";
};

export default function ServiceStatusTable(props) {
  const { embeddingButton } = props;
  const [project, setProject] = useState(null);
  const [projectList, setProjectList] = useState(['neilchao', 'yzq']);
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const { gottenInstances, pageSize, pageNum } = useSelector(state => {
    return {
      gottenInstances: state.Instance.gottenInstances,
      pageSize: state.Instance.pageSize,
      pageNum: state.Instance.pageNum,
    };
  });

  useEffect(() => {
    dispatch({ type: GET_INSTANCES, data: data });
  }, []);

  useEffect(() => {
    if (projectList.length < 1) {
      return;
    }
    // setProject(projectList[0]);
  }, [projectList]);

  useEffect(() => {
    if (gottenInstances === null) {
      return;
    }
    const items = gottenInstances.items;
    const tmpData = items.map((value, index) => {
      return {
        name: value.metadata.name,
        phase: value.status.phase,
        hostIP: value.status.hostIP,
        podIP: value.status.podIP,
        startTime: value.status.startTime,
      };
    });
    setCount(tmpData.length);
    setTableData(tmpData);
  }, [gottenInstances]);

  function createRow(
    id,
    label,
    isOrder = true,
    minWidth = '110px',
    maxWidth = '220px',
    show = true,
    align,
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

  const headRow = [
    createRow('name', '名称', false, '100px', '100px', true, 'left'),
    createRow('phase', '状态', false, '100px', '100px', true, 'center'),
    createRow('hostIP', 'Host IP', false, '120px', '130px', true, 'center'),
    createRow('podIP', 'Pod IP', false, '120px', '130px', true, 'center'),
    createRow('startTime', '启动时间', false, '120px', '130px', true, 'center'),
  ];

  const isDuplicate = () => {
    return false;
  };

  //改变每页的数量
  const handlePerPageChange = pageSize => {
    dispatch({ type: CHANGE_PAGE_SIZE, data: pageSize });
  };

  //改变页码
  const handlePageChange = (_event, newPage) => {
    dispatch({ type: CHANGE_PAGE_NUM, data: newPage });
  };

  return (
    <Box>
      {/*  */}
      <Box
        sx={{
          height: '40px',
          padding: '10px 30px 10px 30px',
          bgcolor: '#f9fbfd',
        }}
      >
        <Stack direction='row' spacing={2}>
          <StyledAutocomplete
            height='40px'
            padding='7.5px 5px 7.5px 12px'
            value={project}
            onChange={(event, newValue) => {
              setProject(newValue);
            }}
            id='instance_status_table_autocomplete'
            options={projectList}
            sx={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} sx={{}} placeholder='全部项目' />
            )}
          />
          <ChipTextField
            contentList={searchList}
            setContentList={setSearchList}
            isDuplicate={isDuplicate}
            startAdornment={<SearchIcon />}
            sx={{ width: 'calc(100% - 600px)' }}
          />
          <EclipseTransparentButton
            sx={{
              bgcolor: '#f9fbfd !important',
              '&:hover': {
                bgcolor: '#FFFFFF !important',
              },
              '& svg': {
                color: '#3d3b4f',
              },
            }}
          >
            <RefreshIcon />
          </EclipseTransparentButton>

          <EclipseTransparentButton
            sx={{
              bgcolor: '#f9fbfd !important',
              '&:hover': {
                bgcolor: '#FFFFFF !important',
              },
              '& svg': {
                color: '#3d3b4f',
              },
            }}
          >
            <VisibilityIcon />
          </EclipseTransparentButton>
          {embeddingButton}
        </Stack>
      </Box>

      {/* <StyledTableBox> */}
      <StyledTableContainer sx={{ bgcolor: '#FFF' }}>
        <Table
          stickyHeader
          size='small'
          sx={{
            tableLayout: 'auto',
          }}
        >
          <TableHead>
            <TableRow>
              <StyledTableRowCell
                align='center'
                sx={{
                  width: '80px',
                }}
              >
                <Checkbox
                  sx={{
                    bgcolor: 'transparent !important',
                  }}
                  disableRipple
                />
              </StyledTableRowCell>
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
            {!loading && tableData !== null && tableData.length !== 0 ? (
              tableData.map((row, index) => {
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
                    }}
                    selected={false}
                  >
                    <StyledTableBodyCell
                      align='center'
                      sx={{
                        p: '0px 16px !important',
                      }}
                    >
                      <Checkbox
                        sx={{
                          bgcolor: 'transparent !important',
                        }}
                        disableRipple
                      />
                    </StyledTableBodyCell>

                    <StyledTableBodyCell
                      align={'left'}
                      sx={{
                        padding: '12px 16px !important',
                      }}
                    >
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Task />
                        <span
                          style={{
                            height: '30px',
                            lineHeight: '30px',
                          }}
                        >
                          {row.name}
                        </span>
                      </Stack>
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align={'center'}>
                      <Stack alignItems='center' direction='row' justifyContent="center" spacing={2}>
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
                    <StyledTableBodyCell align={'center'}>
                      {row.hostIP}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell align={'center'}>
                      {row.podIP}
                    </StyledTableBodyCell>

                    <StyledTableBodyCell align={'center'}>
                      {formatDatetimeString(row.startTime)}
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
      </StyledTableContainer>
      <StyledTableFooter
        pageNum={pageNum}
        pageSize={pageSize}
        perPageList={[5, 20, 50, 100]}
        count={count}
        handlePerPageChange={handlePerPageChange}
        handlePageChange={handlePageChange}
      />
      {/* </StyledTableBox> */}
    </Box>
  );
}

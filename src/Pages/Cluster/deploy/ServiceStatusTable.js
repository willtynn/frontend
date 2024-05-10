/**
 * src\Pages\Cluster\deploy\ServiceStatusTable.js
 */
import { useEffect, useState, useRef, useMemo } from 'react';
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
  Popper,
  Popover,
} from '@mui/material';
import Question from '@/assets/Question.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  GET_INSTANCES,
  getNamaspaces,
  UPDATE_CURRENT_NAMESPACE,
  getInstanceStatus,
} from '../../../actions/instanceAction';

import {
  StyledTableBox,
  StyledTableContainer,
  StyledTableRowCell,
  StyledTableBodyCell,
  StyledTableFooter,
  StyledTableHead,
} from '../../../components/DisplayTable';
import {
  StyledAutocomplete,
  StyledTextField,
  ChipTextField,
} from '../../../components/Input';
import { EclipseTransparentButton } from '../../../components/Button';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { KubeCheckbox } from '../../../components/Checkbox';
import { NormalBoldFont, SmallLightFont } from '../../../components/Fonts';
import { useIntl } from 'react-intl';

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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
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

const statusPattern = new RegExp(/^(状态|Status):/);
const namePattern = new RegExp(/^(名称|Name):/);

export default function ServiceStatusTable(props) {
  const { embeddingButton } = props;
  const intl = useIntl();
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const [searchValue, setSearchValue] = useState('');
  const [searchSelectAnchorEl, setSearchSelectAnchorEl] = useState(null);
  const searchSelectOpen = Boolean(searchSelectAnchorEl);
  const [searchBy, setSearchBy] = useState([intl.messages['common.name'], intl.messages['common.status']]);

  const [colDisplay, setColDisplay] = useState([true, true, true, true]);
  const [customContentAnchorEl, setCustomContentAnchorEl] = useState(null);
  const customContentOpen = Boolean(customContentAnchorEl);

  const dispatch = useDispatch();
  

  const { gottenInstances, pageSize, pageNum, namespaces, currentNamespace } =
    useSelector(state => {
      return {
        gottenInstances: state.Instance.gottenInstances,
        pageSize: state.Instance.pageSize,
        pageNum: state.Instance.pageNum,
        namespaces: state.Instance.namespaces,
        currentNamespace: state.Instance.currentNamespace,
      };
    });

  useEffect(() => {
    if (localStorage.getItem('current_cluster')) {
      dispatch(getNamaspaces(localStorage.getItem('current_cluster')));
    }
  }, []);

  useEffect(() => {
    if (namespaces && namespaces.length > 0) {
      dispatch({ type: UPDATE_CURRENT_NAMESPACE, data: namespaces[0] });
    }
  }, [namespaces]);

  useEffect(() => {
    if (
      localStorage.getItem('current_cluster') &&
      currentNamespace &&
      currentNamespace !== ''
    ) {
      dispatch(
        getInstanceStatus(
          localStorage.getItem('current_cluster'),
          currentNamespace
        )
      );
    }

    // dispatch({ type: GET_INSTANCES, data: data });
  }, [currentNamespace]);

  useEffect(() => {
    if (searchList.length == 2) {
      setSearchBy([]);
      return;
    }
    if (searchList.length == 0) {
      setSearchBy([intl.messages['common.name'], intl.messages['common.status']]);
      return;
    }
    if (searchList[0].startsWith(`${intl.messages['common.status']}:`)) {
      setSearchBy([intl.messages['common.name']]);
    } else {
      setSearchBy([intl.messages['common.status']]);
    }
  }, [searchList]);

  useEffect(() => {
    if (gottenInstances === null || !gottenInstances.items) {
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

  const headRow = [
    createRow('name', intl.messages['common.name'], true, '100px', '100px', true, 'left'),
    createRow(
      'phase',
      intl.messages['common.status'],
      false,
      '100px',
      '100px',
      colDisplay[0],
      'center'
    ),
    createRow(
      'hostIP',
      'Host IP',
      false,
      '120px',
      '130px',
      colDisplay[1],
      'center'
    ),
    createRow(
      'podIP',
      'Pod IP',
      false,
      '120px',
      '130px',
      colDisplay[2],
      'center'
    ),
    createRow(
      'startTime',
      intl.messages['common.startTime'],
      true,
      '120px',
      '130px',
      colDisplay[3],
      'center'
    ),
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filtering = () => {
    let tmpData = JSON.parse(JSON.stringify(tableData));
    searchList.forEach((value, _) => {
      if (value.startsWith(`${intl.messages['common.status']}:`)) {
        tmpData = tmpData.filter((tableRow, _) => {
          return tableRow.phase.includes(value.replace(statusPattern, ''));
        });
      } else if (value.startsWith(`${intl.messages['common.name']}:`)) {
        tmpData = tmpData.filter((tableRow, _) => {
          return tableRow.name.includes(value.replace(namePattern, ''));
        });
      } else {
        tmpData = tmpData.filter((tableRow, _) => {
          return tableRow.name.includes(value);
        });
      }
    });
    return tmpData;
  };

  const visibleRows = useMemo(() => {
    const tmpData = filtering();
    if (pageSize * (pageNum - 1) > count) {
      dispatch({ type: CHANGE_PAGE_NUM, data: 1 });
      return stableSort(tmpData, getComparator(order, orderBy)).slice(
        0,
        pageSize
      );
    }
    return stableSort(tmpData, getComparator(order, orderBy)).slice(
      (pageNum - 1) * pageSize,
      (pageNum - 1) * pageSize + pageSize
    );
  }, [order, orderBy, pageNum, pageSize, tableData, searchList]);

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

  const handleSearchByClick = by => {
    setSearchValue(by + ':');
    var text = document.getElementById('instance-status-search-input');
    text.focus();
  };

  const handleSearchFocus = event => {
    if (searchBy.length === 0) {
      return;
    }
    if (searchValue === '') {
      setSearchSelectAnchorEl(event.currentTarget);
    }
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setSearchSelectAnchorEl(null);
    }, 300);
  };

  const handleEyeClick = event => {
    setCustomContentAnchorEl(event.currentTarget);
  };

  const handleEyeClose = () => {
    setCustomContentAnchorEl(null);
  };

  const handleColEyeClick = index => {
    setColDisplay(prevDisplay => {
      let tmpDisplay = JSON.parse(JSON.stringify(prevDisplay));
      tmpDisplay[index] = !tmpDisplay[index];
      return tmpDisplay;
    });
  };

  return (
    <Box>
      {/* 条件过滤悬浮框 */}
      <Popper
        id='instance-status-table-search-popper'
        open={searchSelectOpen}
        anchorEl={searchSelectAnchorEl}
        placement='bottom-start'
        sx={{
          zIndex: 1000,
          boxShadow: '0 4px 16px 0 rgba(39,50,71,.28)',
          borderRadius: '4px',
          mt: '2px !important',
        }}
      >
        <Stack
          direction='column'
          sx={{
            border: '1px solid #FAFAFA',
            width: '90px',
            borderRadius: '5px',
            padding: '8px',
            bgcolor: '#242e42',
            fontSize: '12px',
            fontFamily: fontFamily,
          }}
        >
          {searchBy.map((value, index) => {
            return (
              <Box
                sx={{
                  '&:hover': {
                    bgcolor: '#36435c',
                  },
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  textAlign: 'center',
                  height: '30px',
                  lineHeight: '30px',
                  fontWeight: 600,
                }}
                onClick={handleSearchByClick.bind(this, value)}
              >
                {value}
              </Box>
            );
          })}
        </Stack>
      </Popper>

      {/* 定制内容悬浮框 */}
      <Popover
        id='instance-status-table-custom-content-popover'
        open={customContentOpen}
        anchorEl={customContentAnchorEl}
        onClose={handleEyeClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          zIndex: 1000,
          boxShadow: '0 4px 16px 0 rgba(39,50,71,.28)',
          borderRadius: '4px',
          mt: '2px !important',
        }}
      >
        <Stack
          direction='column'
          sx={{
            border: '1px solid #FAFAFA',
            width: '100px',
            borderRadius: '5px',
            padding: '8px',
            bgcolor: '#242e42',
            fontSize: '12px',
            fontFamily: fontFamily,
          }}
        >
          {colDisplay.map((value, index) => {
            return (
              <Stack
                direction='row'
                onClick={handleColEyeClick.bind(this, index)}
                sx={{
                  color: '#FFFFFF',
                  '&:hover': {
                    bgcolor: '#36435c',
                  },
                  p: '0px 8px',
                }}
                justifyContent='flex-start'
                alignItems='center'
                spacing={1}
              >
                {value === true ? (
                  <VisibilityIcon fontSize='small' />
                ) : (
                  <VisibilityOffIcon fontSize='small' />
                )}
                <Box
                  sx={{
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    // textAlign: 'center',
                    height: '30px',
                    lineHeight: '30px',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                  }}
                >
                  {headRow[index + 1].label}
                </Box>
              </Stack>
            );
          })}
        </Stack>
      </Popover>

      <Box
        sx={{
          height: '32px',
          padding: '10px 30px 10px 30px',
          bgcolor: '#f9fbfd',
        }}
      >
        <Stack direction='row' spacing={2}>
          <StyledAutocomplete
            height='32px'
            padding='6px 5px 5px 12px'
            value={currentNamespace}
            onChange={(event, newValue) => {
              dispatch({ type: UPDATE_CURRENT_NAMESPACE, data: newValue });
            }}
            id='instance_status_table_autocomplete'
            options={namespaces}
            sx={{
              width: 300,
              color: '#36435c',
              fontFamily: fontFamily,
              fontSize: '12px',
              fontWeight: 600,
              fontStyle: 'normal',
              fontStretch: 'normal',
              lineHeight: 1.67,
              letterSpacing: 'normal',
            }}
            renderInput={params => (
              <TextField {...params} placeholder={intl.messages['common.allNamespaces']} />
            )}
          />
          <ChipTextField
            value={searchValue}
            setValue={setSearchValue}
            contentList={searchList}
            setContentList={setSearchList}
            isDuplicate={isDuplicate}
            startAdornment={<SearchIcon />}
            sx={{
              width: 'calc(100% - 600px)',
              '& .MuiOutlinedInput-input.MuiInputBase-input': {
                // padding: '6px 12px !important',
                fontSize: '12px',
                fontWeight: 600,
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: 1.67,
                letterSpacing: 'normal',
                color: '#36435c',
                height: '20px',
              },
            }}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            enterBlur={true}
            id='instance-status-search-input'
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
              height: '32px',
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
              height: '32px',
            }}
            onClick={handleEyeClick}
          >
            <VisibilityIcon />
          </EclipseTransparentButton>
          {embeddingButton}
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
            headRow={headRow}
            selectAll={false}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />

          <TableBody>
            {!loading && visibleRows !== null && visibleRows.length !== 0 ? (
              visibleRows.map((row, index) => {
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
                    {/* <StyledTableBodyCell
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
                        size='small'
                      />
                    </StyledTableBodyCell> */}

                    <StyledTableBodyCell
                      align={'left'}
                      sx={{
                        padding: '6px 16px !important',
                      }}
                    >
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Task />
                        <span
                          style={{
                            height: '30px',
                            lineHeight: '30px',
                            fontWeight: 600,
                          }}
                        >
                          {row.name}
                        </span>
                      </Stack>
                    </StyledTableBodyCell>

                    <StyledTableBodyCell
                      align={'center'}
                      sx={{ display: headRow[1].show ? 'table-cell' : 'none' }}
                    >
                      <Stack
                        alignItems='center'
                        direction='row'
                        justifyContent='center'
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
                      align={'center'}
                      sx={{ display: headRow[2].show ? 'table-cell' : 'none' }}
                    >
                      {row.hostIP}
                    </StyledTableBodyCell>

                    <StyledTableBodyCell
                      align={'center'}
                      sx={{ display: headRow[3].show ? 'table-cell' : 'none' }}
                    >
                      {row.podIP}
                    </StyledTableBodyCell>

                    <StyledTableBodyCell
                      align={'center'}
                      sx={{ display: headRow[4].show ? 'table-cell' : 'none' }}
                    >
                      {formatDatetimeString(row.startTime)}
                    </StyledTableBodyCell>
                  </TableRow>
                );
              })
            ) : !loading ? (
              <TableRow style={{ height: '220px' }}>
                <TableCell
                  colSpan={colDisplay.reduce(
                    (accumulator, currentValue) => accumulator + (currentValue === true),
                    2,
                  )}
                  sx={{
                    textAlign: 'center',
                    fontSize: '20px',
                    fontFamily: fontFamily,
                    fontStyle: 'normal',
                  }}
                >
                  <Question />
                  <NormalBoldFont>{intl.messages['common.serviceTableContentNoData']}</NormalBoldFont>

                  <SmallLightFont>{intl.messages['common.serviceTableContentNoDataHint']}</SmallLightFont>
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
        perPageList={[10, 20, 50, 100]}
        count={count}
        handlePerPageChange={handlePerPageChange}
        handlePageChange={handlePageChange}
        sx={{
          pt: '12px',
          pb: '12px',
        }}
      />
    </Box>
  );
}

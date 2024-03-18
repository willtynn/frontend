/**
 * src\Pages\Cluster\deploy\ServiceStatusTable.js
 */
import { useEffect, useState, useRef, useMemo } from 'react';
import {
  Box,
  Stack,
  TextField,
  Table,
  TableRow,
  TableBody,
  TableCell,
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
} from '@/actions/inferInstanceAction';

import {
  StyledTableBox,
  StyledTableContainer,
  StyledTableRowCell,
  StyledTableBodyCell,
  StyledTableFooter,
  StyledTableHead,
} from '@/components/DisplayTable';
import {
  StyledAutocomplete,
  StyledTextField,
  ChipTextField,
} from '@/components/Input';
import { EclipseTransparentButton } from '@/components/Button';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { formatDatetimeString } from '@/utils/commonUtils';
import {
  CHANGE_PAGE_NUM,
  CHANGE_PAGE_SIZE,
} from '@/actions/inferInstanceAction';
import { fontFamily } from '@/utils/commonUtils';
import Task from '@/assets/Task.svg';
import RunningIcon from '@/assets/RunningIcon.svg';
import PendingIcon from '@/assets/PendingIcon.svg';
import FailedIcon from '@/assets/FailedIcon.svg';
import SucceededIcon from '@/assets/SucceededIcon.svg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { KubeCheckbox } from '@/components/Checkbox';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import { useNavigate } from 'react-router-dom';


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

const StatusIcon = (runningPods, pods) => {
  if (runningPods === pods) {
    return <RunningIcon />;
  }
  if (runningPods < pods) {
    return <PendingIcon />;
  }
  if (runningPods === 0) {
    return <FailedIcon />;
  }
  return <SucceededIcon />;
};

const StatusText = (runningPods, pods) => {
  console.log(runningPods, pods)
  if (runningPods === pods) {
    return <span>Running({runningPods}/{pods})&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>;
  }
  if (runningPods < pods) {
    return <span>Warning({runningPods}/{pods})&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>;
  }
  if (runningPods === 0) {
    return (
      <span>Failed({runningPods}/{pods})&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    );
  }
  return <span>Succeeded({runningPods}/{pods})</span>;
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

const statusPattern = new RegExp(/^状态:/);
const namePattern = new RegExp(/^名称:/);

export default function ServiceStatusTable(props) {
  const { embeddingButton } = props;
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const [searchValue, setSearchValue] = useState('');
  const [searchSelectAnchorEl, setSearchSelectAnchorEl] = useState(null);
  const searchSelectOpen = Boolean(searchSelectAnchorEl);
  const [searchBy, setSearchBy] = useState(['名称', '状态']);

  const [colDisplay, setColDisplay] = useState([true, true, true, true, true]);
  const [customContentAnchorEl, setCustomContentAnchorEl] = useState(null);
  const customContentOpen = Boolean(customContentAnchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { gottenInstances, pageSize, pageNum, namespaces, currentNamespace } =
    useSelector(state => {
      return {
        gottenInstances: state.InferInstance.gottenInstances,
        pageSize: state.InferInstance.pageSize,
        pageNum: state.InferInstance.pageNum,
        namespaces: state.InferInstance.namespaces,
        currentNamespace: state.InferInstance.currentNamespace,
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
      setSearchBy(['名称', '状态']);
      return;
    }
    if (searchList[0].startsWith('状态:')) {
      setSearchBy(['名称']);
    } else {
      setSearchBy(['状态']);
    }
  }, [searchList]);

  useEffect(() => {
    if (gottenInstances === null) {
      return;
    }
    const items = gottenInstances;
    const tmpData = items.map((value, index) => {
      return {
        name: value.applicationName,
        namespace: value.namespace,
        runningPods: value.runningPodNumber,
        pods: value.podNumber,
        model: value.modelName,
        partition: value.partitionName,
        startTime: value.createTime,
      };
    });
    setCount(tmpData.length);
    setTableData(tmpData);
  }, [gottenInstances]);

  const headRow = [
    createRow('name', '名称', true, '100px', '100px', true, 'left'),
    createRow('phase', '状态', false, '100px', '100px', colDisplay[0], 'center'),
    createRow('pods', '实例数量', true, '120px', '130px', colDisplay[1], 'center'),
    createRow('model', '模型名称', false, '120px', '130px', colDisplay[2], 'center'),
    createRow('partition', '拆分方案名称', false, '120px', '130px', colDisplay[3], 'center'),
    createRow('startTime', '启动时间', true, '120px', '130px', colDisplay[4], 'center'),
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filtering = () => {
    let tmpData = JSON.parse(JSON.stringify(tableData));
    searchList.forEach((value, _) => {
      if (value.startsWith('状态:')) {
        tmpData = tmpData.filter((tableRow, _) => {
          console.log(tableRow.phase);
          return tableRow.phase.includes(value.replace(statusPattern, ''));
        });
      } else if (value.startsWith('名称:')) {
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

   // 点击跳转页面
   const handleClickById = index => {
    // let id=tableData[index][0];
    let indexId = (pageNum - 1) * pageSize + index
    let name = tableData[indexId]['name']
    let namespace = tableData[indexId]['namespace']
    // console.log(`http://192.168.1.104:32589/static/?id=${id}`)
    // window.open('http://192.168.1.104:32589/static?modelPath=/models/'+file, '_blank');
    navigate(`/detail/application/?name=${name}&namespace=${namespace}`);
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
              <TextField {...params} placeholder='全部命名空间' />
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

      {/* <StyledTableBox> */}
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
            selectAll={true}
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
                        size='small'
                      />
                    </StyledTableBodyCell>

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
                          onClick={handleClickById.bind(this, index)}
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
                        {StatusIcon(row.runningPods, row.pods)}
                        <span
                          style={{
                            height: '30px',
                            lineHeight: '30px',
                          }}
                        >
                          {StatusText(row.runningPods, row.pods)}
                        </span>
                      </Stack>
                    </StyledTableBodyCell>

                    <StyledTableBodyCell
                      align={'center'}
                      sx={{ display: headRow[2].show ? 'table-cell' : 'none' }}
                    >
                      {row.pods}
                    </StyledTableBodyCell>

                    <StyledTableBodyCell
                      align={'center'}
                      sx={{ display: headRow[3].show ? 'table-cell' : 'none' }}
                    >
                      {row.model}
                    </StyledTableBodyCell>

                    <StyledTableBodyCell
                      align={'center'}
                      sx={{ display: headRow[4].show ? 'table-cell' : 'none' }}
                    >
                      {row.partition}
                    </StyledTableBodyCell>

                    <StyledTableBodyCell
                      align={'center'}
                      sx={{ display: headRow[5].show ? 'table-cell' : 'none' }}
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
                  <NormalBoldFont>无数据</NormalBoldFont>

                  <SmallLightFont>您可以尝试刷新数据</SmallLightFont>
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
      {/* </StyledTableBox> */}
    </Box>
  );
}

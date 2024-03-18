/**
 * src\Pages\Route\RouteControlling\RouteRuleOverviewTable.js
 */
import { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Stack,
  TextField,
  Table,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Popper,
  Popover,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import {
  getNamaspaces,
  UPDATE_CURRENT_NAMESPACE,
} from '@/actions/inferInstanceAction';

import {
  searchServiceById,
  UPDATE_SEARCH_SERVICE,
} from '@/actions/serviceAction';

import {
  StyledTableContainer,
  StyledTableBodyCell,
  StyledTableFooter,
  StyledTableHead,
} from '@/components/DisplayTable';
import {
  StyledAutocomplete,
  ChipTextField,
} from '../../../../components/Input';
import { EclipseTransparentButton } from '../../../../components/Button';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { formatDatetimeString } from '../../../../utils/commonUtils';
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
import { getRouteRules } from '../../../../actions/routectlActions';
import { RouteRule } from '@/models/RouteControlling';
import Question from '@/assets/Question.svg';
import { NormalBoldFont, SmallLightFont } from '../../../../components/Fonts';

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

export default function RouteRuleOverviewTable(props) {
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

  const [colDisplay, setColDisplay] = useState([true, true, true]);
  const [customContentAnchorEl, setCustomContentAnchorEl] = useState(null);
  const customContentOpen = Boolean(customContentAnchorEl);

  const dispatch = useDispatch();
  const {
    gottenRules,
    pageSize,
    pageNum,
    namespaces,
    currentNamespace,
    services,
    currentService,
  } = useSelector(state => {
    return {
      gottenRules: state.InferInstance.gottenRules,
      pageSize: state.InferInstance.pageSize,
      pageNum: state.InferInstance.pageNum,
      namespaces: state.InferInstance.namespaces,
      currentNamespace: state.InferInstance.currentNamespace,
      services: state.InferInstance.services,
      currentService: state.InferInstance.currentService,
    };
  });

  // 获取全部服务
  useEffect(() => {
    dispatch(searchServiceById(''));
    // TODO 不知道这里要干嘛 ref::src\Pages\Service\query\index.js
    return () => {
      dispatch({ type: UPDATE_SEARCH_SERVICE, data: null });
      //dispatch({ type: UPDATE_EXACT_SERVICE, data: null });
    };
  }, []);
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
      currentNamespace !== '' &&
      currentService &&
      currentService !== ''
    ) {
      dispatch(
        getRouteRules({
          Namespace: currentNamespace,
          DesService: currentService,
        })
      );
    }

    // dispatch({ type: GET_INSTANCES, data: data });
  }, [currentNamespace, currentService]);

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
    if (!gottenRules) {
      return;
    }
    /** @type {RouteRule[]} */
    const items = gottenRules;
    const tmpData = items.map((value, _) => {
      return {
        name: value.Name,
        srcPods: value.SrcPods.map((v, _) => v).join(),
        desPods: value.DesPods.map((v, _) => v).join(),
        endPoints: value.EndpointControls.map((v, _) => v.Uri).join(),
      };
    });
    setCount(tmpData.length);
    setTableData(tmpData);
  }, [gottenRules]);

  const headRow = [
    createRow('name', '名称', true, '100px', '100px', true, 'left'),
    createRow(
      'srcPods',
      '起始节点',
      false,
      '100px',
      '100px',
      colDisplay[0],
      'center'
    ),
    createRow(
      'desPods',
      '目标节点',
      false,
      '120px',
      '130px',
      colDisplay[1],
      'center'
    ),
    createRow(
      'endPoints',
      '接口限定',
      false,
      '120px',
      '130px',
      colDisplay[2],
      'center'
    )
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
                      <Checkbox
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
                          {/*StatusText(row.phase)*/}
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
        perPageList={[5, 20, 50, 100]}
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

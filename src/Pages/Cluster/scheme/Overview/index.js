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
  Tooltip,
  Popper,
  Popover,
} from '@mui/material';
import Question from '@/assets/Question.svg';
import { useDispatch, useSelector } from 'react-redux';
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
import { useIntl } from 'react-intl';
import {
  CHANGE_PAGE_NUM,
  CHANGE_PAGE_SIZE,
  UPDATE_CURRENT_NAMESPACE,
  getSchemes,
  schemeDeploy
} from '../../../../actions/schemeAction';
import { getNamaspaces } from '@/actions/instanceAction';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useNavigate } from 'react-router-dom';

// const data = [
//   {
//     name: 'test1',
//     namespace: 'test',
//     status: '已执行',
//     time: '2024-03-02T06:09:41.000+00:00',
//   },
//   {
//     name: 'test3',
//     namespace: 'test',
//     status: '已执行',
//     time: '2024-03-02T06:09:41.000+00:00',
//   },
//   {
//     name: 'test2',
//     namespace: 'test',
//     status: '未执行',
//     time: '2024-03-02T06:09:41.000+00:00',
//   },
// ];

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

export const PENDING = '已执行';
export const SUCCEEDED = '未执行';

const StatusIcon = status => {
  if (status === PENDING) {
    return <PendingIcon />;
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

const statusPattern = new RegExp(/^(状态|Status):/);
const namePattern = new RegExp(/^(名称|Name):/);

export default function SchemeOverview(props) {
  const { embeddingButton } = props;
  const intl = useIntl();
  const navigate = useNavigate();
  const { schemes, pageSize, pageNum, namespaces, currentNamespace } =
    useSelector(state => {
      return {
        schemes: state.Scheme.schemes,
        pageSize: state.Scheme.pageSize,
        pageNum: state.Scheme.pageNum,
        namespaces: state.Instance.namespaces,
        currentNamespace: state.Scheme.currentNamespace,
      };
    });
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const [searchValue, setSearchValue] = useState('');
  const [searchSelectAnchorEl, setSearchSelectAnchorEl] = useState(null);
  const searchSelectOpen = Boolean(searchSelectAnchorEl);
  const [searchBy, setSearchBy] = useState([
    intl.messages['common.name'],
    intl.messages['common.status'],
  ]);

  const [colDisplay, setColDisplay] = useState([true, true, true]);
  const [customContentAnchorEl, setCustomContentAnchorEl] = useState(null);
  const customContentOpen = Boolean(customContentAnchorEl);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('current_cluster')) {
      dispatch(getNamaspaces(localStorage.getItem('current_cluster')));
    }
  }, []);

  useEffect(() => {
    if (namespaces && namespaces.length > 0) {
      dispatch({ type: UPDATE_CURRENT_NAMESPACE, data: "" });
    }
  }, [namespaces]);

  useEffect(() => {
    dispatch(
      getSchemes(localStorage.getItem('current_cluster'), currentNamespace, "")
    );
  }, [currentNamespace]);

  useEffect(() => {
    if (searchList.length == 2) {
      setSearchBy([]);
      return;
    }
    if (searchList.length == 0) {
      setSearchBy([
        intl.messages['common.name'],
        intl.messages['common.status'],
      ]);
      return;
    }
    if (searchList[0].startsWith(`${intl.messages['common.status']}:`)) {
      setSearchBy([intl.messages['common.name']]);
    } else {
      setSearchBy([intl.messages['common.status']]);
    }
  }, [searchList]);

  useEffect(() => {
    if (schemes === null || schemes.length <= 0) {
      return;
    }
    const tmpData = schemes.map((value, index) => {
      return {
        id: value.id,
        name: value.name,
        namespace: value.namespace,
        status: value.status,
        time: value.time,
      };
    });
    setCount(tmpData.length);
    setTableData(tmpData);
  }, [schemes]);

  const headRow = [
    createRow(
      'name',
      intl.messages['common.name'],
      true,
      '100px',
      '100px',
      true,
      'left'
    ),
    createRow(
      'namespace',
      intl.messages['common.namespace'],
      false,
      '100px',
      '100px',
      colDisplay[0],
      'center'
    ),
    createRow(
      'status',
      intl.messages['common.status'],
      false,
      '120px',
      '130px',
      colDisplay[1],
      'center'
    ),
    createRow(
      'time',
      intl.messages['common.time'],
      false,
      '120px',
      '130px',
      colDisplay[2],
      'center'
    ),
    createRow(
      'operation',
      intl.messages['common.operation'],
      false,
      '120px',
      '130px',
      true,
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
          return tableRow.status.includes(value.replace(statusPattern, ''));
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
    var text = document.getElementById('scheme-status-search-input');
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

  const handleClickById = id => {
    navigate(`/detail/scheme/${id}`)
  }

  return (
    <Box>
      {/* 条件过滤悬浮框 */}
      <Popper
        id='scheme-status-table-search-popper'
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
        id='scheme-status-table-custom-content-popover'
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
            id='scheme_status_table_autocomplete'
            options={["", ...namespaces]}
            renderOption={(props, option, state) => {return (
              <Box
                {...props}
              >
                {option == "" ? "All" : option}
              </Box>
            )
              }}
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
              <TextField
                {...params}
                placeholder={intl.messages['common.allNamespaces']}
              />
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
              width: 'calc(100% - 300px)',
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
            id='scheme-status-search-input'
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
                      {/* <KubeCheckbox
                        sx={{
                          bgcolor: 'transparent !important',
                        }}
                        disableRipple
                        size='small'
                      /> */}
                    </StyledTableBodyCell>

                    <StyledTableBodyCell
                      align={'left'}
                      sx={{
                        padding: '6px 16px !important',
                      }}
                    >
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Task />
                        <Box
                          sx={{
                            height: '30px',
                            lineHeight: '30px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            '&:hover': {
                              color: '#55bc8a',
                            },
                          }}
                          onClick={handleClickById.bind(this, row.id)}
                        >
                          {row.name}
                        </Box>
                      </Stack>
                    </StyledTableBodyCell>

                    <StyledTableBodyCell
                      align={'center'}
                      sx={{ display: headRow[1].show ? 'table-cell' : 'none' }}
                    >
                      {row.namespace}
                    </StyledTableBodyCell>

                    <StyledTableBodyCell
                      align={'center'}
                      sx={{ display: headRow[2].show ? 'table-cell' : 'none' }}
                    >
                      <Stack
                        alignItems='center'
                        direction='row'
                        justifyContent='center'
                        spacing={2}
                      >
                        {StatusIcon(row.status)}
                        <span
                          style={{
                            height: '30px',
                            lineHeight: '30px',
                          }}
                        >
                          {row.status}
                        </span>
                      </Stack>
                    </StyledTableBodyCell>

                    <StyledTableBodyCell
                      align={'center'}
                      sx={{ display: headRow[3].show ? 'table-cell' : 'none' }}
                    >
                      {formatDatetimeString(row.time)}
                    </StyledTableBodyCell>

                    <StyledTableBodyCell align={'center'}>
                      <Tooltip
                        PopperProps={{
                          sx: {
                            '& .MuiTooltip-tooltip': {
                              backgroundColor: '#242e42',
                            },
                            '& .MuiTooltip-arrow': {
                              color: '#242e42',
                            },
                          },
                        }}
                        title={intl.messages['common.execute']}
                        placement='right'
                      >
                        <EclipseTransparentButton
                          sx={{
                            bgcolor: '#FFFFFF !important',
                            '&:hover': {
                              bgcolor: '#f9fbfd !important',
                            },
                            '& svg': {
                              color: '#3d3b4f',
                            },
                            height: '32px',
                          }}
                          onClick={() => {
                            dispatch(schemeDeploy(row.id, row.name, row.namespace))
                          }}
                        >
                          <PlayCircleOutlineIcon />
                        </EclipseTransparentButton>
                      </Tooltip>
                    </StyledTableBodyCell>
                  </TableRow>
                );
              })
            ) : !loading ? (
              <TableRow style={{ height: '220px' }}>
                <TableCell
                  colSpan={colDisplay.reduce(
                    (accumulator, currentValue) =>
                      accumulator + (currentValue === true),
                    3
                  )}
                  sx={{
                    textAlign: 'center',
                    fontSize: '20px',
                    fontFamily: fontFamily,
                    fontStyle: 'normal',
                  }}
                >
                  <Question />
                  <NormalBoldFont>
                    {intl.messages['common.serviceTableContentNoData']}
                  </NormalBoldFont>

                  <SmallLightFont>
                    {intl.messages['common.serviceTableContentNoDataHint']}
                  </SmallLightFont>
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

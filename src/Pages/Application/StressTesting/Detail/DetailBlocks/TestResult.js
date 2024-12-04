import { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Stack,
  Popper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ContainedButton, KubeConfirmButton } from '@/components/Button';
import { fontFamily } from '@/utils/commonUtils';
import {
  StyledTableBox,
  StyledTableContainer,
  StyledTableRowCell,
  StyledTableBodyCell,
  StyledTableFooter,
  StyledTableHead,
} from '@/components/DisplayTable';
import StressTestingIcon from '@/assets/StressTesting.svg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useIntl } from 'react-intl';
import RefreshIcon from '@mui/icons-material/Refresh';
import { EclipseTransparentButton } from '@/components/Button';
import RunningIcon from '@/assets/RunningIcon.svg';
import PendingIcon from '@/assets/PendingIcon.svg';
import FailedIcon from '@/assets/FailedIcon.svg';
import SucceededIcon from '@/assets/SucceededIcon.svg';
import Question from '@/assets/Question.svg';
import { KubeCheckbox } from '@/components/Checkbox';
import Task from '@/assets/Task.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';

import {
  UPDATE_GROUP_EDIT,
  RESET_GROUP,
  RESET_PLAN,
  UPDATE_TEST_PLAN_PAGE_NUM,
  UPDATE_TEST_PLAN_PAGE_SIZE,
  getTestResultsByID,
} from '@/actions/applicationAction';

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

export function TestResult() {
  const intl = useIntl();
  const { testPlanId } = useParams();

  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('startTime');

  const [colDisplay, setColDisplay] = useState([true, true, true, true, true]);
  const [customContentAnchorEl, setCustomContentAnchorEl] = useState(null);
  const customContentOpen = Boolean(customContentAnchorEl);

  const { pageSize, pageNum, currrentTestResults, total } = useSelector(state => {
    return {
      pageSize: state.Application.pageSize,
      pageNum: state.Application.pageNum,
      currrentTestResults: state.Application.currrentTestResults,
      total: state.Application.total,
    };
  });
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTestResultsByID(testPlanId, pageNum, pageSize));
  }, [testPlanId, pageNum, pageSize]);
  
  
  useEffect(() => {
    if (currrentTestResults && currrentTestResults.length) {
      setCount(currrentTestResults.length);
    }

    setTableData(currrentTestResults);
  }, [currrentTestResults]);

  const headRow = [
    createRow('cnt', '#', true, '100px', '100px', true, 'left'),
    createRow(
      'startTime',
      intl.messages['common.beginTime'],
      true,
      '100px',
      '100px',
      true,
      'left'
    ),
    createRow(
      'endTime',
      intl.messages['common.endTime'],
      true,
      '100px',
      '100px',
      true,
      'left'
    ),
    createRow(
      'status',
      intl.messages['common.status'],
      false,
      '100px',
      '100px',
      colDisplay[0],
      'center'
    ),
    createRow(
      'latency',
      intl.messages['common.delay'],
      false,
      '120px',
      '130px',
      colDisplay[1],
      'center'
    ),
  ];


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(property);
    dispatch(getTestResultsByID(testPlanId, pageNum, pageSize));
  };
  



  const visibleRows = useMemo(() => {
    if (!currrentTestResults) return [];
    return stableSort(currrentTestResults, getComparator(order, orderBy));
  }, [currrentTestResults, order, orderBy]);
  
  

  const handlePerPageChange = newPageSize => {
    dispatch({ type: UPDATE_TEST_PLAN_PAGE_SIZE, data: newPageSize });
    dispatch(getTestResultsByID(testPlanId, 1, newPageSize));
  };
  
  const handlePageChange = (event, newPage) => {
    dispatch({ type: UPDATE_TEST_PLAN_PAGE_NUM, data: newPage });
    dispatch(getTestResultsByID(testPlanId, newPage, pageSize));
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
      <Box
        sx={{
          height: '32px',
          padding: '10px 30px 10px 30px',
          bgcolor: '#f9fbfd',
        }}
      >
        <Stack direction='row' spacing={2}>
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
            onClick={() => {}}
          >
            <VisibilityIcon />
          </EclipseTransparentButton>
          <KubeConfirmButton
            sx={{
              width: '200px',
            }}
            onClick={() => {}}
          >
            {intl.messages['stressTesting.startTest']}
          </KubeConfirmButton>
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
                          onClick={() => {
                            navigate(`/detail/planresult/${row.id}`);
                          }}
                        >
                          {index}
                        </Box>
                      </Stack>
                    </StyledTableBodyCell>

                    <StyledTableBodyCell
                      align={headRow[1].align}
                      sx={{ display: headRow[2].show ? 'table-cell' : 'none' }}
                    >
                      {row.startTime}
                    </StyledTableBodyCell>

                    <StyledTableBodyCell
                      align={headRow[2].align}
                      sx={{ display: headRow[2].show ? 'table-cell' : 'none' }}
                    >
                      {row.endTime}
                    </StyledTableBodyCell>

                    <StyledTableBodyCell
                      align={headRow[3].align}
                      sx={{ display: headRow[2].show ? 'table-cell' : 'none' }}
                    >
                      {'Succeeded'}
                    </StyledTableBodyCell>

                    <StyledTableBodyCell
                      align={headRow[4].align}
                      sx={{ display: headRow[2].show ? 'table-cell' : 'none' }}
                    >
                      {row.latency}
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
                    2
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
        count={total}
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

import { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fontFamily } from '@/utils/commonUtils';
import {
  StyledTableBodyCell,
  StyledTableHead,
} from '@/components/DisplayTable';
import { useIntl } from 'react-intl';
import RunningIcon from '@/assets/RunningIcon.svg';
import PendingIcon from '@/assets/PendingIcon.svg';
import FailedIcon from '@/assets/FailedIcon.svg';
import SucceededIcon from '@/assets/SucceededIcon.svg';
import Question from '@/assets/Question.svg';
import Task from '@/assets/Task.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import { useNavigate } from 'react-router-dom';

import {
  UPDATE_GROUP_EDIT,
  RESET_GROUP,
  RESET_PLAN,
  UPDATE_TEST_PLAN_PAGE_NUM,
  UPDATE_TEST_PLAN_PAGE_SIZE,
} from '../../../../../actions/applicationAction';

export const RUNNING = 'Running';
export const CREATED = 'Created';
export const FAILED = 'Failed';
export const COMPLETED = 'Completed';

const StatusIcon = phase => {
  if (phase === RUNNING) {
    return <RunningIcon />;
  }
  if (phase === CREATED) {
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
  if (phase === CREATED) {
    return <span>Created&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>;
  }
  if (phase === FAILED) {
    return (
      <span>Failed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    );
  }
  return <span>Completed</span>;
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

const statusPattern = new RegExp(/^(状态|Status):/);
const namePattern = new RegExp(/^(名称|Name):/);



export function Information() {
  const intl = useIntl();

  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('testPlanName');


  const [colDisplay, setColDisplay] = useState([true, true, true, true, true, true]);

  const [searchList, setSearchList] = useState([]);

  const { pageSize, pageNum, testPlans } = useSelector(state => {
    return {
      pageSize: state.Application.pageSize,
      pageNum: state.Application.pageNum,
      testPlans: state.Application.currentJointPlanSon,
    };
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    setTableData(testPlans);
  }, [testPlans]);

  const headRow = [
    createRow(
      'testPlanName',
      intl.messages['stressTesting.planName'],
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
      'serialized',
      intl.messages['common.serialized'],
      false,
      '120px',
      '130px',
      colDisplay[1],
      'center'
    ),
    createRow(
      'functionalMode',
      intl.messages['common.functionMode'],
      false,
      '120px',
      '130px',
      colDisplay[2],
      'center'
    ),
    createRow(
      'tearDown',
      'tear down',
      false,
      '120px',
      '130px',
      colDisplay[3],
      'center'
    ),
    createRow(
      'boundary',
      intl.messages['common.boundaryTest'],
      false,
      '120px',
      '130px',
      colDisplay[4],
      'center'
    ),
    createRow(
      'comment',
      intl.messages['common.description'],
      false,
      '120px',
      '130px',
      colDisplay[5],
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
    setCount(tableData.length);
    searchList.forEach((value, _) => {
      if (value.startsWith(`${intl.messages['common.status']}:`)) {
        tmpData = tmpData.filter((tableRow, _) => {
          return tableRow.status.includes(value.replace(statusPattern, ''));
        });
      } else if (value.startsWith(`${intl.messages['common.name']}:`)) {
        tmpData = tmpData.filter((tableRow, _) => {
          return tableRow.testPlanName.includes(value.replace(namePattern, ''));
        });
      } else {
        tmpData = tmpData.filter((tableRow, _) => {
          return tableRow.testPlanName.includes(value);
        });
      }
    });
    return tmpData;
  };

  const visibleRows = useMemo(() => {
    const tmpData = filtering();
    if (pageSize * (pageNum - 1) > count) {
      dispatch({ type: UPDATE_TEST_PLAN_PAGE_NUM, data: 1 });
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



  return (
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
                      ></StyledTableBodyCell> */}

                      <StyledTableBodyCell
                        align={'center'}
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
                            onClick={() => {
                              navigate(`/detail/testplan/${row.id}`);
                            }}
                          >
                            {row.testPlanName}
                          </Box>
                        </Stack>
                      </StyledTableBodyCell>

                      <StyledTableBodyCell
                        align={'center'}
                        sx={{
                          display: headRow[1].show ? 'table-cell' : 'none',
                        }}
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
                            {StatusText(row.status)}
                          </span>
                        </Stack>
                      </StyledTableBodyCell>

                      <StyledTableBodyCell
                        align={'center'}
                        sx={{
                          display: headRow[2].show ? 'table-cell' : 'none',
                        }}
                      >
                        {row.serialized
                          ? intl.messages['common.yes']
                          : intl.messages['common.no']}
                      </StyledTableBodyCell>

                      <StyledTableBodyCell
                        align={'center'}
                        sx={{
                          display: headRow[3].show ? 'table-cell' : 'none',
                        }}
                      >
                        {row.functionalMode
                          ? intl.messages['common.yes']
                          : intl.messages['common.no']}
                      </StyledTableBodyCell>

                      <StyledTableBodyCell
                        align={'center'}
                        sx={{
                          display: headRow[4].show ? 'table-cell' : 'none',
                        }}
                      >
                        {row.tearDown
                          ? intl.messages['common.yes']
                          : intl.messages['common.no']}
                      </StyledTableBodyCell>

                      <StyledTableBodyCell
                        align={'center'}
                        sx={{
                          display: headRow[5].show ? 'table-cell' : 'none',
                        }}
                      >
                        {row.boundary
                          ? intl.messages['common.yes']
                          : intl.messages['common.no']}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell
                        align={'center'}
                        sx={{
                          display: headRow[6].show ? 'table-cell' : 'none',
                        }}
                      >
                        {row.comment}
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
  );
}

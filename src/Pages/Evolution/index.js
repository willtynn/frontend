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
import { KubeConfirmButton } from '@/components/Button';
import { 
  fontFamily,
  formatDatetimeString } from '@/utils/commonUtils';
import {
  StyledTableContainer,
  StyledTableBodyCell,
  StyledTableFooter,
  StyledTableHead,
} from '@/components/DisplayTable';
import { ChipTextField } from '@/components/Input';
import StressTestingIcon from '@/assets/StressTesting.svg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useIntl } from 'react-intl';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { EclipseTransparentButton } from '@/components/Button';
import RunningIcon from '@/assets/RunningIcon.svg';
import PendingIcon from '@/assets/PendingIcon.svg';
import FailedIcon from '@/assets/FailedIcon.svg';
import SucceededIcon from '@/assets/SucceededIcon.svg';
import Question from '@/assets/Question.svg';
import { EvolutionProgress } from './EvolutionProgress';
import {AlgorithmManage} from './AlgorithmManage';
import Task from '@/assets/Task.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import { useNavigate } from 'react-router-dom';
import {
  UPDATE_GROUP_EDIT,
  RESET_GROUP,
  RESET_PLAN,
  UPDATE_TEST_PLAN_PAGE_NUM,
  UPDATE_TEST_PLAN_PAGE_SIZE,
  getTestPlans,
} from '../../actions/applicationAction';
import { StyledModal } from '../../components/Modal';
import { 
  evo_getPlanList,
  evo_get_dataSource,
  evo_modify,
  evo_get_algorithm_data_mapping,
} from '../../actions/evolutionAction';
import LeftArrow from '@/assets/WhiteLeftArrow.svg';
import RightArrow from '@/assets/WhiteRightArrow.svg';
import { set } from 'lodash';

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

const createTimePattern = new RegExp(/^(创建时间|Create Time):/);
const namePattern = new RegExp(/^(名称|Name):/);

export default function EvolutionPlan() {
  const intl = useIntl();
  const [planOpen, setPlanOpen] = useState(false);
  const [algorithmOpen,setAlgorithmOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('evolutionPlanName');

  const [searchValue, setSearchValue] = useState('');
  const [searchSelectAnchorEl, setSearchSelectAnchorEl] = useState(null);
  const searchSelectOpen = Boolean(searchSelectAnchorEl);
  const [searchBy, setSearchBy] = useState([
    intl.messages['common.name'],
    intl.messages['common.createTime'],
  ]);

  //TODO:此处只是权宜之计，上面的searchBy不能切换语言，而且考虑到setSearchBy暂未使用，所以干脆以不变的数组表示搜索项
  const searchByList = [
    intl.messages['common.name'],
    intl.messages['common.createTime'],
  ]

  const [colDisplay, setColDisplay] = useState([true, true, true, true, true]);
  const [customContentAnchorEl, setCustomContentAnchorEl] = useState(null);
  const customContentOpen = Boolean(customContentAnchorEl);

  const [searchList, setSearchList] = useState([]);

  const { pageSize, pageNum, evolutionPlans,evo_plans} = useSelector(state => {
    return {
      pageSize: state.Evolution.pageSize || [],
      pageNum: state.Evolution.pageNum || [],
      evolutionPlans: state.Evolution.evolutionPlans,
      evo_plans: state.Evolution.evo_plans,
    };
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    //获取到对应的evolist，dataSource和算法与data的匹配表
    dispatch(evo_getPlanList("",""));
    dispatch(evo_get_dataSource());
    dispatch(evo_get_algorithm_data_mapping());
  }, []);

  useEffect(() =>{
    searchByTwo();
  },[searchList]);

  useEffect(() => {
    // setTableData(evolutionPlans);
    setTableData(evo_plans);
  }, [evo_plans]);

  const headRow = [
    createRow(
      'evolutionPlanName',
      intl.messages['evolution.evolutionPlanName'],
      true,
      '100px',
      '100px',
      true,
      'left'
    ),
    createRow(
      'createTime',
      intl.messages['common.createTime'],
      false,
      '100px',
      '100px',
      colDisplay[0],
      'center'
    ),
    createRow(
      'executionNumber',
      intl.messages['common.executionNumber'],
      false,
      '120px',
      '130px',
      colDisplay[1],
      'center'
    ),
    createRow(
      'lastExecutionTime',
      intl.messages['common.lastExecutionTime'],
      false,
      '120px',
      '130px',
      colDisplay[2],
      'center'
    ),
    createRow(
      'enableOrDisable',
      intl.messages['common.enableOrDisable'],
      false,
      '120px',
      '130px',
      colDisplay[3],
      'center'
    ),
    createRow(
      'remark',
      intl.messages['common.remark'],
      false,
      '120px',
      '130px',
      colDisplay[4],
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
      if (value.startsWith(`${intl.messages['common.createTime']}:`)) {
        tmpData = tmpData.filter((tableRow, _) => {
          return tableRow.cre_time.includes(value.replace(createTimePattern, ''));
        });
      } else if (value.startsWith(`${intl.messages['common.name']}:`)) {
        tmpData = tmpData.filter((tableRow, _) => {
          return tableRow.evo_name.includes(value.replace(namePattern, ''));
        });
      } else {
        tmpData = tmpData.filter((tableRow, _) => {
          return tableRow.testPlanName.includes(value);
        });
      }
    });
    return tmpData;
  };

  const searchByTwo = () => {
    const listSearchName = [];
    const listSearchTime = [];
    searchList.forEach((value, _) => {
      if (value.startsWith(`${intl.messages['common.createTime']}:`)) {
        listSearchTime.push(value.replace(createTimePattern, ''))
      } else if (value.startsWith(`${intl.messages['common.name']}:`)) {
        listSearchName.push(value.replace(namePattern, ''))
      } else {
        return evo_plans;
      }
    });
    
    //暂时先只允许第一个参数起效
    //TODO 后续可能需要改成允许同时查询多个名称
    if(listSearchName.length!=0 && listSearchTime!=0){
      dispatch(evo_getPlanList(listSearchName[0],listSearchTime[0]))
    }else if(listSearchName.length != 0){
      dispatch(evo_getPlanList(listSearchName[0],""))
    }else if(listSearchTime.length != 0){
      dispatch(evo_getPlanList("",listSearchTime[0]))
    }else{
      dispatch(evo_getPlanList("",""))
    }
    
   };
   
  const visibleRows = useMemo(() => {
    //当前计划的总数是evo_plans中的长度
    setCount(evo_plans.length);
    //如果页码超过了最大页码就返回1
    if (pageSize * (pageNum - 1) > count) {
      dispatch({ type: UPDATE_TEST_PLAN_PAGE_NUM, data: 1 });
      return evo_plans.slice(
        0,
        pageSize
      );
    }
    return evo_plans.slice(
      (pageNum - 1) * pageSize,
      (pageNum - 1) * pageSize + pageSize
    );
  },[pageNum, pageSize,searchList,evo_plans]);


  const handlePlanClick = () => {
    setPlanOpen(true);
  };

  const handleAlgorithmClick = () => {
    setAlgorithmOpen(true);
  }

  //改变每页的数量
  const handlePerPageChange = pageSize => {
    dispatch({ type: UPDATE_TEST_PLAN_PAGE_SIZE, data: pageSize });
  };

  //改变页码
  const handlePageChange = (_event, newPage) => {
    //页码小于1直接返回
    if(newPage <= 0){
      return; 
    }
    console.log(newPage)
    dispatch({ type: UPDATE_TEST_PLAN_PAGE_NUM, data: newPage });
  };

  const handleSearchByClick = by => {
    setSearchValue(by + ':');
    var text = document.getElementById('instance-status-search-input');
    text.focus();
  };

  const resetParameters = () => {
    dispatch({ type: UPDATE_GROUP_EDIT, data: false });
    dispatch({ type: RESET_PLAN });
    dispatch({ type: RESET_GROUP });
  };

  const isDuplicate = () => {
    return false;
  };

  //不加前缀的是处理创建计划框的，加了前缀的为处理管理算法框的
  const handleClose = () => {
    resetParameters();
    setPlanOpen(false);
  };
  const handleCancelClick = () => {
    resetParameters();
    setPlanOpen(false);
  };
  const handleConfirmClick = () => {
    resetParameters();
    setPlanOpen(false);
  };

  const handleAlgorithmConfirmClick = () => {
    setAlgorithmOpen(false);
  };
  const handleAlgorithmClose = () => {
    setAlgorithmOpen(false);
  };
  const handleAlgorithmCancelClick = () => {
    setAlgorithmOpen(false);
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

  const handleRefresh = () => {
    setSearchList([]);
  }

  return (
    <Stack>
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
          <StressTestingIcon />
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
              {intl.messages['evolution.evolutionPlan']}
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
              {intl.messages['evolution.evolutionPlan']}
            </Typography>
          </Box>
        </Stack>
      </Box>

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
            {searchByList.map((value, index) => {
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
              width: '150px',
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
              onClick={handleRefresh}
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
            {/* 创建演化计划按钮 */}
            <KubeConfirmButton
              sx={{
                width: '200px',
              }}
              onClick={handlePlanClick}
            >
              {intl.messages['evolution.createEvolutionPlan']}
            </KubeConfirmButton>
              {/* 管理演化功能相关的分析算法和执行算法 */}
            <KubeConfirmButton
              sx={{
                width: '200px',
              }}
              onClick={handleAlgorithmClick}
            >
              {"管理演化算法"}
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
                      key={row.evo_id + '' + index}
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
                      /> */}
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
                              navigate(`/detail/evolutionplan/${row.evo_id}`);
                            }}
                          >
                            {row.evo_name}
                          </Box>
                        </Stack>
                      </StyledTableBodyCell>
                      <StyledTableBodyCell
                        align={'center'}
                        sx={{
                          display: headRow[1].show ? 'table-cell' : 'none',
                        }}
                      >
                        {formatDatetimeString(row.cre_time)}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell
                        align={'center'}
                        sx={{
                          display: headRow[2].show ? 'table-cell' : 'none',
                        }}
                      >
                        {row.exe_times}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell
                        align={'center'}
                        sx={{
                          display: headRow[3].show ? 'table-cell' : 'none',
                        }}
                      >
                        {formatDatetimeString(row.last_time)}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell
                        align={'center'}
                        sx={{
                          display: headRow[4].show ? 'table-cell' : 'none',
                        }}
                      >
                        {row.evo_enable == '1'
                          ? intl.messages['common.yes']
                          : intl.messages['common.no']}
                      </StyledTableBodyCell>
                      <StyledTableBodyCell
                        align={'center'}
                        sx={{
                          display: headRow[5].show ? 'table-cell' : 'none',
                        }}
                      >
                        {row.evo_remarks}
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
          count={count}
          handlePerPageChange={handlePerPageChange}
          handlePageChange={handlePageChange}
          sx={{
            pt: '12px',
            pb: '12px',
          }}
        />
      </Box>
      
      
      
      {/* 新增计划框 */}
      <StyledModal open={planOpen} onClose={handleClose}>
        <EvolutionProgress
          handleConfirmClick={handleConfirmClick}
          handleCancelClick={handleCancelClick}
          showError={showError}
          setShowError={setShowError}
          state="add"
        />
      </StyledModal>
      {/* 管理算法框 */}
      <StyledModal open={algorithmOpen} onClose={handleAlgorithmClose}>
        <AlgorithmManage
          handleConfirmClick={handleAlgorithmConfirmClick}
          handleCancelClick={handleAlgorithmCancelClick}
          showError={showError}
          setShowError={setShowError}
          state="add"
        />
      </StyledModal>
    </Stack>
  );
}

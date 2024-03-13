/**
 * src\Pages\Service\module\Overview.js
 */
import { useEffect, useState, useMemo } from 'react';
import {
  StyledTableContainer,
  StyledTableBodyCell,
  StyledTableFooter,
  StyledTableHead,
} from '@/components/DisplayTable';
import {
  TableRow,
  Box,
  Table,
  TableCell,
  TableBody,
  Popover,
  Popper,
  Stack,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { transformVersion } from '@/utils/commonUtils';
import { fontFamily } from '@/utils/commonUtils';
import ServiceQuery from '@/assets/ServiceQuery.svg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyledAutocomplete,
  ChipTextField,
} from '../../../components/Input';
import {
  CHANGE_PAGE_NUM,
  CHANGE_PAGE_SIZE,
} from '../../../actions/serviceAction';
import {
  UPDATE_SEARCH_SERVICE,
} from '../../../actions/serviceAction';
import { EclipseTransparentButton } from '../../../components/Button';
import { KubeCheckbox } from '../../../components/Checkbox';
import Question from '@/assets/Question.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import { encodeId } from '../../../utils/commonUtils';
import { useIntl } from 'react-intl';

function createRow(
  id,
  label,
  isOrder = true,
  minWidth = '110px',
  maxWidth = '120px',
  show = true,
  colSpan = 1,
  rowSpan = 1,
  align
) {
  return {
    id,
    label,
    isOrder,
    minWidth,
    maxWidth,
    show,
    colSpan,
    rowSpan,
    align,
  };
}

const headSecondRow = [
  createRow('major', '大版本号', false, '240px', '280px', true),
  createRow('minor', '小版本号', false, '190px', '190px', true),
  createRow('patch', 'Patch版本号', false, '200px', '240px', true),
];

const versionKey = ['major', 'minor', 'patch'];
const resourceKey = ['cpu', 'ram', 'disk', 'gpuCore', 'gpuMem'];

const IDPattern = new RegExp(/^ID:/);
const namePattern = new RegExp(/^名称:/);

export const RUNNING = 'Running';
export const PENDING = 'Pending';
export const FAILED = 'Failed';
export const SUCCEEDED = 'Succeeded';

export default function ServiceOverview(props) {
  const { data, setIndex, selectedIndex } = props;
  const intl = useIntl();
  const [orderType, setOrderType] = useState('version'); //排序的表头
  const [orderAs, setOrderAs] = useState('asc'); //排序的顺序
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const { embeddingButton } = props;
  const [project, setProject] = useState(null);
  const [projectList, setProjectList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const [searchValue, setSearchValue] = useState('');
  const [searchSelectAnchorEl, setSearchSelectAnchorEl] = useState(null);
  const searchSelectOpen = Boolean(searchSelectAnchorEl);
  const [searchBy, setSearchBy] = useState(['名称', 'ID']);

  const [colDisplay, setColDisplay] = useState([true, true, true, true]);
  const [customContentAnchorEl, setCustomContentAnchorEl] = useState(null);
  const customContentOpen = Boolean(customContentAnchorEl);

  const [checkAll, setCheckAll] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { queryResult, pageSize, pageNum } = useSelector(state => {
    return {
      queryResult: state.Service.queryResult,
      pageSize: state.Service.pageSize,
      pageNum: state.Service.pageNum,
    };
  });

  // service/query左侧表格表头
  const headFirstRow = [
    // createRow('id', '服务ID', false, '150px', '170px', true, 1, 1, 'left'),
    createRow('name', intl.messages['common.serviceName'], false, '120px', '130px', true, 1, 1, 'left'),
    createRow(
      'repo',
      intl.messages['common.repo'],
      false,
      '220px',
      '240px',
      colDisplay[0],
      1,
      1,
      'center'
    ),
    createRow(
      'imageUrl',
      intl.messages['common.imageUrl'],
      false,
      '220px',
      '240px',
      colDisplay[1],
      1,
      1,
      'center'
    ),
    createRow(
      'version',
      intl.messages['common.serviceVersion'],
      false,
      '100px',
      '100px',
      colDisplay[2],
      1,
      1,
      'left'
    ),
    createRow(
      'interfaces',
      intl.messages['common.interfaceCollection'],
      false,
      '100px',
      '100px',
      colDisplay[3],
      1,
      1,
      'left'
    ),
    // createRow('idleResource', '空闲时占用资源', false, '170px', '200px', true, 5, 1),
    // createRow('desiredResource', '期望资源', false, '170px', '200px', true, 5, 1),
    // createRow('desiredCapability', '处理能力', false, '170px', '200px', true, 5, 1),
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
    const items = data;
    const tmpData = items.map((value, index) => {
      return {
        name: value.name,
        id: value.id,
        repo: value.repo,
        imageUrl: value.imageUrl,
        interfaces: value.interfaces,
        version: value.version,
      };
    });
    if (tmpData) {
      setCount(tmpData.length);
      setTableData(tmpData);
    }
  }, [queryResult]);

  const handleRequestSort = (_event, property) => {
    const isAsc = orderType === property && orderAs === 'asc';
    setOrderAs(isAsc ? 'desc' : 'asc');
    setOrderType(property);
  };

  const filtering = () => {
    let tmpData = JSON.parse(JSON.stringify(tableData));
    searchList.forEach((value, _) => {
      if (value.startsWith('ID:')) {
        tmpData = tmpData.filter((tableRow, _) => {
          return tableRow.id.includes(value.replace(IDPattern, ''));
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

  function stableSort(array, comparator) {
    const stabilizedThis = array && array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis && stabilizedThis.map(el => el[0]);
  }

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
    var text = document.getElementById('service-search-input');
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

  const isSelected = name => selected.indexOf(name) !== -1;

  // 点击服务id跳转页面
  const handleClickById = id => {
    navigate(`/detail/service/${encodeId(id)}`);
  };

  // service/query左侧表格新
  return (
    // <BrowserRouter>
    <Box>
      {/* 条件过滤悬浮框 */}
      <Popper
        id='service-query-table-serch-popper'
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
          {searchBy &&
            searchBy.map((value, index) => {
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

      {/* 眼睛悬浮框 */}
      <Popover
        id='service-query-table-custom-content-popover'
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
            width: '150px',
            borderRadius: '5px',
            padding: '8px',
            bgcolor: '#242e42',
            fontSize: '12px',
            fontFamily: fontFamily,
          }}
        >
          {colDisplay.map((value, index) => {
            // console.log(colDisplay)
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
                  {headFirstRow[index + 1].label}
                </Box>
              </Stack>
            );
          })}
        </Stack>
      </Popover>

      {/* 最上面一行栏 */}
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
            value={project}
            onChange={(event, newValue) => {
              setProject(newValue);
            }}
            id='service_table_autocomplete'
            options={projectList}
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
              <TextField {...params} placeholder={intl.messages['serviceOverview.allItems']} />
            )}
          />
          {/* 搜索栏 */}
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
            id='service-search-input'
          />
          {/* 刷新按钮 */}
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
          {/* 眼睛按钮 */}
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
            headRow={headFirstRow}
            selectAll={true}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            checkAll={checkAll}
            setCheckAll={setCheckAll}
          />

          <TableBody>
            {!loading && visibleRows !== null && visibleRows.length !== 0 ? (
              visibleRows &&
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

                    {/* 仓库 */}
                    <StyledTableBodyCell
                      align={'left'}
                      // align='center'
                      sx={{
                        display: headFirstRow[1].show ? 'table-cell' : 'none',
                      }}
                    >
                      {row.repo}
                    </StyledTableBodyCell>

                    {/* 镜像 */}
                    <StyledTableBodyCell
                      align={'left'}
                      // align='center'
                      sx={{
                        display: headFirstRow[2].show ? 'table-cell' : 'none',
                      }}
                    >
                      {row.imageUrl}
                    </StyledTableBodyCell>

                    {/* 版本 */}
                    <StyledTableBodyCell
                      align={'left'}
                      // align='center'
                      sx={{
                        display: headFirstRow[3].show ? 'table-cell' : 'none',
                      }}
                    >
                      {transformVersion(row.version)}
                    </StyledTableBodyCell>

                    {/* 接口 */}
                    <StyledTableBodyCell
                      align={'left'}
                      // align='center'
                      sx={{
                        display: headFirstRow[4].show ? 'table-cell' : 'none',
                      }}
                    >
                      {row.interfaces.length}
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
    </Box>
  );
}

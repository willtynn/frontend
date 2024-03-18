import { useEffect, useState, useRef, useMemo, version } from 'react';
import {
  StyledTableBox,
  StyledTableContainer,
  StyledTableRowCell,
  StyledTableBodyCell,
  StyledTableFooter,
  StyledTableHead,
} from '@/components/DisplayTable';
import {
  CircularProgress,
  TableRow,
  TableHead,
  Box,
  Table,
  TableCell,
  TableContainer,
  Typography,
  IconButton,
  Tooltip,
  Toolbar,
  TableBody,
  tableCellClasses,
  Popover,
  Popper,
  Stack,
  TextField,
  Checkbox,
  Modal,
  Fab,
  Button
} from '@mui/material';
import { styled } from '@mui/system';
// import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { transformVersion, shadowStyle } from '@/utils/commonUtils';
import { fontFamily } from "@/utils/commonUtils";
// import Task from '@/assets/Task.svg';
import ServiceQuery from '@/assets/ServiceQuery.svg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PolylineIcon from '@mui/icons-material/Polyline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyledAutocomplete,
  StyledTextFiled,
  ChipTextField,
} from '@/components/Input';
import {
  CHANGE_PAGE_NUM,
  CHANGE_PAGE_SIZE,
} from '@/actions/modelAction';
import { formatDatetimeString } from '@/utils/commonUtils';
import { UPDATE_SEARCH_SERVICE } from '@/actions/modelAction';
import { EclipseTransparentButton } from '@/components/Button';
import Upload from './Upload'
import {
  uploadModel,
  searchModelByName,
  getModelDetail,
  deleteDetail
} from '@/actions/modelAction';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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


// const IDPattern = new RegExp(/^ID:/);
// const namePattern = new RegExp(/^名称:/);

// export const RUNNING = 'Running';
// export const PENDING = 'Pending';
// export const FAILED = 'Failed';
// export const SUCCEEDED = 'Succeeded';

export default function ModelOverview(props) {
  const { data, setIndex, selectedIndex } = props;
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  //上传
  const [open, setOpen] = useState(false); //弹窗
  const [modelName, setModelName] = useState('');
  const [modelFile, setModelFile] = useState('');
  const [selectFile, setSelectFile] = useState(null);

  //删除弹窗
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null);

  const { embeddingButton } = props;
  const [project, setProject] = useState(null);
  const [projectList, setProjectList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');

  const [searchValue, setSearchValue] = useState('');
  const [searchSelectAnchorEl, setSearchSelectAnchorEl] = useState(null);
  const searchSelectOpen = Boolean(searchSelectAnchorEl);
  const [searchBy, setSearchBy] = useState(['名称', 'ID']);

  const [colDisplay, setColDisplay] = useState([true, true, true]);
  const [customContentAnchorEl, setCustomContentAnchorEl] = useState(null);
  const customContentOpen = Boolean(customContentAnchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { queryResult, pageSize, pageNum, isLoading } = useSelector(state => {
    return {
      queryResult: state.Model.queryResult,
      pageSize: state.Model.pageSize,
      pageNum: state.Model.pageNum,
      isLoading: state.Model.isLoading
    };
  });

  // 表头
  const headFirstRow = [
    createRow('id', '模型ID', true, '300px', '400px', true, 1, 1, 'left'),
    createRow('name', '模型名称', true, '300px', '400px', colDisplay[0], 1, 1, 'left'),
    createRow('size', '模型大小(Kb)', true, '400px', '400px', colDisplay[1], 1, 1, 'center'),
    createRow('model', '模型结构', false, '260px', '400px', colDisplay[2], 1, 1, 'center'),
    createRow('', '操作', false, '100px', '100px', true, 1, 1, 'center'),
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

  useEffect(() => {
    if (queryResult === null) {
      return;
    }
    // console.log(queryResult.items)
    // const items = gottenInstances.myItems;
    const items = data
    const tmpData = items.map((value, index) => {
      return {
        name: value.name,
        id: value.id,
        size: value.size,
        file: value.file
      };
    });
    if (tmpData) {
      setCount(tmpData.length);
      setTableData(tmpData);
    }
  }, [queryResult]);


  const handleRequestSort = (_event, property) => {
    console.log(property)
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filtering = () => {
    let tmpData = JSON.parse(JSON.stringify(tableData));
    searchList.forEach((value, _) => {
      tmpData = tmpData.filter((tableRow, _) => {
        return tableRow.name.includes(value);
      });
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

  const handleRefresh = () => {
    dispatch(searchModelByName(''))
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

  const handleUploadClick = event => {

  };

  const isSelected = name => selected.indexOf(name) !== -1;


  // 点击模型id跳转页面
  const handleClickById = index => {
    // let id=tableData[index][0];
    let indexId = (pageNum - 1) * pageSize + index
    let id = tableData[indexId]['id']
    // console.log(`http://192.168.1.104:32589/static/?id=${id}`)
    // window.open('http://192.168.1.104:32589/static?modelPath=/models/'+file, '_blank');
    navigate(`/detail/model/${id}`);
  };

  // 上传
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const resetParam = () => {
    setModelName('')
    setModelFile('')
    setSelectFile(null)
  };


  const handleCancelClick = () => {
    setOpen(false);
    resetParam();
  };

  const handleConfirmClick = () => {
    dispatch(uploadModel(modelName, selectFile))
    setOpen(false)
    resetParam()
    console.log(isLoading)
  };

  const handleModelNameChange = (e) => {
    setModelName(e.target.value);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // 处理选择的文件
    setModelFile(file.name)
    setSelectFile(file)
    console.log(file);
  };

  //删除
  const handleDialogClickOpen = id => {
    setDeleteId(id)   
    setDialogOpen(true)
  };

  const handleDialogClose = () => {
    setDeleteId('')
    setDialogOpen(false)
  }

  const handleModelDelete = () =>{
    setDialogOpen(false);
    dispatch(deleteDetail(deleteId))
    setDeleteId('')
  }

  // service/query左侧表格新 
  return (
    // <BrowserRouter>
    <Box>
      {/* 上传弹窗 */}
      <Modal open={open} onClose={handleClose}>
        <Upload
          handleConfirmClick={handleConfirmClick}
          handleCancelClick={handleCancelClick}
          handleModelNameChange={handleModelNameChange}
          handleFileChange={handleFileChange}
          modelName={modelName}
          modelFile={modelFile}
          selectFile={selectFile}
        />
      </Modal>
      {/* 删除弹窗 */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"确认删除模型吗?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          删除模型可能会影响到其他依赖该模型的功能和应用。在删除前，请确保您已经与相关团队和用户沟通，并了解潜在的风险和影响
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>取消</Button>
          <Button onClick={handleModelDelete} autoFocus>
            确认
          </Button>
        </DialogActions>
      </Dialog>

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
                height: "20px"
              },
            }}
            // onFocus={handleSearchFocus}
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
              height: "32px"
            }}
            onClick={handleRefresh}
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
              height: "32px"
            }}
            onClick={handleEyeClick}
          >
            <VisibilityIcon />
          </EclipseTransparentButton>
          {/* 上传按钮 */}
          <EclipseTransparentButton
            sx={{
              bgcolor: '#f9fbfd !important',
              '&:hover': {
                bgcolor: '#FFFFFF !important',
              },
              '& svg': {
                color: '#3d3b4f',
              },
              height: "32px"
            }}
            onClick={handleOpen}
          >
            <FileUploadIcon />
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
            headRow={headFirstRow}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />

          <TableBody>
            {!loading && visibleRows !== null && visibleRows.length !== 0 ? (
              visibleRows && visibleRows.map((row, index) => {
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

                    {/* 模型id */}
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
                          onClick={handleClickById.bind(this, index)}
                        >
                          {row.id}
                        </Box>
                      </Stack>
                    </StyledTableBodyCell>

                    {/* 模型名称 */}
                    <StyledTableBodyCell
                      align={'left'}
                      // align='center'
                      sx={{ display: headFirstRow[1].show ? 'table-cell' : 'none' }}
                    >
                      {row.name}
                    </StyledTableBodyCell>

                    {/* 模型大小 */}
                    <StyledTableBodyCell
                      align={'center'}
                      // align='center'
                      sx={{ display: headFirstRow[2].show ? 'table-cell' : 'none' }}
                    >
                      {row.size}
                    </StyledTableBodyCell>
                    {/* 模型结构 */}
                    <StyledTableBodyCell
                      align={'center'}
                      // align='center'
                      sx={{ display: headFirstRow[3].show ? 'table-cell' : 'none' }}
                    >
                      <IconButton
                        onClick={() => {
                          window.open('http://192.168.1.104:32589/static?modelPath=/models/' + row.file, '_blank');
                        }}
                        size='small'
                      >
                        <PolylineIcon fontSize='small' />
                      </IconButton>
                    </StyledTableBodyCell>

                    {/* 删除模型 */}
                    <StyledTableBodyCell
                      align={'center'}
                      // align='center'
                      sx={{ display: 'table-cell' }}
                    >
                      <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                          <DeleteIcon onClick={handleDialogClickOpen.bind(this, row.id)}
                            size='small'
                            color='primary' />
                        </IconButton>
                      </Tooltip>

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
        sx={{
          pt: '12px',
          pb: '12px',
        }}
      />
      {/* </StyledTableBox> */}
    </Box>
    // </BrowserRouter>
  );
}

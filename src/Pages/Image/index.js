import {useEffect, useState, useMemo, useRef} from 'react';
import {
  StyledTableContainer,
  StyledTableBodyCell,
  StyledTableHead,
} from '@/components/DisplayTable';
import {
  TableRow,
  Box,
  Table,
  Typography,
  Tooltip,
  TableBody,
  Stack, IconButton, TextField, Modal,
} from '@mui/material';
import React from 'react';
import ServiceQuery from '@/assets/ServiceQuery.svg';
import { useDispatch, useSelector } from 'react-redux';
import {getImageList, deleteImage, pullImage} from '../../actions/imageAction';
import GeneralService from '@/assets/GeneralService.svg';
import { KubeCheckbox } from '../../components/Checkbox';
import DeleteIcon from "@mui/icons-material/Delete";
import {EclipseTransparentButton, KubeCancelButton, KubeConfirmButton} from "../../components/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RefreshIcon from "@mui/icons-material/Refresh";
import {ChipTextField, StyledAutocomplete} from "../../components/Input";
import SearchIcon from "@mui/icons-material/Search";
import { fontFamily } from '@/utils/commonUtils';
import {StyledTableFooter} from "../../components/DisplayTable";
import DeployProgress from "../Cluster/deploy/DeployProgress";
import ProgressIndicator from "../Cluster/deploy/DeployProgress/ProgressIndicator";
import InfoFinished from '@/assets/InfoFinished.svg';
import InfoWaiting from '@/assets/InfoWaiting.svg';
import InfoNow from '@/assets/InfoNow.svg';
import DockerFinished from '@/assets/DockerFinished.svg';
import DockerWaiting from '@/assets/DockerWaiting.svg';
import DockerNow from '@/assets/DockerNow.svg';
import {KubeDeploymentCard} from "../../components/InfoCard";
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-xcode';

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

export default function ImagesList(props) {
  const { data, setIndex, selectedIndex } = props;
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(0);
  const [searchSelectAnchorEl, setSearchSelectAnchorEl] = useState(null);
  const [searchBy, setSearchBy] = useState(['名称', 'ID']);
  const [checkAll, setCheckAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [imagePage, setImagePage] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [clusterSelected, setClusterSelected] = useState('ices04');
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [jsonValue, setJsonValue] = useState('{\n    "node": "xxx",\n    "image": ["xxx"]\n}');

  const { imageList } = useSelector(state => {
    return {
      imageList: state.Image.imageList
    };
  });

  const rows = imageList;
  const imageNumPerPage = 10;

  const clearPage = () => {
    setSelectedImageIndex(-1);
    setImagePage(1);
  };

  const filtering = () => {
    let tmpData = JSON.parse(JSON.stringify(imageList));
    searchList.forEach((value, _) => {
      tmpData = tmpData.filter((tableRow, _) => {
        return tableRow.imageName.includes(value);
      });
    });
    return tmpData;
  };

  const visibleRows = React.useMemo(() => {
    if (!imageList || imageList.length === 0) {
      return [];
    }
    const tmpData = filtering();
    const tmp = (imagePage - 1) * imageNumPerPage;
    return tmpData.slice(tmp, tmp + imageNumPerPage);
  }, [imageList, imagePage, searchList]);

  const headFirstRow = [
    createRow('name', '镜像名', false, '150px', '170px', true, 1, 1, 'left'),
    createRow('version', '版本', false, '100px', '100px', true, 1, 1, 'center'),
    createRow('size', '大小（MB）', false, '120px', '130px', true, 1, 1, 'center'),
    createRow('cluster', '所在节点', false, '120px', '130px', true, 1, 1, 'center'),
    createRow('delete', '操作', false, '120px', '130px', true, 1, 1, 'center'),
  ];

  useEffect(() => {
    dispatch(getImageList(clusterSelected));
    clearPage();
  }, []);

  useEffect(() => {
    if (!imageList) {
      return;
    }
    const items = rows
    const tmpData = items.map((value, index) => {
      return {
        name: value.name,
        version: value.version,
      };
    });
    if (tmpData) {
      setCount(tmpData.length);
      setTableData(tmpData);
    }
  }, [imageList]);

  const deleteClick = (name, cluster, version) => {
    dispatch(deleteImage(name, cluster, version));
    dispatch(getImageList(cluster));
  }
  const isDuplicate = () => {
    return false;
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setSearchSelectAnchorEl(null);
    }, 300);
  };

  const handleChangePage = (_, newPage) => {
    if (imagePage !== newPage) {
      setSelectedImageIndex(-1);
      setImagePage(newPage);
    }
  };

  const handleAddClick = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleConfirm = () => {
    dispatch(pullImage(JSON.parse(jsonValue)))
  }

  const handleInputChange = (value) => {
    setJsonValue(value);
  }

  return (
    <>
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
        <GeneralService />
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
              镜像列表
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
              镜像列表
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          width: '100%',
          minWidth: '600px',
        }}
      >
        {/* Main Body */}
        <Stack sx={{ width: '100%' }}>
          <div style={{ height: '10px' }} />
          {/* 搜索 */}
          <Box
            sx={{
              height: '32px',
              padding: '10px 30px 10px 30px',
              backgroundColor: '#f9fbfd',
            }}
          >
            <Stack direction='row'>
              <Stack
                direction='row'
                spacing={2}
                sx={{ width: 'calc(100% - 100px)' }}
              >
                <StyledAutocomplete
                  height='32px'
                  padding='6px 5px 5px 12px'
                  value={clusterSelected}
                  onChange={(event, newValue) => {
                    setClusterSelected(newValue);
                    dispatch(getImageList(newValue));
                  }}
                  id='image_table_autocomplete'
                  options={['ices04','icespve01', 'icespve02', 'icespve03']}
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
                    <TextField {...params} placeholder='全部节点' />
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
                    width: 'calc(100% - 100px)',
                    '& .MuiOutlinedInput-input.MuiInputBase-input': {
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
                    backgroundColor: '#f9fbfd !important',
                    '&:hover': {
                      backgroundColor: '#FFFFFF !important',
                    },
                    '& svg': {
                      color: '#3d3b4f',
                    },
                    height: "32px"
                  }}
                  onClick={() => {
                    clearPage();
                    if(clusterSelected !== '') {
                      dispatch(getImageList(clusterSelected));
                    }
                  }}
                >
                  <RefreshIcon />
                </EclipseTransparentButton>
              </Stack>
              <Stack direction='row' spacing={1}>
                <KubeConfirmButton
                  onClick={handleAddClick}
                  sx={{
                    width: '96px',
                    height: '32px',
                  }}
                >
                  拉取镜像
                </KubeConfirmButton>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <StyledTableContainer sx={{ backgroundColor: '#FFF' }}>
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
              checkAll={checkAll}
              setCheckAll={setCheckAll}
              sx={{
                textTransform: 'none !important'
              }}
            />

            <TableBody>
              {visibleRows.map((row) => (
                    <TableRow
                      key={row.Name}
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
                      </StyledTableBodyCell>

                      {/* image name */}
                      <StyledTableBodyCell
                        align='left'
                        sx={{ padding: '6px 16px !important' }}
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
                              ":hover": {
                                color: "#55bc8a"
                              }
                            }}
                            onClick={() => {}}
                          >
                            {row.imageName}
                          </Box>
                        </Stack>
                      </StyledTableBodyCell>

                      {/* 版本 */}
                      <StyledTableBodyCell align='center'>
                        {row.imageVersion === ''? 'None': row.imageVersion}
                      </StyledTableBodyCell>

                      {/* 大小 */}
                      <StyledTableBodyCell align='center'>
                        {Math.floor(row.imageSize /100000)/10}
                      </StyledTableBodyCell>

                      {/* 所在节点 */}
                      <StyledTableBodyCell align='center'>
                        {row.node}
                      </StyledTableBodyCell>

                      {/* 操作 */}
                      <StyledTableBodyCell
                        align='center'
                      >
                        <IconButton
                          onClick={() => {deleteClick(row.imageName, row.node, row.imageVersion)}}
                          aria-label="delete">
                          <DeleteIcon
                            size='small'
                            sx={{color:'#79879c', ':hover': {color:'#36435c'}}}
                          />
                        </IconButton>
                      </StyledTableBodyCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <StyledTableFooter
          pageSize={imageNumPerPage}
          pageNum={imagePage}
          count={imageList ? imageList.length : 0}
          handlePageChange={handleChangePage}
          sx={{
            width: '100%',
            pt: '10px',
            pb: '10px',
          }}
        />
        <Modal open={open} onClose={handleClose}>
         <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '960px',
            boxShadow: 24,
            height: 'calc(100% - 120px)',
            fontFamily: fontFamily,
          }}
         >
           <KubeDeploymentCard
             title='镜像缓存配置'
             handleClose={handleClose}
           >
             <Stack
               direction='row'
               spacing={0}
               sx={{bgcolor: '#eff4f9', p: '0px 20px'}}
             >
               <ProgressIndicator
                 title='镜像缓存方案'
                 adornments={[<InfoWaiting/>, <InfoNow/>, <InfoFinished/>]}
                 stage={1}
                 // currentStage={currentStage}
               />
             </Stack>
             {/*{currentPage(currentStage)}*/}
             <AceEditor
               mode="json"
               theme="xcode"
               onChange={handleInputChange}
               value={jsonValue}
               editorProps={{ $blockScrolling: true }}
               placeholder="Enter JSON here..."
               width="100%"
               height="calc(100% - 200px)"
             />
             {/* 按钮组 */}
             <Stack
               sx={{
                 mt: '80px',
                 position: 'absolute',
                 bottom: '12px',
                 width: 'calc(100% - 64px)',
                 bgcolor: '#f9fbfd',
               }}
               direction='row'
               spacing={3}
               justifyContent='flex-end'
               alignItems='flex-end'
             >
               <KubeCancelButton
                 sx={{height: '32px', p: '5px 23px'}}
                 onClick={handleClose}
               >
                 取消
               </KubeCancelButton>
               <KubeConfirmButton
                 sx={{height: '32px', p: '5px 23px'}}
                 onClick={handleConfirm}
               >
                 创建
               </KubeConfirmButton>
             </Stack>
           </KubeDeploymentCard>
         </Box>
        </Modal>
      </Box>
    </>
  );
}

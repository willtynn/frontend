import { useEffect, useState, useMemo } from 'react';
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
  Stack, IconButton,
} from '@mui/material';
// import Task from '@/assets/Task.svg';
import ServiceQuery from '@/assets/ServiceQuery.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getImageList, deleteImage } from '../../actions/imageAction';
import GeneralService from '@/assets/GeneralService.svg';
import { KubeCheckbox } from '../../components/Checkbox';
import DeleteIcon from "@mui/icons-material/Delete";
import {EclipseTransparentButton, KubeConfirmButton} from "../../components/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RefreshIcon from "@mui/icons-material/Refresh";
import {ChipTextField} from "../../components/Input";
import SearchIcon from "@mui/icons-material/Search";

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
  const dispatch = useDispatch();

  const { imageList } = useSelector(state => {
    return {
      imageList: state.Image.imageList
    };
  });

  // const rows = imageList;

  const rows = [
    {
      "Name": "192.168.1.104:5000/buildservice:1.1",
      "Labels": {
        "io.cri-containerd.image": "managed"
      },
      "Target": {
        "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
        "digest": "sha256:27bdcbfb779a7dec50b8ab090097562fdf09acf64a15e950969ec0c83142419c",
        "size": 2432
      },
      "CreatedAt": "2023-10-15T07:46:04.865519365Z",
      "UpdatedAt": "2023-10-15T07:46:04.893784698Z"
    },
  ];

  // service/query左侧表格表头
  const headFirstRow = [
    createRow('name', '镜像名', false, '150px', '170px', true, 1, 1, 'left'),
    createRow('size', '大小', false, '120px', '130px', true, 1, 1, 'center'),
    createRow('cluster', '所在集群', false, '120px', '130px', true, 1, 1, 'center'),
    createRow('delete', '操作', false, '120px', '130px', true, 1, 1, 'center'),
  ];

  useEffect(() => {
    dispatch(getImageList());
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

  const deleteClick = name => {
    dispatch(deleteImage(name));
    dispatch(getImageList());
    return ''
  }
  const isDuplicate = () => {
    return false;
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setSearchSelectAnchorEl(null);
    }, 300);
  };

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
                  // onClick={handleRefresh}
                >
                  <RefreshIcon />
                </EclipseTransparentButton>
              </Stack>
              <Stack direction='row' spacing={1}>
                <KubeConfirmButton
                  // onClick={handleAddClick}
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
            />

            <TableBody>
              {rows.map((row) => (
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
                        <KubeCheckbox
                          sx={{
                            backgroundColor: 'transparent !important',
                          }}
                          disableRipple
                          size="small"
                        />
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
                            {row.Name}
                          </Box>
                        </Stack>
                      </StyledTableBodyCell>

                      {/* 大小 */}
                      <StyledTableBodyCell align='center'>
                        {row.Target.size}
                      </StyledTableBodyCell>

                      {/* 所在集群 */}
                      <StyledTableBodyCell align='center'>
                        /
                      </StyledTableBodyCell>

                      {/* 操作 */}
                      <StyledTableBodyCell
                        align='center'
                      >
                        <IconButton
                          onClick={() => {deleteClick(row.Name)}}
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
      </Box>
    </>
  );
}

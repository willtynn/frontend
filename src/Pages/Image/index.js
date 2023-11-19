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
    createRow('size', '大小', false, '120px', '130px', true, 1, 1, 'left'),
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
              selectAll={false}
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
                      {/*<StyledTableBodyCell*/}
                      {/*  align='center'*/}
                      {/*  sx={{*/}
                      {/*    p: '0px 16px !important',*/}
                      {/*  }}*/}
                      {/*>*/}
                      {/*  <KubeCheckbox*/}
                      {/*    sx={{*/}
                      {/*      backgroundColor: 'transparent !important',*/}
                      {/*    }}*/}
                      {/*    disableRipple*/}
                      {/*    size="small"*/}
                      {/*  />*/}
                      {/*</StyledTableBodyCell>*/}

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
                              cursor: "pointer",
                              "&:hover": {
                                color: "#55bc8a"
                              }
                            }}
                            onClick={() => {}}
                          >
                            {row.Name}
                          </Box>
                        </Stack>
                      </StyledTableBodyCell>

                      {/* 服务名称 */}
                      <StyledTableBodyCell
                        align={'left'}
                        // align='center'
                      >
                        {row.Target.size}
                      </StyledTableBodyCell>

                      {/* 操作 */}
                      <StyledTableBodyCell
                        align={'center'}
                        // align='center'
                      >
                        <IconButton
                          onClick={() => {deleteClick(row.Name)}}
                          aria-label="delete">
                          <DeleteIcon
                            size='small'
                            sx={{color:'#79879c', ':hover': {color:'#242e42'}}}
                          />
                        </IconButton>
                      </StyledTableBodyCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
    </>
  );
}

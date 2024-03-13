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
import { getImageList, deleteImage } from '../../actions/imageAction';
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
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-xcode';
import { useIntl } from 'react-intl';

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

export default function EvolutionPlan(props) {
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
  const [jsonValue, setJsonValue] = useState('');

  const intl = useIntl();

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
    return ['演化计划1', '演化计划2', '演化计划3'];
    if (!imageList || imageList.length === 0) {
      return [];
    }
    const tmpData = filtering();
    const tmp = (imagePage - 1) * imageNumPerPage;
    return tmpData.slice(tmp, tmp + imageNumPerPage);
  }, [imageList, imagePage, searchList]);

  const headFirstRow = [
    createRow('name', intl.messages['evolution.evolutionPlan'], false, '150px', '170px', true, 1, 1, 'left'),
    // createRow('version', '版本', false, '100px', '100px', true, 1, 1, 'center'),
    // createRow('size', '大小（MB）', false, '120px', '130px', true, 1, 1, 'center'),
    // createRow('cluster', '所在节点', false, '120px', '130px', true, 1, 1, 'center'),
    // createRow('delete', '操作', false, '120px', '130px', true, 1, 1, 'center'),
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
              {/* 演化计划 */}
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
              {/* 演化计划 */}
              {intl.messages['evolution.evolutionPlan']}
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
                      key={row}
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
                            {row}
                          </Box>
                        </Stack>
                      </StyledTableBodyCell>

                    
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <StyledTableFooter
          // pageSize={imageNumPerPage}
          // pageNum={imagePage}
          // count={imageList ? imageList.length : 0}
          // handlePageChange={handleChangePage}
          sx={{
            width: '100%',
            pt: '10px',
            pb: '10px',
          }}
        />
      </Box>
    </>
  );
}

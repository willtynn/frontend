import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Popover,
} from '@mui/material';
import RouteIcon from '@/assets/RouteIcon.svg';
import Question from '@/assets/Question.svg';
import { StyledModal } from '../../../components/Modal';
import {
  KubeConfirmButton,
  EclipseTransparentButton,
} from '@/components/Button';
import { StyledDateTimePicker, StyledSelect } from '@/components/Input';
import {
  StyledTableRowCell,
  StyledTableContainer,
  StyledTableFooter,
} from '@/components/DisplayTable';

import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { fontFamily } from '@/utils/commonUtils';
import { StrategyRow } from './StrategyRow';
import { Loading } from './Loading';

import dayjs from 'dayjs';

import {
  getPartitionStrategy,
  clearSubModels,
  clearFailed,
  addPartition,
} from '@/actions/partitionAction';
import {AddProgress} from "./AddPartition";
import {ChipTextField} from "../../../components/Input";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import {CLEAR_SUB_MODELS, deletePartitionStrategy, UPDATE_TEMP_STRATEGY_INFO} from "../../../actions/partitionAction";
import {type} from "@testing-library/user-event/dist/type";

const serviceTableHeaders = [
  { key: 'partitionID', align: 'center', text: '拆分策略ID', minWidth: 100, maxWidth: 100 },
  { key: 'partitionName', align: 'center', text: '拆分策略名称', minWidth: 100, maxWidth: 100 },
  { key: 'api', align: 'center', text: '模型名称', minWidth: 200, maxWidth: 200 },
  {
    key: 'count',
    align: 'center',
    text: '模型路径',
    minWidth: 300,
    maxWidth: 300,
  },
  {
    key: 'low',
    align: 'center',
    text: '子模型个数',
    minWidth: 50,
    maxWidth: 50,
  },
  {
    key: 'percentile50',
    align: 'center',
    text: '时间',
    minWidth: 200,
    maxWidth: 200,
  },
  {
    key: 'delete',
    align: 'center',
    text: '操作',
    minWidth: 50,
    maxWidth: 50,
  },
];

const serviceNumPerPage = 10;

export default function PartitionStrategy() {
  const navigate = useNavigate();

  const [durationSelectIndex, setDurationSelectIndex] = useState(5);

  const [startTimeValue, setStartTimeValue] = useState(dayjs().add(-1, 'hour'));
  const [endTimeValue, setEndTimeValue] = useState(dayjs());
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const [strategyRow, setStrategyRow] = useState([]);
  const [servicePage, setServicePage] = useState(0);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(-1);

  const [showLoading, setShowLoading] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [showServiceColumnChooseAnchorEl, setShowServiceColumnChooseAnchorEl] = useState(null);
  const showServiceColumnChooseOpen = Boolean(showServiceColumnChooseAnchorEl);

  const [searchValue, setSearchValue] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [searchSelectAnchorEl, setSearchSelectAnchorEl] = useState(null);

  const [serviceColumnDisplay, setServiceColumnDisplay] = useState([true, true, true, true, true, true, true]);
  //const [showSubPage, setShowSubPage] = useState(false);
  const intl = useIntl();
  const dispatch = useDispatch();

  const { partitionStrategy, routeFailed, jsonData, strategyName, originModelName } = useSelector(state => {
    return {
      partitionStrategy: state.Partition.partitionStrategy,
      routeFailed: state.Partition.routeFailed,
      jsonData: state.Partition.jsonData,
      strategyName: state.Partition.strategyName,
      originModelName: state.Partition.originModelName,
    };
  });

  const filtering = () => {
    let tmpData = JSON.parse(JSON.stringify(partitionStrategy));
    searchList.forEach((value, _) => {
      tmpData = tmpData.filter((tableRow, _) => {
        return tableRow.model_name.includes(value);
      });
    });
    return tmpData;
  };

  const visibleRows = React.useMemo(() => {
    if (!partitionStrategy || partitionStrategy.length === 0) {
      setShowEmpty(true);
      return [];
    }
    const tmpData = filtering();
    setShowEmpty(false);
    const tmp = (servicePage - 1) * serviceNumPerPage;
    return tmpData.slice(tmp, tmp + serviceNumPerPage);
  }, [partitionStrategy, servicePage, searchList]);

  const clearPage = () => {
    setSelectedServiceIndex(-1);
    setServicePage(1);
  };

  const getVisibleRows = () => {
    return serviceColumnDisplay.reduce(
      (prev, curr) => (curr ? prev + 1 : prev),
      0
    );
  };

  const startLoading = () => {
    setShowLoading(true);
    document.body.style.overflow = 'hidden';
  };

  const endLoading = () => {
    setShowLoading(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    if (routeFailed) {
      endLoading();
      dispatch(clearFailed());
    }
  }, [routeFailed]);

  useEffect(() => {
    if (visibleRows) {
      let minWidths = serviceTableHeaders.map(item => item.minWidth);
      let row = visibleRows.map((item, index) => {
        return (
          <StrategyRow
            key={item.id}
            selected={selectedServiceIndex === index}
            onRowClick={() => handleServiceClick(item)}
            onRowDeleteClick={handleDeleteClick}
            rowData={{ ...item, spanNum: 99 }}
            showRows={serviceColumnDisplay}
            minWidth={minWidths}
          />
        );
      });
      setStrategyRow(row);
      for (let i = row.length; i < serviceNumPerPage; i++) {
        row.push(
          <StrategyRow
            key={i}
            onRowClick={() => {}}
            rowData={null}
            showRows={serviceColumnDisplay}
          />
        );
      }
    }
  }, [visibleRows, selectedServiceIndex, serviceColumnDisplay]);

  useEffect(() => {
    let now = dayjs();
    let startTmp = now - 3600000,
      endTmp = now.valueOf();
    setStartTime(startTmp);
    setEndTime(endTmp);
    clearPage();
    dispatch(getPartitionStrategy(startTmp, endTmp));
    dispatch(clearSubModels());
  }, []);

  const handleAddClick = () => {
    clearPage();
    setAddOpen(true);
  };

  const handleDurationSelectChange = e => {
    setDurationSelectIndex(e.target.value);
  };

  const handleStartTimeChange = newValue => {
    setStartTimeValue(newValue);
  };

  const handleEndTimeChange = newValue => {
    setEndTimeValue(newValue);
  };

  const handleServiceChangePage = (_, newPage) => {
    if (servicePage !== newPage) {
      setSelectedServiceIndex(-1);
      setServicePage(newPage);
    }
  };

  const handleServiceClick = item => {
    setSelectedServiceIndex(item.id);
    dispatch({ type: UPDATE_TEMP_STRATEGY_INFO, data: item });
    navigate(`/detail/strategy/${item.id}`);
  };

  const handleServiceColumnChooseItemClick = index => {
    setServiceColumnDisplay(prevDisplay => {
      let tmpDisplay = [...prevDisplay];
      tmpDisplay[index] = !tmpDisplay[index];
      return tmpDisplay;
    });
  };

  const handleServiceColumnChooseClick = event =>
    setShowServiceColumnChooseAnchorEl(event.currentTarget);
  const handleServiceColumnChooseClose = () =>
    setShowServiceColumnChooseAnchorEl(null);

  const sendAllData = () => {
    dispatch(addPartition(strategyName, originModelName, JSON.parse(jsonData)));
    setAddOpen(false);
  }

  const handleSearchBlur = () => {
    setTimeout(() => {
      setSearchSelectAnchorEl(null);
    }, 300);
  };

  const isDuplicate = () => {
    return false;
  };

  const handleRefresh = () => {
    dispatch(getPartitionStrategy(0, 0));
  };

  const handleDeleteClick = (id) => {
    dispatch(deletePartitionStrategy(id));
    dispatch(getPartitionStrategy(0, 0));
  }

  return (
    <>
      {/* 新建弹窗 */}
      <StyledModal open={addOpen} onClose={() => {setAddOpen(false)}}>
        <AddProgress
          handleCancelClick={() => {setAddOpen(false)}}
          handleConfirmClick={() => {sendAllData()}}
        ></AddProgress>
      </StyledModal>
      <Popover
        id='route-trace-table-content-popover'
        open={showServiceColumnChooseOpen}
        anchorEl={showServiceColumnChooseAnchorEl}
        onClose={handleServiceColumnChooseClose}
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
            width: '120px',
            borderRadius: '5px',
            padding: '8px',
            backgroundColor: '#242e42',
            fontSize: '12px',
            fontFamily: fontFamily,
          }}
        >
          {serviceTableHeaders.slice(1,6).map((value, index) => {
            return (
              <Stack
                direction='row'
                onClick={() => handleServiceColumnChooseItemClick(index + 1)}
                sx={{
                  color: '#FFFFFF',
                  '&:hover': {
                    backgroundColor: '#36435c',
                  },
                  p: '0px 8px',
                }}
                justifyContent='flex-start'
                alignItems='center'
                spacing={1}
              >
                {serviceColumnDisplay[index + 1] === true ? (
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
                  {value.text}
                </Box>
              </Stack>
            );
          })}
        </Stack>
      </Popover>

      <Box
        sx={{
          width: '100%',
          minWidth: '600px',
        }}
      >
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
          <Stack direction='row' spacing={-4}>
            <RouteIcon />
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
                拆分方案管理
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
                {intl.messages['partition.tip']}
              </Typography>
            </Box>
          </Stack>
        </Box>

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
                  onClick={handleRefresh}
                >
                  <RefreshIcon />
                </EclipseTransparentButton>
              </Stack>
              <Stack direction='row' spacing={1}>
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
                  onClick={handleServiceColumnChooseClick}
                >
                  <VisibilityIcon />
                </EclipseTransparentButton>
                <KubeConfirmButton
                  onClick={handleAddClick}
                  sx={{
                    width: '96px',
                    height: '32px',
                  }}
                >
                  新建拆分
                </KubeConfirmButton>
              </Stack>
            </Stack>
          </Box>
          {/* Table */}
          <Stack direction='row' spacing={2} sx={{ maxWidth: '100%' }}>
            <Stack sx={{ width: '100%' }}>
              {/* Partition Strategy Table */}
              <Stack>
                <StyledTableContainer sx={{ width: '100%' }}>
                  <Table stickyHeader size='small' sx={{ tableLayout: 'auto' }}>
                    <TableHead>
                      <TableRow sx={{ height: '52px' }}>
                        {serviceTableHeaders.map((item, index) => {
                          if (serviceColumnDisplay[index])
                            return (
                              <StyledTableRowCell
                                key={item.key}
                                align={item.align}
                                sx={{ minWidth: item.minWidth }}
                              >
                                {item.text}
                              </StyledTableRowCell>
                            );
                          return <></>;
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {showEmpty ? (
                        <TableRow style={{ height: '120px' }}>
                          <TableCell
                            colSpan={getVisibleRows()}
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
                        strategyRow
                      )}
                    </TableBody>
                  </Table>
                </StyledTableContainer>
                <StyledTableFooter
                  pageSize={serviceNumPerPage}
                  pageNum={servicePage}
                  count={partitionStrategy ? partitionStrategy.length : 0}
                  handlePageChange={handleServiceChangePage}
                  sx={{
                    width: '100%',
                    pt: '10px',
                    pb: '10px',
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

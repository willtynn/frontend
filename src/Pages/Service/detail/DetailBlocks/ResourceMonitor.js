/**
 * src\Pages\Service\detail\DetailBlocks\ResourceMonitor.js
 */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Stack, 
  Tooltip, 
  Popover,
  Backdrop,
  TextField,
} from '@mui/material';
import { KubeSimpleCard } from '../../../../components/InfoCard';
import { TimeAdaptiveAreaChart } from '../../../../components/Charts/AreaChart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { fontFamily } from '../../../../utils/commonUtils';
import ActivePod from '@/assets/ActivePod.svg';
import { searchPodsByServiceName } from '@/actions/serviceAction';
import { getResourceHistory } from '../../../../actions/instanceAction';
import {
  formatDatetimeString,
  parseServiceName,
} from '../../../../utils/commonUtils';
import { useIntl } from 'react-intl';
import Question from '@/assets/Question.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import Watch from '@/assets/Watch.svg';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import dayjs from 'dayjs';
import { KubeDatePicker, KubeDateViewer } from '@/components/DatePicker';
import { KubeConfirmButton, KubeCancelButton } from '@/components/Button';
import { KubeTextField } from '@/components/Input';

import { setSnackbarMessageAndOpen } from '@/actions/snackbarAction';
import { SEVERITIES } from '@/components/CommonSnackbar';

import { baseURLLink } from '@/actions/instanceAction';

export default function ResourceMonitor(props) {
  const { service } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const { pods } = useSelector(state => {
    return {
      pods: state.Service.pods,
    };
  });

  useEffect(() => {
    if (service === null || service === undefined) {
      return;
    }
    if (localStorage.getItem('current_cluster')) {
      dispatch(
        searchPodsByServiceName(
          localStorage.getItem('current_cluster'),
          parseServiceName(service.name)
        )
      );
    }
  }, []);

  return (
    <KubeSimpleCard
      title={intl.messages['serviceOverview.containerGroupResourceMonitoring']}
    >
      <Stack spacing={1.5} sx={{ mt: '12px' }}>
        {pods && pods.length ? (
          pods.map((pod, index) => {
            return <PodResourceMonitor pod={pod} />;
          })
        ) : (
          <Stack
            direction='column'
            justifyContent='center'
            alignItems='center'
            sx={{
              height: '300px',
            }}
          >
            <Question />
            <NormalBoldFont>
              {intl.messages['common.serviceTableContentNoData']}
            </NormalBoldFont>
          </Stack>
        )}
      </Stack>
    </KubeSimpleCard>
  );
}

function PodResourceMonitor(props) {
  const { pod } = props;
  const intl = useIntl();

  const [rangeIndex, setRangeIndex] = useState(4);
  const [start, setStart] = useState(dayjs().add(-2, 'hour'));
  const [end, setEnd] = useState(dayjs());

  const [tmpStart, setTmpStart] = useState(dayjs().add(-2, 'hour'));
  const [tmpEnd, setTmpEnd] = useState(dayjs());
  const [rangeSelectAnchorEl, setRangeSelectAnchorEl] = useState(null);
  const rangeSelectOpen = Boolean(rangeSelectAnchorEl);

  const [open, setOpen] = useState(false);
  const [cpuUsage, setCpuUsage] = useState([]);
  const [byteTransmitted, setByteTransmitted] = useState([]);
  const [byteReceived, setByteReceived] = useState([]);
  const [memoryUsage, setMemoryUsage] = useState([]);
  const [data, setData] = useState(null);

  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const popoverOpen = Boolean(popoverAnchorEl);
  const popoverId = popoverOpen ? 'download-popover' : undefined;

  // const [downloadInfo, setDownloadInfo] = useState(null);
  const [downloadStep, setDownloadStep] = useState(600);
  
  let last_ = intl.messages['common.last'];
  // let minute_ = intl.messages['common.minute'];
  let hour_ = intl.messages['common.hour'];
  let day_ = intl.messages['common.day'];
  let minutes_ = intl.messages['common.minutes'];
  let hours_ = intl.messages['common.hours'];
  let days_ = intl.messages['common.days'];
  const RangeCandidate = [
    [last_ + ' 10 ' + minutes_, -10, 'minute'],
    [last_ + ' 20 ' + minutes_, -20, 'minute'],
    [last_ + ' 30 ' + minutes_, -30, 'minute'],
    [last_ + ' 1 ' + hour_, -1, 'hour'],
    [last_ + ' 2 ' + hours_, -2, 'hour'],
    [last_ + ' 3 ' + hours_, -3, 'hour'],
    [last_ + ' 5 ' + hours_, -5, 'hour'],
    [last_ + ' 12 ' + hours_, -12, 'hour'],
    [last_ + ' 1 ' + day_, -1, 'day'],
    [last_ + ' 2 ' + days_, -2, 'day'],
    [last_ + ' 3 ' + days_, -3, 'day'],
    [last_ + ' 7 ' + days_, -7, 'day'],
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    if (pod === null || pod === undefined) {
      return;
    }
    if (localStorage.getItem('current_cluster')) {
      dispatch(
        getResourceHistory(
          localStorage.getItem('current_cluster'),
          pod.metadata.namespace,
          pod.metadata.name,
          start.valueOf() / 1000,
          end.valueOf() / 1000,
          60,
          setData
        )
      );
    }
  }, [start, end]);

  useEffect(() => {
    if (rangeIndex > 11) {
      return;
    }
    setStart(
      dayjs().add(RangeCandidate[rangeIndex][1], RangeCandidate[rangeIndex][2])
    );
    setEnd(dayjs());
  }, [rangeIndex]);

  useEffect(() => {
    if (data && data.results) {
      for (const result of data.results) {
        if (
          result.data &&
          result.data.result &&
          result.data.result[0] &&
          result.data.result[0].values
        ) {
          if (result.metric_name === 'pod_cpu_usage') {
            setCpuUsage(
              result.data.result[0].values.map((record, index) => {
                return { name: record[0], usage: Number(record[1]) * 1000 };
              })
            );
          } else if (result.metric_name === 'pod_net_bytes_transmitted') {
            setByteTransmitted(
              result.data.result[0].values.map((record, index) => {
                return {
                  name: record[0],
                  flow: (Number(record[1]) / 128).toFixed(2),
                };
              })
            );
          } else if (result.metric_name === 'pod_net_bytes_received') {
            setByteReceived(
              result.data.result[0].values.map((record, index) => {
                return {
                  name: record[0],
                  flow: (Number(record[1]) / 128).toFixed(2),
                };
              })
            );
          } else {
            setMemoryUsage(
              result.data.result[0].values.map((record, index) => {
                return {
                  name: record[0],
                  usage: (Number(record[1]) / 1024 / 1024).toFixed(2),
                };
              })
            );
          }
        } else {
          setCpuUsage([]);
          setByteTransmitted([]);
          setByteReceived([]);
          setMemoryUsage([]);
        }
      }
    } else {
      setCpuUsage([]);
      setByteTransmitted([]);
      setByteReceived([]);
      setMemoryUsage([]);
    }
  }, [data]);

  const handleClose = () => {
    setRangeSelectAnchorEl(null);
  };

  const handleMonitorClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleRangeSelectClick = e => {
    setRangeSelectAnchorEl(e.currentTarget);
  };

  const handleRangeButtonClick = index => {
    setRangeIndex(index);
    handleClose();
  };

  const handleRangeConfirm = () => {
    setStart(tmpStart);
    setEnd(tmpEnd);
    handleClose();
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const handleStepChange = (event) => {
    setDownloadStep(event.target.value);
  };

  const handleExportClick = (event) => {
    // stop propagation to avoid opening or closing the tab
    event.stopPropagation();
    // open the popover
    setPopoverAnchorEl(event.currentTarget);
  };

  const handleDownloadClick = (event, pod) => {
    // stop propagation to avoid opening or closing the tab
    event.stopPropagation();

    let clusterName = localStorage.getItem('current_cluster');
    let namespace = pod.metadata.namespace;
    let podName = pod.metadata.name;
    let startTime = parseInt(start.valueOf() / 1000);
    let endTime = parseInt(end.valueOf() / 1000);

    // send request to the url directly to download the file
    let url = `/instance/resourceHistory/export`;
    let data = {
      clusterName: clusterName,
      namespace: namespace,
      podName: podName,
      begin: startTime,
      end: endTime,
      step: downloadStep,
    };
    url = new URL(url, baseURLLink);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = `${podName}_resource_history.xlsx`;
          a.click();
        });
      })
      .catch(error => {
        console.error('Error:', error);
        dispatch(
          setSnackbarMessageAndOpen(
            'serviceOverview.downloadError',
            {},
            SEVERITIES.warning
          )
        );
      });
    
    // close the popover
    handlePopoverClose();
  };


  return (
    <Box>
      <Popover
        id='instance-status-table-custom-content-popover'
        open={rangeSelectOpen}
        anchorEl={rangeSelectAnchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          zIndex: 1000,
          boxShadow: '0 4px 16px 0 rgba(39,50,71,.28)',
          borderRadius: '4px',
          mt: '8px !important',
        }}
      >
        <Stack
          sx={{
            width: '720px',
            padding: '20px',
            bgcolor: '#FFFFFF',
            borderRadius: '4px',
            boxShadow: '0 4px 8px 0 rgba(36,46,66,.06)',
          }}
          direction='row'
        >
          {/* 左侧 */}
          <Box
            sx={{
              width: '360px',
            }}
          >
            <Box
              sx={{
                width: '120px',
                fontSize: '14px',
                fontFamily: fontFamily,
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: 1.67,
                color: '#79879c',
                mb: '12px',
              }}
            >
              {intl.messages['serviceOverview.selectTimeRange']}
            </Box>
            <Stack direction='row'>
              {[0, 1, 2].map(value => {
                return (
                  <Stack sx={{}} direction='column' spacing={1}>
                    {RangeCandidate.slice(value * 5, 5 * (value + 1)).map(
                      (candidate, index) => {
                        return (
                          <Box
                            sx={{
                              width: '120px',
                              fontSize: '12px',
                              fontFamily: fontFamily,
                              fontStyle: 'normal',
                              fontWeight: 600,
                              lineHeight: 1.67,
                              color:
                                value * 5 + index === rangeIndex
                                  ? '#55bc8a'
                                  : '#242E42',
                              '&:hover': {
                                color: '#55bc8a',
                              },
                              cursor: 'pointer',
                            }}
                            onClick={handleRangeButtonClick.bind(
                              this,
                              value * 5 + index
                            )}
                          >
                            {candidate[0]}
                          </Box>
                        );
                      }
                    )}
                  </Stack>
                );
              })}
            </Stack>
          </Box>

          {/* 右侧 */}
          <Box
            sx={{
              width: '360px',
            }}
          >
            <Box
              sx={{
                width: '120px',
                fontSize: '14px',
                fontFamily: fontFamily,
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: 1.67,
                color: '#79879c',
                mb: '12px',
              }}
            >
              {intl.messages['serviceOverview.customTimeRange']}
            </Box>

            {/* 两个Datetime Picker */}
            <Stack direction='column' spacing={1.5}>
              <Box>
                <Box
                  sx={{
                    fontSize: '12px',
                    fontFamily: fontFamily,
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: 1.67,
                    color: '#36435c',
                  }}
                >
                  {intl.messages['serviceOverview.beginTime']}
                </Box>
                <KubeDatePicker value={tmpStart} setValue={setTmpStart} />
              </Box>

              <Box>
                <Box
                  sx={{
                    fontSize: '12px',
                    fontFamily: fontFamily,
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: 1.67,
                    color: '#36435c',
                  }}
                >
                  {intl.messages['serviceOverview.endTime']}
                </Box>
                <KubeDatePicker value={tmpEnd} setValue={setTmpEnd} />
              </Box>
            </Stack>

            {/* 按钮 */}
            <Stack
              direction='row'
              justifyContent='flex-end'
              spacing={1.5}
              sx={{ mt: '32px' }}
            >
              <KubeCancelButton
                sx={{ height: '32px', width: '84px' }}
                onClick={handleClose}
              >
                {intl.messages['common.cancel']}
              </KubeCancelButton>
              <KubeConfirmButton
                sx={{ height: '32px', width: '84px' }}
                onClick={handleRangeConfirm}
              >
                {intl.messages['common.confirm']}
              </KubeConfirmButton>
            </Stack>
          </Box>
        </Stack>
      </Popover>

      <Stack justifyContent='flex-start' alignItems='flex-start'>
        <Stack
          sx={{
            padding: '4px',
            bgcolor: '#242E42',
            borderRadius: '4px',
            cursor: 'pointer',
            mb: '18px',
          }}
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          spacing={1}
          onClick={handleRangeSelectClick}
        >
          <Watch />
          <Box
            sx={{
              minWidth: '160px',
              fontSize: '12px',
              fontFamily: fontFamily,
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 1.67,
              color: '#FFFFFF',
            }}
          >
            {RangeCandidate[rangeIndex][0]}
          </Box>
          {rangeSelectOpen ? (
            <ArrowDropUpIcon style={{ color: '#FFF' }} />
          ) : (
            <ArrowDropDownIcon style={{ color: '#FFF' }} />
          )}
        </Stack>

        <Stack
          sx={{
            bgcolor: '#FFFFFF',
            borderRadius: '4px',
            padding: '12px',
            height: '40px',
            cursor: 'pointer',
            border: '1px solid #ccd3db',
            width: 'calc(100% - 24px)',
          }}
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          spacing={2}
          onClick={handleMonitorClick}
        >
          {/* NAME */}
          <Stack direction='row' spacing={1}>
            <Tooltip
              PopperProps={{
                sx: {
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#242e42',
                  },
                  '& .MuiTooltip-arrow': {
                    color: '#242e42',
                  },
                },
              }}
              title={
                <Stack sx={{ padding: '12px' }} spacing={1}>
                  <Box>{pod.metadata.name}</Box>
                  <Box>{`${intl.messages['common.status']}：${pod.status.phase}`}</Box>
                </Stack>
              }
              placement='top'
              arrow
            >
              <ActivePod />
            </Tooltip>

            <Stack direction='column'>
              <Box
                sx={{
                  fontSize: '12px',
                  fontFamily: fontFamily,
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 1.67,
                  color: '#242e42',
                }}
              >
                {pod.metadata.name}
              </Box>
              <Box
                sx={{
                  fontSize: '12px',
                  fontFamily: fontFamily,
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 1.67,
                  color: '#79879c',
                }}
              >
                {`${intl.messages['common.createdOn']} ${formatDatetimeString(
                  Date.parse(pod.status.startTime)
                )}`}
              </Box>
            </Stack>
          </Stack>

          {/* HOST IP */}
          <Stack direction='column'>
            <Box
              sx={{
                fontSize: '12px',
                fontFamily: fontFamily,
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 1.67,
                color: '#242e42',
              }}
            >
              {pod.status.hostIP}
            </Box>
            <Box
              sx={{
                fontSize: '12px',
                fontFamily: fontFamily,
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 1.67,
                color: '#79879c',
              }}
            >
              {intl.messages['common.hostIP']}
            </Box>
          </Stack>

          {/* POD IP */}
          <Stack direction='column'>
            <Box
              sx={{
                fontSize: '12px',
                fontFamily: fontFamily,
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 1.67,
                color: '#242e42',
              }}
            >
              {pod.status.podIP}
            </Box>
            <Box
              sx={{
                fontSize: '12px',
                fontFamily: fontFamily,
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 1.67,
                color: '#79879c',
              }}
            >
              {intl.messages['serviceOverview.podIP']}
            </Box>
          </Stack>

          <Box>
            <KubeConfirmButton
              onClick={handleExportClick}
              sx={{
                width: '96px',
                height: '32px',
                boxShadow: "0 8px 12px 0 rgba(35,45,65,.28)",
                fontWeight: 400,
              }}
            >
              {intl.messages['serviceOverview.export']}
            </KubeConfirmButton>
            <Popover
              id={popoverId}
              open={popoverOpen}
              anchorEl={popoverAnchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <Stack sx={{ 
                padding: '12px 16px 12px 16px',
                width: '245px',
                }} direction='column'>
                <Box
                  sx={{
                    fontSize: '14px',
                    fontFamily: fontFamily,
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: '#79879c',
                  }}
                >
                  {intl.messages['serviceOverview.exportInfo']}
                </Box>
                <Stack sx={{ paddingLeft: "10px", width: "100%"}}>
                  <Stack direction='row' spacing={2} sx={{ paddingBottom: "3px" }}>
                    <Box
                      sx={{
                        fontSize: '13px',
                        fontFamily: fontFamily,
                        fontStyle: 'normal',
                        fontWeight: 600,
                        lineHeight: 1.67,
                        color: '#242e42',
                        paddingTop: '10px',
                      }}
                    >
                      {intl.messages['serviceOverview.startTime']}
                    </Box>
                    <KubeDateViewer value={tmpStart} width="140px"/>
                  </Stack>
                  <Stack direction='row' spacing={2} sx={{ paddingBottom: "3px" }}>
                    <Box
                      sx={{
                        fontSize: '13px',
                        fontFamily: fontFamily,
                        fontStyle: 'normal',
                        fontWeight: 600,
                        lineHeight: 1.67,
                        color: '#242e42',
                        paddingTop: '10px',
                      }}
                    >
                      {intl.messages['serviceOverview.endTime']}
                    </Box>
                    <KubeDateViewer value={tmpEnd} width="140px"/>
                  </Stack>
                  <Stack direction='row' spacing={2}>
                    <Box
                      sx={{
                        fontSize: '13px',
                        fontFamily: fontFamily,
                        fontStyle: 'normal',
                        fontWeight: 600,
                        lineHeight: 1.67,
                        color: '#242e42',
                        paddingTop: '10px',
                        mr: '10px',
                      }}
                    >
                      {intl.messages['serviceOverview.step']}
                    </Box>
                    {/* <TextField
                      label="Size"
                      id="standard-size-small"
                      defaultValue="Small"
                      size="small"
                      variant="standard"
                    /> */}
                    <Stack direction='row' spacing='3px'>
                      <KubeTextField variant='standard' inputProps={{
                          style: { textAlign: 'center' } // 设置文本居中
                        }}
                        sx={{
                          '& input': {
                            padding: '6px 12px !important',
                            fontSize: '12px',
                            fontFamily: fontFamily,
                            fontStyle: 'normal',
                            fontWeight: 600,
                            lineHeight: 1.67,
                            color: '#36435c',
                          },
                          width: '60px',
                          height: '24px',
                          pt: '2px',
                        }} 
                        defaultValue="600"
                        value={downloadStep}
                        onChange={handleStepChange}
                      />
                      <Box
                        sx={{
                          fontSize: '13px',
                          fontFamily: fontFamily,
                          fontStyle: 'normal',
                          fontWeight: 600,
                          lineHeight: 1.1,
                          color: '#242e42',
                          paddingTop: '10px',
                          mr: '10px',
                        }}
                      >
                        s
                      </Box>
                    </Stack>

                  </Stack>
                  
                    
                  <KubeConfirmButton
                      onClick={(event) => handleDownloadClick(event, pod)}
                      sx={{
                        width: '80px',
                        height: '32px',
                        boxShadow: "0 2px 2px 0 rgba(35,45,65,.28)",
                        fontWeight: 400,
                        mt: '-15px',
                        ml: "calc(100% - 88px)",
                      }}
                    >
                      {intl.messages['serviceOverview.download']}
                    </KubeConfirmButton>
                </Stack>
              </Stack>
            </Popover>
            {/* <Backdrop
              open={popoverOpen}
              onClick={handlePopoverClose}
              style={{ zIndex: 1000, color: '#111' }}
            >
              {/* 可在这里添加其他内容，比如加载动画 /}
            </Backdrop> */}
          </Box>

          <Box sx={{ padding: '12px 12px 6px 12px' }}>
            {open === false ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowUpIcon />
            )}
          </Box>
        </Stack>

        {open === false ? (
          <></>
        ) : (
          <Stack
            spacing={3}
            sx={{
              width: 'calc(100% - 64px)',
              bgcolor: '#FFFFFF',
              padding: '12px',
              borderRadius: '0px 0px 4px 4px',
              boxShadow: '0 4px 8px 0 rgba(36,46,66,.06)',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '200px',
              }}
            >
              <TimeAdaptiveAreaChart
                data={cpuUsage}
                keyName='name'
                valueName='usage'
                labelY={intl.messages['stressTesting.cpuUsage']}
                labelName={intl.messages['common.usage']}
                unitName='m'
              />
            </Box>

            <Box
              sx={{
                width: '100%',
                height: '200px',
              }}
            >
              <TimeAdaptiveAreaChart
                data={memoryUsage}
                keyName='name'
                valueName='usage'
                labelY={intl.messages['stressTesting.memUsage']}
                labelName={intl.messages['common.usage']}
                unitName='Mi'
              />
            </Box>

            <Box
              sx={{
                width: '100%',
                height: '200px',
              }}
            >
              <TimeAdaptiveAreaChart
                data={byteTransmitted}
                keyName='name'
                valueName='flow'
                labelY={intl.messages['stressTesting.transferredFlow']}
                labelName={intl.messages['common.transferred']}
                unitName='Kbps'
              />
            </Box>

            <Box
              sx={{
                width: '100%',
                height: '200px',
              }}
            >
              <TimeAdaptiveAreaChart
                data={byteReceived}
                keyName='name'
                valueName='flow'
                labelY={intl.messages['stressTesting.receivedFlow']}
                labelName={intl.messages['common.received']}
                unitName='Kbps'
              />
            </Box>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

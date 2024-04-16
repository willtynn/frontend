/**
 * src\Pages\Service\detail\DetailBlocks\ResourceMonitor.js
 */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Tooltip } from '@mui/material';
import { KubeSimpleCard } from '../../../../components/InfoCard';
import { TimeAdaptiveAreaChart } from '../../../../components/Charts/AreaChart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { fontFamily } from '../../../../utils/commonUtils';
import ActivePod from '@/assets/ActivePod.svg';
import { searchPodsByServiceName } from '@/actions/serviceAction';
import { serviceMonitorData } from '../data';
import { getResourceHistory } from '../../../../actions/instanceAction';
import {
  formatDatetimeString,
  parseServiceName,
} from '../../../../utils/commonUtils';
import { useIntl } from 'react-intl';
import Question from '@/assets/Question.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';

export default function ResourceMonitor(props) {
  const { service } = props;
  const dispatch = useDispatch();
  const intl = useIntl();

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

  const [open, setOpen] = useState(false);
  const [cpuUsage, setCpuUsage] = useState([]);
  const [byteTransmitted, setByteTransmitted] = useState([]);
  const [byteReceived, setByteReceived] = useState([]);
  const [memoryUsage, setMemoryUsage] = useState([]);
  const [data, setData] = useState(null);

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
          Math.floor(
            new Date(new Date().getTime() - 24 * 60 * 60 * 1000).getTime() /
              1000
          ),
          Math.floor(new Date().getTime() / 1000),
          60,
          setData
        )
      );
    }
  }, []);

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

  const handleMonitorClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  return (
    <Stack justifyContent='center' alignItems='center'>
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

        <Box sx={{ padding: '12px 12px 6px 12px' }}>
          {open === false ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
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
  );
}

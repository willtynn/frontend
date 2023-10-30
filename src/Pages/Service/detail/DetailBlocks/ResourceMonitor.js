import { useState, useEffect } from 'react';
import { Box, Stack, Tooltip } from '@mui/material';
import { KubeSimpleCard } from '../../../../components/InfoCard';
import { TimeAdaptiveAreaChart } from '../../../../components/Charts/AreaChart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { fontFamily } from '../../../../utils/commonUtils';
import { IconOfPod } from './ResourceStatus';
import ActivePod from '@/assets/ActivePod.svg';

import { serviceMonitorData } from '../data';

export default function ResourceMonitor() {
  return (
    <KubeSimpleCard title='容器组资源监控'>
      <Stack spacing={1.5} sx={{ mt: '12px' }}>
        <PodResourceMonitor data={serviceMonitorData} />
      </Stack>
    </KubeSimpleCard>
  );
}

function PodResourceMonitor(props) {
  const { data } = props;

  const [open, setOpen] = useState(false);
  const [cpuUsage, setCpuUsage] = useState([]);
  const [byteTransmitted, setByteTransmitted] = useState([]);
  const [byteReceived, setByteReceived] = useState([]);
  const [memoryUsage, setMemoryUsage] = useState([]);

  useEffect(() => {
    if (data && data.results) {
      for (const result of data.results) {
        console.log(1, result.data);
        console.log(result.data.result);
        console.log(result.data.result[0]);
        console.log(result.data.result[0].values);
        if (
          result.data &&
          result.data.result &&
          result.data.result[0] &&
          result.data.result[0].values
        ) {
          if (result.metric_name === 'pod_cpu_usage') {
            setCpuUsage(
              result.data.result[0].values.map((record, index) => {
                return { ...record };
              })
            );
          } else if (result.metric_name === 'pod_cpu_usage') {
            setByteTransmitted(
              result.data.result[0].values.map((record, index) => {
                return { ...record };
              })
            );
          } else if (result.metric_name === 'pod_cpu_usage') {
            setByteReceived(
              result.data.result[0].values.map((record, index) => {
                return { ...record };
              })
            );
          } else {
            setMemoryUsage(
              result.data.result[0].values.map((record, index) => {
                return { ...record };
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

  useEffect(() => {
    console.log(cpuUsage);
  }, [cpuUsage]);

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
                <Box>My Pod</Box>
                <Box>{`状态：running`}</Box>
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
              My Pod
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
              {`创建于 2023-07-09 06:15:11`}
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
            192.168.0.1
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
            主机IP地址
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
            192.168.0.1
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
            容器组IP地址
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
              keyName='0'
              valueName='1'
              labelY='CPU 用量 (m)'
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
              keyName='0'
              valueName='1'
              labelY='内存用量 (Mi)'
            />
          </Box>

          <Box
            sx={{
              width: '100%',
              height: '200px',
            }}
          >
            <TimeAdaptiveAreaChart
              data={cpuUsage}
              keyName='0'
              valueName='1'
              labelY='出站流量 (Kbps)'
            />
          </Box>

          <Box
            sx={{
              width: '100%',
              height: '200px',
            }}
          >
            <TimeAdaptiveAreaChart
              data={cpuUsage}
              keyName='0'
              valueName='1'
              labelY='入站流量 (Kbps)'
            />
          </Box>
        </Stack>
      )}
    </Stack>
  );
}

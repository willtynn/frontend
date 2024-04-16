import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Box, InputAdornment, Tooltip } from '@mui/material';
import { formatDatetimeString } from '@/utils/commonUtils';
import { fontFamily } from '@/utils/commonUtils';
import InfoCard from '@/components/InfoCard';
import { EclipseTransparentButton } from '@/components/Button';
import { KubeAdornmentTextField } from '@/components/Input';
import ActivePod from '@/assets/ActivePod.svg';
import PendingPod from '@/assets/PendingPod.svg';
import FailedPod from '@/assets/FailedPod.svg';
import SucceededPod from '@/assets/SucceededPod.svg';
import KubeSearch from '@/assets/KubeSearch.svg';
import RefreshIcon from '@mui/icons-material/Refresh';
import { searchPodsByServiceName } from '@/actions/serviceAction';
import {
  RUNNING,
  PENDING,
  FAILED,
} from '@/Pages/Cluster/deploy/ServiceStatusTable';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { parseServiceName } from '@/utils/commonUtils';

import {deploymentData} from './data.js'
import { NoLuggageOutlined } from '@mui/icons-material';

export const IconOfPod = status => {
  if (status === RUNNING) {
    return <ActivePod />;
  }
  if (status === PENDING) {
    return <PendingPod />;
  }
  if (status === FAILED) {
    return <FailedPod />;
  }
  return <SucceededPod />;
};

export const handleResourceNull = resource => {
  if (resource === null) {
    return '无限制';
  }
  return resource;
};



export default function DeploymentInformation(props) {
  const { service } = props;
  const [podSearchValue, setPodSearchValue] = useState('');
  const [enter, setEnter] = useState(0);

  const dispatch = useDispatch();

  

  const { schemes } = useSelector(state => {
    return {
      schemes : deploymentData.data.scheme
    };
  });

  useEffect(() => {
    
  }, []);

  // const filtering = () => {
  //   // const tmpPods = JSON.parse(JSON.stringify(pods));
  //   return tmpPods.filter((pod, index) => {
  //     return pod.metadata.name.includes(podSearchValue);
  //   });
  // };

  const visibleRows = useMemo(() => {
    return schemes;
  }, [schemes, enter]);

  const handleSearchInputChange = e => {
    setPodSearchValue(e.target.value);
  };

  const handleRefresh = () => {
    setPodSearchValue('');
    if (service === null) {
      return;
    }
    dispatch(searchPodsByServiceName(localStorage.getItem('current_cluster'), parseServiceName(service.name)));
  };

  const handleKeyDown = e => {
    if (typeof e.target.value === 'string' && e.keyCode === 13) {
      setEnter(prev => prev + 1);
    }
  };

  return (
    <Stack sx={{ width: '98%' }}>
    <InfoCard title='部署方案'>
      {/* PODS 列表 */}
      <Stack sx={{ mt: '10px' }} padding={'0px 10px 10px 10px'} direction='column' spacing={1.5}>
        {visibleRows && visibleRows.length > 0 ? (
          visibleRows.map((pod, index) => {
            return (
              <Stack
                sx={{
                  bgcolor: '#FFFFFF',
                  borderRadius: '4px',
                  padding: '12px',
                  height: '40px',
                  cursor: 'pointer',
                  border: '1px solid #ccd3db',
                }}
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                spacing={1}
              >
                {/* NAME */}
                <Stack direction='row' sx={{width: '8%'}} spacing={1}>
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
                        <Box>{pod.name}</Box>
                        {/* <Box>{`状态：${pod.status.phase}`}</Box> */}
                      </Stack>
                    }
                    placement='top'
                    arrow
                  >
                    {<SucceededPod />}
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
                      {pod.serviceName}
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
                      {`服务名称`}
                    </Box>
                  </Stack>
                </Stack>

                {/* 服务镜像 */}
                <Stack direction='column' sx={{width: '15%'}}>
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
                    {pod.imageUrl}
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
                    服务镜像
                  </Box>
                </Stack>

                {/* CPU分配 */}
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
                    {`requests: ${handleResourceNull(pod.resources.requests.cpu)}`}
                    {'\t'}
                    {`limits: ${handleResourceNull(pod.resources.limits.cpu)}`}
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
                    CPU分配
                  </Box>
                </Stack>

                {/* MEM分配 */}
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
                    {`requests: ${handleResourceNull(pod.resources.requests.memory)}`}
                    {'\t'}
                    {`limits: ${handleResourceNull(pod.resources.limits.memory)}`}
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
                   内存分配
                  </Box>
                </Stack>

                {/* 部署位置 */}
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
                    {pod.nodeName === null ? '随机':pod.nodeName}
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
                    部署位置 
                  </Box>
                </Stack>
              </Stack>
            );
          })
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontFamily: fontFamily,
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 1.67,
              color: '#242E42',
            }}
          >
            未发现资源
          </Box>
        )}
      </Stack>

    </InfoCard>
    </Stack>
  );
}

/**
 * src\Pages\Service\detail\DetailBlocks\ResourceStatus.js
 */
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Box, InputAdornment, Tooltip } from '@mui/material';
import { formatDatetimeString } from '@/utils/commonUtils';
import { fontFamily } from '@/utils/commonUtils';
import { KubeSimpleCard } from '../../../../components/InfoCard';
import { EclipseTransparentButton } from '../../../../components/Button';
import { KubeAdornmentTextField } from '../../../../components/Input';
import ActivePod from '@/assets/ActivePod.svg';
import PendingPod from '@/assets/PendingPod.svg';
import FailedPod from '@/assets/FailedPod.svg';
import SucceededPod from '@/assets/SucceededPod.svg';
import KubeSearch from '@/assets/KubeSearch.svg';
import Question from '@/assets/Question.svg';
import RefreshIcon from '@mui/icons-material/Refresh';
import { searchPodsByServiceName } from '../../../../actions/serviceAction';
import {
  RUNNING,
  PENDING,
  FAILED,
} from '../../../Cluster/deploy/ServiceStatusTable';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { parseServiceName } from '../../../../utils/commonUtils';
import { useIntl } from 'react-intl';
import { NormalBoldFont } from '../../../../components/Fonts';

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

export default function ResourceStatus(props) {
  const { service } = props;
  const intl = useIntl();
  const [podSearchValue, setPodSearchValue] = useState('');
  const [enter, setEnter] = useState(0);

  const dispatch = useDispatch();

  const { pods } = useSelector(state => {
    return {
      pods: state.Service.pods,
    };
  });

  useEffect(() => {
    if (service === null) {
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

  const filtering = () => {
    const tmpPods = JSON.parse(JSON.stringify(pods));
    return tmpPods.filter((pod, index) => {
      return pod.metadata.name.includes(podSearchValue);
    });
  };

  const visibleRows = useMemo(() => {
    return filtering();
  }, [pods, enter]);

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
    <KubeSimpleCard title={intl.messages['serviceOverview.pod']}>
      <Stack direction='row' spacing={1.5} justifyContent='space-between'>
        {/* 搜索框 */}
        <KubeAdornmentTextField
          onChange={handleSearchInputChange}
          value={podSearchValue}
          onKeyDown={handleKeyDown}
          sx={{
            width: 'calc(100% - 60px)',
            '&.MuiFormControl-root.MuiTextField-root .MuiInputBase-root.MuiOutlinedInput-root':
            {
              padding: '0px 0px 0px 12px !important',
              height: '32px',
              flexFlow: 'wrap',
              paddingY: '4px',
              '& input': {
                flexGrow: 1,
                width: '10%',
                '&:placeholder-shown': {
                  fontWeight: '400 !important',
                  fontSize: '12px !important',
                  lineHeight: 1.67,
                },
              },
              bgcolor: '#EFF4F9',
            },
            '& fieldset': {
              border: '1px solid rgba(0, 0, 0, 0.23) !important',
            },
            '& .Mui-focused': {
              bgcolor: '#FFFFFF !important',
            },

            '& .MuiOutlinedInput-input.MuiInputBase-input': {
              fontSize: '12px',
              fontWeight: 600,
              fontStyle: 'normal',
              fontStretch: 'normal',
              lineHeight: 1.67,
              letterSpacing: 'normal',
              color: '#36435c',
              height: '20px',
              padding: '7px 12px 7px 0px !important',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <KubeSearch />
              </InputAdornment>
            ),
          }}
          placeholder={intl.messages['common.searchByName']}
          inputProps={{}}
        />

        {/* 刷新按钮 */}
        <EclipseTransparentButton
          sx={{
            bgcolor: '#f9fbfd !important',
            '&:hover': {
              bgcolor: '#EFF4F9 !important',
            },
            '& svg': {
              color: '#3d3b4f',
            },
            height: '32px',
          }}
          onClick={handleRefresh}
        >
          <RefreshIcon />
        </EclipseTransparentButton>
      </Stack>

      {/* PODS 列表 */}
      <Stack sx={{ mt: '24px' }} direction='column' spacing={1.5}>
        {visibleRows && visibleRows.length > 0 ? (
          <>
            {visibleRows.map((pod, index) => {
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
                  spacing={2}
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
                      {IconOfPod(pod.status.phase)}
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
                        {`${intl.messages['common.createdOn']} ${formatDatetimeString(pod.status.startTime)}`}
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
                    <KeyboardArrowDownIcon />
                  </Box>
                </Stack>
              );
            })}
            <Box
              sx={{
                fontSize: '12px',
                fontFamily: fontFamily,
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 1.67,
                color: '#79879C',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                mt: '12px',
              }}
            >
              {`${intl.messages['serviceOverview.total']} : ${pods.length}`}
            </Box>
          </>
        ) : (
          <Stack
            direction='column'
            justifyContent='center'
            alignItems='center'
            sx={{
              height: '300px',
              width: '100%',
              fontSize: '12px',
              fontFamily: fontFamily,
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 1.67,
              color: '#242E42',
            }}
          >
            <Question />
            <NormalBoldFont>
              {intl.messages['common.serviceTableContentNoData']}
            </NormalBoldFont>
          </Stack>
        )}
      </Stack>
    </KubeSimpleCard >
  );
}

/**
 * src\Pages\Route\trace\RouteTraceInfoPage\GeneralInfo.js
 */
import { Box, Stack, Tooltip } from '@mui/material';
import { KubeCancelButton } from '@/components/Button';
import { fontFamily } from '@/utils/commonUtils';
import DetailBG from '@/assets/DetailBG.svg';
import Service21 from '@/assets/Service21.svg';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useNavigate } from 'react-router-dom';

import { calculateDuration } from '../functions/func.js';

const labelStyle = {
  fontSize: '12px',
  fontWeight: 400,
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.67,
  letterSpacing: 'normal',
  color: '#5F708A',
  mb: '12px',
  width: '140px',
};

const valueStyle = {
  fontSize: '12px',
  fontWeight: 400,
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.67,
  letterSpacing: 'normal',
  color: '#242e42',
  mb: '12px',
  width: '184px',
  overflowWrap: 'break-word',
  wordBreak: 'break-all',
};

export default function GeneralInfo(props) {
  const { info } = props;

  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <Stack
      direction='column'
      sx={{ position: 'relative', boxShadow: '0 4px 8px 0 rgba(36,46,66,.06)' }}
    >
      <DetailBG />
      <Box
        style={{
          position: 'absolute',
          top: 0,
          width: '324px',
          height: '108px',
          padding: '12px',
          zIndex: 1000,
        }}
      >
        <KubeCancelButton
          sx={{
            backgroundColor: '#FFFFFF !important',
            padding: '1px 16px 1px 10px',
            border: 'none !important',
          }}
          onClick={handleReturn}
        >
          <Stack direction='row' spacing={1}>
            <NavigateBeforeIcon fontSize='small' />
            <Box
              sx={{
                fontFamily: fontFamily,
                fontSize: '12px',
                fontWeight: 600,
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: 1.67,
                letterSpacing: 'normal',
                color: '#36435C',
                '&:hover': {
                  color: '#55bc8a',
                },
              }}
            >
              路由链路
            </Box>
          </Stack>
        </KubeCancelButton>
        <Stack
          sx={{ mt: '12px' }}
          direction='row'
          spacing={1}
          alignItems='center'
        >
          <Service21 />
          <Tooltip
            PopperProps={{
              sx: {
                '& .MuiTooltip-tooltip': {
                  backgroundColor: '#242e42',
                  margin: '0 !important',
                },
              },
            }}
            title={info !== null ? info.service : ''}
            placement='bottom'
          >
            <Box
              sx={{
                fontFamily: fontFamily,
                fontSize: '20px',
                fontWeight: 600,
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: 1.4,
                letterSpacing: 'normal',
                color: '#36435C',
                wordBreak: 'break-all',
              }}
            >
              {info !== null ? info.service : ''}
            </Box>
          </Tooltip>
        </Stack>
      </Box>
      <Box
        style={{
          position: 'absolute',
          top: '132px',
          width: '330px',
          padding: '12px',
          zIndex: 1000,
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* 详情 */}
        <Box
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '20px',
            letterSpacing: 'normal',
            color: '#2E2E42',
            mb: '12px',
          }}
        >
          详情
        </Box>

        {/* Key-Value Pair */}
        <Stack sx={{ margin: '6px 0px' }} direction='column' spacing={1.5}>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>服务 API</Box>
            <Box sx={valueStyle}>{info !== null ? info.api : ''}</Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>请求数量</Box>
            <Box sx={valueStyle}>{info !== null ? info.count : ''}</Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>Low</Box>
            <Box sx={valueStyle}>
              {info !== null ? calculateDuration(info.low) : ''}
            </Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>95%</Box>
            <Box sx={valueStyle}>
              {info !== null ? calculateDuration(info.percentile95) : ''}
            </Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>High</Box>
            <Box sx={valueStyle}>
              {info !== null ? calculateDuration(info.high) : ''}
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

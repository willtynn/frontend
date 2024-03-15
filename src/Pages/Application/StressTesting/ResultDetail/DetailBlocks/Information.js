import { useSelector } from 'react-redux';
import {
  Stack,
  Box,
} from '@mui/material';
import { useIntl } from 'react-intl';

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
  width: 'calc(100% - 184px)',
  overflowWrap: 'break-word',
  wordBreak: 'break-all',
};

export function Information() {

  const { currentResult } = useSelector(state => {
    return {
      currentResult: state.Application.currentResult,
    };
  });

  const intl = useIntl();

  return (
    <Stack
      direction='column'
      sx={{
        width: 'calc(100% - 296px)',
        borderRadius: '4px',
        bgcolor: '#FFFFFF',
        p: '20px',
        boxShadow: '0 4px 8px 0 rgba(36,46,66,.06)',
        '&:hover': {
          boxShadow: '0 6px 16px 0 rgba(33,43,54,.2)',
        },
      }}
      spacing={2}
    >
      {currentResult !== null ? (
        <>
          <Stack direction='column' spacing={1}>
            <Box
              sx={{
                color: '242e42',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              {intl.messages['common.basicResult']}
            </Box>
            <Stack
              sx={{
                borderRadius: '4px',
                bgcolor: '#F9FBFD',
                p: '20px',
              }}
              direction='column'
              spacing={1.5}
            >
              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>{intl.messages['common.beginTime']}</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.startTime : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>{intl.messages['common.endTime']}</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.endTime : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>{intl.messages['common.idleTime']}</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.idleTime : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>{intl.messages['common.idleTime']}</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.connectTime : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>{intl.messages['common.delay']}</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.latency : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>{intl.messages['common.responseCode']}</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.responseCode : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>{intl.messages['common.responseData']}</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.responseData : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>{intl.messages['common.responseMessage']}</Box>
                <Box sx={valueStyle}>
                  {currentResult ? (currentResult.resposneMessage ?? intl.messages['common.serviceTableContentNoData']) : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>{intl.messages['common.responseHeader']}</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.responseHeaders : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>{intl.messages['common.byteNum']}</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.bytes : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>{intl.messages['common.headByteNum']}</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.headersSize : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>{intl.messages['common.headByteNum']}</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.bodySize : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>{intl.messages['common.sendByteNum']}</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.sentBytes : ''}
                </Box>
              </Stack>
              
            </Stack>
          </Stack>
        </>
      ) : (
        <></>
      )}
    </Stack>
  );
}

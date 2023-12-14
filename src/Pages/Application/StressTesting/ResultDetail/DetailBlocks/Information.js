import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Stack,
  Box,
  InputAdornment,
  Tooltip,
  Popover,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@mui/material';
import {
  KubeConfirmButton,
  KubeCancelButton,
  EclipseTransparentButton,
} from '@/components/Button';
import API from '@/assets/API.svg';
import WhiteAPI from '@/assets/WhiteAPI.svg';
import { fontFamily } from '@/utils/commonUtils';
import {
  StyledTableBodyCell,
  StyledTableRowCell,
  StyledTableContainer,
} from '@/components/DisplayTable';
import Question from '@/assets/Question.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import { getBoolString } from '@/utils/commonUtils';

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
  const dispatch = useDispatch();

  const { currentResult } = useSelector(state => {
    return {
      currentResult: state.Application.currentResult,
    };
  });

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
              基本结果
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
                <Box sx={labelStyle}>开始时间</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.startTime : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>结束时间</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.endTime : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>空闲时间</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.idleTime : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>连接时间</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.connectTime : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>延迟</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.latency : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>响应码</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.responseCode : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>响应数据</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.responseData : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>响应Message</Box>
                <Box sx={valueStyle}>
                  {currentResult ? (currentResult.resposneMessage ?? "无数据") : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>响应头</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.responseHeaders : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>字节数</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.bytes : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>头字节数</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.headersSize : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>体字节数</Box>
                <Box sx={valueStyle}>
                  {currentResult ? currentResult.bodySize : ''}
                </Box>
              </Stack>

              <Stack direction='row' spacing={3}>
                <Box sx={labelStyle}>发送字节数</Box>
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

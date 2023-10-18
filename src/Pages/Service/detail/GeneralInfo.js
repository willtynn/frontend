import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Box,
  Input,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
} from '@mui/material';
import { SmallLightFont, SuperLargeBoldFont } from '@/components/Fonts';
import {
  OutlinedButton,
  KubeConfirmButton,
  KubeCancelButton,
} from '@/components/Button';
import { UPDATE_SEARCH_SERVICE } from '@/actions/serviceAction';
import {
  searchServiceById,
  searchServiceByVersion,
  searchServiceExactlyById,
} from '@/actions/serviceAction';
import { checkVersionFormat } from '@/utils/commonUtils';
import { fontFamily } from '@/utils/commonUtils';
import DetailBG from '@/assets/DetailBG.svg';
import Service21 from '@/assets/Service21.svg';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useNavigate, useParams } from 'react-router-dom';

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
  const { serviceId } = useParams();
  const dispatch = useDispatch();

  const { exactService } = useSelector(state => {
    return {
      exactService: state.Service.exactService,
    };
  });

  useEffect(() => {
    dispatch(searchServiceExactlyById(serviceId));
  }, []);

  return (
    <Stack direction='column' sx={{ position: 'relative', boxShadow: "0 4px 8px 0 rgba(36,46,66,.06)" }}>
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
              服务
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
            }}
          >
            {exactService !== null ? exactService.name : ''}
          </Box>
        </Stack>
        <Stack
          sx={{ mt: '12px' }}
          direction='row'
          spacing={1.5}
          alignItems='center'
        >
          <KubeCancelButton sx={{ height: '32px', width: '96px' }}>
            编辑信息
          </KubeCancelButton>
          <KubeCancelButton sx={{ height: '32px', width: '96px' }}>
            更多操作
          </KubeCancelButton>
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
            <Box sx={labelStyle}>服务ID</Box>
            <Box sx={valueStyle}>
              {exactService !== null ? exactService.id : ''}
            </Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>服务名称</Box>
            <Box sx={valueStyle}>
              {exactService !== null ? exactService.name : ''}
            </Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>代码仓库地址</Box>
            <Box sx={valueStyle}>
              {exactService !== null ? exactService.repo : ''}
            </Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>镜像仓库地址&Tag</Box>
            <Box sx={valueStyle}>
              {exactService !== null ? exactService.imageUrl : ''}
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

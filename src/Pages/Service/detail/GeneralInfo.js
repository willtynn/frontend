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
} from '@/actions/serviceAction';
import { checkVersionFormat } from '@/utils/commonUtils';
import { fontFamily } from '@/utils/commonUtils';
import DetailBG from '@/assets/DetailBG.svg';
import Service21 from '@/assets/Service21.svg';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export default function GeneralInfo() {
  return (
    <Stack direction='column' sx={{ position: 'relative' }}>
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
        <Stack sx={{mt: "12px"}} direction='row' spacing={1} alignItems="center">
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
            basicenvstatusinfer
          </Box>
        </Stack>
        <Stack sx={{mt: "12px"}} direction='row' spacing={1.5} alignItems="center">
          <KubeCancelButton sx={{height: "32px", width: "96px"}}>编辑信息</KubeCancelButton>
          <KubeCancelButton sx={{height: "32px", width: "96px"}}>更多操作</KubeCancelButton>
        </Stack>
      </Box>
      <Box
        style={{
          position: 'absolute',
          top: '132px',
          width: '324px',
          height: '108px',
          padding: '12px',
          zIndex: 1000,
          backgroundColor: '#FFFFFF',
        }}
      ></Box>
    </Stack>
  );
}

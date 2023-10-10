import { useEffect, useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LabelAndValue from '../../../components/LabelAndValue';
import InfoCard from '../../../components/InfoCard';
import { ContainedButton, OutlinedButton } from '../../../components/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  bgcolor: 'background.paper',
  border: '2px solid #dee6e9',
  borderRadius: '10px',
  boxShadow: 24,
  // p: 4,
};

const formControlStyle = {
  // height: "45px",
  legend: {
    display: 'none',
  },
  width: '100%',
  '& .MuiOutlinedInput-root.MuiInputBase-root': {
    '& .MuiOutlinedInput-input.MuiInputBase-input': {
      '&:hover': {
        border: '1px solid #000',
      },
      '&:focus': {
        border: '2px solid #0072E5',
      },
      border: '1px solid rgba(0, 0, 0, 0.23)',
      borderRadius: '5px',
      p: '11px 8px !important',
    },
    '& fieldset': {
      border: 'none',
    },
  },
};

export default function InstanceDeploy() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleConfirmClick = () => {
    setOpen(false);
  };
  const handleCancelClick = () => {
    setOpen(false);
  };

  const deployLabels = [
    '服务ID',
    '服务名称',
    '镜像路径（URL）',
    '目标服务器ID',
  ];

  const deployValues = [
    <TextField
      sx={formControlStyle}
      id='deploy-service-id'
      variant='outlined'
    />,
    <TextField
      sx={formControlStyle}
      id='deploy-service-id'
      variant='outlined'
    />,
    <TextField
      sx={formControlStyle}
      id='deploy-service-id'
      variant='outlined'
    />,
    <TextField
      sx={formControlStyle}
      id='deploy-service-id'
      variant='outlined'
    />,
  ];

  return (
    <div>
      <OutlinedButton onClick={handleOpen}>部署</OutlinedButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <InfoCard title='服务部署'>
            <Box sx={{ p: '64px 32px 32px 128px' }}>
              <Stack direction='row' spacing={4}>
                <Stack spacing={3}>
                  {deployLabels.map((value, index) => {
                    return (
                      <Box
                        sx={{
                          width: '224px',
                          height: '50px',
                          fontFamily: 'Open Sans',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          fontSize: '20px',
                          lineHeight: '36px',
                          color: '#596A7C',
                        }}
                        key={index}
                      >
                        {value}
                      </Box>
                    );
                  })}
                </Stack>

                <Stack sx={{ width: '500px' }} spacing={3}>
                  {deployValues.map((value, index) => {
                    return (
                      <Box
                        sx={{
                          width: '100%',
                          height: '50px',
                          fontFamily: 'Open Sans',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          color: '#262E35',
                          flex: 'none',
                          alignSelf: 'stretch',
                          flexGrow: 0,
                        }}
                        key={index}
                      >
                        {value}
                      </Box>
                    );
                  })}
                </Stack>
              </Stack>

              <Stack
                sx={{
                  mt: '80px',
                }}
                direction='row'
                spacing={3}
              >
                <ContainedButton
                  sx={{ height: '40px', width: '114px' }}
                  onClick={handleConfirmClick}
                >
                  确认
                </ContainedButton>
                <OutlinedButton
                  sx={{ height: '40px', width: '114px' }}
                  onClick={handleCancelClick}
                >
                  取消
                </OutlinedButton>
              </Stack>
            </Box>
          </InfoCard>
        </Box>
      </Modal>
    </div>
  );
}

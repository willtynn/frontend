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
import { StyledTextFiled } from '../../../components/Input';
import ServiceStatusTable from './ServiceStatusTable';
import { fontFamily } from '@/utils/commonUtils';
import DeployProgress from './DeployProgress';
import BasicInfo from './DeployProgress/BasicInfo';
import ContainerConfig from './DeployProgress/ContainerConfig';
import TaskIcon from '@/assets/TaskIcon.svg';
import { useIntl } from 'react-intl';

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

  const intl = useIntl();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleConfirmClick = () => {
    setOpen(false);
  };
  const handleCancelClick = () => {
    setOpen(false);
  };

  const currentPage = stage => {
    if (stage === 1) {
      return (
        <Box sx={{ p: '64px 64px 32px 64px', bgcolor: "#FFFFFF" }}>
          <BasicInfo />
        </Box>
      );
    }
    return (
      <Box sx={{ p: '20px 64px 32px 64px', bgcolor: "#FFFFFF" }}>
        <ContainerConfig />
      </Box>
    );
  };

  return (
    <Box>
      <Box sx={{
        borderRadius: '4px',
        backgroundColor: '#FFFFFF',
        padding: "24px 20px",
        width: 'calc(100% - 40px)',
        height: '58px',
        mb: "12px"
      }}>
        <Stack direction="row" spacing={1}>
          <TaskIcon />
          <Box>
            <Typography sx={{
              fontWeight: 600,
              fontStyle: 'normal',
              color: '#242e42',
              textShadow: '0 4px 8px rgba(36,46,66,.1)',
              fontSize: "24px",
              lineHeight: "32px"
            }}>
              服务实例
            </Typography>
            <Typography sx={{
              fontWeight: 400,
              fontStyle: 'normal',
              color: '#79879c',
              fontSize: "12px",
              lineHeight: 1.67
            }}>
              {intl.messages["instance.instanceDescription"]}
            </Typography>
          </Box>
        </Stack>
      </Box>
      <ServiceStatusTable
        embeddingButton={
          <OutlinedButton
            onClick={handleOpen}
            sx={{
              borderRadius: '20px !important',
              width: '120px',
            }}
          >
            部署
          </OutlinedButton>
        }
      />
      <Modal open={open} onClose={handleClose}>
        <DeployProgress
          handleConfirmClick={handleConfirmClick}
          handleCancelClick={handleCancelClick}
          totalStage={2}
          currentPage={currentPage}
        />
      </Modal>
    </Box>
  );
}

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
import { fontFamily } from "@/utils/commonUtils";
import DeployProgress from './DeployProgress';
import BasicInfo from './DeployProgress/BasicInfo';
import ContainerConfig from './DeployProgress/ContainerConfig';



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

  const currentPage = (stage) => {
    if(stage === 1) {
      return <BasicInfo />
    }
    return <ContainerConfig />
  }
  

  return (
    <Box>
      <ServiceStatusTable
        embeddingButton={
          <OutlinedButton onClick={handleOpen} sx={{
            borderRadius: "20px !important",
            width: "120px"
          }}>部署</OutlinedButton>
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

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
import InfoCard from '@/components/InfoCard';
import { ContainedButton, KubeConfirmButton } from '@/components/Button';
import { StyledTextField } from '@/components/Input';
import { fontFamily } from '@/utils/commonUtils';
import { StyledModal } from '../../../components/Modal';

import StressTestingIcon from '@/assets/StressTesting.svg';
import { useIntl } from 'react-intl';
import { TestingProgress } from './TestingProgress';

export default function StressTesting() {
  const intl = useIntl();
  const [planOpen, setPlanOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  const handlePlanClick = () => {
    setPlanOpen(true);
  };

  const handleClose = () => {
    setPlanOpen(false);
  };

  const handleCancelClick = () => {
    setPlanOpen(false);
  };

  const handleConfirmClick = () => {
    setPlanOpen(false);
  };

  return (
    <Stack>
      <Box
        sx={{
          borderRadius: '4px',
          backgroundColor: '#FFFFFF',
          padding: '24px 20px',
          width: 'calc(100% - 40px)',
          height: '58px',
          mb: '12px',
        }}
      >
        <Stack direction='row' spacing={1}>
          <StressTestingIcon />
          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontStyle: 'normal',
                color: '#242e42',
                textShadow: '0 4px 8px rgba(36,46,66,.1)',
                fontSize: '24px',
                lineHeight: '32px',
              }}
            >
              性能压测
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontStyle: 'normal',
                color: '#79879c',
                fontSize: '12px',
                lineHeight: 1.67,
              }}
            >
              {intl.messages['stressTesting.stressTestingDescription']}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <KubeConfirmButton onClick={handlePlanClick}>
        创建测试计划
      </KubeConfirmButton>

      <StyledModal open={planOpen} onClose={handleClose}>
        <TestingProgress
          handleConfirmClick={handleConfirmClick}
          handleCancelClick={handleCancelClick}
          showError={showError}
          setShowError={setShowError}
        />
      </StyledModal>
    </Stack>
  );
}

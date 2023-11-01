import { Modal } from '@mui/material';
import { styled } from '@mui/system';

export const StyledModal = styled(Modal)(() => ({
  '& .MuiModal-backdrop': {
    background: 'rgba(35, 45, 65, 0.7)',
    backdropFilter: 'blur(1px)',
  },
}));

export const NestedModal = styled(Modal)(() => ({
  '& .MuiModal-backdrop': {
    background: 'rgba(35, 45, 65, 0.7)',
    backdropFilter: 'blur(2px)',
  },
}));

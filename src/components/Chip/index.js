import { Chip } from '@mui/material';
import styled from '@emotion/styled';

export const CustomDefaultChip = styled(Chip)(() => ({
  '&.MuiChip-root': {
    backgroundColor: '#F1F3F5',
    border: '1px solid #DFE4E8',
    borderRadius: '6px',
    marginRight: '8px',
    height: '22px',
  },
}));

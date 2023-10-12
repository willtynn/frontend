import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export const StyledTextFiled = styled(TextField)(() => ({
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
      padding: '11px 8px !important',
    },
    '& fieldset': {
      border: 'none',
    }
  },
}));

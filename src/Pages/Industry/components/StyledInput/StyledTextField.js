import { styled, TextField } from "@mui/material"
import { fontFamily } from "../../utils/commonUtils"
const StyledTextField = styled(TextField)({
  'input,select': {
    lineHeight: '24px',
    fontSize: '14px',
    padding:'10px 10px'
  },
  '& ::placeholder': {
    color: 'black',
    fontWeight: 500,
    fontSize: '14px',
    fontFamily: '"Plus Jakarta Sans",sans-serif'
  },
  '.MuiInputLabel-root': {
    color: 'rgb(92 98 108)',
    fontFamily: fontFamily,
    fontWeight: 500,
    fontSize: '16px'
  },
  'label:has(~ .MuiFilledInput-root.Mui-focused)': {
    color: 'rgb(99, 102, 241)',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#E0E3E7',
    borderWidth:'2px',
    borderRadius: '8px',
  },
  '& .MuiOutlinedInput-root': {
    ':hover fieldset': {
      borderColor: '#283593',
    },
    '&.Mui-focused fieldset': {
      backgroundColor: 'transparent',
      borderColor: '#283593',
      borderWidth: '2px'
    }
  },
  '& .MuiFilledInput-root': {
    borderRadius: '8px',
    borderColor: 'rgb(229, 231, 235)',
    borderWidth: '1px',
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'rgba(17, 25, 39, 0.04)',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      borderColor: 'rgb(99, 102, 241)',
      boxShadow: 'rgb(99, 102, 241) 0px 0px 0px 2px'
    }
  }
})
export default StyledTextField
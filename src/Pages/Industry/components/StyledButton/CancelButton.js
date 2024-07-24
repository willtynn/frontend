import { Button, styled } from "@mui/material";
import { fontFamily } from "../../utils/commonUtils";
export const CancelButton = styled(Button)({
  width:'125px',
  color: '#0f163c',
  fontFamily:fontFamily,
  fontWeight:600,
  fontSize:'0.955rem',
  backgroundColor: 'rgb(217 223 233)',
  textTransform: 'none',
  borderRadius: '10px',
  '&.Mui-disabled': {
    color: 'rgb(255, 255, 255)',
    backgroundColor: '#9e9e9e'
  },
  ':hover': {
    backgroundColor: 'rgb(198 203 211)'
  }
})
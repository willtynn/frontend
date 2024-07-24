import { Button, styled } from "@mui/material";
import { fontFamily } from "../../utils/commonUtils";
export const AddButton = styled(Button)({
  width:'125px',
  color: '#fff',
  fontFamily:fontFamily,
  fontWeight:600,
  fontSize:'0.955rem',
  backgroundColor: '#283593',
  textTransform: 'none',
  borderRadius: '10px',
  '&.Mui-disabled': {
    color: 'rgb(255, 255, 255)',
    backgroundColor: '#9e9e9e'
  },
  ':hover': {
    backgroundColor: '#3f51b5'
  }
})
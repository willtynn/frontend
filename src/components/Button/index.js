import { Button } from "@mui/material";
import styled from "@emotion/styled";

export const OutlinedButton = styled(Button)({
  color: '#0052CC',
  borderRadius: "5px",
  border: "1px solid #0052CC",
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '18px',
  "&:hover":{
    color: "#6D98EE",
    border: "1px solid #6D98EE",
  }
});



import { Button } from "@mui/material";
import styled from "@emotion/styled";

export const OutlinedButton = styled(Button)({
  borderRadius: "5px",
  border: "1px solid #0052CC",
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '18px',
  "&:hover":{
    color: "#6D98EE",
    border: "1px solid #6D98EE",
  },
  color: '#0052CC',
});


export const ContainedButton = styled(Button)({
  color: '#FFF',
  backgroundColor: "#0052CC",
  borderRadius: "5px",
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '18px',
  "&:hover":{
    color: "#6D98EE",
    border: "1px solid #6D98EE",
  }
});

export const EclipseContainedButton = styled(Button)({
  color: '#FFF',
  backgroundColor: "#FAFAFA",
  borderRadius: "20px",
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '18px',
  "&:hover":{
    color: "#6D98EE",
  }
});


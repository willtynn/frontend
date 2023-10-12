import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { fontFamily } from "@/utils/commonUtils";

export const OutlinedButton = styled(Button)({
  borderRadius: "5px",
  border: "1px solid #0052CC",
  fontFamily: fontFamily,
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
  fontFamily: fontFamily,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '18px',
  "&:hover":{
    color: "#6D98EE",
    border: "1px solid #6D98EE",
  }
});

export const EclipseTransparentButton = styled(Button)({
  color: '#FFF',
  backgroundColor: "#FAFAFA",
  borderRadius: "20px",
  fontFamily: fontFamily,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '18px',
  "&:hover":{
    color: "#6D98EE",
  }
});


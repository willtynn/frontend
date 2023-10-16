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

export const KubeCancelButton = styled(Button)({
  color: '#36435c',
  border: '1px solid #ccd3db',
  backgroundColor: "#eff4f9",
  borderRadius: "18px",
  fontFamily: fontFamily,
  fontSize: '12px',
  fontWeight: 600,
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.67,
  letterSpacing: 'normal',
  "&:hover":{
    backgroundColor: "#e3e9ef"
  },
  "&:disabled": {
    opacity: .6,
    pointerEvents: 'none',
    cursor: 'not-allowed'
}
});

export const KubeConfirmButton = styled(Button)({
  color: '#FFF',
  backgroundColor: "#242e42",
  borderRadius: "18px",
  fontFamily: fontFamily,
  fontSize: '12px',
  fontWeight: 600,
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.67,
  letterSpacing: 'normal',
  boxShadow: "0 8px 16px 0 rgba(35,45,65,.28)",
  "&:hover":{
    boxShadow: 'none',
    backgroundColor: "#242e42",
  },
  "&.Mui-disabled": {
    backgroundColor: "#454450 !important"
  }
});

export const KubeTransparentButton = styled(Button)({
  color: '#FFF',
  // backgroundColor: "#FAFAFA",
  borderRadius: "16px",
  fontFamily: fontFamily,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '18px',
  "&:hover":{
    color: "#e3e9ef",
  }
});

export const KubeRectTransparentButton = styled(Button)({
  color: '#FFF',
  borderRadius: "0px",
  fontFamily: fontFamily,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '18px',
  "&:hover":{
    backgroundColor: "#36435c",
  }
});


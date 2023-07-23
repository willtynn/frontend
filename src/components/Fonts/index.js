import { Typography } from "@mui/material"
import styled from "@emotion/styled"


export const SmallLightFont = styled(Typography)({
  color: 'var(--gray-500, #596A7C)',
  fontSize: '12px',
  fontFamily: 'Open Sans',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '16px',
});

export const LargeBoldFont = styled(Typography)({
  color: '#262E35',
  fontSize: '22px',
  fontFamily: 'Open Sans',
  fontStyle: 'normal',
  fontWeight: 800,
  lineHeight: '27.5px',
});
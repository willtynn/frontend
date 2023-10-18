import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Button, Collapse, Grid, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CommonSnackBar from '../../components/CommonSnackbar';
import { useEffect } from 'react';
import { fontFamily } from '../../utils/commonUtils';
import Workbench from '@/assets/Workbench.svg';
import Gear from '@/assets/Gear.svg';
import { KubeTransparentButton } from '../../components/Button';
import { useIntl } from 'react-intl';

export function HeadBar() {
  const [open, setOpen] = React.useState(true);
  const [verticalOpen1, setVerticalOpen1] = React.useState(false);
  const [verticalOpen2, setVerticalOpen2] = React.useState(false);
  const [verticalOpen3, setVerticalOpen3] = React.useState(false);

  const [l1, setl1] = React.useState(false);
  const [l11, setl11] = React.useState(false);
  const [l12, setl12] = React.useState(false);
  const [l13, setl13] = React.useState(false);

  const [l2, setl2] = React.useState(false);
  const [l21, setl21] = React.useState(false);
  const [l22, setl22] = React.useState(false);

  const [l3, setl3] = React.useState(false);
  const [l31, setl31] = React.useState(false);

  const intl = useIntl();

  const navigate = useNavigate();

  useEffect(() => {
    setl1(l11 || l12 || l13);
  }, [l11, l12, l13]);

  useEffect(() => {
    setl2(l21 || l22);
  }, [l21, l22]);

  useEffect(() => {
    setl3(l31);
  }, [l31]);

  const styledButton = {
    borderRadius: '100px',
    backgroundColor: 'transparent',
    color: '#36435C !important',
    fontFamily: fontFamily,
  };

  return (
    <>
      {/* 顶部导航栏 */}
      <Box
        sx={{
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          backgroundColor: '#EFF4F9',
          fontFamily: fontFamily,
        }}
      >
        <Grid container spacing={0}>
          <Grid xs={3}>
            <Stack
              direction='row'
              spacing={2}
              alignItems='center'
              sx={{ height: '100%', ml: '20px' }}
            >
              <KubeTransparentButton sx={styledButton}>
                <Gear />
                <span
                  style={{
                    marginLeft: '12px',
                    fontStyle: 'normal',
                    fontSize: '12px',
                    lineHeight: 1.67,
                  }}
                >
                  平台管理
                </span>
              </KubeTransparentButton>
              <KubeTransparentButton sx={styledButton}>
                <Workbench />
                <span
                  style={{
                    marginLeft: '12px',
                    fontStyle: 'normal',
                    fontSize: '12px',
                    lineHeight: 1.67,
                  }}
                >
                  工作台
                </span>
              </KubeTransparentButton>
            </Stack>
          </Grid>

          <Grid xs={6}>
            <Stack
              direction='row'
              spacing={6}
              justifyContent='center'
              alignItems='center'
            >
              <Box
                sx={{
                  fontWeight: 600,
                  fontSize: '30px',
                  color: '#242e42',
                  fontFamily: 'Segoe Print',
                }}
              >
                Cloud Edge Platform
              </Box>
            </Stack>
          </Grid>
          <Grid xs={3}></Grid>
        </Grid>
      </Box>

      <Divider
        sx={{
          height: '1.5px',
          borderStyle: 'solid',
          borderSidth: '1px 0 0',
          borderImageSource:
            'radial-gradient(circle at 50% 3%,rgba(193,201,209,.53),hsla(0,0%,100%,.2))',
          borderImageSlice: 1,
        }}
      />

      <Box sx={{ backgroundColor: '#eff4f9', width: 'calc(100%)', fontFamily: fontFamily }}>
        <Box sx={{ display: 'block' }}>
          <Box sx={{ padding: '20px' }}>
            <Outlet />
          </Box>
          <CommonSnackBar />
        </Box>
      </Box>
    </>
  );
}

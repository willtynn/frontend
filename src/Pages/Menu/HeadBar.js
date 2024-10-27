/**
 * src\Pages\Menu\HeadBar.js
 */
import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Grid, Stack } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import CommonSnackBar from '../../components/CommonSnackbar';
import { useEffect } from 'react';
import { fontFamily } from '../../utils/commonUtils';
import Workbench from '@/assets/Workbench.svg';
import Gear from '@/assets/Gear.svg';
import { KubeTransparentButton } from '../../components/Button';
import { LanguageButton } from '../../components/Button/LanguageButton';
import { useIntl } from 'react-intl';

export function HeadBar() {

  const navigate = useNavigate();

  const intl = useIntl();

  useEffect(() => {
    if(!localStorage.getItem("current_cluster")) {
      localStorage.setItem("current_cluster", "ices104");
    }
  }, []);

  const toHomePage = () => {
    navigate("/cluster/overview");
  }

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
          <Grid xs={3} item>
            <Stack
              direction='row'
              spacing={2}
              alignItems='center'
              sx={{ height: '100%', ml: '20px' }}
            >
              <KubeTransparentButton onClick={toHomePage} sx={styledButton}>
                <Gear />
                <span
                  style={{
                    marginLeft: '12px',
                    fontStyle: 'normal',
                    fontSize: '12px',
                    lineHeight: 1.67,
                    textTransform: "none"
                  }}
                >
                  {intl.messages['menu.platformManagement']}
                </span>
              </KubeTransparentButton>
              <LanguageButton />
            </Stack>
          </Grid>

          <Grid xs={6} item>
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
                MicroForge
              </Box>
            </Stack>
          </Grid>
          <Grid xs={3} item></Grid>
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

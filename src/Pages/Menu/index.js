import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import { ExpandLess, ExpandMore, Timeline } from '@mui/icons-material';
import { Button, Collapse, Grid, Stack } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CommonSnackBar from '../../components/CommonSnackbar';
import { useEffect } from 'react';
import { fontFamily } from '../../utils/commonUtils';
import ICES from '@/assets/ICES.png';
import Workbench from '@/assets/Workbench.svg';
import Gear from '@/assets/Gear.svg';
import ClusterManagement from '@/assets/ClusterManagement.svg';
import { KubeTransparentButton } from '../../components/Button';
import { useIntl } from 'react-intl';

export default function MiniDrawer() {
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

  const setAllFalse = () => {
    setl1(false);
    setl11(false);
    setl12(false);
    setl13(false);
    setl2(false);
    setl21(false);
    setl22(false);
    setl3(false);
    setl31(false);
  };
  const handleClick1 = () => {
    setVerticalOpen1(!verticalOpen1);
  };

  const handleClick2 = () => {
    setVerticalOpen2(!verticalOpen2);
  };

  const handleClick3 = () => {
    setVerticalOpen3(!verticalOpen3);
  };

  const styledFont = {
    color: '#242e42',
    fontSize: '12px',
    lineHeight: '24px',
    fontFamily:
      'PingFang SC,Lantinghei SC,Helvetica Neue,Helvetica,Arial,Microsoft YaHei,微软雅黑,STHeitiSC-Light,simsun,宋体,WenQuanYi Zen Hei,WenQuanYi Micro Hei,sans-serif',
    width: '180px',
    ':hover': {
      color: '#55bc8a',
    },
  };

  const styledIcon = {
    width: '24px',
    height: '24px',
    paddingRight: '12px',
  };

  const styleListButton = {
    justifyContent: 'initial',
    paddingLeft: '36px',
    ':hover': {
      backgroundColor: '#eff4f9',
    },
  };

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

      <Stack direction='row' spacing={0} justifyContent='space-between'>
        <Box
          sx={{
            paddingLeft: '20px',
            width: '230px',
            backgroundColor: '#eff4f9',
          }}
        >
          <Box sx={{ maxWidth: '220px' }}>
            {/* 深色块标签 */}
            <Stack
              spacing={1}
              sx={{
                height: '80px',
                maxWidth: '182px',
                backgroundColor: 'rgb(36, 46, 66)',
                boxShadow: 'rgba(36, 46, 66, 0.2) 0px 8px 16px 0px',
                padding: '12px 14px 12px 14px',
                marginTop: '20px',
                marginBottom: '20px',
                borderRadius: '4px',
              }}
            >
              <Stack
                direction='row'
                justifyContent='flex-start'
                alignItems='center'
              >
                <Box sx={{ paddingRight: '20px' }}>
                  <ClusterManagement />
                </Box>
                <Box
                  sx={{
                    color: '#FFF',
                    fontSize: '14px',
                    fontWeight: 600,
                    fontStyle: 'normal',
                    fontFamily:
                      'Roboto,PingFang SC,Lantinghei SC,Helvetica Neue,Helvetica,Arial,Microsoft YaHei,微软雅黑,STHeitiSC-Light,simsun,宋体,WenQuanYi Zen Hei,WenQuanYi Micro Hei,sans-serif',
                  }}
                >
                  集群管理
                </Box>
              </Stack>

              <Box
                sx={{
                  color: '#d8dee5',
                  fontWeight: 400,
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontFamily:
                    'Roboto,PingFang SC,Lantinghei SC,Helvetica Neue,Helvetica,Arial,Microsoft YaHei,微软雅黑,STHeitiSC-Light,simsun,宋体,WenQuanYi Zen Hei,WenQuanYi Micro Hei,sans-serif',
                  textAlign: "center"
                }}
              >
                {intl.messages['menu.clusterMangementDescription']}
              </Box>
            </Stack>

            {/* 导航列表 */}
            <List sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <ListItemButton
                sx={{
                  ...styleListButton,
                  paddingLeft: '0px',
                }}
                onClick={handleClick1}
              >
                <Box sx={styledIcon}>
                  <DeviceHubIcon />
                </Box>
                <Box sx={{ ...styledFont, color: l1 ? '#55bc8a' : '#242e42' }}>
                  集群
                </Box>
                {verticalOpen1 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={verticalOpen1} timeout='auto' unmountOnExit={true}>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      setAllFalse();
                      setl11(true);
                      navigate('cluster/overview');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: l11 ? '#55bc8a' : '#242e42' }}
                    >
                      集群总览
                    </Box>
                  </ListItemButton>

                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      setAllFalse();
                      setl13(true);
                      navigate('cluster/deploy');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: l13 ? '#55bc8a' : '#242e42' }}
                    >
                      服务实例
                    </Box>
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
            <List sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <ListItemButton
                sx={{
                  ...styleListButton,
                  paddingLeft: '0px',
                }}
                onClick={handleClick2}
              >
                <Box sx={styledIcon}>
                  <CloudIcon />
                </Box>
                <Box sx={{ ...styledFont, color: l2 ? '#55bc8a' : '#242e42' }}>
                  服务
                </Box>
                {verticalOpen2 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={verticalOpen2} timeout='auto' unmountOnExit={true}>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      setAllFalse();
                      setl21(true);
                      navigate('/service/query');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: l21 ? '#55bc8a' : '#242e42' }}
                    >
                      服务集合
                    </Box>
                  </ListItemButton>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      setAllFalse();
                      setl22(true);
                      navigate('/service/dependency');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: l22 ? '#55bc8a' : '#242e42' }}
                    >
                      服务依赖
                    </Box>
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
            <List sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <ListItemButton
                sx={{
                  ...styleListButton,
                  paddingLeft: '0px',
                }}
                onClick={handleClick3}
              >
                <Box sx={styledIcon}>
                  <Timeline />
                </Box>
                <Box sx={{ ...styledFont, color: l3 ? '#55bc8a' : '#242e42' }}>
                  路由
                </Box>
                {verticalOpen3 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={verticalOpen3} timeout='auto' unmountOnExit={true}>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      setAllFalse();
                      setl31(true);
                      navigate('/route/trace');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: l31 ? '#55bc8a' : '#242e42' }}
                    >
                      路由链路
                    </Box>
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: '#eff4f9', width: 'calc(100% - 230px)' }}>
          <Box sx={{ display: 'block' }}>
            <Box sx={{ padding: '20px' }}>
              <Outlet />
            </Box>
            <CommonSnackBar />
          </Box>
        </Box>
      </Stack>
    </>
  );
}

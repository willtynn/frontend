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
    color: 'rgb(54, 67, 92)',
    fontFamily: 'Arial',
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
          backgroundColor: '#FFFFFF',
          fontFamily: fontFamily,
        }}
      >
        <Grid container spacing={0}>
          <Grid xs={3}>
            <Button sx={styledButton}>平台管理</Button>
          </Grid>
          <Grid xs={6}>
            <Stack
              direction='row'
              spacing={6}
              justifyContent='center'
              alignItems='center'
            >
              <img style={{height: "40px"}} src={ICES} alt="ICES" />
              <Box
                sx={{
                  fontWeight: 600,
                  fontSize: '30px',
                  color: '#242e42',
                  fontFamily: "Segoe Print"
                }}
              >
                Cloud Edge Platform
              </Box>
            </Stack>
          </Grid>
          <Grid xs={3}>
            <Button sx={styledButton}>工作台</Button>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <Grid container spacing={0} >
        <Grid
          xs={1.8}
          sx={{
            paddingLeft: '20px',
            minWidth: '220px',
            backgroundColor: '#eff4f9',
          }}
        >
          <Box sx={{ maxWidth: '220px' }}>
            {/* 深色块标签 */}
            <Stack
              direction='row'
              sx={{
                height: '40px',
                maxWidth: '186px',
                backgroundColor: 'rgb(36, 46, 66)',
                boxShadow: 'rgba(36, 46, 66, 0.2) 0px 8px 16px 0px',
                padding: '12px',
                marginTop: '20px',
                marginBottom: '20px',
                borderRadius: '4px',
                alignItems: 'center',
              }}
            >
              <Box sx={{ paddingRight: '20px' }}>
                <DeviceHubIcon />
              </Box>
              <Stack
                sx={{
                  color: '#FFF',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontStyle: 'normal',
                  fontFamily:
                    'Roboto,PingFang SC,Lantinghei SC,Helvetica Neue,Helvetica,Arial,Microsoft YaHei,微软雅黑,STHeitiSC-Light,simsun,宋体,WenQuanYi Zen Hei,WenQuanYi Micro Hei,sans-serif',
                }}
              >
                <Box>ices104</Box>
                <Box>集群</Box>
              </Stack>
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
        </Grid>
        <Grid xs={10.2} sx={{ backgroundColor: '#eff4f9' }}>
          <Box sx={{ display: 'block' }}>
            <Box sx={{ padding: '20px' }}>
              <Outlet />
            </Box>
            <CommonSnackBar />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

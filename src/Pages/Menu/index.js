/**
 * src\Pages\Menu\index.js
 */
import {
  Collapse,
  Grid,
  Stack,
  ListItemButton,
  Box,
  List,
  Divider,
  Modal,
} from '@mui/material';
import { ExpandLess, ExpandMore, Timeline } from '@mui/icons-material';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CommonSnackBar from '../../components/CommonSnackbar';
import { useState, useEffect } from 'react';
import { fontFamily } from '../../utils/commonUtils';
import Workbench from '@/assets/Workbench.svg';
import Gear from '@/assets/Gear.svg';
import ClusterManagement from '@/assets/ClusterManagement.svg';
import { KubeTransparentButton } from '../../components/Button';
import { useIntl } from 'react-intl';
import ClusterSelectModal from './ClusterSelectModal';
import Cluster16 from '@/assets/Cluster16.svg';
import Service16 from '@/assets/Service16.svg';
import Application16 from '@/assets/Application16.svg';
import Route16 from '@/assets/Route16.svg';
import Link16 from '@/assets/Link16.svg';
import { LanguageButton } from '../../components/Button/LanguageButton';

export default function MiniDrawer() {
  // 这部分变量用于控制导航列表打开/关闭
  const [verticalOpen1, setVerticalOpen1] = useState(false);
  const [verticalOpen2, setVerticalOpen2] = useState(false);
  const [verticalOpen3, setVerticalOpen3] = useState(false);
  const [verticalOpen4, setVerticalOpen4] = useState(false);
  const [verticalOpen5, setVerticalOpen5] = useState(false);
  const [verticalOpen6, setVerticalOpen6] = useState(false);
  const [verticalOpen7, setVerticalOpen7] = useState(false);

  // 这部分变量用于控制导航列表按钮字体颜色
  // 集群模块
  const [l1, setl1] = useState(false);
  const [l11, setl11] = useState(false);
  const [l12, setl12] = useState(false);
  const [l13, setl13] = useState(false);
  // 服务模块
  const [l2, setl2] = useState(false);
  const [l21, setl21] = useState(false);
  const [l22, setl22] = useState(false);
  // 路由模块
  const [l3, setl3] = useState(false);
  const [l31, setl31] = useState(false);
  const [l32, setl32] = useState(false);
  // 应用模块
  const [l4, setl4] = useState(false);
  const [l41, setl41] = useState(false);
  // 镜像模块
  const [l5, setl5] = useState(false);
  const [l51, setl51] = useState(false);
  // 演化模块
  const [l6, setl6] = useState(false);
  const [l61, setl61] = useState(false);
  // DNN协同推理模块
  const [l7, setl7] = useState(false);
  const [l71, setl71] = useState(false);
  const [l72, setl72] = useState(false);
  const [l73, setl73] = useState(false);
  const [l74, setl74] = useState(false);
  const [l75, setl75] = useState(false);

  const intl = useIntl();
  const [clusterSelectOpen, setClusterSelectOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('current_cluster')) {
      localStorage.setItem('current_cluster', 'ices104');
    }
  }, []);

  useEffect(() => {
    setl1(l11 || l12 || l13);
  }, [l11, l12, l13]);

  useEffect(() => {
    setl2(l21 || l22);
  }, [l21, l22]);

  useEffect(() => {
    setl3(l31||l32);
  }, [l31,l32]);

  useEffect(() => {
    setl4(l41);
  }, [l41]);

  useEffect(() => {
    setl5(l51);
  }, [l51]);

  useEffect(() => {
    setl6(l61);
  }, [l61]);

  useEffect(() => {
    setl7(l71||l72||l73||l74||l75);
  }, [l71, l72, l73, l74, l75]);

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
    setl32(false);
    setl4(false);
    setl41(false);
    setl5(false);
    setl51(false);
    setl6(false);
    setl61(false);
    setl7(false);
    setl71(false);
    setl72(false);
    setl73(false);
    setl74(false);
    setl75(false);
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

  const handleClick4 = () => {
    setVerticalOpen4(!verticalOpen4);
  };

  const handleClick5 = () => {
    setVerticalOpen5(!verticalOpen5);
  };

  const handleClick6 = () => {
    setVerticalOpen6(!verticalOpen6);
  };

  const handleClick7 = () => {
    setVerticalOpen7(!verticalOpen7);
  };

  const handlelClusterSelectClose = () => {
    setClusterSelectOpen(false);
  };

  const handleClusterSelectClick = () => {
    setClusterSelectOpen(true);
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
    display: 'flex',
    alignItems: 'center',
  };

  const styleListButton = {
    justifyContent: 'initial',
    paddingLeft: '42px',
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

  const toHomePage = () => {
    navigate("/cluster/overview");
  }

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
              direction='row'
              justifyContent='flex-start'
              alignItems='center'
              sx={{
                height: '40px',
                maxWidth: '182px',
                backgroundColor: 'rgb(36, 46, 66)',
                boxShadow: 'rgba(36, 46, 66, 0.2) 0px 8px 16px 0px',
                padding: '12px 14px 12px 14px',
                marginTop: '20px',
                marginBottom: '20px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={handleClusterSelectClick}
            >
              <Box sx={{ paddingRight: '10px' }}>
                <ClusterManagement />
              </Box>
              <Stack
                spacing={0.5}
                justifyContent='flex-start'
                alignItems='flex-start'
              >
                <Box
                  sx={{
                    color: '#FFF',
                    fontSize: '12px',
                    fontWeight: 600,
                    fontStyle: 'normal',
                    fontFamily:
                      'Roboto,PingFang SC,Lantinghei SC,Helvetica Neue,Helvetica,Arial,Microsoft YaHei,微软雅黑,STHeitiSC-Light,simsun,宋体,WenQuanYi Zen Hei,WenQuanYi Micro Hei,sans-serif',
                  }}
                >
                  {localStorage.getItem('current_cluster')}
                </Box>

                <Box
                  sx={{
                    color: '#d8dee5',
                    fontWeight: 400,
                    fontSize: '12px',
                    fontStyle: 'normal',
                    fontFamily:
                      'Roboto,PingFang SC,Lantinghei SC,Helvetica Neue,Helvetica,Arial,Microsoft YaHei,微软雅黑,STHeitiSC-Light,simsun,宋体,WenQuanYi Zen Hei,WenQuanYi Micro Hei,sans-serif',
                    textAlign: 'center',
                  }}
                >
                  {intl.messages['common.cluster']}
                </Box>
              </Stack>
            </Stack>

            {/* 导航列表 */}
            <List sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <ListItemButton
                sx={{
                  ...styleListButton,
                  paddingLeft: '12px',
                }}
                onClick={handleClick1}
              >
                <Box sx={styledIcon}>
                  <Cluster16 />
                </Box>
                <Box sx={{ ...styledFont, color: l1 ? '#55bc8a' : '#242e42' }}>
                  {intl.messages['common.cluster']}
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
                      {intl.messages['menu.clusterOverview']}
                    </Box>
                  </ListItemButton>

                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      setAllFalse();
                      setl12(true);
                      navigate('cluster/scheme');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: l12 ? '#55bc8a' : '#242e42' }}
                    >
                      {intl.messages['common.schemeDeploy']}
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
                      {intl.messages['common.serviceInstance']}
                    </Box>
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
            <List sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <ListItemButton
                sx={{
                  ...styleListButton,
                  paddingLeft: '12px',
                }}
                onClick={handleClick2}
              >
                <Box sx={styledIcon}>
                  <Service16 />
                </Box>
                <Box sx={{ ...styledFont, color: l2 ? '#55bc8a' : '#242e42' }}>
                  {intl.messages['common.service']}
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
                      {intl.messages['common.serviceCollection']}
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
                      {intl.messages['serviceDependency.serviceDependency']}
                    </Box>
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
            <List sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <ListItemButton
                sx={{
                  ...styleListButton,
                  paddingLeft: '12px',
                }}
                onClick={handleClick3}
              >
                <Box sx={styledIcon}>
                  <Link16 />
                </Box>
                <Box sx={{ ...styledFont, color: l3 ? '#55bc8a' : '#242e42' }}>
                  {intl.messages['common.route']}
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
                      {intl.messages['common.routeLink']}
                    </Box>
                  </ListItemButton>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      setAllFalse();
                      setl32(true);
                      navigate('/route/controlling');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: l32 ? '#55bc8a' : '#242e42' }}
                    >
                      {intl.messages['common.routeControl']}
                    </Box>
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
            <List sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <ListItemButton
                sx={{
                  ...styleListButton,
                  paddingLeft: '12px',
                }}
                onClick={handleClick4}
              >
                <Box sx={styledIcon}>
                  <Application16 />
                </Box>
                <Box sx={{ ...styledFont, color: l4 ? '#55bc8a' : '#242e42' }}>
                  {intl.messages['common.application']}
                </Box>
                {verticalOpen4 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={verticalOpen4} timeout='auto' unmountOnExit={true}>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      setAllFalse();
                      setl41(true);
                      navigate('/application/stress_testing');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: l41 ? '#55bc8a' : '#242e42' }}
                    >
                      {intl.messages['common.serviceCapabilityAutomaticTesting']}
                    </Box>
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
            <List sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <ListItemButton
                sx={{
                  ...styleListButton,
                  paddingLeft: '12px',
                }}
                onClick={handleClick5}
              >
                <Box sx={styledIcon}>
                  <Route16 />
                </Box>
                <Box sx={{ ...styledFont, color: l5 ? '#55bc8a' : '#242e42' }}>
                  {intl.messages['common.imageManagement']}
                </Box>
                {verticalOpen5 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={verticalOpen5} timeout='auto' unmountOnExit={true}>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      setAllFalse();
                      setl51(true);
                      navigate('/images/list');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: l51 ? '#55bc8a' : '#242e42' }}
                    >
                      {intl.messages['common.imageList']}
                    </Box>
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
            <List sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <ListItemButton
                sx={{
                  ...styleListButton,
                  paddingLeft: '12px',
                }}
                onClick={handleClick6}
              >
                <Box sx={styledIcon}>
                  <Route16 />
                </Box>
                <Box sx={{ ...styledFont, color: l6 ? '#55bc8a' : '#242e42' }}>
                  {intl.messages['evolution.evolution']}
                </Box>
                {verticalOpen6 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={verticalOpen6} timeout='auto' unmountOnExit={true}>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      setAllFalse();
                      setl61(true);
                      navigate('/evolution/plan');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: l61 ? '#55bc8a' : '#242e42' }}
                    >
                      {intl.messages['evolution.evolutionPlan']}
                    </Box>
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
            <List sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <ListItemButton
                sx={{
                  ...styleListButton,
                  paddingLeft: '12px',
                }}
                onClick={handleClick7}
              >
                <Box sx={styledIcon}>
                  <Service16 />
                </Box>
                <Box sx={{ ...styledFont, color: l7 ? '#55bc8a' : '#242e42' }}>
                  DNN协同推理模块
                </Box>
                {verticalOpen7 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={verticalOpen7} timeout='auto' unmountOnExit={true}>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      setAllFalse();
                      setl71(true);
                      navigate('/partition/strategy');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: l71 ? '#55bc8a' : '#242e42' }}
                    >
                      拆分方案管理
                    </Box>
                  </ListItemButton>
                </List>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      setAllFalse();
                      setl72(true);
                      navigate('/model/overview');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: l72 ? '#55bc8a' : '#242e42' }}
                    >
                      模型列表
                    </Box>
                  </ListItemButton>
                </List>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      setAllFalse();
                      setl73(true);
                      navigate('/application/deploy');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: l73 ? '#55bc8a' : '#242e42' }}
                    >
                      推理实例管理
                    </Box>
                  </ListItemButton>
                </List>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      setAllFalse();
                      setl74(true);
                      navigate('/route/infertrace');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: l74 ? '#55bc8a' : '#242e42' }}
                    >
                      推理请求管理
                    </Box>
                  </ListItemButton>
                </List>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      setAllFalse();
                      setl75(true);
                      navigate('detail/model/deployment');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: l75 ? '#55bc8a' : '#242e42' }}
                    >
                      timeline test
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

      <Modal
        //模态框背景颜色和模糊效果
        sx={{
          '& .MuiModal-backdrop': {
            background: 'rgba(35, 45, 65, 0.7)',
            backdropFilter: 'blur(1px)',
          },
        }}
        open={clusterSelectOpen}
        onClose={handlelClusterSelectClose}
      >
        <ClusterSelectModal handleCancelClick={handlelClusterSelectClose} />
      </Modal>
    </>
  );
}

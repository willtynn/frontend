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
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import CommonSnackBar from '../../components/CommonSnackbar';
import { useState, useEffect } from 'react';
import { fontFamily } from '../../utils/commonUtils';
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
  const intl = useIntl();
  const [clusterSelectOpen, setClusterSelectOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    if (!localStorage.getItem('current_cluster')) {
      localStorage.setItem('current_cluster', 'ices104');
    }
  }, []);

  useEffect(() => {
    setCurrentPath(location.pathname)
  }, [location.pathname]);

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
          {/* 'Grid' using in this file is v1, which is deprecated. The Document is not universal, please note */}
          <Grid item xs={3}>
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

          <Grid item xs={6}>
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
          <Grid item xs={3}></Grid>
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
                onClick={() => {setCurrentPath('/cluster')}}
              >
                <Box sx={styledIcon}>
                  <Cluster16 />
                </Box>
                <Box sx={{ ...styledFont, color: currentPath.includes('/cluster') ? '#55bc8a' : '#242e42' }}>
                  {intl.messages['common.cluster']}
                </Box>
                {currentPath.includes('/cluster') ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={currentPath.includes('/cluster')} timeout='auto' unmountOnExit={true}>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      navigate('/cluster/overview');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: currentPath ==='/cluster/overview' ? '#55bc8a' : '#242e42' }}
                    >
                      {intl.messages['menu.clusterOverview']}
                    </Box>
                  </ListItemButton>

                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      navigate('/cluster/scheme');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: currentPath ==='/cluster/scheme' ? '#55bc8a' : '#242e42' }}
                    >
                      {intl.messages['common.schemeDeploy']}
                    </Box>
                  </ListItemButton>

                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      navigate('/cluster/deploy');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: currentPath ==='/cluster/deploy' ? '#55bc8a' : '#242e42' }}
                    >
                      {intl.messages['common.serviceInstance']}
                    </Box>
                  </ListItemButton>

                  <ListItemButton
                        sx={styleListButton}
                        onClick={() => {
                            navigate('/cluster/network');
                        }}
                    >
                        <Box
                            sx={{ ...styledFont, color: currentPath ==='/cluster/network' ? '#55bc8a' : '#242e42' }}
                        >
                            {intl.messages['common.clusterNetwork']}
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
                onClick={() => {setCurrentPath('/service')}}
              >
                <Box sx={styledIcon}>
                  <Service16 />
                </Box>
                <Box sx={{ ...styledFont, color: currentPath.includes('/service') ? '#55bc8a' : '#242e42' }}>
                  {intl.messages['common.service']}
                </Box>
                {currentPath.includes('/service') ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={currentPath.includes('/service')} timeout='auto' unmountOnExit={true}>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      navigate('/service/query');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: currentPath ==='/service/query' ? '#55bc8a' : '#242e42' }}
                    >
                      {intl.messages['common.serviceCollection']}
                    </Box>
                  </ListItemButton>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      navigate('/service/dependency');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: currentPath === '/service/dependency' ? '#55bc8a' : '#242e42' }}
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
                onClick={() => {setCurrentPath('/route')}}
              >
                <Box sx={styledIcon}>
                  <Link16 />
                </Box>
                <Box sx={{ ...styledFont, color: currentPath.includes('/route') ? '#55bc8a' : '#242e42' }}>
                  {intl.messages['common.route']}
                </Box>
                {currentPath.includes('/route') ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={currentPath.includes('/route')} timeout='auto' unmountOnExit={true}>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      navigate('/route/trace');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: currentPath === '/route/trace' ? '#55bc8a' : '#242e42' }}
                    >
                      {intl.messages['common.routeLink']}
                    </Box>
                  </ListItemButton>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      navigate('/route/controlling');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: currentPath === '/route/controlling' ? '#55bc8a' : '#242e42' }}
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
                onClick={() => {setCurrentPath('/application')}}
              >
                <Box sx={styledIcon}>
                  <Application16 />
                </Box>
                <Box sx={{ ...styledFont, color: currentPath.includes('/application') ? '#55bc8a' : '#242e42' }}>
                  {intl.messages['common.application']}
                </Box>
                {currentPath.includes('/application') ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={currentPath.includes('/application')} timeout='auto' unmountOnExit={true}>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      navigate('/application/stress_testing');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: currentPath === '/application/stress_testing' ? '#55bc8a' : '#242e42' }}
                    >
                      {intl.messages['common.serviceCapabilityAutomaticTesting']}
                    </Box>
                  </ListItemButton>

                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      navigate('/application/joint_stress_testing');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: currentPath === '/application/joint_stress_testing' ? '#55bc8a' : '#242e42' }}
                    >
                      {intl.messages['common.serviceCapabilityJointTesting']}
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
                onClick={() => {setCurrentPath('/images')}}
              >
                <Box sx={styledIcon}>
                  <Route16 />
                </Box>
                <Box sx={{ ...styledFont, color: currentPath.includes('/images') ? '#55bc8a' : '#242e42' }}>
                  {intl.messages['common.imageManagement']}
                </Box>
                {currentPath.includes('/images') ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={currentPath.includes('/images')} timeout='auto' unmountOnExit={true}>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      navigate('/images/list');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: currentPath === '/images/list' ? '#55bc8a' : '#242e42' }}
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
                onClick={() => {setCurrentPath('/evolution')}}
              >
                <Box sx={styledIcon}>
                  <Route16 />
                </Box>
                <Box sx={{ ...styledFont, color: currentPath.includes('/evolution') ? '#55bc8a' : '#242e42' }}>
                  {intl.messages['evolution.evolution']}
                </Box>
                {currentPath.includes('/evolution') ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={currentPath.includes('/evolution')} timeout='auto' unmountOnExit={true}>
                <List component='div' disablePadding>
                  {/*<ListItemButton*/}
                  {/*  sx={styleListButton}*/}
                  {/*  onClick={() => {*/}
                  {/*    navigate('/evolution/plan');*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  <Box*/}
                  {/*    sx={{ ...styledFont, color: currentPath === '/evolution/plan' ? '#55bc8a' : '#242e42' }}*/}
                  {/*  >*/}
                  {/*    {intl.messages['evolution.evolutionPlan']}*/}
                  {/*  </Box>*/}
                  {/*</ListItemButton>*/}
                    {/*<ListItemButton*/}
                    {/*    sx={styleListButton}*/}
                    {/*    onClick={() => {*/}
                    {/*        navigate('/evolution/analysis');*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <Box*/}
                    {/*        sx={{ ...styledFont, color: currentPath === '/evolution/analysis' ? '#55bc8a' : '#242e42' }}*/}
                    {/*    >*/}
                    {/*        {intl.messages['evolution.analysisAlgorithmManagement']}*/}
                    {/*    </Box>*/}
                    {/*</ListItemButton>*/}
                    {/*<ListItemButton*/}
                    {/*    sx={styleListButton}*/}
                    {/*    onClick={() => {*/}
                    {/*        navigate('/evolution/planning');*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <Box*/}
                    {/*        sx={{ ...styledFont, color: currentPath === '/evolution/planning' ? '#55bc8a' : '#242e42' }}*/}
                    {/*    >*/}
                    {/*        {intl.messages['evolution.planningAlgorithmManagement']}*/}
                    {/*    </Box>*/}
                    {/*</ListItemButton>*/}
                    <ListItemButton
                        sx={styleListButton}
                        onClick={() => {
                            navigate('/evolution/analysisAlgorithm');
                        }}
                    >
                        <Box
                            sx={{ ...styledFont, color: currentPath === '/evolution/analysisAlgorithm' ? '#55bc8a' : '#242e42' }}
                        >
                            {intl.messages['evolution.analysisAlgorithm']}
                        </Box>
                    </ListItemButton>
                    <ListItemButton
                        sx={styleListButton}
                        onClick={() => {
                            navigate('/evolution/planningAlgorithm');
                        }}
                    >
                        <Box
                            sx={{ ...styledFont, color: currentPath === '/evolution/planningAlgorithm' ? '#55bc8a' : '#242e42' }}
                        >
                            {intl.messages['evolution.planningAlgorithm']}
                        </Box>
                    </ListItemButton>
                </List>
              </Collapse>
            </List>
            <List sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
                  {/* 数据源管理菜单 */}
                  <ListItemButton
                      sx={{
                          ...styleListButton,
                          paddingLeft: '12px',
                      }}
                      onClick={() => {setCurrentPath('/datasource')}}
                  >
                      <Box sx={styledIcon}>
                          <Application16 />
                      </Box>
                      <Box sx={{ ...styledFont, color: currentPath.includes('/datasource') ? '#55bc8a' : '#242e42' }}>
                          {intl.messages['dataSource.dataSourceManagement']}
                      </Box>
                      {currentPath.includes('/datasource') ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={currentPath.includes('/datasource')} timeout='auto' unmountOnExit={true}>
                      <List component='div' disablePadding>
                          <ListItemButton
                              sx={styleListButton}
                              onClick={() => {
                                  navigate('/datasource/info');
                              }}
                          >
                              <Box
                                  sx={{ ...styledFont, color: currentPath === '/datasource/info' ? '#55bc8a' : '#242e42' }}
                              >
                                  {intl.messages['dataSource.dataSourceInfo']}
                              </Box>
                          </ListItemButton>
                      </List>
                  </Collapse>
              </List>
            <List sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
              {/* 数据源管理菜单 */}
              <ListItemButton
                sx={{
                  ...styleListButton,
                  paddingLeft: '12px',
                }}
                onClick={() => {setCurrentPath('/industry')}}
              >
                <Box sx={styledIcon}>
                  <Application16 />
                </Box>
                <Box sx={{ ...styledFont, color: currentPath.includes('/industry') ? '#55bc8a' : '#242e42' }}>
                  {intl.messages['industry.label']}
                </Box>
                {currentPath.includes('/industry') ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={currentPath.includes('/industry')} timeout='auto' unmountOnExit={true}>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      navigate('/industry/overview');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: currentPath === '/industry/overview' ? '#55bc8a' : '#242e42' }}
                    >
                      {intl.messages['industry.overview']}
                    </Box>
                  </ListItemButton>
                </List>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      navigate('/industry/management');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: currentPath === '/industry/management' ? '#55bc8a' : '#242e42' }}
                    >
                      {intl.messages['industry.serviceManage']}
                    </Box>
                  </ListItemButton>
                </List>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      navigate('/industry/monitoring');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: currentPath === '/industry/monitoring' ? '#55bc8a' : '#242e42' }}
                    >
                      {intl.messages['industry.serviceMonitor']}
                    </Box>
                  </ListItemButton>
                </List>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      navigate('/industry/configuration');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: currentPath === '/industry/configuration' ? '#55bc8a' : '#242e42' }}
                    >
                      {intl.messages['industry.serviceConfig']}
                    </Box>
                  </ListItemButton>
                </List>
                <List component='div' disablePadding>
                  <ListItemButton
                    sx={styleListButton}
                    onClick={() => {
                      navigate('/industry/log');
                    }}
                  >
                    <Box
                      sx={{ ...styledFont, color: currentPath === '/industry/log' ? '#55bc8a' : '#242e42' }}
                    >
                      {intl.messages['industry.log']}
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

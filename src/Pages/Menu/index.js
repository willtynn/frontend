import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { CallSplit, ExpandLess, ExpandMore, Timeline } from '@mui/icons-material';
import { Button, Collapse } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AppsIcon from '@mui/icons-material/Apps';
import CloudIcon from '@mui/icons-material/Cloud';
import {Outlet} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import PolylineIcon from '@mui/icons-material/Polyline';
import CommonSnackBar from '../../components/CommonSnackbar';
import PublishIcon from '@mui/icons-material/Publish';
import CachedIcon from '@mui/icons-material/Cached';

const drawerWidth = 220;
const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);
  const [verticalOpen1, setVerticalOpen1] = React.useState(false);
  const [verticalOpen2, setVerticalOpen2] = React.useState(false);
  const [verticalOpen3, setVerticalOpen3] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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

  return (
    <Box sx={{ display: 'block' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Cloud Collaboration Platform
          </Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            {/*
            <Button
              variant='outlined'
              sx={{
                borderColor: '#FFF',
                color: '#FFF'
              }}
            >
              Button
            </Button>
            {/*<IconButton aria-label='delete'>*/}
            {/*  <DeleteIcon />*/}
            {/*</IconButton>*/}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open}>
        <DrawerHeader
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: open? 1: 2.5,
              backgroundColor: '#E8EDFB',
            }}
            onClick={handleClick1}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <DeviceHubIcon />
            </ListItemIcon>
            {open ? (
              <>
                <ListItemText primary='集群' />
                {verticalOpen1 ? <ExpandLess /> : <ExpandMore />}
              </>
            ) : null}
          </ListItemButton>
          <Collapse in={verticalOpen1} timeout='auto' unmountOnExit={true}>
            <List component='div' disablePadding>
              <ListItemButton
                sx={{
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  backgroundColor: '#FFF',
                }}
                onClick={() => {navigate('cluster/overview');}}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <DashboardIcon />
                </ListItemIcon>
                {open ? <ListItemText primary='集群总览' /> : null}
              </ListItemButton>
              <ListItemButton
                sx={{
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  backgroundColor: '#FFF',
                }}
                onClick={() => {navigate('cluster/node');}}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <CachedIcon />
                </ListItemIcon>
                {open ? <ListItemText primary='当前运行服务' /> : null}
              </ListItemButton>
              <ListItemButton
                sx={{
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  backgroundColor: '#FFF',
                }}
                onClick={() => {navigate('cluster/deploy');}}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <PublishIcon />
                </ListItemIcon>
                {open ? <ListItemText primary='服务部署运行' /> : null}
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <List sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: open? 1: 2.5,
              backgroundColor: '#E7F6F8',
            }}
            onClick={handleClick2}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <CloudIcon />
            </ListItemIcon>
            {open ? (
              <>
                <ListItemText primary='服务' />
                {verticalOpen2 ? <ExpandLess /> : <ExpandMore />}
              </>
            ) : null}
          </ListItemButton>
          <Collapse in={verticalOpen2} timeout='auto' unmountOnExit={true}>
            <List component='div' disablePadding>
              {/* <ListItemButton
                sx={{
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  backgroundColor: '#E7F6F8',
                }}
                onClick={()=>{navigate('/service/overview')}}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                  
                >
                  <AppsIcon />
                </ListItemIcon>
                {open ? <ListItemText primary='服务集合' /> : null}
              </ListItemButton> */}
              <ListItemButton
                sx={{
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  backgroundColor: '#FFF',
                }}
                onClick={()=>{navigate('/service/query')}}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AppsIcon />
                </ListItemIcon>
                {open ? <ListItemText primary='服务集合' /> : null}
              </ListItemButton>
              <ListItemButton
                sx={{
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  backgroundColor: '#FFF',
                }}
                onClick={()=>{navigate('/service/dependency')}}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <PolylineIcon />
                </ListItemIcon>
                {open ? <ListItemText primary='服务依赖' /> : null}
              </ListItemButton>
              {/* <ListItemButton
                sx={{
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  backgroundColor: '#E7F6F8',
                }}
                onClick={()=>{navigate('/service/set')}}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <HubIcon />
                </ListItemIcon>
                {open ? <ListItemText primary='服务链路' /> : null}
              </ListItemButton> */}
            </List>
          </Collapse>
        </List>


        <List sx={{ paddingTop: '0px', paddingBottom: '0px' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: open? 1: 2.5,
              backgroundColor: '#E8F9E6',
            }}
            onClick={handleClick3}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <Timeline />
            </ListItemIcon>
            {open ? (
              <>
                <ListItemText primary='路由' />
                {verticalOpen3 ? <ExpandLess /> : <ExpandMore />}
              </>
            ) : null}
          </ListItemButton>
          <Collapse in={verticalOpen3} timeout='auto' unmountOnExit={true}>
            <List component='div' disablePadding>
              <ListItemButton
                sx={{
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  backgroundColor: '#FFF',
                }}
                onClick={()=>{navigate('/route/trace')}}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <CallSplit />
                </ListItemIcon>
                {open ? <ListItemText primary='路由链路' /> : null}
              </ListItemButton>
              
            </List>
          </Collapse>
        </List>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3, ml: open? "220px" : "65px" }}>
        <DrawerHeader />
        <Outlet />
      </Box>
      <CommonSnackBar />
    </Box>
  );
}

// @ts-check
/**
 * 该文件是仅在创建、更新SI时使用的header
 */
import React from 'react';
import { AppBar, Stack, Toolbar } from '@mui/material';
import './index.css';
// @ts-ignore
// import WileyLogo from '../../assets/wiley_logo.svg';

/**
 *
 * @param {import("./Header").HeaderProps} props
 * @returns
 */
const Header = props => {
  const { sx, ...others } = props;

  return (
    <AppBar
      sx={{ boxShadow: 'none', background: '#154AB6', ...sx }}
      {...others}
    >
      <Toolbar variant='dense' sx={{ height: '56px' }}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          spacing={1}
          sx={{ width: '100%' }}
        >
          {/* <WileyLogo
            style={{
              // height: '20px',  //modified by HJX
            }}
          /> */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

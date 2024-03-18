import * as React from 'react';
import { AppBarProps } from '@mui/material';

export interface HeaderProps extends AppBarProps {}

declare const Header: React.FC<HeaderProps>;

export default Header;

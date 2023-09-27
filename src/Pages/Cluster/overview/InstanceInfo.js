import Check from '@mui/icons-material/Check';
import {
  Box,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useEffect, useState } from 'react';
import LabelAndValue from '@/components/LabelAndValue';
import { LargeBoldFont, NormalBoldFont } from '../../../components/Fonts';
import CloseIcon from '@/assets/CloseIcon.svg';
import PolylineIcon from '@mui/icons-material/Polyline';
import { useNavigate } from 'react-router-dom';
import InfoCard from '@/components/InfoCard';

export default function InstanceInfo(props) {
  const { instances, handleClose, sx } = props;

  return (
    <InfoCard title='实例列表'>
      <Box sx={sx}>
        <Paper sx={{ width: '100%' }}>
          <MenuList dense>
            {instances.map((instance, index) => {
              return InstanceMenuItem(instance);
            })}
          </MenuList>
        </Paper>
      </Box>
    </InfoCard>
  );
}
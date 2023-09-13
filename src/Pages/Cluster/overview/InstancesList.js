import Check from '@mui/icons-material/Check';
import {
  Box,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useEffect, useState } from 'react';

const InstanceMenuItem = props => {
  const { metadata, status } = props;

  const [infoOpen, setInfoOpen] = useState(false);

  const handleInstanceMenuClick = () => {
    setInfoOpen(!infoOpen);
  };

  return (
    <>
      <MenuItem onClick={handleInstanceMenuClick}>
        {infoOpen ? (
          <ListItemIcon>
            <Check />
          </ListItemIcon>
        ) : (
          <></>
        )}
        <ListItemText inset={!infoOpen}>{metadata.name}</ListItemText>
      </MenuItem>
      {infoOpen ? <Box sx={{ height: '60px' }}>haha</Box> : <></>}
    </>
  );
};

export default function InstanceList(props) {
  const { instances, sx } = props;

  return (
    <Paper sx={{ width: 320, ...sx }}>
      <MenuList dense>
        {instances.map((instance, index) => {
          return InstanceMenuItem(instance);
        })}
      </MenuList>
    </Paper>
  );
}

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
} from '@mui/material';
import { useEffect, useState } from 'react';
import LabelAndValue from '@/components/LabelAndValue';
import { shadowStyle } from '@/utils/commonUtils';
import { LargeBoldFont, NormalBoldFont } from '../../../components/Fonts';
import CloseIcon from '@/assets/CloseIcon.svg';

const InstanceMenuItem = props => {
  const { metadata, status } = props;

  const [infoOpen, setInfoOpen] = useState(false);

  const metadataLabels = [];
  const metadataValues = [];
  const metadataIsUrl = [];
  for (const [key, value] of Object.entries(metadata.labels)) {
    metadataLabels.push(key);
    metadataValues.push(value);
    metadataIsUrl.push(false);
  }

  const statusLabels = [];
  const statusValues = [];
  const statusIsUrl = [];
  for (const [key, value] of Object.entries(status)) {
    statusLabels.push(key);
    statusValues.push(value);
    statusIsUrl.push(false);
  }

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
      {infoOpen ? (
        <Stack
          sx={{
            ml: '50px',
            mr: '50px',
            ...shadowStyle,
          }}
          spacing={3}
        >
          <Box>
            <LargeBoldFont sx={{ mb: '8px' }}>Metadata.labels</LargeBoldFont>
            <LabelAndValue
              id='serviceQueryInfo'
              labels={metadataLabels}
              value={metadataValues}
              open={false}
              isUrl={metadataIsUrl}
              widthList={['170px', '357px', '192px', '410px']}
            />
          </Box>

          <Box>
            <LargeBoldFont sx={{ mb: '8px' }}>Status</LargeBoldFont>
            <LabelAndValue
              id='serviceQueryInfo'
              labels={statusLabels}
              value={statusValues}
              open={false}
              isUrl={statusIsUrl}
              widthList={['170px', '357px', '192px', '410px']}
            />
          </Box>
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
};

export default function InstanceList(props) {
  const { instances, handleClose, sx } = props;

  return (
    <Box sx={sx}>
      <Paper sx={{ width: '100%' }}>
        <Box
          sx={{
            height: '30px',
            p: '8px 8px 8px 16px',
          }}
        >
          <Stack direction="row" justifyContent='space-between'>
            <NormalBoldFont>实例列表</NormalBoldFont>
            <span onClick={handleClose} style={{cursor: "pointer"}}>
              <CloseIcon />
            </span>
          </Stack>
        </Box>
        <MenuList dense>
          {instances.map((instance, index) => {
            return InstanceMenuItem(instance);
          })}
        </MenuList>
      </Paper>
    </Box>
  );
}

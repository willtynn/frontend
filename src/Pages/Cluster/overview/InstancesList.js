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

const InstanceMenuItem = props => {
  const { metadata, status } = props;

  const [infoOpen, setInfoOpen] = useState(false);
  const navigate = useNavigate();
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
          }}
          spacing={3}
        >
          <Box>
            <LargeBoldFont sx={{ mb: '8px' }}>
              Metadata.labels
              {metadata.labels.app ? (
                <Tooltip title='查看依赖'>
                  <IconButton
                    onClick={() => {
                      navigate(
                        `/service/dependency?type=service&by=0&id=${metadata.labels.app}`
                      );
                    }}
                    sx={{
                      p: '0px',
                      ml: '8px',
                    }}
                  >
                    <PolylineIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              ) : (
                <></>
              )}
            </LargeBoldFont>
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

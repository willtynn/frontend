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
import { NormalLargeFont, YaHeiLargeFont } from '@/components/Fonts';
import CloseIcon from '@/assets/CloseIcon.svg';
import PolylineIcon from '@mui/icons-material/Polyline';
import { useNavigate } from 'react-router-dom';
import InfoCard from '@/components/InfoCard';
import { useIntl } from 'react-intl';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { SELECT_INSTANCE } from '@/actions/clusterAction';
import InfoAlert from '@/assets/InfoAlert.svg';
import { fontFamily } from "@/utils/commonUtils";

const BoxForItem = styled(Box)(({ selected }) => ({
  color: '#262E35',
  fontSize: '15px',
  fontFamily: fontFamily,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '36px',
  padding: '0px 0px 0px 32px',
  cursor: 'pointer',
  height: '',
  '&:hover': {
    color: '#262E35',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  backgroundColor: selected ? 'rgba(25, 118, 210, 0.1)' : "'#FFFFFF",
}));

export function ListItem(props) {
  const { itemName } = props;

  const { selectedInstanceName } = useSelector(state => {
    return {
      selectedInstanceName: state.Cluster.selectedInstanceName,
    };
  });

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: SELECT_INSTANCE, data: itemName });
  };

  return (
    <BoxForItem selected={selectedInstanceName === itemName} onClick={handleClick}>
      {itemName}
    </BoxForItem>
  );
}

export default function InstanceList(props) {
  const { instances, sx } = props;
  const [display, setDisplay] = useState(false);
  const intl = useIntl();

  useEffect(() => {
    setDisplay(instances !== null && instances !== undefined);
  }, [instances]);

  return (
    <InfoCard title={intl.messages['cluster.instanceList']}>
      <Box sx={sx}>
        {instances && display ? (
          <Stack
            spacing={0.5}
            sx={{
              overflowY: 'auto',
            }}
          >
            {instances.map((instance, index) => {
              return <ListItem itemName={instance.metadata.name} />;
            })}
          </Stack>
        ) : (
          <Stack
            sx={{
              pt: '160px',
            }}
            direction='row'
            spacing={2}
            alignItems='center'
            justifyContent='center'
          >
            <InfoAlert />
            <YaHeiLargeFont>
              {intl.messages['cluster.serverSelectHint']}
            </YaHeiLargeFont>
          </Stack>
        )}
      </Box>
    </InfoCard>
  );
}
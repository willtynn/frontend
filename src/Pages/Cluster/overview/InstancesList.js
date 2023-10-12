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
import { NormalLargeFont, YaHeiLargeFont } from '../../../components/Fonts';
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

// const InstanceMenuItem = props => {
//   const { metadata, status } = props;
//   const [infoOpen, setInfoOpen] = useState(false);
//   const navigate = useNavigate();
//   const metadataLabels = [];
//   const metadataValues = [];
//   const metadataIsUrl = [];
//   for (const [key, value] of Object.entries(metadata.labels)) {
//     metadataLabels.push(key);
//     metadataValues.push(value);
//     metadataIsUrl.push(false);
//   }

//   const statusLabels = [];
//   const statusValues = [];
//   const statusIsUrl = [];
//   for (const [key, value] of Object.entries(status)) {
//     statusLabels.push(key);
//     statusValues.push(value);
//     statusIsUrl.push(false);
//   }

//   const handleInstanceMenuClick = () => {
//     setInfoOpen(!infoOpen);
//   };

//   return (
//     <>
//       <MenuItem onClick={handleInstanceMenuClick}>
//         {infoOpen ? (
//           <ListItemIcon>
//             <Check />
//           </ListItemIcon>
//         ) : (
//           <></>
//         )}
//         <ListItemText inset={!infoOpen}>{metadata.name}</ListItemText>
//       </MenuItem>
//       {infoOpen ? (
//         <Stack
//           sx={{
//             ml: '50px',
//             mr: '50px',
//           }}
//           spacing={3}
//         >
//           <Box>
//             <LargeBoldFont sx={{ mb: '8px' }}>
//               Metadata.labels
//               {metadata.labels.app ? (
//                 <Tooltip title='查看依赖'>
//                   <IconButton
//                     onClick={() => {
//                       navigate(
//                         `/service/dependency?type=service&by=0&id=${metadata.labels.app}`
//                       );
//                     }}
//                     sx={{
//                       p: '0px',
//                       ml: '8px',
//                     }}
//                   >
//                     <PolylineIcon fontSize='small' />
//                   </IconButton>
//                 </Tooltip>
//               ) : (
//                 <></>
//               )}
//             </LargeBoldFont>
//             <LabelAndValue
//               id='serviceQueryInfo'
//               labels={metadataLabels}
//               value={metadataValues}
//               open={false}
//               isUrl={metadataIsUrl}
//               widthList={['170px', '357px', '192px', '410px']}
//             />
//           </Box>

//           <Box>
//             <LargeBoldFont sx={{ mb: '8px' }}>Status</LargeBoldFont>
//             <LabelAndValue
//               id='serviceQueryInfo'
//               labels={statusLabels}
//               value={statusValues}
//               open={false}
//               isUrl={statusIsUrl}
//               widthList={['170px', '357px', '192px', '410px']}
//             />
//           </Box>
//         </Stack>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// };

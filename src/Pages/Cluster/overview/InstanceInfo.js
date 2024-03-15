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
import InfoAlert from '@/assets/InfoAlert.svg';
import { useEffect, useState } from 'react';
import LabelAndValue from '@/components/LabelAndValue';
import { LargeBoldFont, YaHeiLargeFont } from '../../../components/Fonts';
import CloseIcon from '@/assets/CloseIcon.svg';
import PolylineIcon from '@mui/icons-material/Polyline';
import { useNavigate } from 'react-router-dom';
import InfoCard from '@/components/InfoCard';
import { useIntl } from 'react-intl';

export default function InstanceInfo(props) {
  const { instance } = props;
  const navigate = useNavigate();
  const intl = useIntl();
  const [metadataLabels, setMetadataLabels] = useState([]);
  const [metadataValues, setMetadataValues] = useState([]);
  const [metadataIsUrl, setMetadataIsUrl] = useState([]);

  const [statusLabels, setStatusLabels] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const [statusIsUrl, setStatusIsUrl] = useState([]);

  useEffect(() => {
    
    if (instance === null || instance === undefined) {

      return;
    }

    let tmpMetadataLabels = [];
    let tmpMetadataValues = [];
    let tmpMetadataIsUrl = [];
    let tmpStatusLabels = [];
    let tmpStatusValues = [];
    let tmpStatusIsUrl = [];

    for (const [key, value] of Object.entries(instance.metadata.labels)) {
      tmpMetadataLabels.push(key);
      tmpMetadataValues.push(value);
      tmpMetadataIsUrl.push(false);
    }
    for (const [key, value] of Object.entries(instance.status)) {
      tmpStatusLabels.push(key);
      tmpStatusValues.push(value);
      tmpStatusIsUrl.push(false);
    }

    setMetadataLabels(tmpMetadataLabels);
    setMetadataValues(tmpMetadataValues);
    setMetadataIsUrl(tmpMetadataIsUrl);
    setStatusLabels(tmpStatusLabels);
    setStatusValues(tmpStatusValues);
    setStatusIsUrl(tmpStatusIsUrl);
  }, [instance]);

  return (
    <InfoCard title={intl.messages['cluster.instanceInfo']}>
      <Stack
        sx={{
          minHeight: '400px',
          p: "16px 8px 16px 24px"
        }}
        spacing={3}
      >
        {((instance !== null && instance !== undefined) && metadataLabels.length !== 0) ? (
          <>
            

            <Box>
              <LargeBoldFont sx={{ mb: '8px' }}>
                Metadata.labels
                {instance.metadata.labels.app ? (
                  <Tooltip title={intl.messages['common.lookupDependency']}>
                    <IconButton
                      onClick={() => {
                        navigate(
                          `/service/dependency?type=service&id=${instance.metadata.labels.app}`
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
                isUrl={metadataIsUrl}
              />
            </Box>

            <Box>
              <LargeBoldFont sx={{ mb: '8px' }}>{intl.messages['common.status']}</LargeBoldFont>
              <LabelAndValue
                id='serviceQueryInfo'
                labels={statusLabels}
                value={statusValues}
                isUrl={statusIsUrl}
              />
            </Box>
          </>
        ) : (

            <Stack sx={{
              pt: "160px"
            }} direction="row" spacing={2} alignItems="center" justifyContent="center">
              <InfoAlert />
              <YaHeiLargeFont>{intl.messages['cluster.instanceSelectHint']}</YaHeiLargeFont>
            </Stack>
        )}
      </Stack>
    </InfoCard>
  );
}

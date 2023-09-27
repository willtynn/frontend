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

export default function ClusterInfo(props) {
    const intl = useIntl();
//   const { server } = props;
//   let metadata, status;
//   const navigate = useNavigate();
//   const [metadataLabels, setMetadataLabels] = useState([]);
//   const [metadataValues, setMetadataValues] = useState([]);
//   const [metadataIsUrl, setMetadataIsUrl] = useState([]);

//   const [statusLabels, setStatusLabels] = useState([]);
//   const [statusValues, setStatusValues] = useState([]);
//   const [statusIsUrl, setStatusIsUrl] = useState([]);

//   useEffect(() => {
//     if (server === null) {
//       return;
//     }
//     metadata = server.metadata;
//     status = server.status;

//     let tmpMetadataLabels = [];
//     let tmpMetadataValues = [];
//     let tmpMetadataIsUrl = [];
//     let tmpStatusLabels = [];
//     let tmpStatusValues = [];
//     let tmpStatusIsUrl = [];

//     for (const [key, value] of Object.entries(metadata.labels)) {
//       tmpMetadataLabels.push(key);
//       tmpMetadataValues.push(value);
//       tmpMetadataIsUrl.push(false);
//     }

//     for (const [key, value] of Object.entries(status)) {
//       tmpStatusLabels.push(key);
//       tmpStatusValues.push(value);
//       tmpStatusIsUrl.push(false);
//     }

//     setMetadataLabels(tmpMetadataLabels);
//     setMetadataValues(tmpMetadataValues);
//     setMetadataIsUrl(tmpMetadataIsUrl);
//     setStatusLabels(tmpStatusLabels);
//     setStatusValues(tmpStatusValues);
//     setStatusIsUrl(tmpStatusIsUrl);
//   }, []);

  return (
    <InfoCard title={intl.messages['cluster.clusterInfo']}>
      <Stack
        sx={{
          minHeight: '400px',
        }}
        spacing={3}
      >
        {/* {server !== null && metadata && status ? (
          <>
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
          </>
        ) : ( */}

            <Stack sx={{
              pt: "160px"
            }} direction="row" spacing={2} alignItems="center" justifyContent="center">
              <InfoAlert />
              <YaHeiLargeFont>{intl.messages['cluster.clusterSelectHint']}</YaHeiLargeFont>
            </Stack>
        {/* )} */}
      </Stack>
    </InfoCard>
  );
}
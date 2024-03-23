import { useEffect, useState } from 'react';
import { Box, Stack, TextField, Typography, Modal, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_SELECTED_SERVER } from '@/actions/clusterAction';
import { useIntl } from 'react-intl';
import ClusterNode from '@/assets/ClusterNode.svg';
import { StyledAutocomplete } from '@/components/Input';
import { fontFamily } from '../../../utils/commonUtils';
import SchemeOverview from './Overview';
import { OutlinedButton } from '@/components/Button';
import DeployConfig from './DeployConfig';

export default function SchemeDeploy() {
  const intl = useIntl();

  const [openConfig, setOpenConfig] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleConfigOpen = () => setOpenConfig(true);
  const handleConfigClose = () => {
    setShowError(false);
    setOpenConfig(false);
  }

  return (
    <Box>
      <Box
        sx={{
          borderRadius: '4px',
          backgroundColor: '#FFFFFF',
          padding: '24px 20px',
          width: 'calc(100% - 40px)',
          height: '58px',
          mb: '12px',
        }}
      >
        <Stack direction='row' spacing={1}>
          <ClusterNode />
          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontStyle: 'normal',
                color: '#242e42',
                textShadow: '0 4px 8px rgba(36,46,66,.1)',
                fontSize: '24px',
                lineHeight: '32px',
              }}
            >
              {intl.messages['common.schemeDeploy']}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontStyle: 'normal',
                color: '#79879c',
                fontSize: '12px',
                lineHeight: 1.67,
              }}
            >
              {intl.messages['cluster.schemeDeployDescription']}
            </Typography>
          </Box>
        </Stack>
      </Box>
      <SchemeOverview
        embeddingButton={
          <OutlinedButton
            onClick={handleConfigOpen}
            sx={{
              borderRadius: '20px !important',
              width: '120px',
            }}
          >
            {intl.messages['scheme.addScheme']}
          </OutlinedButton>
        }
      />
      <Modal open={openConfig} onClose={handleConfigClose}>
        <DeployConfig 
          handleCancelClick={handleConfigClose}
          showError={showError}
          setShowError={setShowError}
        />
      </Modal>
    </Box>
  );
}

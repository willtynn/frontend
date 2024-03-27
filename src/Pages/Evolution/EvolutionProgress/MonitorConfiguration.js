/**
 * src\Pages\Evolution\EvolutionProgress\MonitorConfiguration.js
 */

import { useState, useEffect } from 'react';
import { Box, Stack, Tooltip, TextField } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { fontFamily } from '@/utils/commonUtils';
import { KubeInput, KubeAutocomplete } from '@/components/Input';
import { useIntl } from 'react-intl';
import { StyledCheckbox } from '@/components/Checkbox';
import { useSelector, useDispatch } from 'react-redux';

const regExp = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9 -]{0,251}[a-zA-Z0-9]$/);

export function MonitorConfiguration(props) {
  const { showError, setError } = props;

  const {
    dataResource,
    moniterInterval,
  } = useSelector(state => {
    return {
      dataResource: state.Evolution.dataResource,
      moniterInterval: state.Evolution.moniterInterval,
    };
  });

  const [DataSourceError, setDataSourceError] = useState(false);

  const intl = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    setError(DataSourceError);
  }, [DataSourceError])

  return (
    <Stack sx={{ p: '32px 64px', bgcolor: '#FFFFFF', height: "calc(100% - 244px)" }} direction='column' justifyContent='space-between' >
      <Stack

        direction='column'
        spacing={2}
      >
        <KubeInput
          label={intl.messages['evolution.monitorResource']}
          decription={intl.messages['evolution.monitorResourceDescription']}
          requried={true}
          id='test-plan-name-input'
          variant='outlined'
          value={dataResource}
          error={DataSourceError && showError}
          errorMessage={intl.messages['evolution.monitorResourceErrMsg']}
        />

        <KubeInput
          label={intl.messages['evolution.moniterInterval']}
          decription={intl.messages['evolution.monitorExecutiveInterval']}
          requried={false}
          id='test-plan-comment-input'
          variant='outlined'
          value={moniterInterval}
        />

      </Stack>
    </Stack>
  );
}

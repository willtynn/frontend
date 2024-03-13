import { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { useIntl } from 'react-intl';
import Editor, { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { fontFamily } from '@/utils/commonUtils';
import {
  KubeCancelButton,
  KubeConfirmButton,
} from '@/components/Button';
import { useDispatch } from 'react-redux';
import { dispatch } from 'd3';
import { deployWithJson } from '@/actions/instanceAction';
import json5 from 'json5';
import { SEVERITIES } from '../../../../components/CommonSnackbar';
import { setSnackbarMessageAndOpen } from '../../../../actions/snackbarAction';

loader.config({ monaco });

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '960px',
  boxShadow: 24,
  height: 'calc(100% - 120px)',
  fontFamily: fontFamily,
};

export default function DeployConfig(props) {
  const { handleCancelClick } = props;

  const intl = useIntl();
  const dispatch = useDispatch();

  const [jsonConfig, setJsonConfig] = useState()

  function handleEditorChange(value, event) {
    setJsonConfig(value);
  }

  const checkJsonConfig = (config) => {
    try {
      const data = json5.parse(config);
      return data;
    } catch (error) {
      return null;
    }
  }

  const handleConfirmClick = () => {
    const data = checkJsonConfig(jsonConfig);
    if (data === null) {
      dispatch(
        setSnackbarMessageAndOpen(
          'instance.jsonConfigError',
          {},
          SEVERITIES.error
        )
      );
    } else {
      dispatch(deployWithJson(data));
      handleCancelClick();
    }
    
  }

  return (
    <Box sx={style}>
      <KubeDeploymentCard
        title={intl.messages["instance.jsonConfig"]}
        handleClose={handleCancelClick}
      >
        <Box>
          <Editor
            height='300px'
            defaultLanguage='json'
            defaultValue=''
            onChange={handleEditorChange}
          />
        </Box>
        {/* 按钮组 */}
        <Stack
          sx={{
            mt: '80px',
            position: 'absolute',
            bottom: '12px',
            width: 'calc(100% - 64px)',
            bgcolor: '#f9fbfd',
          }}
          direction='row'
          spacing={3}
          justifyContent='flex-end'
          alignItems='flex-end'
        >
          <KubeCancelButton
            sx={{ height: '32px', p: '5px 23px' }}
            onClick={handleCancelClick}
          >
            {intl.messages['common.cancel']}
          </KubeCancelButton>
          

            <KubeConfirmButton
              sx={{ height: '32px', p: '5px 23px' }}
              onClick={handleConfirmClick}
            >
              {intl.messages['common.create']}
            </KubeConfirmButton>
        </Stack>
      </KubeDeploymentCard>
    </Box>
  );
}

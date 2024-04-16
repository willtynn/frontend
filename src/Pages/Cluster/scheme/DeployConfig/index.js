import { useState, useEffect } from 'react';
import { Box, Stack, TextField } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { useIntl } from 'react-intl';
import Editor, { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { fontFamily } from '@/utils/commonUtils';
import { KubeCancelButton, KubeConfirmButton } from '@/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { schemeDeploy } from '@/actions/schemeAction';
import json5 from 'json5';
import { SEVERITIES } from '@/components/CommonSnackbar';
import { setSnackbarMessageAndOpen } from '@/actions/snackbarAction';
import { getNamaspaces } from '@/actions/instanceAction';
import { KubeInput, KubeAutocomplete } from '@/components/Input';

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

const defaultValue =
  "[\n\
  {\n\
    serviceId: '1',\n\
    serviceName: 'alexnet',\n\
    namespace: 'wangteng',\n\
    imageUrl: '192.168.1.104:5000/wangteng/alexnet-all:v1.0',\n\
    replicas: 1,\n\
    ports: [\n\
      {\n\
        name: 'tcp-5000',\n\
        protocol: 'TCP',\n\
        containerPort: 5000,\n\
      },\n\
    ],\n\
    resources: {\n\
      requests: {\n\
        cpu: '1',\n\
        memory: '100Mi',\n\
      },\n\
      limits: {\n\
        cpu: '1',\n\
        memory: '100Mi',\n\
      },\n\
    },\n\
  }\n\
]";

const regExp = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9 -]{0,251}[a-zA-Z0-9]$/);

export default function DeployConfig(props) {
  const { handleCancelClick, showError, setShowError } = props;

  const { namespaces } = useSelector(state => {
    return {
      namespaces: state.Instance.namespaces,
    };
  });
  const intl = useIntl();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [namespace, setNamespace] = useState('');
  const [jsonConfig, setJsonConfig] = useState(defaultValue);
  const [nameError, setNameError] = useState(true);
  const [nameErrorType, setNameErrorType] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('current_cluster')) {
      dispatch(getNamaspaces(localStorage.getItem('current_cluster')));
    }
  }, []);

  function handleEditorChange(value, event) {
    setJsonConfig(value);
  }

  const checkJsonConfig = config => {
    try {
      const data = json5.parse(config);
      return data;
    } catch (error) {
      return null;
    }
  };

  const handleConfirmClick = () => {
    setShowError(true);
    if (nameError || namespace === '') {
      return;
    }
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
      // dispatch(schemeDeploy(name, namespace, data));
      handleCancelClick();
    }
  };

  const handleNameChange = e => {
    if (e.target.value === '') {
      setNameError(true);
      setNameErrorType(0);
    } else if (!regExp.test(e.target.value)) {
      setNameError(true);
      setNameErrorType(1);
    } else {
      setNameError(false);
    }
    setName(e.target.value);
  };

  return (
    <Box sx={style}>
      <KubeDeploymentCard
        title={intl.messages['instance.jsonConfig']}
        handleClose={handleCancelClick}
      >
        <Stack
          direction='column'
          spacing={3}
          sx={{
            p: '12px 0px 0px 0px',
          }}
        >
          <Stack
            direction='column'
            spacing={2}
            sx={{
              p: '0px 18px',
            }}
          >
            <KubeInput
              label={intl.messages['common.name']}
              decription={intl.messages['stressTesting.planNameDescription']}
              requried={true}
              id='scheme-name-input'
              variant='outlined'
              value={name}
              onChange={handleNameChange}
              error={nameError && showError}
              errorMessage={
                nameErrorType == 0
                  ? intl.messages['stressTesting.nameEmptyErrorMsg']
                  : intl.messages['common.nameFormatError']
              }
            />

            <Stack>
              <KubeAutocomplete
                height='32px'
                padding='6px 5px 5px 12px'
                value={namespace}
                onChange={(event, newValue) => {
                  setNamespace(newValue);
                }}
                id='plan_namespace_autocomplete'
                noOptionsText={
                  intl.messages['stressTesting.noOptionalNamespace']
                }
                options={namespaces}
                sx={{
                  width: '100%',
                  color: '#36435c',
                  fontFamily: fontFamily,
                  fontSize: '12px',
                  fontWeight: 600,
                  fontStyle: 'normal',
                  fontStretch: 'normal',
                  lineHeight: 1.67,
                  letterSpacing: 'normal',
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    error={namespace === '' && showError}
                    sx={{
                      '& .Mui-error .MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #CA2621 !important',
                        '&:focus': {
                          boxShadow: 'none !important',
                        },
                      },
                    }}
                    placeholder={intl.messages['common.namespace']}
                  />
                )}
              />
              {namespace === '' && showError ? (
                <Box
                  sx={{
                    fontSize: '12px',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontStretch: 'normal',
                    lineHeight: 1.67,
                    letterSpacing: 'normal',
                    color: '#CA2621',
                  }}
                >
                  {intl.messages['common.namespaceEmptyError']}
                </Box>
              ) : (
                <Box
                  sx={{
                    height: '20px',
                  }}
                ></Box>
              )}
            </Stack>
          </Stack>

          <Editor
            height='300px'
            defaultLanguage='json'
            defaultValue={defaultValue}
            onChange={handleEditorChange}
          />
        </Stack>
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

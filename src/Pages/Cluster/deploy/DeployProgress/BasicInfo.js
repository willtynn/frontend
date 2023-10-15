import { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { fontFamily } from '../../../../utils/commonUtils';
import { KubeInput } from '../../../../components/Input';
import { useIntl } from 'react-intl';

export default function BasicInfo(props) {
  const {
    serviceId,
    setServiceId,
    serviceName,
    setServiceName,
    namespace,
    setNamespace,
    showError,
    setBasicInfoError
  } = props;
  const regExp = new RegExp(/^[a-z0-9](?:[a-z0-9-]{0,251}[a-z0-9])?$/);
  const intl = useIntl();
  const [idError, setIdError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [namespaceError, setNamespaceError] = useState(false);
  
  useEffect(() => {
    if(serviceId === "") {
      setIdError(true);
    } else {
      setIdError(false);
    }

    if(serviceName === "") {
      setNameError(true);
      setNameErrorType(0);
    } else if(!regExp.test(serviceName)) {
      setNameError(true);
      setNameErrorType(1);
    } else {
      setNameError(false);
    }

    if(namespace === "") {
      setNamespaceError(true);
    } else {
      setNamespaceError(false);
    }
  }, []);

  /**
   * 0: Empty Error
   * 1: Pattern Error
   */
  const [nameErrorType, setNameErrorType] = useState(0)

  useEffect(() => {
    setBasicInfoError(idError || nameError || namespaceError)
  }, [idError, nameError, namespaceError]);

  const handleServiceIdChange = (e) => {
    if(e.target.value === "") {
      setIdError(true);
    } else {
      setIdError(false);
    }
    setServiceId(e.target.value);
  }

  const handleServiceNameChange = (e) => {
    
    if(e.target.value === "") {
      setNameError(true);
      setNameErrorType(0);
    } else if(!regExp.test(e.target.value)) {
      setNameError(true);
      setNameErrorType(1);
    } else {
      setNameError(false);
    }
    setServiceName(e.target.value);
  }

  const handleNamespaceChange = (e) => {
    if(e.target.value === "") {
      setNamespaceError(true);
    } else {
      setNamespaceError(false);
    }
    setNamespace(e.target.value);
  }

  const deployValues = [
    <KubeInput
      label='服务ID'
      decription={intl.messages['instance.serverIdDescription']}
      requried={true}
      id='deploy-service-id'
      variant='outlined'
      value={serviceId}
      onChange={handleServiceIdChange}
      error={idError && showError}
      errorMessage={intl.messages["instance.serviceIdEmptyError"]}
    />,
    <KubeInput
      label='名称'
      decription={intl.messages['instance.nameDescription']}
      requried={true}
      id='deploy-service-name'
      variant='outlined'
      value={serviceName}
      onChange={handleServiceNameChange}
      error={nameError && showError}
      errorMessage={nameErrorType === 0 ? intl.messages['instance.nameEmptyErrorMsg'] : intl.messages['instance.namePatternErrorMsg']}
    />,
    <KubeInput
      label='命名空间'
      decription={intl.messages['instance.namespaceDescription']}
      requried={true}
      id='deploy-service-namespace'
      variant='outlined'
      value={namespace}
      onChange={handleNamespaceChange}
      error={namespaceError && showError}
      errorMessage={intl.messages['instance.namespaceEmptyErrorMsg']}
    />,
  ];

  return (
    <Stack direction='row' spacing={3}>
      <Stack sx={{ width: '100%' }} spacing={3}>
        {deployValues.map((value, index) => {
          return (
            <Box
              sx={{
                width: '100%',
                fontFamily: fontFamily,
                fontStyle: 'normal',
                fontWeight: 400,
                color: '#262E35',
                flex: 'none',
                alignSelf: 'stretch',
                flexGrow: 0,
              }}
              key={index}
            >
              {value}
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
}

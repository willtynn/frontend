import { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { fontFamily } from '../../../../utils/commonUtils';
import { KubeInput } from '../../../../components/Input';
import { useIntl } from 'react-intl';

export default function BasicInfo() {

  const intl = useIntl();
  const deployValues = [
    <KubeInput
      label='服务ID'
      decription={intl.messages['instance.serverIdDescription']}
      requried={true}
      id='deploy-service-id'
      variant='outlined'
    />,
    <KubeInput
      label='名称'
      decription={intl.messages['instance.nameDescription']}
      requried={true}
      id='deploy-service-name'
      variant='outlined'
    />,
    <KubeInput
      label='命名空间'
      decription={intl.messages['instance.namespaceDescription']}
      requried={true}
      id='deploy-service-namespace'
      variant='outlined'
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

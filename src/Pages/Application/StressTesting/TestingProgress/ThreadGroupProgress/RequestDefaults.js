import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { KubeInput, StyledTextFiled } from '@/components/Input';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { StyledRadioGroup } from '../../../../../components/Radio';
import { StyledCheckbox } from '../../../../../components/Checkbox';
import {
  UPDATE_WEB_SERVER_PROTOCOL,
  UPDATE_WEB_SERVER_NAME_OR_IP,
  UPDATE_WEB_SERVER_PORT,
  UPDATE_HTTP_REQUEST_PATH,
  UPDATE_HTTP_REQUEST_CONTENT_ENCODING,
  UPDATE_REQUEST_PARAMETERS,
  UPDATE_REQUEST_BODY_DATA,
} from '../../../../../actions/applicationAction';
import { KubeSubCard } from '../../../../../components/InfoCard';

export function RequestDefaults(props) {
  const { showError } = props;

  const [isSettingParameters, setIsSettingParameters] = useState(true);

  const intl = useIntl();
  const dispatch = useDispatch();

  const {
    webServerProtocol,
    webServerNameOrIP,
    webServerPort,
    httpRequestPath,
    httpRequestContentEncoding,
    requestParameters,
    requestBodyData,
  } = useSelector(state => {
    return {
      webServerProtocol: state.Application.webServerProtocol,
      webServerNameOrIP: state.Application.webServerNameOrIP,
      webServerPort: state.Application.webServerPort,
      httpRequestPath: state.Application.httpRequestPath,
      httpRequestContentEncoding: state.Application.httpRequestContentEncoding,
      requestParameters: state.Application.requestParameters,
      requestBodyData: state.Application.requestBodyData,
    };
  });

  const handleWebServerProtocolChange = e => {
    dispatch({ type: UPDATE_WEB_SERVER_PROTOCOL, data: e.target.value });
  };

  const handlehandleWebServerNameOrIPChange = e => {
    dispatch({ type: UPDATE_WEB_SERVER_NAME_OR_IP, data: e.target.value });
  };

  const handlehandleWebServerPortChange = e => {
    dispatch({ type: UPDATE_WEB_SERVER_PORT, data: e.target.value });
  };

  const handleHttpRequestPathChange = e => {
    dispatch({ type: UPDATE_HTTP_REQUEST_PATH, data: e.target.value });
  };

  const handleHttpRequestContentEncodingChange = e => {
    dispatch({
      type: UPDATE_HTTP_REQUEST_CONTENT_ENCODING,
      data: e.target.value,
    });
  };

  return (
    <Box sx={{ p: '12px' }}>
      <Stack direction='column' spacing={1.5}>
        <KubeSubCard
          title='Web服务器'
          description={intl.messages['stressTesting.webServerDescription']}
        >
          <Stack direction='row' spacing={1}>
            <Box sx={{ width: '30%' }}>
              <KubeInput
                label='协议'
                requried={false}
                id='thread-group-web-server-protocol-input'
                variant='outlined'
                value={webServerProtocol}
                onChange={handleWebServerProtocolChange}
                // error={groupNameError && showError}
                // errorMessage={intl.messages['stressTesting.nameEmptyErrorMsg']}
              />
            </Box>
            <Box sx={{ width: '50%' }}>
              <KubeInput
                label='服务器名称或IP'
                requried={false}
                id='thread-group-web-server-name-input'
                variant='outlined'
                value={webServerNameOrIP}
                onChange={handlehandleWebServerNameOrIPChange}
                // error={groupNameError && showError}
                // errorMessage={intl.messages['stressTesting.nameEmptyErrorMsg']}
              />
            </Box>
            <Box sx={{ width: '20%' }}>
              <KubeInput
                label='端口号'
                requried={false}
                id='thread-group-web-server-port-input'
                variant='outlined'
                value={webServerPort}
                onChange={handlehandleWebServerPortChange}
                // error={groupNameError && showError}
                // errorMessage={intl.messages['stressTesting.nameEmptyErrorMsg']}
              />
            </Box>
          </Stack>
        </KubeSubCard>

        <KubeSubCard
          title='HTTP请求'
          description={intl.messages['stressTesting.httpRequestDescription']}
        >
          <Stack direction='row' spacing={1}>
            <Box sx={{ width: '75%' }}>
              <KubeInput
                label='路径'
                requried={false}
                id='thread-group-http-request-path-input'
                variant='outlined'
                value={httpRequestPath}
                onChange={handleHttpRequestPathChange}
                // error={groupNameError && showError}
                // errorMessage={intl.messages['stressTesting.nameEmptyErrorMsg']}
              />
            </Box>
            <Box sx={{ width: '25%' }}>
              <KubeInput
                label='内容编码'
                requried={false}
                id='thread-group-http-request-content-encoding-input'
                variant='outlined'
                value={httpRequestContentEncoding}
                onChange={handleHttpRequestContentEncodingChange}
                // error={groupNameError && showError}
                // errorMessage={intl.messages['stressTesting.nameEmptyErrorMsg']}
              />
            </Box>
          </Stack>
        </KubeSubCard>

        <Box
          sx={{
            padding: '6px 16px',
          }}
        >
          <StyledRadioGroup
            data={[
              [true, '参数'],
              [false, '消息体数据'],
            ]}
            value={isSettingParameters}
            setValue={flag => setIsSettingParameters(flag === "true")}
          />
        </Box>

        {isSettingParameters === true ? (
          <KubeSubCard title='参数'></KubeSubCard>
        ) : (
          <KubeSubCard title='消息体数据'></KubeSubCard>
        )}
      </Stack>
    </Box>
  );
}

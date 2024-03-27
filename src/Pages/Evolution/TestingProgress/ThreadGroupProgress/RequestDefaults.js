/**
 * src\Pages\Application\StressTesting\TestingProgress\ThreadGroupProgress\RequestDefaults.js
 */
import { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  MenuItem,
} from '@mui/material';
import { KubeInput, EditableTextField, KubeSelect } from '@/components/Input';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { StyledRadioGroup } from '../../../../../components/Radio';
import { KubeCheckbox } from '../../../../../components/Checkbox';
import {
  UPDATE_WEB_SERVER_PROTOCOL,
  UPDATE_WEB_SERVER_NAME_OR_IP,
  UPDATE_WEB_SERVER_PORT,
  UPDATE_HTTP_REQUEST_PATH,
  UPDATE_HTTP_REQUEST_CONTENT_ENCODING,
  UPDATE_REQUEST_PARAMETERS,
  UPDATE_REQUEST_BODY_DATA,
  UPDATE_HTTP_REQUEST_METHOD,
} from '../../../../../actions/applicationAction';
import { KubeSubCard } from '../../../../../components/InfoCard';
import Editor, { loader } from '@monaco-editor/react';
import {
  StyledTableHead,
  StyledTableContainer,
  StyledTableBodyCell,
  StyledTableBox,
} from '../../../../../components/DisplayTable';
import { fontFamily } from '../../../../../utils/commonUtils';
import {
  KubeConfirmButton,
  KubeCancelButton,
} from '../../../../../components/Button';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

loader.config({ monaco });

function createRow(
  id,
  label,
  isOrder = true,
  minWidth = '110px',
  maxWidth = '220px',
  show = true,
  align,
  colSpan = 1,
  rowSpan = 1
) {
  return {
    id,
    label,
    isOrder,
    minWidth,
    maxWidth,
    show,
    align,
    colSpan,
    rowSpan,
  };
}

export function RequestDefaults(props) {
  const { showError } = props;

  const [isSettingParameters, setIsSettingParameters] = useState(true);
  const [parameterDeletedRows, setParameterDeletedRows] = useState([]);
  const [allCheck, setAllCheck] = useState(false);

  const intl = useIntl();
  const dispatch = useDispatch();

  const {
    webServerProtocol,
    webServerNameOrIP,
    webServerPort,
    httpRequestMethod,
    httpRequestPath,
    httpRequestContentEncoding,
    requestParameters,
    requestBodyData,
  } = useSelector(state => {
    return {
      webServerProtocol: state.Application.webServerProtocol,
      webServerNameOrIP: state.Application.webServerNameOrIP,
      webServerPort: state.Application.webServerPort,
      httpRequestMethod: state.Application.httpRequestMethod,
      httpRequestPath: state.Application.httpRequestPath,
      httpRequestContentEncoding: state.Application.httpRequestContentEncoding,
      requestParameters: state.Application.requestParameters,
      requestBodyData: state.Application.requestBodyData,
    };
  });

  const methodList = [
    'GET',
    'POST',
    'HEAD',
    'PUT',
    'OPTIONS',
    'TRACE',
    'DELETE',
    'PATCH',
    'PROPFIND',
    'PROPPATCH',
    'MKCOL',
    'COPY',
    'MOVE',
    'LOCK',
    'UNLOCK',
    'REPORT',
    'MKCALENDAR',
    'SEARCH',
  ];

  useEffect(() => {
    setAllCheck(
      parameterDeletedRows.every((value, index) => {
        return value === true;
      })
    );
  }, [parameterDeletedRows]);

  const headRow = [
    createRow('name', intl.messages['common.name'], false, '150px', '150px', true, 'center'),
    createRow('value', intl.messages['common.value'], false, '150px', '150px', true, 'center'),
    createRow('urlEncode', `${intl.messages['common.encode']}?`, false, '50px', '50px', true, 'center'),
    createRow(
      'contentType',
      intl.messages['common.contentType'],
      false,
      '120px',
      '130px',
      true,
      'center'
    ),
    createRow(
      'includeEquals',
      `${intl.messages['common.includeEquals']}?`,
      false,
      '70px',
      '70px',
      true,
      'center'
    ),
  ];

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

  function handleEditorChange(value, event) {
    dispatch({ type: UPDATE_REQUEST_BODY_DATA, data: value });
  }

  const handleParameterAdd = () => {
    dispatch({
      type: UPDATE_REQUEST_PARAMETERS,
      data: [
        ...requestParameters,
        {
          name: '',
          value: '',
          urlEncode: false,
          contentType: 'text/plain',
          includeEquals: true,
        },
      ],
    });
    setParameterDeletedRows(prevRows => [...prevRows, false]);
  };

  const handleTableCellChange = (index, key, value) => {
    let tmpParameters = JSON.parse(JSON.stringify(requestParameters));
    tmpParameters[index][key] = value;
    dispatch({ type: UPDATE_REQUEST_PARAMETERS, data: tmpParameters });
  };

  const handleAllCheck = checked => {
    setAllCheck(checked);
    setParameterDeletedRows(new Array(requestParameters.length).fill(checked));
  };

  const handleSingleRowCheck = (checked, index) => {
    let tmpRows = JSON.parse(JSON.stringify(parameterDeletedRows));
    tmpRows[index] = checked;
    setParameterDeletedRows(tmpRows);
  };

  const handleParameterDelete = () => {
    dispatch({
      type: UPDATE_REQUEST_PARAMETERS,
      data: requestParameters.filter((v, index) => {
        return parameterDeletedRows[index] === false;
      }),
    });
    setParameterDeletedRows(
      parameterDeletedRows.filter((value, index) => {
        return value === false;
      })
    );
  };

  const handleHttpRequestMethodChange = e => {
    dispatch({
      type: UPDATE_HTTP_REQUEST_METHOD,
      data: e.target.value,
    });
  };

  return (
    <Box sx={{ p: '12px' }}>
      <Stack direction='column' spacing={1.5}>
        <KubeSubCard
          title={intl.messages['common.webServer']}
          description={intl.messages['stressTesting.webServerDescription']}
        >
          <Stack direction='row' spacing={1}>
            <Box sx={{ width: '30%' }}>
              <KubeInput
                label={intl.messages['common.protocol']}
                requried={false}
                id='thread-group-web-server-protocol-input'
                variant='outlined'
                value={webServerProtocol}
                onChange={handleWebServerProtocolChange}
              />
            </Box>
            <Box sx={{ width: '50%' }}>
              <KubeInput
                label={intl.messages['stressTesting.serverNameOrIP']}
                requried={false}
                id='thread-group-web-server-name-input'
                variant='outlined'
                value={webServerNameOrIP}
                onChange={handlehandleWebServerNameOrIPChange}
              />
            </Box>
            <Box sx={{ width: '20%' }}>
              <KubeInput
                label={intl.messages['common.port']}
                requried={false}
                id='thread-group-web-server-port-input'
                variant='outlined'
                value={webServerPort}
                onChange={handlehandleWebServerPortChange}
              />
            </Box>
          </Stack>
        </KubeSubCard>

        <KubeSubCard
          title={intl.messages['common.httpRequest']}
          description={intl.messages['stressTesting.httpRequestDescription']}
        >
          <Stack direction='row' spacing={1}>
            <Stack sx={{ width: '17%' }} spacing={0.5}>
              <Typography
                sx={{
                  color: '#36435c',
                  fontSize: '12px',
                  lineHeight: 1.67,
                  fontWeight: 400,
                }}
              >
                {intl.messages['common.requestMethod']}
              </Typography>
              <KubeSelect
                sx={{
                  height: '30px',
                  fontSize: '12px',
                  lineHeight: '1.67',
                  color: '#242e42',
                  "& .MuiSelect-select.MuiSelect-outlined.MuiOutlinedInput-input": {
                    height: '31.25px !important',
                    borderRadius: '4px !important',
                  },
                  '& .MuiSelect-select:hover': {
                    border: '1px solid #000 !important',
                  },
                }}
                MenuProps={{ className: 'PortProtocols-List' }}
                value={httpRequestMethod}
                onChange={handleHttpRequestMethodChange}
                // error={error}
              >
                {methodList.map((value, item) => {
                  return (
                    <MenuItem className='PortProtocols-Item' value={value}>
                      {value}
                    </MenuItem>
                  );
                })}
              </KubeSelect>
            </Stack>
            <Box sx={{ width: '58%' }}>
              <KubeInput
                label={intl.messages['common.path']}
                requried={false}
                id='thread-group-http-request-path-input'
                variant='outlined'
                value={httpRequestPath}
                onChange={handleHttpRequestPathChange}
              />
            </Box>
            <Box sx={{ width: '25%' }}>
              <KubeInput
                label={intl.messages['common.contentEncoding']}
                requried={false}
                id='thread-group-http-request-content-encoding-input'
                variant='outlined'
                value={httpRequestContentEncoding}
                onChange={handleHttpRequestContentEncodingChange}
              />
            </Box>
          </Stack>
        </KubeSubCard>

        <Stack
          direction='row'
          spacing={0.5}
          sx={{
            padding: '6px 16px',
          }}
        >
          <StyledRadioGroup
            data={[
              [true, intl.messages['common.parameters']],
              [false, intl.messages['common.requestBodyData']],
            ]}
            value={isSettingParameters}
            setValue={flag => setIsSettingParameters(flag === 'true')}
          />
          <Typography
            sx={{
              fontWeight: 400,
              color: '#79879c',
              fontSize: '12px',
              lineHeight: 1.67,
            }}
          >
            {` (${intl.messages['common.choose1from2']})`}
          </Typography>
        </Stack>

        {isSettingParameters === true ? (
          <KubeSubCard title={intl.messages['common.parameters']}>
            <Stack
              sx={{ minHeight: '300px' }}
              direction='column'
              justifyContent='space-between'
            >
              <StyledTableContainer sx={{ bgcolor: '#FFF', mt: '12px' }}>
                <Table
                  stickyHeader
                  size='small'
                  sx={{
                    tableLayout: 'auto',
                  }}
                >
                  <StyledTableHead
                    headRow={headRow}
                    selectAll={true}
                    checkAll={allCheck}
                    setCheckAll={handleAllCheck}
                  />
                  <TableBody>
                    {requestParameters &&
                    requestParameters.length &&
                    requestParameters.length > 0 ? (
                      requestParameters.map((row, index) => {
                        return (
                          <TableRow
                            key={row.id + '' + index}
                            aria-checked={false}
                            sx={{
                              '&:last-child td, &:last-child th': {
                                border: 0,
                              },
                              fontWeight: 600,
                              maxWidth: '110px',
                              position: 'sticky',
                              left: 0,
                              zIndex: 6,
                            }}
                          >
                            <StyledTableBodyCell align={'center'}>
                              <KubeCheckbox
                                size='small'
                                disableRipple
                                checked={parameterDeletedRows[index]}
                                onChange={e =>
                                  handleSingleRowCheck(e.target.checked, index)
                                }
                              />
                            </StyledTableBodyCell>
                            <StyledTableBodyCell align={'center'}>
                              <EditableTextField
                                sx={{
                                  height: '32px',
                                  '& input': {
                                    textAlign: 'center',
                                  },
                                }}
                                onChange={e =>
                                  handleTableCellChange(
                                    index,
                                    'name',
                                    e.target.value
                                  )
                                }
                                value={row.name}
                              />
                            </StyledTableBodyCell>
                            <StyledTableBodyCell align={'center'}>
                              <EditableTextField
                                sx={{
                                  height: '32px',
                                  '& input': {
                                    textAlign: 'center',
                                  },
                                }}
                                onChange={e =>
                                  handleTableCellChange(
                                    index,
                                    'value',
                                    e.target.value
                                  )
                                }
                                value={row.value}
                              />
                            </StyledTableBodyCell>
                            <StyledTableBodyCell align={'center'}>
                              <KubeCheckbox
                                size='small'
                                disableRipple
                                onChange={e =>
                                  handleTableCellChange(
                                    index,
                                    'urlEncode',
                                    e.target.checked
                                  )
                                }
                                checked={row.urlEncode}
                              />
                            </StyledTableBodyCell>
                            <StyledTableBodyCell align={'center'}>
                              <EditableTextField
                                sx={{
                                  height: '32px',
                                  '& input': {
                                    textAlign: 'center',
                                  },
                                }}
                                onChange={e =>
                                  handleTableCellChange(
                                    index,
                                    'contentType',
                                    e.target.value
                                  )
                                }
                                value={row.contentType}
                              />
                            </StyledTableBodyCell>
                            <StyledTableBodyCell align={'center'}>
                              <KubeCheckbox
                                size='small'
                                disableRipple
                                checked={row.includeEquals}
                                onChange={e =>
                                  handleTableCellChange(
                                    index,
                                    'includeEquals',
                                    e.target.checked
                                  )
                                }
                              />
                            </StyledTableBodyCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow style={{ height: '200px' }}>
                        <TableCell
                          colSpan={6}
                          sx={{
                            textAlign: 'center',
                            fontSize: '14px',
                            fontFamily: fontFamily,
                            fontStyle: 'normal',
                          }}
                        >
                          {intl.messages['stressTesting.noParametersCurrently']}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </StyledTableContainer>

              <Stack
                direction='row'
                sx={{
                  width: '100%',
                }}
                spacing={2}
                justifyContent='center'
              >
                <KubeConfirmButton
                  sx={{ height: '32px', width: '84px' }}
                  onClick={handleParameterAdd}
                >
                  {intl.messages['common.add']}
                </KubeConfirmButton>
                <KubeCancelButton
                  sx={{ height: '32px', width: '84px' }}
                  onClick={handleParameterDelete}
                >
                  {intl.messages['common.delete']}
                </KubeCancelButton>
              </Stack>
            </Stack>
          </KubeSubCard>
        ) : (
          <KubeSubCard title={intl.messages['common.requestBodyData']}>
            <Box>
              <Editor
                height='300px'
                defaultLanguage='json'
                defaultValue=''
                onChange={handleEditorChange}
              />
            </Box>
          </KubeSubCard>
        )}
      </Stack>
    </Box>
  );
}

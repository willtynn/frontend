import { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { KubeInput, EditableTextField } from '@/components/Input';
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
} from '../../../../../actions/applicationAction';
import { KubeSubCard } from '../../../../../components/InfoCard';
import Editor from '@monaco-editor/react';
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

  useEffect(() => {
    setAllCheck(
      parameterDeletedRows.every((value, index) => {
        return value === true;
      })
    );
  }, [parameterDeletedRows]);

  const headRow = [
    createRow('name', '名称', false, '150px', '150px', true, 'center'),
    createRow('value', '值', false, '150px', '150px', true, 'center'),
    createRow('urlEncode', '编码?', false, '50px', '50px', true, 'center'),
    createRow(
      'contentType',
      '内容类型',
      false,
      '120px',
      '130px',
      true,
      'center'
    ),
    createRow(
      'includeEquals',
      '包含等于?',
      false,
      '50px',
      '50px',
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

        <Stack
          direction='row'
          spacing={0.5}
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
            （2选1）
          </Typography>
        </Stack>

        {isSettingParameters === true ? (
          <KubeSubCard title='参数'>
            <Stack
              sx={{ minHeight: '300px' }}
              direction='column'
              justifyContent='space-between'
            >
              <StyledTableContainer sx={{ bgcolor: '#FFF' }}>
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
                          暂无参数
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
                  添加
                </KubeConfirmButton>
                <KubeCancelButton
                  sx={{ height: '32px', width: '84px' }}
                  onClick={handleParameterDelete}
                >
                  删除
                </KubeCancelButton>
              </Stack>
            </Stack>
          </KubeSubCard>
        ) : (
          <KubeSubCard title='消息体数据'>
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

function EditableRow(props) {
  const {} = props;
}

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Stack,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@mui/material';
import API from '@/assets/API.svg';
import WhiteAPI from '@/assets/WhiteAPI.svg';
import { fontFamily } from '@/utils/commonUtils';
import {
  StyledTableBodyCell,
  StyledTableRowCell,
  StyledTableContainer,
} from '@/components/DisplayTable';
import Question from '@/assets/Question.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import { getBoolString } from '@/utils/commonUtils';
import { useIntl } from 'react-intl';

const labelStyle = {
  fontSize: '12px',
  fontWeight: 400,
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.67,
  letterSpacing: 'normal',
  color: '#5F708A',
  mb: '12px',
  width: '140px',
};

const valueStyle = {
  fontSize: '12px',
  fontWeight: 400,
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.67,
  letterSpacing: 'normal',
  color: '#242e42',
  mb: '12px',
  width: 'calc(100% - 184px)',
  overflowWrap: 'break-word',
  wordBreak: 'break-all',
};

function createRow(
  id,
  label,
  isOrder = true,
  minWidth = '110px',
  maxWidth = '220px',
  show = true,
  align = 'center',
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

export function TriggerConfidtion() {
  const [currentThreadGroup, setCurrentThreadGroup] = useState(null);
  const intl = useIntl();
  const { currentPlan } = useSelector(state => {
    return {
      currentPlan: state.Application.currentPlan,
    };
  });

  const parameterHeadRow = [
    createRow('key', intl.messages['common.key'], false, '70px', '70px', true, 'center'),
    createRow('value', intl.messages['common.value'], false, '70px', '70px', true, 'center'),
  ];

  const requestHeadHeadRow = [
    createRow('key', intl.messages['common.key'], false, '70px', '70px', true, 'center'),
    createRow('value', intl.messages['common.value'], false, '70px', '70px', true, 'center'),
  ];

  const timerHeadRow = [
    createRow('name', intl.messages['common.name'], false, '70px', '70px', true, 'center'),
    createRow('threadDelay', intl.messages['stressTesting.threadDelay'], false, '70px', '70px', true, 'center'),
    createRow(
      'constantDelayOffset',
      intl.messages['stressTesting.constantDelayOffset'],
      false,
      '70px',
      '70px',
      true,
      'center'
    ),
    createRow(
      'randomDelayMaximum',
      intl.messages['stressTesting.randomDelayMaximum'],
      false,
      '70px',
      '70px',
      true,
      'center'
    ),
    createRow('deviation', 'deviation', false, '70px', '70px', true, 'center'),
    createRow('lambda', 'lambda', false, '70px', '70px', true, 'center'),
  ];

  useEffect(() => {
    if (
      currentPlan &&
      currentPlan.threadGroupList &&
      currentPlan.threadGroupList.length > 0
    ) {
      setCurrentThreadGroup(0);
    }
  }, [currentPlan]);

  const handleThreadGroupChange = groupIndex => {
    setCurrentThreadGroup(groupIndex);
  };

  return (
    <Stack direction='row' sx={{ pt: '20px', pb: '40px' }} spacing={2}>
      {/* 左侧线程组列表 */}
      <Box
        sx={{
          maxHeight: '660px',
          overflowY: 'auto',
        }}
      >
        <Stack direction='column' spacing={1}>
          {currentPlan &&
            currentPlan.threadGroupList &&
            currentPlan.threadGroupList.map((threadGroup, index) => {
              return (
                <Stack
                  sx={{
                    padding: '8px 20px',
                    width: '200px',
                    height: '52px',
                    borderRadius: '4px',
                    bgcolor:
                      currentThreadGroup === index ? '#55bc8a' : '#FFFFFF',
                    color: currentThreadGroup === index ? '#FFFFFF' : '#242E42',
                    '&:hover': {
                      bgcolor: '#55bc8a',
                      color: '#FFFFFF',
                    },
                    cursor: 'pointer',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={handleThreadGroupChange.bind(this, index)}
                  direction='row'
                  alignItems='center'
                  spacing={2.5}
                >
                  <Box>
                    {currentThreadGroup === index ? <WhiteAPI /> : <API />}
                  </Box>

                  <Box
                    sx={{
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: '12px',
                        fontFamily: fontFamily,
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: 1.67,
                        color: '#242e42',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {threadGroup.threadGroupName}
                    </Box>
                    <Box
                      sx={{
                        fontSize: '12px',
                        fontFamily: fontFamily,
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: 1.67,
                        color: '#79879c',
                      }}
                    >
                      Thread Group
                    </Box>
                  </Box>
                </Stack>
              );
            })}
        </Stack>
      </Box>

      {/* 右侧请求详情 */}
      <Stack
        direction='column'
        sx={{
          width: 'calc(100% - 296px)',
          borderRadius: '4px',
          bgcolor: '#FFFFFF',
          p: '20px',
          boxShadow: '0 4px 8px 0 rgba(36,46,66,.06)',
          '&:hover': {
            boxShadow: '0 6px 16px 0 rgba(33,43,54,.2)',
          },
        }}
        spacing={2}
      >
        {currentThreadGroup !== null ? (
          <>
            <Stack direction='column' spacing={1}>
              <Box
                sx={{
                  color: '242e42',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                {intl.messages['common.basicInfo']}
              </Box>
              <Stack
                sx={{
                  borderRadius: '4px',
                  bgcolor: '#F9FBFD',
                  p: '20px',
                }}
                direction='column'
                spacing={1.5}
              >
                <Stack direction='row' spacing={3}>
                  <Box sx={labelStyle}>{intl.messages['common.name']}</Box>
                  <Box sx={valueStyle}>
                    {currentPlan &&
                    currentPlan.threadGroupList[currentThreadGroup] !== null
                      ? currentPlan.threadGroupList[currentThreadGroup]
                          .threadGroupName
                      : ''}
                  </Box>
                </Stack>
                <Stack direction='row' spacing={3}>
                  <Box sx={labelStyle}>{intl.messages['common.threadNum']}</Box>
                  <Box sx={valueStyle}>
                    {currentPlan &&
                    currentPlan.threadGroupList[currentThreadGroup] !== null
                      ? currentPlan.threadGroupList[currentThreadGroup]
                          .threadNum
                      : ''}
                  </Box>
                </Stack>
                <Stack direction='row' spacing={3}>
                  <Box sx={labelStyle}>Ramp Up</Box>
                  <Box sx={valueStyle}>
                    {currentPlan &&
                    currentPlan.threadGroupList[currentThreadGroup] !== null
                      ? currentPlan.threadGroupList[currentThreadGroup].rampUp
                      : ''}
                  </Box>
                </Stack>
                <Stack direction='row' spacing={3}>
                  <Box sx={labelStyle}>{intl.messages['common.cycleIndex']}</Box>
                  <Box sx={valueStyle}>
                    {currentPlan &&
                    currentPlan.threadGroupList[currentThreadGroup] !== null
                      ? currentPlan.threadGroupList[currentThreadGroup]
                          .loopControllerVO.loopNum
                      : ''}
                  </Box>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction='column' spacing={1}>
              <Box
                sx={{
                  color: '242e42',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                {intl.messages['common.httpRequest']}
              </Box>
              <Stack
                sx={{
                  borderRadius: '4px',
                  bgcolor: '#F9FBFD',
                  p: '20px',
                }}
                direction='column'
                spacing={1.5}
              >
                <Stack direction='row' spacing={3}>
                  <Box sx={labelStyle}>{intl.messages['common.hostIP']}</Box>
                  <Box sx={valueStyle}>
                    {currentPlan &&
                    currentPlan.threadGroupList[currentThreadGroup] !== null
                      ? currentPlan.threadGroupList[currentThreadGroup]
                          .httpSamplerProxyVO.server
                      : ''}
                  </Box>
                </Stack>
                <Stack direction='row' spacing={3}>
                  <Box sx={labelStyle}>{intl.messages['common.protocol']}</Box>
                  <Box sx={valueStyle}>
                    {currentPlan &&
                    currentPlan.threadGroupList[currentThreadGroup] !== null
                      ? currentPlan.threadGroupList[currentThreadGroup]
                          .httpSamplerProxyVO.protocol
                      : ''}
                  </Box>
                </Stack>
                <Stack direction='row' spacing={3}>
                  <Box sx={labelStyle}>{intl.messages['common.path']}</Box>
                  <Box sx={valueStyle}>
                    {currentPlan &&
                    currentPlan.threadGroupList[currentThreadGroup] !== null
                      ? currentPlan.threadGroupList[currentThreadGroup]
                          .httpSamplerProxyVO.path
                      : ''}
                  </Box>
                </Stack>
                <Stack direction='row' spacing={3}>
                  <Box sx={labelStyle}>{intl.messages['common.port']}</Box>
                  <Box sx={valueStyle}>
                    {currentPlan &&
                    currentPlan.threadGroupList[currentThreadGroup] !== null
                      ? currentPlan.threadGroupList[currentThreadGroup]
                          .httpSamplerProxyVO.port
                      : ''}
                  </Box>
                </Stack>
                <Stack direction='row' spacing={3}>
                  <Box sx={labelStyle}>{intl.messages['common.requestMethod']}</Box>
                  <Box sx={valueStyle}>
                    {currentPlan &&
                    currentPlan.threadGroupList[currentThreadGroup] !== null
                      ? currentPlan.threadGroupList[currentThreadGroup]
                          .httpSamplerProxyVO.method
                      : ''}
                  </Box>
                </Stack>
                <Stack direction='row' spacing={3}>
                  <Box sx={labelStyle}>KeepAlive</Box>
                  <Box sx={valueStyle}>
                    {currentPlan &&
                    currentPlan.threadGroupList[currentThreadGroup] !== null
                      ? getBoolString(currentPlan.threadGroupList[currentThreadGroup]
                          .httpSamplerProxyVO.useKeepAlive)
                      : ''}
                  </Box>
                </Stack>
                <Stack direction='row' spacing={3}>
                  <Box sx={labelStyle}>followRedirects</Box>
                  <Box sx={valueStyle}>
                    {currentPlan &&
                    currentPlan.threadGroupList[currentThreadGroup] !== null
                      ? getBoolString(currentPlan.threadGroupList[currentThreadGroup]
                          .httpSamplerProxyVO.followRedirects)
                      : ''}
                  </Box>
                </Stack>

                {/* 请求体 */}
                {currentPlan &&
                currentPlan.threadGroupList[currentThreadGroup] &&
                currentPlan.threadGroupList[currentThreadGroup]
                  .httpSamplerProxyVO ? (
                  <Stack direction='row' spacing={3}>
                    <Box sx={labelStyle}>{intl.messages['common.requestBody']}</Box>
                    <Box sx={valueStyle}>
                      {
                        currentPlan.threadGroupList[currentThreadGroup]
                          .httpSamplerProxyVO.body
                      }
                    </Box>
                  </Stack>
                ) : (
                  <></>
                )}

                {/* 请求参数 */}
                {currentPlan &&
                currentPlan.threadGroupList[currentThreadGroup] &&
                currentPlan.threadGroupList[currentThreadGroup]
                .httpSamplerProxyVO.arguments &&
                Object.keys(
                  currentPlan.threadGroupList[currentThreadGroup]
                    .httpSamplerProxyVO.arguments
                ).length > 0 ? (
                  <Stack direction='row' spacing={3}>
                    <Box sx={labelStyle}>{intl.messages['common.requestParameters']}</Box>
                    <Box sx={valueStyle}>
                      <StyledTableContainer sx={{ maxHeight: '680px' }}>
                        <Table
                          stickyHeader
                          size='small'
                          sx={{
                            tableLayout: 'auto',
                            minWidth: '100%',
                          }}
                        >
                          <TableHead>
                            <TableRow>
                              {parameterHeadRow.map((item, index) => (
                                <StyledTableRowCell
                                  key={item.id}
                                  align={item.align}
                                  sx={{
                                    maxWidth: item.maxWidth,
                                    minWidth: item.minWidth,
                                  }}
                                >
                                  {item.label}
                                </StyledTableRowCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Object.keys(
                              currentPlan.threadGroupList[currentThreadGroup]
                                .httpSamplerProxyVO.arguments
                            ).map((key, index) => (
                              <TableRow
                                key={key + '' + index}
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
                                  backgroundColor: '#FFF !important',
                                }}
                                selected={false}
                              >
                                <StyledTableBodyCell
                                  align={parameterHeadRow[0].align}
                                  sx={{
                                    maxWidth: parameterHeadRow[0].maxWidth,
                                    minWidth: parameterHeadRow[0].minWidth,
                                  }}
                                >
                                  {key}
                                </StyledTableBodyCell>
                                <StyledTableBodyCell
                                  align={parameterHeadRow[1].align}
                                  sx={{
                                    maxWidth: parameterHeadRow[1].maxWidth,
                                    minWidth: parameterHeadRow[1].minWidth,
                                  }}
                                >
                                  {
                                    currentPlan.threadGroupList[
                                      currentThreadGroup
                                    ].httpSamplerProxyVO.arguments[key]
                                  }
                                </StyledTableBodyCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </StyledTableContainer>
                    </Box>
                  </Stack>
                ) : (
                  <></>
                )}

                {/* 请求头 */}
                {currentPlan &&
                currentPlan.threadGroupList[currentThreadGroup] &&
                currentPlan.threadGroupList[currentThreadGroup]
                    .headerManagerVO.headerList &&
                Object.keys(
                  currentPlan.threadGroupList[currentThreadGroup]
                    .headerManagerVO.headerList
                ).length > 0 ? (
                  <Stack direction='row' spacing={3}>
                    <Box sx={labelStyle}>{intl.messages['common.requestHeader']}</Box>
                    <Box sx={valueStyle}>
                      <StyledTableContainer sx={{ maxHeight: '680px' }}>
                        <Table
                          stickyHeader
                          size='small'
                          sx={{
                            tableLayout: 'auto',
                            minWidth: '100%',
                          }}
                        >
                          <TableHead>
                            <TableRow>
                              {requestHeadHeadRow.map((item, index) => (
                                <StyledTableRowCell
                                  key={item.id}
                                  align={item.align}
                                  sx={{
                                    maxWidth: item.maxWidth,
                                    minWidth: item.minWidth,
                                  }}
                                >
                                  {item.label}
                                </StyledTableRowCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Object.keys(
                              currentPlan.threadGroupList[currentThreadGroup]
                                .headerManagerVO.headerList
                            ).map((key, index) => (
                              <TableRow
                                key={key + '' + index}
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
                                  backgroundColor: '#FFF !important',
                                }}
                                selected={false}
                              >
                                <StyledTableBodyCell
                                  align={requestHeadHeadRow[0].align}
                                  sx={{
                                    maxWidth: requestHeadHeadRow[0].maxWidth,
                                    minWidth: requestHeadHeadRow[0].minWidth,
                                  }}
                                >
                                  {key}
                                </StyledTableBodyCell>
                                <StyledTableBodyCell
                                  align={requestHeadHeadRow[1].align}
                                  sx={{
                                    maxWidth: requestHeadHeadRow[1].maxWidth,
                                    minWidth: requestHeadHeadRow[1].minWidth,
                                  }}
                                >
                                  {
                                    currentPlan.threadGroupList[
                                      currentThreadGroup
                                    ].headerManagerVO.headerList[key]
                                  }
                                </StyledTableBodyCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </StyledTableContainer>
                    </Box>
                  </Stack>
                ) : (
                  <></>
                )}
              </Stack>
            </Stack>
            <Stack direction='column' spacing={1}>
              <Box
                sx={{
                  color: '242e42',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                {intl.messages['common.timer']}
              </Box>
              <Stack
                sx={{
                  borderRadius: '4px',
                  bgcolor: '#F9FBFD',
                  p: '20px',
                }}
                direction='column'
                spacing={1.5}
              >
                {currentPlan &&
                currentPlan.threadGroupList[currentThreadGroup] ? (
                  <StyledTableContainer sx={{ maxHeight: '680px' }}>
                    <Table
                      stickyHeader
                      size='small'
                      sx={{
                        tableLayout: 'auto',
                        minWidth: '100%',
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          {timerHeadRow.map((item, index) => (
                            <StyledTableRowCell
                              key={item.id}
                              align={item.align}
                              sx={{
                                maxWidth: item.maxWidth,
                                minWidth: item.minWidth,
                              }}
                            >
                              {item.label}
                            </StyledTableRowCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      {currentPlan.threadGroupList[currentThreadGroup].timers && currentPlan.threadGroupList[currentThreadGroup].timers
                        .length > 0 ? (
                        <TableBody>
                          {currentPlan.threadGroupList[currentThreadGroup].timers.map((timer, index) => (
                            <TableRow
                              key={timer.type + '' + index}
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
                                backgroundColor: '#FFF !important',
                              }}
                              selected={false}
                            >
                              <StyledTableBodyCell
                                align={timerHeadRow[0].align}
                                sx={{
                                  maxWidth: timerHeadRow[0].maxWidth,
                                  minWidth: timerHeadRow[0].minWidth,
                                }}
                              >
                                {timer.type}
                              </StyledTableBodyCell>
                              <StyledTableBodyCell
                                align={timerHeadRow[1].align}
                                sx={{
                                  maxWidth: timerHeadRow[1].maxWidth,
                                  minWidth: timerHeadRow[1].minWidth,
                                }}
                              >
                                {
                                  timer.threadDelay ?? "/"
                                }
                              </StyledTableBodyCell>
                              <StyledTableBodyCell
                                align={timerHeadRow[2].align}
                                sx={{
                                  maxWidth: timerHeadRow[2].maxWidth,
                                  minWidth: timerHeadRow[2].minWidth,
                                }}
                              >
                                {
                                  timer.constantDelayOffset ?? "/"
                                }
                              </StyledTableBodyCell>
                              <StyledTableBodyCell
                                align={timerHeadRow[3].align}
                                sx={{
                                  maxWidth: timerHeadRow[3].maxWidth,
                                  minWidth: timerHeadRow[3].minWidth,
                                }}
                              >
                                {
                                  timer.randomDelayMaximum ?? "/"
                                }
                              </StyledTableBodyCell>
                              <StyledTableBodyCell
                                align={timerHeadRow[4].align}
                                sx={{
                                  maxWidth: timerHeadRow[4].maxWidth,
                                  minWidth: timerHeadRow[4].minWidth,
                                }}
                              >
                                {
                                  timer.deviation ?? "/"
                                }
                              </StyledTableBodyCell>
                              <StyledTableBodyCell
                                align={timerHeadRow[5].align}
                                sx={{
                                  maxWidth: timerHeadRow[5].maxWidth,
                                  minWidth: timerHeadRow[5].minWidth,
                                }}
                              >
                                {
                                  timer.lambda ?? "/"
                                }
                              </StyledTableBodyCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      ) : (
                        <TableBody>
                          <TableRow style={{ height: '220px' }}>
                            <TableCell
                              colSpan={6}
                              sx={{
                                textAlign: 'center',
                                fontSize: '20px',
                                fontFamily: fontFamily,
                                fontStyle: 'normal',
                              }}
                            >
                              <Question />
                              <NormalBoldFont>{intl.messages['common.serviceTableContentNoData']}</NormalBoldFont>

                              <SmallLightFont>
                                {intl.messages['common.serviceTableContentNoDataHint']}
                              </SmallLightFont>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )}
                    </Table>
                  </StyledTableContainer>
                ) : (
                  <></>
                )}
              </Stack>
            </Stack>
          </>
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
}

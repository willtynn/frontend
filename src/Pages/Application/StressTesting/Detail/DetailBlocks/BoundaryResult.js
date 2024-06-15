import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Stack,
  Box,
  Table,
  TableBody,
  TableRow,
  TableHead,
} from '@mui/material';
import {
  StyledTableBodyCell,
  StyledTableRowCell,
  StyledTableContainer,
} from '@/components/DisplayTable';
import { getBoundaryTestResult, getBoundartExcel } from '@/actions/applicationAction';
import { useParams } from 'react-router';
import Question from '@/assets/Question.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import { KubeConfirmButton } from '@/components/Button';
import { getResourceHistory } from '@/actions/instanceAction';
import { TimeAdaptiveAreaChart } from '@/components/Charts/AreaChart';
import { useIntl } from 'react-intl';
import { KubeLineChart } from '@/components/Charts/LineChart';

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

export function BoundaryResult() {
  const { testPlanId } = useParams();
  const intl = useIntl();
  const { boundaryResult, bound } = useSelector(state => {
    return {
      boundaryResult: state.Application.boundaryResult,
      bound: state.Application.bound,
    };
  });

  const [namespace, setNamespace] = useState('');
  const [podName, setPodName] = useState('');
  const [data, setData] = useState(null);
  const [cpuUsage, setCpuUsage] = useState([]);
  const [memoryUsage, setMemoryUsage] = useState([]);
  const [byteTransmitted, setByteTransmitted] = useState([]);
  const [byteReceived, setByteReceived] = useState([]);

  const dispatch = useDispatch();

  const headRow = [
    createRow(
      'concurrency',
      'Concurrency',
      false,
      '70px',
      '70px',
      true,
      'center'
    ),
    createRow('samples', '# Samples', false, '70px', '70px', true, 'center'),
    createRow('average', 'Average', false, '70px', '70px', true, 'center'),
    createRow('median', 'Median', false, '70px', '70px', true, 'center'),
    createRow('min', 'Min', false, '70px', '70px', true, 'center'),
    createRow('max', 'Max', false, '70px', '70px', true, 'center'),
    createRow('p90', 'p90', false, '70px', '70px', true, 'center'),
    createRow('p95', 'p95', false, '70px', '70px', true, 'center'),
    createRow('p99', 'p99', false, '70px', '70px', true, 'center'),
    createRow('tps', 'TPS', false, '70px', '70px', true, 'center'),
    createRow('error_rate', 'Error %', false, '70px', '70px', true, 'center'),
  ];

  useEffect(() => {
    dispatch(getBoundaryTestResult(testPlanId));
  }, [testPlanId]);

  return (
    <Stack direction='column' sx={{ pb: '40px' }} spacing={2}>
      <Stack direction='row' justifyContent='space-between' spacing={2}>
        {boundaryResult && boundaryResult.length > 0 ? (
          <KubeConfirmButton
            sx={{
              width: '40%',
            }}
            onClick={() => {dispatch(getBoundartExcel(testPlanId))}}
          >
            {intl.messages['stressTesting.exportXlsReport']}
          </KubeConfirmButton>
        ) : (
          <></>
        )}
      </Stack>
      <Stack direction='column' spacing={4}>
        {/* Step Report */}
        <Stack
          direction='column'
          sx={{
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
          {boundaryResult && boundaryResult.length > 0 ? (
            <Stack direction='column' spacing={2}>
              <Box
                sx={{
                  color: '242e42',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                {intl.messages['stressTesting.stepReport']}
              </Box>
              <StyledTableContainer sx={{ maxHeight: '680px' }}>
                <Table
                  stickyHeader
                  size='small'
                  sx={{
                    tableLayout: 'auto',
                    // minWidth: '100%',
                  }}
                >
                  <TableHead>
                    <TableRow>
                      {headRow.map((item, index) => (
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
                    {boundaryResult.map((item, index) => (
                      <TableRow
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
                          align={headRow[0].align}
                          sx={{
                            maxWidth: headRow[0].maxWidth,
                            minWidth: headRow[0].minWidth,
                          }}
                        >
                          {item.id}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell
                          align={headRow[1].align}
                          sx={{
                            maxWidth: headRow[1].maxWidth,
                            minWidth: headRow[1].minWidth,
                          }}
                        >
                          {item.samplesNum}
                        </StyledTableBodyCell>

                        <StyledTableBodyCell
                          align={headRow[2].align}
                          sx={{
                            maxWidth: headRow[2].maxWidth,
                            minWidth: headRow[2].minWidth,
                          }}
                        >
                          {`${item.average.toFixed(4)} ms`}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell
                          align={headRow[3].align}
                          sx={{
                            maxWidth: headRow[3].maxWidth,
                            minWidth: headRow[3].minWidth,
                          }}
                        >
                          {`${item.median} ms`}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell
                          align={headRow[4].align}
                          sx={{
                            maxWidth: headRow[4].maxWidth,
                            minWidth: headRow[4].minWidth,
                          }}
                        >
                          {`${item.min} ms`}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell
                          align={headRow[5].align}
                          sx={{
                            maxWidth: headRow[5].maxWidth,
                            minWidth: headRow[5].minWidth,
                          }}
                        >
                          {`${item.max} ms`}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell
                          align={headRow[6].align}
                          sx={{
                            maxWidth: headRow[6].maxWidth,
                            minWidth: headRow[6].minWidth,
                          }}
                        >
                          {`${item.p90} ms`}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell
                          align={headRow[7].align}
                          sx={{
                            maxWidth: headRow[7].maxWidth,
                            minWidth: headRow[7].minWidth,
                          }}
                        >
                          {`${item.p95} ms`}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell
                          align={headRow[8].align}
                          sx={{
                            maxWidth: headRow[8].maxWidth,
                            minWidth: headRow[8].minWidth,
                          }}
                        >
                          {`${item.p99} ms`}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell
                          align={headRow[9].align}
                          sx={{
                            maxWidth: headRow[9].maxWidth,
                            minWidth: headRow[9].minWidth,
                          }}
                        >
                          {`${item.tps.toFixed(2)} /s`}
                        </StyledTableBodyCell>
                        <StyledTableBodyCell
                          align={headRow[10].align}
                          sx={{
                            maxWidth: headRow[10].maxWidth,
                            minWidth: headRow[10].minWidth,
                          }}
                        >
                          {item.errorRate.toFixed(10)}
                        </StyledTableBodyCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            </Stack>
          ) : (
            <Stack
              sx={{
                height: '220px',
              }}
              justifyContent='center'
              alignItems='center'
            >
              <Question />
              <NormalBoldFont>
                {intl.messages['common.serviceTableContentNoData']}
              </NormalBoldFont>

              <SmallLightFont>
                {intl.messages['common.serviceTableContentNoDataHint']}
              </SmallLightFont>
            </Stack>
          )}
        </Stack>

        {/* 阶梯压力图 */}

        {boundaryResult && boundaryResult.length > 0 ? (
          <Stack
            direction='column'
            sx={{
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
            <Box
              sx={{
                color: '242e42',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              {intl.messages['stressTesting.stepPressureDiagram']}
            </Box>
            <Stack spacing={2} alignItems='center' justifyContent='center'>
              <KubeLineChart
                data={boundaryResult}
                keyName='id'
                valueName={[
                  'average',
                  'median',
                  'p90',
                  'p95',
                  'p99',
                  'min',
                  'max',
                ]}
                color={[
                  '#009688',
                  '#242e42',
                  '#ffb35d',
                  '#f17c3a',
                  '#fa4c29',
                  '#ffa221',
                  '#fd5c25',
                ]}
                labelX={intl.messages['common.threadNum']}
                labelY={intl.messages['common.responseTime']}
              />

              <KubeLineChart
                data={boundaryResult}
                keyName='id'
                valueName={['tps']}
                color={['#ff9896']}
                labelX={intl.messages['common.threadNum']}
                labelY={intl.messages['common.tps']}
              />

              <KubeLineChart
                data={boundaryResult}
                keyName='id'
                valueName={['errorRate']}
                color={['#8c564b']}
                labelX={intl.messages['common.threadNum']}
                labelY={intl.messages['common.errorRate']}
              />
            </Stack>
          </Stack>
        ) : (
          <></>
        )}

        {/* Bound */}
        {bound ? (
          <Stack
            direction='column'
            sx={{
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
            <Box
              sx={{
                color: '242e42',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              {intl.messages['stressTesting.communicationPressureBoundary']}
            </Box>
            <StyledTableContainer sx={{ maxHeight: '680px' }}>
              <Table
                stickyHeader
                size='small'
                sx={{
                  tableLayout: 'auto',
                  // minWidth: '100%',
                }}
              >
                <TableHead>
                  <TableRow>
                    {headRow.map((item, index) => (
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
                  <TableRow
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
                      align={headRow[0].align}
                      sx={{
                        maxWidth: headRow[0].maxWidth,
                        minWidth: headRow[0].minWidth,
                      }}
                    >
                      {bound.id}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[1].align}
                      sx={{
                        maxWidth: headRow[1].maxWidth,
                        minWidth: headRow[1].minWidth,
                      }}
                    >
                      {bound.samplesNum}
                    </StyledTableBodyCell>

                    <StyledTableBodyCell
                      align={headRow[2].align}
                      sx={{
                        maxWidth: headRow[2].maxWidth,
                        minWidth: headRow[2].minWidth,
                      }}
                    >
                      {`${bound.average.toFixed(4)} ms`}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[3].align}
                      sx={{
                        maxWidth: headRow[3].maxWidth,
                        minWidth: headRow[3].minWidth,
                      }}
                    >
                      {`${bound.median} ms`}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[4].align}
                      sx={{
                        maxWidth: headRow[4].maxWidth,
                        minWidth: headRow[4].minWidth,
                      }}
                    >
                      {`${bound.min} ms`}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[5].align}
                      sx={{
                        maxWidth: headRow[5].maxWidth,
                        minWidth: headRow[5].minWidth,
                      }}
                    >
                      {`${bound.max} ms`}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[6].align}
                      sx={{
                        maxWidth: headRow[6].maxWidth,
                        minWidth: headRow[6].minWidth,
                      }}
                    >
                      {`${bound.p90} ms`}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[7].align}
                      sx={{
                        maxWidth: headRow[7].maxWidth,
                        minWidth: headRow[7].minWidth,
                      }}
                    >
                      {`${bound.p95} ms`}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[8].align}
                      sx={{
                        maxWidth: headRow[8].maxWidth,
                        minWidth: headRow[8].minWidth,
                      }}
                    >
                      {`${bound.p99} ms`}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[9].align}
                      sx={{
                        maxWidth: headRow[9].maxWidth,
                        minWidth: headRow[9].minWidth,
                      }}
                    >
                      {`${bound.tps.toFixed(2)} /s`}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[10].align}
                      sx={{
                        maxWidth: headRow[10].maxWidth,
                        minWidth: headRow[10].minWidth,
                      }}
                    >
                      {bound.errorRate.toFixed(10)}
                    </StyledTableBodyCell>
                  </TableRow>
                </TableBody>
              </Table>
            </StyledTableContainer>
          </Stack>
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
}

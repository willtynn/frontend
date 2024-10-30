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
import {
  getJointReportByID,
  createJointReport,
  updateJointReport
} from '../../../../../actions/applicationAction';
import { useParams } from 'react-router';
import Question from '@/assets/Question.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import { KubeConfirmButton } from '../../../../../components/Button';
import { useIntl } from 'react-intl';
import React from 'react';
import LineChart from '../../Chart/LineChart';

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

export function AggregateReportEnhance() {
  const { jointTestPlanId } = useParams();
  const intl = useIntl();
  const { aggregateReportEnhance,jointChangeFlag } = useSelector(state => {
    return {
      aggregateReportEnhance: state.Application.aggregateReportEnhance,
      jointChangeFlag: state.Application.jointChangeFlag,
    };
  });

  

  const dispatch = useDispatch();

  const headRow = [
    createRow('label', 'Label', false, '70px', '70px', true, 'center'),
    createRow('samples', 'Samples', false, '70px', '70px', true, 'center'),
    createRow('average', 'Average', false, '70px', '70px', true, 'center'),
    createRow('median', 'Median', false, '70px', '70px', true, 'center'),
    createRow('min', 'Min', false, '70px', '70px', true, 'center'),
    createRow('max', 'Max', false, '70px', '70px', true, 'center'),
    createRow('p90', 'p90', false, '70px', '70px', true, 'center'),
    createRow('p95', 'p95', false, '70px', '70px', true, 'center'),
    createRow('p99', 'p99', false, '70px', '70px', true, 'center'),
    createRow('tps', 'TPS', false, '70px', '70px', true, 'center'),
    createRow('errorRate', 'Error %', false, '70px', '70px', true, 'center'),
  ];

  useEffect(() => {
    dispatch(getJointReportByID(jointTestPlanId));
  }, [jointChangeFlag]);


  const handleUpdateAggregateReport = () => {
    dispatch(updateJointReport(jointTestPlanId));
    setTimeout(() => {
      dispatch({ type: 'UPDATE_JOINT_CHANGE_FLAG', data: jointChangeFlag + 1 });
    }, 1000);
  };

  const handleCreateAggregateReport = () => {
    dispatch(createJointReport(jointTestPlanId));
    setTimeout(() => {
      dispatch({ type: 'UPDATE_JOINT_CHANGE_FLAG', data: jointChangeFlag + 1 });
    }, 1000);
  };




  return (
    <Stack direction='column' sx={{ pb: '40px' }} spacing={2}>
      <Stack direction='row' justifyContent='space-between' spacing={2}>
        {aggregateReportEnhance.length != 0 ? (
          <KubeConfirmButton
            sx={{
              width: '45%',
            }}
            onClick={handleUpdateAggregateReport}
          >
            {intl.messages['stressTesting.updateAggregateReport']}
          </KubeConfirmButton>
        ) : (
          <KubeConfirmButton
            sx={{
              width: '45%',
            }}
            onClick={handleCreateAggregateReport}
          >
            {intl.messages['stressTesting.createAggregateReport']}
          </KubeConfirmButton>
        )}
        {/* <KubeConfirmButton
          sx={{
            width: '40%',
          }}
          onClick={handleExportExcel}
        >
          {intl.messages['stressTesting.exportXlsReport']}
        </KubeConfirmButton> */}
      </Stack>


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
        {aggregateReportEnhance && aggregateReportEnhance.length > 0 ? (
          <>
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
                  {aggregateReportEnhance.map((data, index) => (
                    <TableRow key={index}>

                      <StyledTableBodyCell  
                      align={headRow[0].align}
                      sx={{
                        maxWidth: headRow[0].maxWidth,
                        minWidth: headRow[0].minWidth,
                      }}>{`${data.name}`}
                      </StyledTableBodyCell>

                      <StyledTableBodyCell  
                      align={headRow[1].align}
                      sx={{
                        maxWidth: headRow[1].maxWidth,
                        minWidth: headRow[1].minWidth,
                      }}>{`${data.samplesNum}`}
                      </StyledTableBodyCell>

                      <StyledTableBodyCell  
                      align={headRow[2].align}
                      sx={{
                        maxWidth: headRow[2].maxWidth,
                        minWidth: headRow[2].minWidth,
                      }}>{`${data.average} ms`}
                      </StyledTableBodyCell>

                      <StyledTableBodyCell  
                      align={headRow[3].align}
                      sx={{
                        maxWidth: headRow[3].maxWidth,
                        minWidth: headRow[3].minWidth,
                      }}>{`${data.median} ms`}
                      </StyledTableBodyCell>

                      <StyledTableBodyCell  
                      align={headRow[4].align}
                      sx={{
                        maxWidth: headRow[4].maxWidth,
                        minWidth: headRow[4].minWidth,
                      }}>{`${data.min} ms`}
                      </StyledTableBodyCell>

                      <StyledTableBodyCell  
                      align={headRow[5].align}
                      sx={{
                        maxWidth: headRow[5].maxWidth,
                        minWidth: headRow[5].minWidth,
                      }}>{`${data.max} ms`}
                      </StyledTableBodyCell>

                      <StyledTableBodyCell  
                      align={headRow[6].align}
                      sx={{
                        maxWidth: headRow[6].maxWidth,
                        minWidth: headRow[6].minWidth,
                      }}>{`${data.p90} ms`}
                      </StyledTableBodyCell>

                      <StyledTableBodyCell  
                      align={headRow[7].align}
                      sx={{
                        maxWidth: headRow[7].maxWidth,
                        minWidth: headRow[7].minWidth,
                      }}>{`${data.p95} ms`}
                      </StyledTableBodyCell>

                      <StyledTableBodyCell  
                      align={headRow[8].align}
                      sx={{
                        maxWidth: headRow[8].maxWidth,
                        minWidth: headRow[8].minWidth,
                      }}>{`${data.p99} ms`}
                      </StyledTableBodyCell>

                      <StyledTableBodyCell  
                      align={headRow[9].align}
                      sx={{
                        maxWidth: headRow[9].maxWidth,
                        minWidth: headRow[9].minWidth,
                      }}>{`${data.tps.toFixed(2)} /s`}
                      </StyledTableBodyCell>

                      <StyledTableBodyCell  
                      align={headRow[10].align}
                      sx={{
                        maxWidth: headRow[10].maxWidth,
                        minWidth: headRow[10].minWidth,
                      }}>{data.errorRate}</StyledTableBodyCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          </>
        ) : (
          <Stack
            sx={{
              height: '220px',
            }}
            justifyContent='center'
            alignItems='center'
          >
            <Question />
            <NormalBoldFont>{intl.messages['common.serviceTableContentNoData']}</NormalBoldFont>
            <SmallLightFont>{intl.messages['common.serviceTableContentNoDataHint']}</SmallLightFont>
          </Stack>
        )}
      </Stack>
      <Stack>
      <LineChart/>
      </Stack>
      
    </Stack>
  );
  
  
}

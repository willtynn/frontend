import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Stack,
  Box,
  InputAdornment,
  Tooltip,
  Popover,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@mui/material';
import { fontFamily } from '@/utils/commonUtils';
import {
  StyledTableBodyCell,
  StyledTableRowCell,
  StyledTableContainer,
} from '@/components/DisplayTable';
import {
  getAggregateReportByPlanId,
  createAggregateReport,
  updateAggregateReport,
} from '../../../../../actions/applicationAction';
import { useParams } from 'react-router';
import Question from '@/assets/Question.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import { KubeConfirmButton } from '../../../../../components/Button';

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

export function AggregateReport() {
  const { testPlanId } = useParams();
  const { aggregateReport, changeFlag } = useSelector(state => {
    return {
      aggregateReport: state.Application.aggregateReport,
      changeFlag: state.Application.changeFlag
    };
  });

  const dispatch = useDispatch();

  const headRow = [
    createRow('label', 'Label', false, '70px', '70px', true, 'center'),
    createRow('samples', '# Samples', false, '70px', '70px', true, 'center'),
    createRow('average', 'Average', false, '70px', '70px', true, 'center'),
    createRow('median', 'Median', false, '70px', '70px', true, 'center'),
    createRow('min', 'Min', false, '70px', '70px', true, 'center'),
    createRow('max', 'Max', false, '70px', '70px', true, 'center'),
    createRow('p50', 'p50', false, '70px', '70px', true, 'center'),
    createRow('p95', 'p95', false, '70px', '70px', true, 'center'),
    createRow('p99', 'p99', false, '70px', '70px', true, 'center'),
    createRow('tps', 'TPS', false, '70px', '70px', true, 'center'),
    createRow('error_rate', 'Error %', false, '70px', '70px', true, 'center'),
  ];

  useEffect(() => {
    dispatch(getAggregateReportByPlanId(testPlanId));
  }, [changeFlag]);

  const handleUpdateAggregateReport = () => {
    dispatch(updateAggregateReport(testPlanId));
    setTimeout(() => {
      dispatch({type: "UPDATE_CHANGE_FLAG", data: changeFlag + 1});
    }, 1000);
  };

  const handleCreateAggregateReport = () => {
    dispatch(createAggregateReport(testPlanId));
    setTimeout(() => {
      dispatch({type: "UPDATE_CHANGE_FLAG", data: changeFlag + 1});
    }, 1000);
  };

  return (
    <Stack direction='column' sx={{ pb: '40px' }} spacing={2}>
      {aggregateReport ? (
        <KubeConfirmButton onClick={handleUpdateAggregateReport}>
          更新聚合报告
        </KubeConfirmButton>
      ) : (
        <KubeConfirmButton onClick={handleCreateAggregateReport}>
          创建聚合报告
        </KubeConfirmButton>
      )}
      <Stack
        direction='column'
        sx={{
          width: '100%',
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
        {aggregateReport !== null ? (
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
                    Total
                  </StyledTableBodyCell>
                  <StyledTableBodyCell
                    align={headRow[1].align}
                    sx={{
                      maxWidth: headRow[1].maxWidth,
                      minWidth: headRow[1].minWidth,
                    }}
                  >
                    {aggregateReport.samplesNum}
                  </StyledTableBodyCell>

                  <StyledTableBodyCell
                    align={headRow[2].align}
                    sx={{
                      maxWidth: headRow[2].maxWidth,
                      minWidth: headRow[2].minWidth,
                    }}
                  >
                    {aggregateReport.average}
                  </StyledTableBodyCell>
                  <StyledTableBodyCell
                    align={headRow[3].align}
                    sx={{
                      maxWidth: headRow[3].maxWidth,
                      minWidth: headRow[3].minWidth,
                    }}
                  >
                    {aggregateReport.median}
                  </StyledTableBodyCell>
                  <StyledTableBodyCell
                    align={headRow[4].align}
                    sx={{
                      maxWidth: headRow[4].maxWidth,
                      minWidth: headRow[4].minWidth,
                    }}
                  >
                    {aggregateReport.min}
                  </StyledTableBodyCell>
                  <StyledTableBodyCell
                    align={headRow[5].align}
                    sx={{
                      maxWidth: headRow[5].maxWidth,
                      minWidth: headRow[5].minWidth,
                    }}
                  >
                    {aggregateReport.max}
                  </StyledTableBodyCell>
                  <StyledTableBodyCell
                    align={headRow[6].align}
                    sx={{
                      maxWidth: headRow[6].maxWidth,
                      minWidth: headRow[6].minWidth,
                    }}
                  >
                    {aggregateReport.p50}
                  </StyledTableBodyCell>
                  <StyledTableBodyCell
                    align={headRow[7].align}
                    sx={{
                      maxWidth: headRow[7].maxWidth,
                      minWidth: headRow[7].minWidth,
                    }}
                  >
                    {aggregateReport.p95}
                  </StyledTableBodyCell>
                  <StyledTableBodyCell
                    align={headRow[8].align}
                    sx={{
                      maxWidth: headRow[8].maxWidth,
                      minWidth: headRow[8].minWidth,
                    }}
                  >
                    {aggregateReport.p99}
                  </StyledTableBodyCell>
                  <StyledTableBodyCell
                    align={headRow[9].align}
                    sx={{
                      maxWidth: headRow[9].maxWidth,
                      minWidth: headRow[9].minWidth,
                    }}
                  >
                    {aggregateReport.tps}
                  </StyledTableBodyCell>
                  <StyledTableBodyCell
                    align={headRow[10].align}
                    sx={{
                      maxWidth: headRow[10].maxWidth,
                      minWidth: headRow[10].minWidth,
                    }}
                  >
                    {aggregateReport.errorRate}
                  </StyledTableBodyCell>
                </TableRow>
              </TableBody>
            </Table>
          </StyledTableContainer>
        ) : (
          <Stack
            sx={{
              height: '220px',
            }}
            justifyContent='center'
            alignItems='center'
          >
            <Question />
            <NormalBoldFont>无数据</NormalBoldFont>

            <SmallLightFont>您可以尝试刷新数据</SmallLightFont>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

/**
 * src\Pages\Cluster\overview\ClusterInfo.js
 */
import Check from '@mui/icons-material/Check';
import {
  Stack,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Table,
} from '@mui/material';
import { useEffect, useState } from 'react';
import InfoCard from '@/components/InfoCard';
import { useIntl } from 'react-intl';
import Question from '@/assets/Question.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import {
  StyledTableBodyCell,
  StyledTableRowCell,
  StyledTableContainer,
} from '@/components/DisplayTable';
import { fontFamily } from '../../../utils/commonUtils';

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

export default function ClusterInfo(props) {
  const { data } = props;
  const intl = useIntl();

  const headRow = [
    createRow(
      'id',
      intl.messages['cluster.nodeName'],
      false,
      '70px',
      '70px',
      true,
      'center'
    ),
    createRow(
      'ip',
      intl.messages['cluster.ipAddress'],
      false,
      '70px',
      '70px',
      true,
      'center'
    ),
    createRow(
      'configuredRes',
      intl.messages['cluster.settedResource'],
      false,
      '70px',
      '70px',
      true,
      'center'
    ),
    createRow(
      'usedRes',
      intl.messages['cluster.usedResource'],
      false,
      '70px',
      '70px',
      true,
      'center'
    ),
    createRow(
      'cpuInfo',
      intl.messages['cluster.cpuConfig'],
      false,
      '70px',
      '70px',
      true,
      'center'
    ),
    createRow(
      'description',
      intl.messages['cluster.description'],
      false,
      '70px',
      '70px',
      true,
      'center'
    ),
  ];

  useEffect(() => {
    if (!data) {
      return;
    }
  }, []);

  return (
    <InfoCard title={intl.messages['cluster.clusterInfo']}>
      <Stack
        sx={{
          minHeight: '400px',
        }}
        spacing={3}
      >
        <StyledTableContainer
          sx={{ maxHeight: '680px', overflow: 'auto', width: '100%' }}
        >
          <Table
            stickyHeader
            aria-label='simple table'
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
            {data && data.servers ? (
              <TableBody>
                {data.servers.map(row => {
                  return (
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
                      {headRow.map((item, index) => {
                        if (item.id === "configuredRes" || item.id === "usedRes") {
                          return (
                            <StyledTableBodyCell
                              align='center'
                              sx={{
                                maxWidth: item.maxWidth,
                                minWidth: item.minWidth,
                              }}
                              key={item.id}
                            >
                              {`CPU: ${row[item.id].cpu}; ${intl.messages['common.memory']}: ${row[item.id].memory} Mi`}
                            </StyledTableBodyCell>
                          );
                        }
                        return (
                          <StyledTableBodyCell
                            align='center'
                            sx={{
                              maxWidth: item.maxWidth,
                              minWidth: item.minWidth,
                            }}
                            key={item.id}
                          >
                            {row[item.id]}
                          </StyledTableBodyCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
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
                    <NormalBoldFont>
                      {intl.messages['common.serviceTableContentNoData']}
                    </NormalBoldFont>

                    <SmallLightFont>
                      {intl.messages['common.serviceTableContentNoDataHint']}
                    </SmallLightFont>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </StyledTableContainer>
      </Stack>
    </InfoCard>
  );
}

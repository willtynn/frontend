import Check from '@mui/icons-material/Check';
import {
  Stack,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Table,
  Button
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
import { fontFamily } from '@/utils/commonUtils';
import { da } from 'date-fns/locale';

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
  const {data,handleNodeClick} = props;
  const intl = useIntl();
  // const [data, setData] = useState(null);
  const headRow = [
    createRow('name', intl.messages["cluster.nodeName"], false, '70px', '70px', true, 'center'),
    createRow('ipAddress', intl.messages["cluster.ipAddress"], false, '70px', '70px', true, 'center'),
    createRow(
      'settedResource',
      intl.messages["cluster.settedResource"],
      false,
      '70px',
      '70px',
      true,
      'center'
    ),
    createRow(
      'usedResource',
      intl.messages["cluster.usedResource"],
      false,
      '70px',
      '70px',
      true,
      'center'
    ),
    createRow('cpuConfig',  intl.messages["cluster.cpuConfig"], false, '70px', '70px', true, 'center'),
    createRow('description',  intl.messages["cluster.description"], false, '70px', '70px', true, 'center'),
  ];

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
            {data !== null ? (
              <TableBody>
                {data.map(row => {
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
                      {headRow.map((item, index) => (
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
                      ))}
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
                    <NormalBoldFont>{intl.messages['common.serviceTableContentNoData']}</NormalBoldFont>

                    <SmallLightFont>{intl.messages['common.serviceTableContentNoDataHint']}</SmallLightFont>
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

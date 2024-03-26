/**
 * src\Pages\Route\trace\RouteTraceInfoPage\index.js
 */
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  StyledTableRowCell,
  StyledTableContainer,
  StyledTableFooter,
} from '@/components/DisplayTable';
import { StyledTab, StyledTabsList } from '@/components/Tab';

import {
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Box,
  Grid,
  Divider,
  Typography
} from '@mui/material';
import { Tabs } from '@mui/base/Tabs';
import { NormalFont, NormalFontBlack, NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import Question from '@/assets/Question.svg';
import { fontFamily } from '@/utils/commonUtils';

import dayjs from 'dayjs';

import { RouteTraceCanvas } from '../RouteTraceCanvas';
import { DataRow } from '../DataRow';
import GeneralInfo from './GeneralInfo';

import { getRouteService, getRouteTrace } from '@/actions/routeAction';

import { useIntl } from 'react-intl';

const spanNumPerPage = 10;

export function RouteTraceInfoPage() {
  const { start, end, traceId } = useParams();

  const dispatch = useDispatch();
  const intl = useIntl();

  const [traceRow, setTraceRow] = useState([]);
  const [tracePage, setTracePage] = useState(0);
  const [selectedTraceIndex, setSelectedTraceIndex] = useState(-1);
  const [detailSpan, setDetailSpan] = useState(null);

  const { routeService, routeTrace } = useSelector(state => {
    return {
      routeService: state.Route.routeService,
      routeTrace: state.Route.routeTrace,
    };
  });
  

  const traceTableHeaders = [
    { 
      key: 'service', 
      align: 'left', 
      text: intl.messages['routeTrace.popWindowTableTitleRequest'], 
      minWidth: 100, 
      maxWidth: 350 },
    {
      key: 'spanNum',
      align: 'center',
      text: intl.messages['routeTrace.popWindowTableTitleLinkLength'],
      minWidth: 30,
      maxWidth: 30,
    },
    {
      key: 'time',
      align: 'center',
      text: intl.messages['routeTrace.popWindowTableTitleStartTime'],
      minWidth: 150,
      maxWidth: 150,
    },
    {
      key: 'duration',
      align: 'center',
      text: intl.messages['routeTrace.popWindowTableTitleResponseTime'],
      minWidth: 60,
      maxWidth: 60,
    },
    {
      key: 'status',
      align: 'center',
      text: intl.messages['routeTrace.popWindowTableTitleStatus'],
      minWidth: 40,
      maxWidth: 40,
    },
  ];

  const detailVisibleRows = React.useMemo(() => {
    const tmp = (tracePage - 1) * spanNumPerPage;
    return routeTrace ? routeTrace.slice(tmp, tmp + spanNumPerPage) : [];
  }, [routeTrace, tracePage]);

  const handleSpanClick = index => {
    setSelectedTraceIndex(index);
    setDetailSpan(detailVisibleRows[index]);
  };

  const handleSpanChangePage = (_, newPage) => {
    if (tracePage !== newPage) {
      setTracePage(newPage);
    }
  };

  const styleGraphCard = {
    pt: '8px',
    height: '536px',
    bgcolor: 'background.paper',
    borderStyle: 'solid',
    borderRadius: '5px',
    borderColor: '#DFDEE8',
    borderWidth: '1px',
  };

  useEffect(() => {
    dispatch(getRouteService(start, end));
  }, []);

  useEffect(() => {
    if (routeService) {
      dispatch(
        getRouteTrace(
          start,
          end,
          routeService[traceId].service,
          routeService[traceId].api
        )
      );
      setTracePage(1);
    }
  }, [routeService]);

  useEffect(() => {
    if (detailVisibleRows) {
      let row = detailVisibleRows.map((item, index) => {
        return (
          <DataRow
            key={item.traceID}
            onRowClick={() => handleSpanClick(index)}
            selected={selectedTraceIndex === index}
            rowData={{
              service: item.service,
              spanNum: item.trace.spans.length,
              time: item.time,
              duration: item.trace.spans
                .map(span => span.duration)
                .reduce((a, b) => a + b, 0),
              status: 200,
            }}
          />
        );
      });
      for (let i = row.length; i < spanNumPerPage; i++) {
        row.push(<DataRow key={i} onRowClick={() => {}} rowData={null} />);
      }
      setTraceRow(row);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailVisibleRows, selectedTraceIndex]);

  return (
    <Stack
      direction='row'
      alignItems='flex-start'
      spacing={2}
      sx={{ width: '100%' }}
    >
      <GeneralInfo info={routeService ? routeService[traceId] : null} />

      <Stack sx={{ width: '100%' }}>
        <Tabs defaultValue={1}>
          <StyledTabsList>
            <StyledTab value={1}>{intl.messages['routeTrace.popWindowTableTitle']}</StyledTab>
          </StyledTabsList>
        </Tabs>
        

        <Grid container spacing={1} sx={{ width: '100%', pt: '20px' }}>

          <Grid item sm={12} md={12} lg={8}>
            <Stack>
              <StyledTableContainer sx={{ width: '100%' }}>
                <Table stickyHeader size='small' sx={{ tableLayout: 'auto' }}>
                  <TableHead>
                    <TableRow sx={{ height: '52px' }}>
                      {traceTableHeaders.map(item => {
                        return (
                          <StyledTableRowCell
                            key={item.key}
                            align={item.align}
                            sx={{ minWidth: item.minWidth, maxWidth: item.maxWidth }}
                          >
                            {item.text}
                          </StyledTableRowCell>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody
                    sx={{
                      borderBottom: 'solid 2px #B8B5B7',
                      borderTop: 'solid 2px #B8B5B7',
                    }}
                  >
                    {traceRow}
                  </TableBody>
                </Table>
              </StyledTableContainer>
              <StyledTableFooter
                pageSize={spanNumPerPage}
                pageNum={tracePage}
                count={routeTrace ? routeTrace.length : 0}
                handlePageChange={handleSpanChangePage}
                sx={{
                  pt: '10px',
                  pb: '10px',
                }}
              />
            </Stack>
          </Grid>


          <Grid item sm={12} md={12} lg={4}>
            <Stack sx={styleGraphCard}>
              <div style={{ 
                width: '100%', 
                height: '43px', 
                justifyContent: 'center', 
                alignItems: 'center',
                display: 'flex'
                }}>
                <Typography sx={{ 
                  color: '#79879c', 
                  fontWeight: '600', 
                  fontSize: '14px !important',
                  letterSpacing: '0.08em'
                  }}>
                  {intl.messages['routeTrace.modalTitle']}
                </Typography>
              </div>
              <Divider flexItem />
              {/* 依赖图 */}
              <Stack sx={{ justifyContent: 'center'}}>
                <Stack sx= {{ pt: '16px', pr: '16px', pl: '16px'}}>
                  {detailSpan ? (
                    <div style={{ justifyContent: 'center', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex'}}>
                      <Stack sx={{ width: '100%' }}>
                        <Stack spacing={1}>
                          <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
                            <NormalFont sx={{ width: '50px' }}>{intl.messages['routeTrace.modalServiceId']}</NormalFont>
                            <NormalFontBlack>{detailSpan.id}</NormalFontBlack>
                          </Stack>
                          <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
                            <NormalFont sx={{ width: '50px' }}>{intl.messages['routeTrace.modalServiceName']}</NormalFont>
                            <NormalFontBlack>{detailSpan.service}</NormalFontBlack>
                          </Stack>
                          <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
                            <NormalFont sx={{ width: '50px' }}>{intl.messages['routeTrace.modalTime']}</NormalFont>
                            <NormalFontBlack>
                              {dayjs(detailSpan.time).format(intl.messages['routeTrace.timeFormat'])}
                            </NormalFontBlack>
                          </Stack>
                        </Stack>
                        <div style={{ height: '20px' }} />
                        <RouteTraceCanvas
                          id={detailSpan.id}
                          sx={{
                            width: '100%',
                          }}
                        />
                      </Stack>
                    </div>
                  ) : (
                    <Stack sx={{ height: '100%', width: '100%', 
                      pt: '50px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex'}}>
                        <Question />
                        <NormalBoldFont>{intl.messages['routeTrace.modalEmpty']}</NormalBoldFont>
                        <SmallLightFont>{intl.messages['routeTrace.modalEmptyHint']}</SmallLightFont>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Grid>

        </Grid>
      </Stack>
    </Stack>
  );
}

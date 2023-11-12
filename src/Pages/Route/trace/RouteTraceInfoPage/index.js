/**
 * src\Pages\Route\trace\RouteTraceInfoPage\index.js
 */
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
  Modal,
  TableRow,
  Box,
  Slide,
} from '@mui/material';
import { Tabs } from '@mui/base/Tabs';
import KubeClose from '@/assets/KubeClose.svg';
import { NormalFont, NormalFontBlack } from '@/components/Fonts';

import dayjs from 'dayjs';

import { RouteTraceCanvas } from '../RouteTraceCanvas';
import { DataRow } from '../DataRow';
import GeneralInfo from './GeneralInfo';

import { getRouteService, getRouteTrace } from '@/actions/routeAction';

const spanNumPerPage = 10;

const traceTableHeaders = [
  { key: 'service', align: 'left', text: '请求', minWidth: 350, maxWidth: 350 },
  {
    key: 'spanNum',
    align: 'center',
    text: '链路长度',
    minWidth: 85,
    maxWidth: 85,
  },
  {
    key: 'time',
    align: 'center',
    text: '开始时间',
    minWidth: 150,
    maxWidth: 150,
  },
  {
    key: 'duration',
    align: 'center',
    text: '响应时间',
    minWidth: 80,
    maxWidth: 80,
  },
  {
    key: 'status',
    align: 'center',
    text: '请求状态',
    minWidth: 75,
    maxWidth: 75,
  },
];

export function RouteTraceInfoPage() {
  const { start, end, traceId } = useParams();

  const dispatch = useDispatch();

  const [traceRow, setTraceRow] = useState([]);
  const [tracePage, setTracePage] = useState(0);
  const [selectedTraceIndex, setSelectedTraceIndex] = useState(-1);
  const [detailSpan, setDetailSpan] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const { routeService, routeTrace } = useSelector(state => {
    return {
      routeService: state.Route.routeService,
      routeTrace: state.Route.routeTrace,
    };
  });

  const detailVisibleRows = React.useMemo(() => {
    const tmp = (tracePage - 1) * spanNumPerPage;
    return routeTrace ? routeTrace.slice(tmp, tmp + spanNumPerPage) : [];
  }, [routeTrace, tracePage]);

  const handleSpanClick = index => {
    setSelectedTraceIndex(index);
    setDetailSpan(detailVisibleRows[index]);
    setOpenModal(true);
  };

  const handleSpanChangePage = (_, newPage) => {
    if (tracePage !== newPage) {
      setTracePage(newPage);
      setOpenModal(false);
    }
  };
  const handleCloseModal = () => setOpenModal(false);

  const styleModalBox = {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-100%, -50%)',
    minWidth: '500px',
    maxWidth: '1150px',
    width: '50%',
    height: '100%',
    bgcolor: 'background.paper',
    boxShadow: 'inset -15px 0px  15px -15px #444444',
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
            <StyledTab value={1}>请求信息</StyledTab>
          </StyledTabsList>
        </Tabs>
        <Modal open={openModal} onClose={handleCloseModal} closeAfterTransition>
          <Slide direction='left' in={openModal} mountOnEnter unmountOnExit>
            <Box sx={styleModalBox}>
              <Box
                sx={{
                  height: '40px',
                  padding: '10px 30px 10px 30px',
                  bgcolor: '#f9fbfd',
                  border: '1px solid #EBEEF5',
                }}
              >
                <Box
                  sx={{
                    cursor: 'pointer',
                    boxShadow: '0 8px 16px 0 rgba(35,45,65,.28)',
                    '&:hover': {
                      boxShadow: 'none',
                    },
                    height: '32px',
                    width: '32px',
                    pt: '3px',
                  }}
                  onClick={handleCloseModal}
                >
                  <KubeClose />
                </Box>
              </Box>
              {/* 依赖图 */}
              <Stack sx={{ justifyContent: 'center', pl: 4, pr: 4 }}>
                <div style={{ height: '20px' }} />
                {detailSpan ? (
                  <div style={{ justifyContent: 'center' }}>
                    <Stack spacing={1}>
                      <Stack direction='row' spacing={20}>
                        <NormalFont sx={{ width: '60px' }}>服务ID</NormalFont>
                        <NormalFontBlack>{detailSpan.id}</NormalFontBlack>
                      </Stack>
                      <Stack direction='row' spacing={20}>
                        <NormalFont sx={{ width: '60px' }}>服务名</NormalFont>
                        <NormalFontBlack>{detailSpan.service}</NormalFontBlack>
                      </Stack>
                      <Stack direction='row' spacing={20}>
                        <NormalFont sx={{ width: '60px' }}>时间</NormalFont>
                        <NormalFontBlack>
                          {dayjs(detailSpan.time).format('YYYY-MM-DD HH:mm:ss')}
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
                  </div>
                ) : (
                  <></>
                )}
              </Stack>
            </Box>
          </Slide>
        </Modal>

        <Stack>
          <div style={{ height: '20px' }} />
          <StyledTableContainer sx={{ width: '100%' }}>
            <Table stickyHeader size='small' sx={{ tableLayout: 'auto' }}>
              <TableHead>
                <TableRow sx={{ height: '52px' }}>
                  {traceTableHeaders.map(item => {
                    return (
                      <StyledTableRowCell
                        key={item.key}
                        align={item.align}
                        sx={{ minWidth: item.minWidth }}
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
              width: '100%',
              pt: '10px',
              pb: '10px',
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

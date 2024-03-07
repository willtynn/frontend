import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  StyledTableRowCell,
  StyledTableContainer,
  StyledTableFooter,
} from '@/components/DisplayTable';
import {
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Box,
  Typography,
} from '@mui/material';
import { DataRow } from '../DataRow';
import { getPartitionStrategy, getSubModels } from '@/actions/partitionAction';
import RouteIcon from '@/assets/RouteIcon.svg';
import ModelInfo from "./modelInfo";
import GeneralInfo from "./GeneralInfo";

const spanNumPerPage = 15;

const tableHeaders = [
  { key: 'models', align: 'center', text: '子模型依赖', minWidth: 50, maxWidth: 50 }
];

export function SubModelPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [row, setRow] = useState([]);
  const [tracePage, setTracePage] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [detailSpan, setDetailSpan] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const { partitionStrategy, subModels } = useSelector(state => {
    return {
      partitionStrategy: state.Partition.partitionStrategy,
      subModels: state.Partition.subModels,
    };
  });

  const handleSpanClick = index => {
    setSelectedIndex(index);
    setDetailSpan(visibleRows[index]);
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
    dispatch(getPartitionStrategy(1, 1));
    dispatch(getSubModels(id));
  }, []);

  const visibleRows = React.useMemo(() => {
    const tmp = (tracePage - 1) * spanNumPerPage;
    return subModels ? subModels.slice(tmp, tmp + spanNumPerPage) : [];
  }, [subModels, tracePage]);

  useEffect(() => {
    if (partitionStrategy) {
      setTracePage(1);
    }
  }, [partitionStrategy]);

  useEffect(() => {
    if (visibleRows) {
      let row = visibleRows.map((item, index) => {
        return (
          <DataRow
            key={item.id}
            onRowClick={() => handleSpanClick(index)}
            selected={selectedIndex === index}
            rowData={index}
            path={item.model_path}
          />
        );
      });
      for (let i = row.length; i < spanNumPerPage; i++) {
        row.push(<DataRow key={i} onRowClick={() => {}} rowData={null} />);
      }
      setRow(row);
    }
  }, [visibleRows, selectedIndex]);

  return (
    <Stack
      direction='row'
      alignItems='flex-start'
      spacing={2}
      sx={{ width: '100%' }}
    >
      <GeneralInfo/>
      <Stack sx={{ width: '100%' }}>
        {/* 顶部信息块 */}
        <Box
          sx={{
            borderRadius: '4px',
            backgroundColor: '#FFFFFF',
            padding: '24px 20px',
            width: 'calc(100% - 40px)',
            height: '58px',
            mb: '12px',
          }}
        >
          <Stack direction='row' spacing={-4}>
            <RouteIcon />
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontStyle: 'normal',
                  color: '#242e42',
                  textShadow: '0 4px 8px rgba(36,46,66,.1)',
                  fontSize: '24px',
                  lineHeight: '32px',
                }}
              >
                子模型列表
              </Typography>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontStyle: 'normal',
                  color: '#79879c',
                  fontSize: '12px',
                  lineHeight: 1.67,
                }}
              >
                由拆分策略 ID：{id} 生成的子模型
              </Typography>
            </Box>
          </Stack>
        </Box>
        {/* Table */}
        <Stack direction='row' justifyContent='space-between' spacing={2}>
          <Stack sx={{ width: '20%' }} direction='column' spacing={0}>
            <StyledTableContainer sx={{ width: '100%' }}>
              <Table stickyHeader size='small' sx={{ tableLayout: 'auto' }}>
                <TableHead>
                  <TableRow sx={{ height: '52px' }}>
                    {tableHeaders.map(item => {
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
                  {row}
                </TableBody>
              </Table>
            </StyledTableContainer>
            <StyledTableFooter
              pageSize={spanNumPerPage}
              pageNum={tracePage}
              count={subModels ? subModels.length : 0}
              handlePageChange={handleSpanChangePage}
              sx={{
                width: '100%',
                pt: '10px',
                pb: '10px',
              }}
            />
          </Stack>
          <Stack sx={{ width: '80%' }} direction='column' spacing={2}>
            <ModelInfo showInfo={openModal} info={detailSpan}/>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

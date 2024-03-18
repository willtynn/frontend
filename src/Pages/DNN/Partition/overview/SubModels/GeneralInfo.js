import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Stack,
  Tooltip,
} from '@mui/material';
import { KubeCancelButton } from '@/components/Button';
import { fontFamily } from '@/utils/commonUtils';
import DetailBG from '@/assets/DetailBG.svg';
import Service21 from '@/assets/Service21.svg';
import EditService from '@/assets/EditService.svg';
import Delete16 from '@/assets/Delete16.svg';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { StyledPopover } from '@/components/Popover';

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
  width: '184px',
  overflowWrap: 'break-word',
  wordBreak: 'break-all',
};

export default function GeneralInfo(props) {
  const navigate = useNavigate();

  const [moreOperationAnchorEl, setMoreOperationAnchorEl] = useState(null);
  const moreOperationOpen = Boolean(moreOperationAnchorEl);

  const { tempPartitionInfo } = useSelector(state => {
    return {
      tempPartitionInfo: state.Partition.tempPartitionInfo,
    };
  });

  const items = [
    [<EditService />, '编辑策略', () => {}],
    [<Delete16 />, '删除', () => {}],
  ];

  const handleReturn = () => {
    navigate('/partition/strategy');
  };

  const handleMoreOperation = e => {
    setMoreOperationAnchorEl(e.currentTarget);
  };

  return (
    <Stack
      direction='column'
      sx={{ position: 'relative', boxShadow: '0 4px 8px 0 rgba(36,46,66,.06)' }}
    >
      <StyledPopover
        id='service-detail-more-operation'
        open={moreOperationOpen}
        anchorEl={moreOperationAnchorEl}
        handleClose={() => setMoreOperationAnchorEl(null)}
        items={items}
        sx={{
          mt: '8px !important',
          boxShadow: 'inset 0 4px 8px 0 rgba(36,46,66,.12) !important',
        }}
        border='none'
      />
      <DetailBG />
      <Box
        style={{
          position: 'absolute',
          top: 0,
          width: '324px',
          height: '108px',
          padding: '12px',
          zIndex: 1000,
        }}
      >
        <KubeCancelButton
          sx={{
            backgroundColor: '#FFFFFF !important',
            padding: '1px 16px 1px 10px',
            border: 'none !important',
          }}
          onClick={handleReturn}
        >
          <Stack direction='row' spacing={1}>
            <NavigateBeforeIcon fontSize='small' />
            <Box
              sx={{
                fontFamily: fontFamily,
                fontSize: '12px',
                fontWeight: 600,
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: 1.67,
                letterSpacing: 'normal',
                color: '#36435C',
                '&:hover': {
                  color: '#55bc8a',
                },
              }}
            >
              策略
            </Box>
          </Stack>
        </KubeCancelButton>
        <Stack
          sx={{ mt: '12px' }}
          direction='row'
          spacing={1}
          alignItems='center'
        >
          <Service21 />
          <Tooltip
            PopperProps={{
              sx: {
                '& .MuiTooltip-tooltip': {
                  backgroundColor: '#242e42',
                  margin: "0 !important"
                },
              },
            }}
            title={tempPartitionInfo !== null ? tempPartitionInfo.id : ''}
            placement='bottom'
          >
            <Box
              sx={{
                fontFamily: fontFamily,
                fontSize: '20px',
                fontWeight: 600,
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: 1.4,
                letterSpacing: 'normal',
                color: '#36435C',
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: 'nowrap'
              }}
            >
              {tempPartitionInfo !== null ? tempPartitionInfo.partition_name : ''}
            </Box>
          </Tooltip>
        </Stack>
        <Stack
          sx={{ mt: '12px' }}
          direction='row'
          spacing={1.5}
          alignItems='center'
        >
          <KubeCancelButton sx={{ height: '32px', width: '96px' }}>
            编辑信息
          </KubeCancelButton>
          <KubeCancelButton
            onClick={handleMoreOperation}
            sx={{ height: '32px', width: '96px' }}
          >
            <Stack direction='row' alignItems='center' justifyContent='center'>
              <Box sx={{ ml: '4px' }}>更多操作</Box>
              <ArrowDropDownIcon fontSize='small' />
            </Stack>
          </KubeCancelButton>
        </Stack>
      </Box>
      <Box
        style={{
          position: 'absolute',
          top: '132px',
          width: '330px',
          padding: '12px',
          zIndex: 1000,
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* 详情 */}
        <Box
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '20px',
            letterSpacing: 'normal',
            color: '#2E2E42',
            mb: '12px',
          }}
        >
          详情
        </Box>

        {/* Key-Value Pair */}
        <Stack sx={{ margin: '6px 0px' }} direction='column' spacing={1.5}>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>拆分策略ID</Box>
            <Box sx={valueStyle}>
              {tempPartitionInfo !== null ? tempPartitionInfo.id : ''}
            </Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>拆分策略名称</Box>
            <Box sx={valueStyle}>
              {tempPartitionInfo !== null ? tempPartitionInfo.partition_name : ''}
            </Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>原始模型</Box>
            <Box sx={valueStyle}>
              {tempPartitionInfo !== null ? tempPartitionInfo.model_name : ''}
            </Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>子模型个数</Box>
            <Box sx={valueStyle}>
              {tempPartitionInfo !== null ? tempPartitionInfo.sub_item : ''}
            </Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>生成时间</Box>
            <Box sx={valueStyle}>
              {tempPartitionInfo !== null ? tempPartitionInfo.time : ''}
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
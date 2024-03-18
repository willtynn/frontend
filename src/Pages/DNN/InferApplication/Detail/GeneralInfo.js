import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Stack,
  Button,
  Tooltip,
} from '@mui/material';
import {
  KubeCancelButton,
} from '@/components/Button';
import { fontFamily } from '@/utils/commonUtils';
import DetailBG from '@/assets/DetailBG.svg';
import Service21 from '@/assets/Service21.svg';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useNavigate } from 'react-router-dom';
import { StyledPopover } from '../../../components/Popover';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

    //删除弹窗
    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteId, setDeleteId] = useState(null);

  const { currentApplication } = useSelector(state => {
    return {
      currentApplication: state.InferInstance.currentApplication,
    };
  });

  const handleReturn = () => {
    navigate('/application/deploy');
  };

  //删除
  const handleDialogClickOpen = () => {
    setDeleteId('')   
    setDialogOpen(true)
  };

  const handleDialogClose = () => {
    setDeleteId('')
    setDialogOpen(false)
  }

  const handleModelDelete = () =>{
    setDialogOpen(false);
    setDeleteId('')
  }

  return (
    <Box>
      {/* 删除弹窗 */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"确认卸载应用吗?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          卸载应用可能会影响到相关业务的正常使用。在卸载前，请确保您已经与相关团队和用户沟通，并了解潜在的风险和影响
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>取消</Button>
          <Button onClick={handleModelDelete} autoFocus>
            确认
          </Button>
        </DialogActions>
      </Dialog>

      <Stack
      direction='column'
      sx={{ position: 'relative', boxShadow: '0 4px 8px 0 rgba(36,46,66,.06)' }}
    >
      <StyledPopover
        id='service-detail-more-operation'
        open={moreOperationOpen}
        anchorEl={moreOperationAnchorEl}
        handleClose={() => setMoreOperationAnchorEl(null)}
        items={[]}
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
              应用
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
            title={currentApplication !== null ? currentApplication.applicationName : ''}
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
              {currentApplication !== null ? currentApplication.applicationName : ''}
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
          <KubeCancelButton onClick={handleDialogClickOpen}
          sx={{ height: '32px', width: '96px' }} >
            卸载应用
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
            <Box sx={labelStyle}>命名空间</Box>
            <Box sx={valueStyle}>
              {currentApplication !== null ? currentApplication.namespace : ''}
            </Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>模型名称</Box>
            <Box sx={valueStyle}>
              {currentApplication !== null ? currentApplication.modelName : ''}
            </Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>拆分方案</Box>
            <Box sx={valueStyle}>
              {currentApplication !== null ? currentApplication.partitionName : ''}
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Stack>
    </Box>
  );
}

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  KubeCancelButton,
  KubeConfirmButton,
} from '@/components/Button';
import { 
  fontFamily,
  formatDatetimeString } from '@/utils/commonUtils';
import DetailBG from '@/assets/DetailBG.svg';
import Service21 from '@/assets/Service21.svg';
import EditService from '@/assets/EditService.svg';
import Delete16 from '@/assets/Delete16.svg';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { StyledPopover } from '@/components/Popover';
import { measure } from '@/actions/applicationAction';
import { useIntl } from 'react-intl';
import { getBoolChar, getBoolString } from '../../../utils/commonUtils';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { EVO_RESET_FORM, EVO_UPDATE_FROM_CURRENT, evo_delete, evo_getPlanList, evo_modify } from '../../../actions/evolutionAction';
import { EvolutionProgress } from '../EvolutionProgress';
import { StyledModal } from '@/components/Modal';
import Warning from '@/assets/popup/warning.svg'
import { 
  EVO_UPDATE_ENABLE,
  evo_get_plan_result,
  evo_getone,
} from '../../../actions/evolutionAction';
import RefreshIcon from '@mui/icons-material/Refresh';
import { EclipseTransparentButton } from '@/components/Button';

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
  const {evo_id} = props;
  const navigate = useNavigate();

  const [moreOperationAnchorEl, setMoreOperationAnchorEl] = useState(null);
  const moreOperationOpen = Boolean(moreOperationAnchorEl);
  const dispatch = useDispatch();
  const intl = useIntl();
  const backText = intl.messages['evolution.evolutionPlan']
  const { currentPlan } = useSelector(state => {
    return {
      currentPlan: state.Evolution.current_evo_plan || {},
    };
  });

  const [deleltDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  function handleDelete() {
    setDeleteDialogOpen(false);
    dispatch(evo_delete(currentPlan.evo_id));
    navigate('/evolution/plan')
  }

  function handleExecute() {
    if(currentPlan.evo_enable=="1"){
      currentPlan.evo_enable="0";
    }else{
      currentPlan.evo_enable="1";
    }
    dispatch({type:EVO_UPDATE_ENABLE,data:currentPlan.evo_enable})
    console.log(currentPlan)
    dispatch(evo_modify(currentPlan));
    console.log("修改计划的启用和禁用")

  }

  const [planOpen, setPlanOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  //关闭修改计划的界面
  const handleClose = () => {
    resetParameters();
    setPlanOpen(false);
  };

  //取消修改计划
  const handleCancelClick = () => {
    resetParameters();
    setPlanOpen(false);
  };

  //确认修改计划
  const handleConfirmClick = () => {
    //修改的请求放入EvolutionProgress组件
    setPlanOpen(false);
  };
  //重新设置参数
  const resetParameters = () => {
    dispatch({type:EVO_RESET_FORM})
    // 此处应该恢复plan内容为默认
  }

  const setNowParameters = () => {
    dispatch({type:EVO_UPDATE_FROM_CURRENT,data:currentPlan})
  }

  const items = [
    //此处加入编辑计划的框，可以复用之前的框，但是数据要与现在计划相同
    [<EditService />, intl.messages['common.edit'], () => { setPlanOpen(true);setNowParameters(); }],
    //传参进行删除
    [<Delete16 />, intl.messages['common.delete'], () => { handleDeleteDialogOpen(); }],
  ];

  const handleReturn = () => {
    navigate('/evolution/plan');
  };

  const handleMoreOperation = e => {
    setMoreOperationAnchorEl(e.currentTarget);
  };

  const getEvoEnable = () => {
    if(currentPlan == null){
      return "";
    }else if(currentPlan.evo_enable == "0"){
      return intl.messages['common.no']
    }else{
      return intl.messages['common.yes']
    }
  }

  const handleRefresh= (evo_id) =>{
    console.log(evo_id)
    //获取当前演化计划的详细信息
    dispatch(evo_getone(evo_id));
    //获取一下当前演化计划的执行结果
    dispatch(evo_get_plan_result(evo_id));
  }


  return (
    <Stack
      direction='column'
      sx={{ position: 'relative', boxShadow: '0 4px 8px 0 rgba(36,46,66,.06)' }}
    >
      <StyledPopover
        id='evoplan-detail-more-operation'
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
              {backText}
            </Box>
          </Stack>
        </KubeCancelButton>

        {/* 确认删除提示框 */}
        <Dialog
          open={deleltDialogOpen}
          onClose={handleDeleteDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"
            sx={{
              fontSize: '25px',
              alignItems: 'center',
            }}>
            <Warning />
            <span sx={{
              fontSize: '25px',
              alignItems: 'center',
              display: 'flex'
            }}>{intl.messages['evolution.deleteWarning']}</span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {intl.messages['evolution.deleteNotice']}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Stack
          sx={{ mt: '12px' }}
          direction='row'
          spacing={1.5}
          alignItems='center'
        >
          <KubeCancelButton sx={{ height: '32px', minWidth: '96px' }} onClick={() => {
            handleDeleteDialogClose()
          }}>
            {intl.messages['common.cancel']}
          </KubeCancelButton>
          <KubeCancelButton
            onClick={handleDelete}
            sx={{ height: '32px', minWidth: '96px' }}
          >
            <Stack direction='row' alignItems='center' justifyContent='center'>
              <Box sx={{ ml: '4px' }}>{intl.messages['common.confirm']}</Box>
            </Stack>
          </KubeCancelButton>
        </Stack>
          </DialogActions>
        </Dialog>

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
            title={currentPlan !== null ? currentPlan.evo_name : ''}
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
              {currentPlan !== null ? currentPlan.evo_name : ''}
            </Box>
          </Tooltip>
        </Stack>
        <Stack
          sx={{ mt: '12px' }}
          direction='row'
          spacing={1.5}
          alignItems='center'
        >
          <KubeCancelButton sx={{ height: '32px', minWidth: '96px' }} onClick={() => {
            handleExecute();
          }}>
            {intl.messages["evolution.executeEvolutionOrUnable"]}
          </KubeCancelButton>
          <KubeCancelButton
            onClick={handleMoreOperation}
            sx={{ height: '32px', minWidth: '96px' }}
          >
            <Stack direction='row' alignItems='center' justifyContent='center'>
              <Box sx={{ ml: '4px' }}>{intl.messages['common.moreOperation']}</Box>
              <ArrowDropDownIcon fontSize='small' />
            </Stack>
          </KubeCancelButton>
          {/* 刷新按钮 */}
          <EclipseTransparentButton
              sx={{
                bgcolor: '#f9fbfd !important',
                '&:hover': {
                  bgcolor: '#FFFFFF !important',
                },
                '& svg': {
                  color: '#3d3b4f',
                },
                height: '32px',
              }}
              onClick={() =>handleRefresh(evo_id)}
            >
              <RefreshIcon />
            </EclipseTransparentButton>


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
          {intl.messages['common.details']}
        </Box>

        {/* Key-Value Pair */}
        <Stack sx={{ margin: '6px 0px' }} direction='column' spacing={1.5}>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>{intl.messages['common.createTime']}</Box>
            <Box sx={valueStyle}>
              {currentPlan !== null ? formatDatetimeString(currentPlan.cre_time) : ''}
            </Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>{intl.messages['common.executionNumber']}</Box>
            <Box sx={valueStyle}>
              {currentPlan !== null ? currentPlan.exe_times : ''}
            </Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>{intl.messages['common.lastExecutionTime']}</Box>
            <Box sx={valueStyle}>
              {currentPlan !== null ? formatDatetimeString(currentPlan.last_time) : ''}
            </Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>{intl.messages['common.enableOrDisable']}</Box>
            <Box sx={valueStyle}>
              {getEvoEnable()}
            </Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>{intl.messages['common.remark']}</Box>
            <Box sx={valueStyle}>
              {currentPlan !== null ? currentPlan.evo_remarks : ''}
            </Box>
          </Stack>
        </Stack>
      </Box>

      <StyledModal open={planOpen} onClose={handleClose}>
        <EvolutionProgress
          handleConfirmClick={() => { }}
          handleCancelClick={handleCancelClick}
          showError={showError}
          setShowError={setShowError}
          state="modify"
        />
      </StyledModal>


    </Stack>
  );
}

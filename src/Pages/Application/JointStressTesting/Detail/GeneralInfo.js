import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Stack, Tooltip } from '@mui/material';
import { KubeCancelButton } from '@/components/Button';
import { fontFamily } from '@/utils/commonUtils';
import DetailBG from '@/assets/DetailBG.svg';
import Service21 from '@/assets/Service21.svg';
import EditService from '@/assets/EditService.svg';
import Delete16 from '@/assets/Delete16.svg';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { StyledPopover } from '@/components/Popover';
import { getBoolString } from '../../../../utils/commonUtils';
import { measureJointPlan,deleteJointPlanByID } from '@/actions/applicationAction';
import { useIntl } from 'react-intl';
import { UpdateModal } from '../Update/UpdateWindow';
import { StyledModal } from '../../../../components/Modal';

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
  const [backText, setBackText] = useState('联合测试');
  const dispatch = useDispatch();
  const intl = useIntl();
  const [planOpen, setPlanOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const { jointTestPlanId } = useParams();
  const { currentJointPlan } = useSelector(state => {
    return {
      currentJointPlan: state.Application.currentJointPlan,
    };
  });

  const items = [
    [<EditService />, '编辑计划', () => {
      setPlanOpen(true);
    }],
    [<Delete16 />, '删除', () => {
      dispatch(deleteJointPlanByID(jointTestPlanId));
      setTimeout(() => {
        handleReturn();
      }, 300);
    }],
  ];

  const handleReturn = () => {
    navigate('/application/joint_stress_testing');
  };

  const handleMoreOperation = e => {
    setMoreOperationAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setPlanOpen(false);
  };

  const handleCancelClick = () => {
    setPlanOpen(false);
  };

  
  const handleConfirmClick = () => {
    window.location.reload();
    setPlanOpen(false);
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
              {backText}
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
                  margin: '0 !important',
                },
              },
            }}
            title={currentJointPlan !== null ? currentJointPlan.name : ''}
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
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {currentJointPlan !== null ? currentJointPlan.name : ''}
            </Box>
          </Tooltip>
        </Stack>
        <Stack
          sx={{ mt: '12px' }}
          direction='row'
          spacing={1.5}
          alignItems='center'
        >
          <KubeCancelButton
            sx={{ height: '32px', width: '96px' }}
            onClick={() => {
              dispatch(measureJointPlan(currentJointPlan.id));
            }}
          >
            {intl.messages['stressTesting.startTest']}
          </KubeCancelButton>
          <KubeCancelButton
            onClick={handleMoreOperation}
            sx={{ height: '32px', width: '96px' }}
          >
            <Stack direction='row' alignItems='center' justifyContent='center'>
              <Box sx={{ ml: '4px' }}>
                {intl.messages['common.moreOperation']}
              </Box>
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
          {intl.messages['common.details']}
        </Box>

        {/* Key-Value Pair */}
        <Stack sx={{ margin: '6px 0px' }} direction='column' spacing={1.5}>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>{intl.messages['common.status']}</Box>
            <Box sx={valueStyle}>
              {currentJointPlan !== null ? currentJointPlan.status : ''}
            </Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>{intl.messages['common.sonTestPlans']}</Box>
            <Box sx={valueStyle}>
              {currentJointPlan !== null
                ? currentJointPlan.testPlansName !== null
                  ? currentJointPlan.testPlansName.join(', ')
                  : ''
                : ''}
            </Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>{intl.messages['common.description']}</Box>
            <Box sx={valueStyle}>
              {currentJointPlan !== null ? currentJointPlan.comment : ''}
            </Box>
          </Stack>
        </Stack>
      </Box>

      <Stack>
      <StyledModal open={planOpen} onClose={handleClose}>
              <UpdateModal
                          handleConfirmClick={handleConfirmClick}
                          handleCancelClick={handleCancelClick}
                          showError={showError}
                          setError={setShowError}
              />
       </StyledModal> 
      </Stack>

    </Stack>
  );
}

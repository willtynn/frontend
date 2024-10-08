import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Stack } from '@mui/material';
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
import { useIntl } from 'react-intl';

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
  const intl = useIntl();
  const [moreOperationAnchorEl, setMoreOperationAnchorEl] = useState(null);
  const moreOperationOpen = Boolean(moreOperationAnchorEl);
  const [backText, setBackText] = useState(intl.messages['common.testPlan']);
  const dispatch = useDispatch();

  const { currentResult } = useSelector(state => {
    return {
      currentResult: state.Application.currentResult,
    };
  });

  const items = [
    [<EditService />, intl.messages['common.edit'], () => {}],
    [<Delete16 />, intl.messages['common.delete'], () => {}],
  ];

  const handleReturn = () => {
    navigate(`/detail/testplan/${currentResult.planId}`);
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
            {`ID: ${currentResult !== null ? currentResult.id : ''}`}
          </Box>
        </Stack>
        <Stack
          sx={{ mt: '12px' }}
          direction='row'
          spacing={1.5}
          alignItems='center'
        >
          <KubeCancelButton sx={{ height: '32px', width: '96px' }}>
            {intl.messages['stressTesting.deleteResult']}
          </KubeCancelButton>
          <KubeCancelButton
            onClick={handleMoreOperation}
            sx={{ height: '32px', width: '96px' }}
          >
            <Stack direction='row' alignItems='center' justifyContent='center'>
              <Box sx={{ ml: '4px' }}>{intl.messages['common.moreOperation']}</Box>
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
            <Box sx={labelStyle}>{intl.messages['common.beginTime']}</Box>
            <Box sx={valueStyle}>
              {currentResult !== null ? currentResult.startTime : ''}
            </Box>
          </Stack>
          <Stack direction='row' spacing={0.75}>
            <Box sx={labelStyle}>{intl.messages['common.endTime']}</Box>
            <Box sx={valueStyle}>
              {currentResult !== null
                ? currentResult.endTime
                : ''}
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

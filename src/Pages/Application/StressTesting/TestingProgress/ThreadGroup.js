import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { fontFamily } from '@/utils/commonUtils';
import { KubeInput, StyledTextFiled } from '@/components/Input';
import { useIntl } from 'react-intl';
import Docker from '@/assets/Docker.svg';
import { ThreadGroupProgress } from './ThreadGroupProgress';

const onSamplerErrorText = index => {
  if (index === 0) {
    return 'continue';
  } else if (index === 1) {
    return 'startnextloop';
  } else if (index === 2) {
    return 'stopthread';
  } else if (index === 3) {
    return 'stoptest';
  } else {
    return 'stoptestnow';
  }
};

export function ThreadGroup(props) {
  const { showError } = props;

  const [groupEdit, setGroupEdit] = useState(false);

  const intl = useIntl();

  const handleThreadGroupEdit = () => {
    setGroupEdit(true);
  };

  const handleReturn = () => {
    setGroupEdit(false);
  };

  return (
    <>
      {groupEdit ? (
        <Box
          id="groupEditBox"
          sx={{
            height: 'calc(100% - 148px)',
            position: 'relative',
            top: '-64px',
            bgcolor: '#FFFFFF',
          }}
        >
          <ThreadGroupProgress handleReturn={handleReturn} />
        </Box>
      ) : (
        <Box
          sx={{
            p: '16px 64px',
            bgcolor: '#FFFFFF',
            height: 'calc(100% - 212px)',
          }}
        >
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: 400,
              fontStyle: 'normal',
              fontStretch: 'normal',
              lineHeight: 1.67,
              letterSpacing: 'normal',
            }}
          >
            线程组
          </Typography>
          <Box
            sx={{
              borderRadius: '4px',
              backgroundColor: '#f9fbfd',
              p: '12px',
            }}
          >
            <Box
              sx={{
                borderRadius: '4px',
                backgroundColor: '#FFFFFF',
                border: '1px dashed #ccd3db',
                height: '140px',
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '0 4px 8px 0 rgba(36,46,66,.2)',
                },
              }}
              onClick={handleThreadGroupEdit}
            >
              <Stack
                direction='column'
                justifyContent='center'
                alignItems='center'
                sx={{
                  p: '28px',
                }}
                spacing={0}
              >
                <Docker />
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: '#242e42',
                    fontSize: '12px',
                    lineHeight: 1.67,
                    pt: '8px',
                  }}
                >
                  添加线程组
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 400,
                    color: '#79879c',
                    fontSize: '12px',
                    lineHeight: 1.67,
                  }}
                >
                  {intl.messages['stressTesting.groupAddDescription']}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Box>
      )}
      {showError && groupEdit === false ? (
        <Box
          sx={{
            fontSize: '12px',
            fontWeight: 400,
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 1.67,
            letterSpacing: 'normal',
            color: '#CA2621',
            mt: '4px',
          }}
        >
          {intl.messages['stressTesting.groupEmptyError']}
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}

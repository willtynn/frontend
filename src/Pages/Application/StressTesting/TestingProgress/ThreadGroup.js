import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { fontFamily } from '@/utils/commonUtils';
import { KubeInput, StyledTextField } from '@/components/Input';
import { useIntl } from 'react-intl';
import Docker from '@/assets/Docker.svg';
import { ThreadGroupProgress } from './ThreadGroupProgress';
import { useSelector, useDispatch } from 'react-redux';
import {
  UPDATE_GROUP_EDIT,
  UPDATE_THREAD_GROUPS,
} from '../../../../actions/applicationAction';
import { KubeTransparentButton } from '../../../../components/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

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

  const [editIndex, setEditIndex] = useState(0);

  const intl = useIntl();

  const { groupEdit, threadGroups } = useSelector(state => {
    return {
      groupEdit: state.Application.groupEdit,
      threadGroups: state.Application.threadGroups,
    };
  });

  const dispatch = useDispatch();

  const handleThreadGroupAdd = () => {
    dispatch({ type: UPDATE_GROUP_EDIT, data: true });
  };

  const handleReturn = () => {
    dispatch({ type: UPDATE_GROUP_EDIT, data: false });
  };

  const handleThreadGroupEdit = index => {
    dispatch({ type: UPDATE_GROUP_EDIT, data: true });
    setEditIndex(index);
  };

  const handleThreadGroupDelete = index => {
    let tmpGroups = JSON.parse(JSON.stringify(threadGroups));
    tmpGroups.splice(index, 1);
    dispatch({ type: UPDATE_THREAD_GROUPS, data: tmpGroups });
  };

  return (
    <>
      {groupEdit ? (
        <Box
          id='groupEditBox'
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
        <>
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
              {/* 已有Thread Groups */}
              <Stack sx={{
                mb: "12px"
              }}>
                <Box
                  sx={{
                    borderRadius: '4px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #ccd3db',
                    padding: '11px 12px 11px 20px',
                    '&:hover': {
                      boxShadow: '0 4px 8px 0 rgba(36,46,66,.2)',
                    },
                  }}
                >
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    height='40px'
                  >
                    <Stack
                      direction='row'
                      justifyContent='flex-start'
                      alignItems='center'
                      spacing={2}
                    >
                      <Docker />
                      <Stack direction='row' spacing={0.5}>
                        <Box
                          sx={{
                            fontSize: '12px',
                            fontWeight: 700,
                            fontStyle: 'normal',
                            fontStretch: 'normal',
                            lineHeight: 1.67,
                            letterSpacing: 'normal',
                            color: '#242e42',
                          }}
                        >
                          线程组
                        </Box>
                        <Box
                          sx={{
                            fontSize: '12px',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            fontStretch: 'normal',
                            lineHeight: 1.67,
                            letterSpacing: 'normal',
                            color: '#4C5561',
                          }}
                        >
                          Test Group
                        </Box>
                      </Stack>
                    </Stack>
                    <Stack direction='row'>
                      <KubeTransparentButton
                        sx={{
                          color: '#b6c2cd !important',
                          '&:hover': {
                            color: '#324558 !important',
                          },
                        }}
                        onClick={handleThreadGroupDelete.bind(this, 0)}
                      >
                        <DeleteOutlineIcon />
                      </KubeTransparentButton>
                      <KubeTransparentButton
                        sx={{
                          color: '#b6c2cd !important',
                          '&:hover': {
                            color: '#324558 !important',
                          },
                        }}
                        onClick={handleThreadGroupEdit.bind(this, 0)}
                      >
                        <ModeEditOutlineOutlinedIcon />
                      </KubeTransparentButton>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
              
              {/* 添加按钮 */}
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
                onClick={handleThreadGroupAdd}
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
        </>
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

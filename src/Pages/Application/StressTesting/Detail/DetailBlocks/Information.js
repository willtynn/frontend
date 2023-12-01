import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Stack,
  Box,
  InputAdornment,
  Tooltip,
  Popover,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import {
  KubeConfirmButton,
  KubeCancelButton,
  EclipseTransparentButton,
} from '@/components/Button';
import API from '@/assets/API.svg';
import WhiteAPI from '@/assets/WhiteAPI.svg';
import { fontFamily } from '@/utils/commonUtils';

export function Information() {


  const [currentThreadGroup, setCurrentThreadGroup] = useState('');

  const { currentPlan } = useSelector(state => {
    return {
      currentPlan: state.Application.currentPlan,
    };
  });

  useEffect(() => {
    if (currentPlan && currentPlan.threadGroupList && currentPlan.threadGroupList.length > 0) {
      setCurrentThreadGroup(currentPlan.threadGroupList[0].threadGroupName);
    }
  }, [currentPlan]);

  const handleThreadGroupChange = (groupName) => {
    setCurrentThreadGroup(groupName)
  }

  return (
    <Stack direction='row' sx={{ mt: '20px' }} spacing={2}>
      {/* 左侧线程组列表 */}
      <Box
        sx={{
          maxHeight: '660px',
          overflowY: 'auto',
        }}
      >
        <Stack direction='column' spacing={1} >
          {currentPlan && currentPlan.threadGroupList && currentPlan.threadGroupList.map((threadGroup, index) => {
            return (
              <Stack
                sx={{
                  padding: '8px 20px',
                  width: '200px',
                  height: '52px',
                  borderRadius: '4px',
                  bgcolor: currentThreadGroup === threadGroup.threadGroupName ? '#55bc8a' : '#FFFFFF',
                  color: currentThreadGroup === threadGroup.threadGroupName ? '#FFFFFF' : '#242E42',
                  '&:hover': {
                    bgcolor: '#55bc8a',
                    color: '#FFFFFF',
                  },
                  cursor: 'pointer',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                onClick={handleThreadGroupChange.bind(this, threadGroup.threadGroupName)}
                direction='row'
                alignItems='center'
                spacing={2.5}
              >
                <Box>{currentThreadGroup === threadGroup.threadGroupName ? <WhiteAPI /> : <API />}</Box>

                <Box
                  sx={{
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Box
                    sx={{
                      fontSize: '12px',
                      fontFamily: fontFamily,
                      fontStyle: 'normal',
                      fontWeight: 700,
                      lineHeight: 1.67,
                      color: '#242e42',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {threadGroup.threadGroupName}
                  </Box>
                  <Box
                    sx={{
                      fontSize: '12px',
                      fontFamily: fontFamily,
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 1.67,
                      color: '#79879c',
                    }}
                  >
                    Thread Group
                  </Box>
                </Box>
              </Stack>
            );
          })}
        </Stack>
      </Box>

      {/* 右侧请求详情 */}
      <Box sx={{ width: 'calc(100% - 256px)' }}>
        
      </Box>
    </Stack>
  )
}

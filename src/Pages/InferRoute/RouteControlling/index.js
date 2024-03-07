/**
 * src\Pages\Route\RouteControlling\index.js
 */
import { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
} from '@mui/material';
import { OutlinedButton } from '../../../components/Button';
import RouteRuleOverviewTable from './RouteRuleOverviewTable';
import TaskIcon from '@/assets/TaskIcon.svg';
import { useIntl } from 'react-intl';


export default function RouteControlling() {
  const [open, setOpen] = useState(false);
  const intl = useIntl();

  const handleOpen = () => setOpen(true);

  return (
    <Box>
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
        <Stack direction='row' spacing={1}>
          <TaskIcon />
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
              路由控制
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
              {intl.messages['routerule.routeruleDesc']}
            </Typography>
          </Box>
        </Stack>
      </Box>
      {/* 表格主体 */}
      <RouteRuleOverviewTable
        embeddingButton={
          <OutlinedButton
            onClick={handleOpen}
            sx={{
              borderRadius: '20px !important',
              width: '120px',
            }}
          >
            新增
          </OutlinedButton>
        }
      />
    </Box>
  );
}

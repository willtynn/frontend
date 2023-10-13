import { Box, Stack } from '@mui/material';
import { YaHeiLargeFont } from '@/components/Fonts';
import { shadowStyle } from '@/utils/commonUtils';
import { fontFamily } from '../../utils/commonUtils';
import KubeClose from '@/assets/KubeClose.svg';

export default function InfoCard(props) {
  const { title } = props;
  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        borderRadius: '5px',
        ...shadowStyle,
        p: 0,
      }}
    >
      <Box
        sx={{
          borderBottom: '1px #EBEEF5 solid',
          p: '12px 0px 6px 12px',
        }}
      >
        <YaHeiLargeFont>{title}</YaHeiLargeFont>
      </Box>
      {props.children}
    </Box>
  );
}

export function KubeDeploymentCard(props) {
  const { title, handleClose } = props;
  return (
    <Box
      className="KubeDeployCard"
      sx={{
        bgcolor: '#f9fbfd',
        borderRadius: '4px',
        ...shadowStyle,
        p: 0,
        height: "100%"
      }}
    >
      <Box
        sx={{
          borderBottom: '1px #ccd3db solid',
          p: '10px 20px 10px 20px',
          color: '#262E35',
          fontSize: '12px',
          fontFamily: fontFamily,
          fontStyle: 'normal',
          fontWeight: 700,
          height: '40px',
        }}
      >
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Box sx={{ height: '40px', lineHeight: '40px' }}>{title}</Box>
          <Box
            sx={{
              cursor: 'pointer',
              boxShadow: '0 8px 16px 0 rgba(35,45,65,.28)',
              '&:hover': {
                boxShadow: 'none',
              },
              height: '32px',
            }}
            onClick={handleClose}
          >
            <KubeClose />
          </Box>
        </Stack>
      </Box>
      {props.children}
    </Box>
  );
}

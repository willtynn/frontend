import { Box } from '@mui/material';
import { YaHeiLargeFont } from '@/components/Fonts';
import { shadowStyle } from '@/utils/commonUtils';

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

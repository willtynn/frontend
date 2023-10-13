import { Box, Stack } from '@mui/material';
import { useIntl } from 'react-intl';

export default function ProgressIndicator(props) {
  const { title, adornments, stage, currentState } = props;
  const intl = useIntl();
  
  const instructionWord = () => {
    if(stage === currentState) {
      return intl.messages['instruction.now'];
    }
    if(stage < currentState) {
      return intl.messages['instruction.finished'];
    }
    return intl.messages['instruction.waiting'];
  }

  const instructionIcon = () => {
    if(stage === currentState) {
      return adornments[1];
    }
    if(stage < currentState) {
      return adornments[2];
    }
    return adornments[0];
  }

  return (
    <Box
      sx={{
        height: '40px',
        width: '150px',
        padding: '12px 15px',
        bgcolor: stage === currentState ? '#FFFFFF' : 'inherit',
      }}
    >
      <Stack direction='row' spacing={1.5}>
        <Box sx={{ height: '40px', width: '40px', padding: "5px 0px 0px 5px" }}>{instructionIcon()}</Box>
        <Stack>
          <Box
            sx={{
              fontWeight: 700,
              color: '#242e42',
              fontSize: '12px',
              lineHeight: 1.67,
            }}
          >
            {title}
          </Box>
          <Box sx={{
            fontWeight: 400,
            color: '#79879c',
            fontSize: '12px',
            lineHeight: 1.67,
          }}>
            {
              instructionWord()
            }
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

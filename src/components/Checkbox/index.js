import { Checkbox, Stack, Box } from '@mui/material';
import { styled } from '@mui/system';

export const KubeCheckbox = styled(Checkbox)({
  bgcolor: 'transparent !important',
  '&.Mui-checked': {
    color: '#55BC8A !important',
  },
  width: '20px !important',
  height: '20px !important',
});

export function StyledCheckbox(props) {
  const { checked, setChecked, msg } = props;

  const handleChange = event => {
    setChecked(event.target.checked);
  };

  return (
    <Stack direction='row' spacing={1} alignItems='center'>
      <Checkbox
        sx={{
          bgcolor: 'transparent !important',
          '&.Mui-checked': {
            color: '#55BC8A !important',
          },

          width: '20px !important',
          height: '20px !important',
        }}
        disableRipple
        size='small'
        checked={checked}
        onChange={handleChange}
      />
      <Box
        sx={{
          fontWeight: 600,
          fontStyle: 'normal',
          color: '#404E68',
          fontSize: '12px',
          lineHeight: 1.67,
        }}
      >
        {msg}
      </Box>
    </Stack>
  );
}

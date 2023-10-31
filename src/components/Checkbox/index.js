import { useEffect, useState } from 'react';
import { Checkbox, Stack, Box } from '@mui/material';

export function StyledCheckbox(props) {
  const { checked, setChecked, msg } = props;

  const handleChange = event => {
    setChecked(event.target.checked);
  };

  return (
    <Stack direction='row' spacing={1}>
      <Checkbox
        sx={{
          bgcolor: 'transparent !important',
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

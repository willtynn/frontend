import { Stack, Box, RadioGroup, FormControlLabel } from '@mui/material';

export function StyledRadio(props) {
  const { data } = props;

  const handleChange = event => {
    setChecked(event.target.checked);
  };

  return (
    <Stack direction='row' spacing={1} alignItems='center'>
      <RadioGroup row>
        <FormControlLabel value='female' control={<Radio />} label='Female' />
        <FormControlLabel value='male' control={<Radio />} label='Male' />
        <FormControlLabel value='other' control={<Radio />} label='Other' />
        <FormControlLabel
          value='disabled'
          disabled
          control={<Radio />}
          label='other'
        />
      </RadioGroup>
    </Stack>
  );
}

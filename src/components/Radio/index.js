import { Stack, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { styled } from '@mui/system';

export const StyledRadio = styled(Radio)({
  bgcolor: 'transparent !important',
  height: '20px',
  width: '20px',
  marginRight: '4px',
  marginLeft: '6px',
  '&.Mui-checked': {
    color: '#55BC8A !important',
  },
});

export const StyledFormControlLabel = styled(FormControlLabel)({
  '& span.MuiTypography-root': {
    fontWeight: 600,
    fontStyle: 'normal',
    color: '#404E68',
    fontSize: '12px',
    lineHeight: 1.67,
  },
});

export function StyledRadioGroup(props) {
  const { data, value, setValue } = props;


  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  return (
    <Stack direction='row' spacing={1} alignItems='center'>
      <RadioGroup row value={value} onChange={handleChange}>
        {data &&
          data.map((value, index) => {
            return (
              <StyledFormControlLabel
                value={value[0]}
                control={<StyledRadio size='small' disableRipple />}
                label={value[1]}
              />
            );
          })}
      </RadioGroup>
    </Stack>
  );
}

import { useState } from 'react';
import {
  TextField,
  Autocomplete,
  InputAdornment,
  Box,
  Stack,
  Typography,
  Select,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { styled } from '@mui/system';
import { CustomDefaultChip } from '../Chip';
import ChipDeleteIcon from '@/assets/ChipDeleteIcon.svg';
import { fontFamily } from '@/utils/commonUtils';

export const StyledTextFiled = styled(TextField)(() => ({
  legend: {
    display: 'none',
  },
  width: '100%',
  '& .MuiOutlinedInput-root.MuiInputBase-root': {
    background: '#FFFFFF',
    '& .MuiOutlinedInput-input.MuiInputBase-input': {
      '&:hover': {
        border: '1px solid #000',
      },
      '&:focus': {
        border: '2px solid #0072E5',
      },
      border: '1px solid rgba(0, 0, 0, 0.23)',
      borderRadius: '5px',
      padding: '11px 8px !important',
    },
    '& fieldset': {
      border: 'none',
    },
  },
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: '#FFFFFF',
    borderRadius: '20px',
    boxSizing: 'border-box',
    height: '40px',
    fontFamily: fontFamily,
    color: '#262E35',
    padding: '0px 0px 0px 15px !important',
    '& fieldset': {
      border: '1px solid rgba(0, 0, 0, 0.23)',
      borderRadius: '20px',
    },
    '& .MuiOutlinedInput-input.MuiInputBase-input': {
      padding: '11px 12px 11px 0px !important',
    },
    '& input': {
      height: '18px',
    },
  },
}));

export const KubeTextField = styled(TextField)(({ theme }) => ({
  legend: {
    display: 'none',
  },
  width: '100%',
  '& .MuiOutlinedInput-root.MuiInputBase-root': {
    background: '#FFFFFF',
    '& .MuiOutlinedInput-input.MuiInputBase-input': {
      '&:hover': {
        border: '1px solid #000',
      },
      '&:focus': {
        border: '1px solid #55bc8a',
        boxShadow: '0 4px 8px 0 rgba(85,188,138,.2)',
      },
      border: '1px solid rgba(0, 0, 0, 0.23)',
      borderRadius: '4px',
      padding: '6px 12px !important',
      fontSize: '12px',
      fontWeight: 600,
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 1.67,
      letterSpacing: 'normal',
      color: '#36435c',
    },
    '& fieldset': {
      border: 'none',
    },
  },
  '& .Mui-error': {
    '& .MuiOutlinedInput-input.MuiInputBase-input': {
      border: '1px solid #CA2621 !important',
      '&:focus': {
        boxShadow: 'none !important',
      },
    },
  },
}));

export const StyledAutocomplete = styled(Autocomplete)(
  ({ height, padding }) => ({
    '& .MuiOutlinedInput-root.MuiInputBase-root': {
      height: height,
      padding: 0,
      background: '#FFFFFF',
      '& .MuiOutlinedInput-input.MuiInputBase-input': {
        padding: padding,
      },
    },
  })
);

export const StyledSelect = styled(Select)(
  ({width}) => ({
    borderRadius: '35px',
    height: '50px',
    width: width,
    background: '#FFFFFF',
  })
);

//DateTimePicker 在未来可能merge一个修改，支持圆角
export const StyledDateTimePicker = styled(DateTimePicker)(
  ({ width }) => ({
    height: '50px',
    width: width,
    background: '#FFFFFF',
  })
);

export const KubeEndAdornmentTextField = styled(TextField)(({}) => ({
  '& input:placeholder-shown': {
    fontWeight: 400,
    color: '#79879c',
    fontSize: '12px',
    lineHeight: 1.67,
  },
  '& .MuiOutlinedInput-root': {
    background: '#FFFFFF',
    boxSizing: 'border-box',
    fontFamily: fontFamily,
    fontSize: '12px',
    fontWeight: 600,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.67,
    letterSpacing: 'normal',
    color: '#262E35',
    height: '32px',
    '& .MuiOutlinedInput-input.MuiInputBase-input': {
      padding: '6px 12px !important',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: '1px solid rgba(0, 0, 0, 0.23)',
  },
  '& :hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #000',
    },
  },
  '& .Mui-focused': {
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #55bc8a !important',
      boxShadow: '0 4px 8px 0 rgba(85,188,138,.2)',
    },
  },
  '& .Mui-error': {
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #CA2621 !important',
      boxShadow: 'none',
    },
  },
}));

export function ChipTextField(props) {
  const {
    contentList,
    setContentList,
    isDuplicate,
    sx,
    startAdornment = null,
    endAdornment = null,
  } = props;
  const [value, setValue] = useState('');

  const onDelete = deleteItemIndex => {
    setContentList(
      contentList.filter((item, index) => index !== deleteItemIndex)
    );
  };

  const handleInputChange = e => {
    setValue(e.target.value);
  };

  const handleKeyDown = e => {
    // Backspace
    if (value == '' && e.keyCode == 8) {
      if (contentList.length == 0) return;
      e.preventDefault();
      let list = JSON.parse(JSON.stringify(contentList));
      list.pop();
      setContentList(list);
      setValue('');
    }
    if (typeof e.target.value == 'string' && e.keyCode == 13) {
      if (e.target.value.length == 0) return;
      const realValue = e.target.value;
      if (!isDuplicate(realValue)) {
        setContentList([...contentList, realValue]);
      }
      setValue('');
    }
  };

  return (
    <CustomTextField
      onChange={handleInputChange}
      onBlur={e => {
        if (e.target.value.length == 0) return;
        if (!isDuplicate(e.target.value)) {
          setContentList([...contentList, e.target.value]);
        }
        setValue('');
      }}
      onKeyDown={handleKeyDown}
      value={value}
      sx={{
        '&.MuiFormControl-root.MuiTextField-root .MuiInputBase-root.MuiOutlinedInput-root':
          {
            flexFlow: 'wrap',
            paddingY: '4px',
            '& input': {
              flexGrow: 1,
              width: '10%',
            },
            bgcolor: '#EFF4F9',
          },
        '& .Mui-focused': {
          bgcolor: '#FFFFFF !important',
        },

        ...sx,
      }}
      InputProps={{
        startAdornment: (startAdornment !== null
          ? [<InputAdornment position='start'>{startAdornment}</InputAdornment>]
          : []
        ).concat(
          contentList.map((value, index) => {
            return (
              <CustomDefaultChip
                sx={{
                  marginY: '6px',
                }}
                label={value}
                index={index}
                onDelete={onDelete.bind(this, index)}
                key={index}
                deleteIcon={<ChipDeleteIcon />}
              />
            );
          })
        ),
        endAdornment:
          endAdornment !== null ? (
            <InputAdornment position='end'>{endAdornment}</InputAdornment>
          ) : null,
      }}
    />
  );
}

export function KubeInput(props) {
  const { label, decription, requried, errorMessage, ...others } = props;

  return (
    <Box>
      <Stack direction='column' spacing={0.5}>
        <Stack direction='row' spacing={1}>
          <Typography
            sx={{
              color: '#36435c',
              fontSize: '12px',
              lineHeight: 1.67,
              fontWeight: 400,
            }}
          >
            {label}
          </Typography>
          <Typography
            sx={{
              color: '#ca2621',
              fontSize: '12px',
              lineHeight: 1.67,
              fontWeight: 400,
            }}
          >
            *
          </Typography>
        </Stack>
        <KubeTextField {...others} />
        {others.error === true ? (
          <Box
            sx={{
              fontSize: '12px',
              fontWeight: 400,
              fontStyle: 'normal',
              fontStretch: 'normal',
              lineHeight: 1.67,
              letterSpacing: 'normal',
              color: '#CA2621',
            }}
          >
            {errorMessage}
          </Box>
        ) : (
          <Box
            sx={{
              fontSize: '12px',
              fontWeight: 400,
              fontStyle: 'normal',
              fontStretch: 'normal',
              lineHeight: 1.67,
              letterSpacing: 'normal',
              color: '#79879c',
            }}
          >
            {decription}
          </Box>
        )}
      </Stack>
    </Box>
  );
}

export const KubeSelect = styled(Select)({
  '& .MuiSelect-select': {
    border: '1px solid rgba(0, 0, 0, 0.23) !important',
  },
  '& fieldset': {
    display: 'none',
  },
  '& .MuiSelect-select.MuiSelect-outlined.MuiOutlinedInput-input': {
    fontWeight: 600,
    fontStyle: 'normal',
    fontStretch: 'normal',
    letterSpacing: 'normal',
    color: '#36435c',
    fontSize: '12px',
    lineHeight: '1.67',
    padding: '0 14px',
    height: '33px',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    borderRadius: '0px 4px 4px 0px',
    backgroundColor: '#FFFFFF',
  },
});

import { useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { styled } from '@mui/system';
import { CustomDefaultChip } from '../Chip';
import ChipDeleteIcon from '@/assets/ChipDeleteIcon.svg';

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
    boxSizing: 'border-box',
    height: '40px',
    // fontFamily: 'Open Sans',
    // fontStyle: 'normal',
    // fontWeight: '400',
    // fontSize: '16px',
    // lineHeight: '24px',
    color: '#262E35',
    // padding: "0px",
    paddingLeft: '14px',
    // paddingRight: '14px',
    padding: '0px 0px 0px 0px !important',
    '& fieldset': {
      border: '1px solid rgba(0, 0, 0, 0.23)',
      borderRadius: "20px"
    },
    '& .MuiOutlinedInput-input.MuiInputBase-input': {
      // '&:hover': {
      //   border: '1px solid #000',
      // },
      // '&:focus': {
      //   border: '2px solid #0072E5',
      // },
      // border: '1px solid rgba(0, 0, 0, 0.23)',
      borderRadius: '10px',
      padding: '11px 15px !important',
    },
    '& input': {
      height: '18px',
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

export function ChipTextField(props) {
  const { contentList, setContentList, isDuplicate } = props;
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
          },
      }}
      InputProps={{
        startAdornment: contentList.map((value, index) => {
          return (
            <CustomDefaultChip
              sx={{
                marginY: '4px',
              }}
              label={value}
              index={index}
              onDelete={onDelete.bind(this, index)}
              key={index}
              deleteIcon={<ChipDeleteIcon />}
            />
          );
        }),
      }}
    />
  );
}

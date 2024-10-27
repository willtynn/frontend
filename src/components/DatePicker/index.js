import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { fontFamily } from '../../utils/commonUtils';
import Calendar from '@/assets/Calendar.svg';

export function KubeDatePicker(props) {
  const { value, setValue } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={['DateTimePicker']}
        sx={{
          overflow: 'hidden !important',
          paddingTop: "4px !important"
        }}
      >
        <DateTimePicker
          format='YYYY-MM-DD HH:mm:ss'
          sx={{
            '& input': {
              padding: '6px 12px !important',
              fontSize: '12px',
              fontFamily: fontFamily,
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 1.67,
              color: '#36435c',
            },
            '& .Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid #55bc8a !important',
                boxShadow: '0 4px 8px 0 rgba(85,188,138,.2)',
              },
            },
          }}
          components={{
            OpenPickerIcon: Calendar,
          }}
          value={value}
          onChange={newValue => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}


export function KubeDateViewer(props) {
  const { value, width=null, setValue=null, readonly=true } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={['DateTimePicker']}
        sx={{
          overflow: 'hidden !important',
          paddingTop: "4px !important",
          width: width ? width : '100%'
        }}
      >
        <DateTimeField
          format='YYYY-MM-DD HH:mm:ss'
          sx={{
            '& input': {
              padding: '6px 12px !important',
              fontSize: '12px',
              fontFamily: fontFamily,
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: 1.67,
              color: '#36435c',
            },
            '& .Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid #55bc8a !important',
                boxShadow: '0 4px 8px 0 rgba(85,188,138,.2)',
              },
            },
          }}
          InputProps={
            width ? {
              sx: {
                width: width,
              },
            } : null
          }
          variant='standard'
          value={value}
          readOnly={readonly}
          onChange={newValue => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
import { NormalFont } from '@/components/Fonts';
import { Button, ThemeProvider, createTheme } from '@mui/material';

const themeButton = createTheme({
  //用于控制select框外面最外层的outlinedInput
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            border: '1px solid #6D98EE',
            color: '#6D98EE',
            backgroundColor: '#FFFFFF',
          },
          '&:active': {
            backgroundColor: '#E8EDFB',
            border: '1px solid #AEC6F6',
            color: '#6D98EE',
          },
        },
      },
    },
  },
});

export default function BackButton(props) {
  const { id, ...other } = props;
  return (
    <ThemeProvider theme={themeButton}>
      <Button
        id={id}
        data-selenium-id={id}
        sx={{
          width: '114px',
          height: '41px',
          color: '#0052CC',
          backgroundColor: '#FFFFFF',
          borderRadius: '5px',
          border: '1px solid #0052CC',
          ...NormalFont,
          '&.Mui-disabled': {
            color: '#98A7B6',
            backgroundColor: '#F1F3F5',
            border: '1px solid #98A7B6',
          },
          textTransform: 'none',
        }}
        disableRipple
        // {...other}
      >
        {/* {props.children} */}
      </Button>
    </ThemeProvider>
  );
}

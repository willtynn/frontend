import { NormalFont } from '@/components/Fonts';
import { Button, ThemeProvider, createTheme } from '@mui/material';

const themeButton = createTheme({
  //用于控制select框外面最外层的outlinedInput
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#6D98EE',
          },
          '&:active': {
            backgroundColor: '#113D95',
          },
        },
      },
    },
  },
});

export default function NextButton(props) {
  const { id, ...other } = props;
  return (
    <ThemeProvider theme={themeButton}>
      <Button
        id={id}
        data-selenium-id={id}
        sx={{
          width: '114px',
          height: '41px',
          color: '#FFFFFF',
          backgroundColor: '#0052CC',
          borderRadius: '5px',
          ...NormalFont,
          '&.Mui-disabled': {
            color: '#98A7B6',
            backgroundColor: '#DFE4E8',
          },
          textTransform:'none'
        }}
        disableRipple
        {...other}
      >
        {/* {props.children} */}
      </Button>
    </ThemeProvider>
  );
}

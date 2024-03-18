import { useCallback, useEffect, useState } from 'react';
import BootstrapStepper from './MyStepper';
import { Box} from '@mui/material';
import debounce from 'lodash/debounce';
function CreateAndUpdateHeader(props) {
  const { id, activeStep, steps } = props;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [scrollLeft, setScrollLeft] = useState(0);
  const headerContainer = {
    height: '60px',
    width: '100%',
    minWidth:'1041px',
    background: '#F7FAFC',
    boxShadow: 'inset 0px -1px 0px #E3E8EE',
    display: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'center',
    top: '56px',
    zIndex: 10,
    left: `-${scrollLeft}px`
  };
  const headerLayout = {
    margin: 'auto auto',
    height: '32px',
    width:
      windowWidth>=1440 ? (steps.length >= 4 ? '1296px' : '1001px') : '90%',
    // width:'1001px'  //modified
  };

  const handleScroll = useCallback(
    debounce(() => {
      setScrollLeft(document.documentElement.scrollLeft || document.body.scrollLeft);
    }),
    []
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('scroll', handleScroll);
    // 添加 resize 事件的监听器，并在组件卸载时进行清理
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Box
      sx={headerContainer}
      id={`${id}_containerBox`}
      data-selenium-id={`${id}_containerBox`}
    >
      <Box
        sx={headerLayout}
        id={`${id}_layoutBox`}
        data-selenium-id={`${id}_layoutBox`}
      >
        <BootstrapStepper
          id={`${id}_stepper`}
          activeStep={activeStep}
          steps={steps}
        ></BootstrapStepper>
      </Box>
    </Box>
  );
}
export default CreateAndUpdateHeader;

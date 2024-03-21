// import Footer from '@/components/Footer';
// import Header from '@/components/Header/Header';
import { Box } from '@mui/material';
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  Component,
} from 'react';
import debounce from 'lodash/debounce';
import ReactDOM from 'react-dom';
// import { AllCentered } from './CommonStyle';

export const GetPopperBottomContext = React.createContext({setValue:()=>{}});

export const AllCentered = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

class DocBox extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.debouncedSetDocHeight = debounce(this.props.setDocHeight, 200);
  }

  componentDidMount() {
    const { setDocHeight } = this.props;
    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      // onResize({ width, height });
      this.debouncedSetDocHeight(height);
      // setDocHeight(height);
    });
    observer.observe(this.ref.current);
  }

  componentWillUnmount() {
    // 取消防抖函数
    this.debouncedSetDocHeight.cancel();
  }

  render() {
    return <div ref={this.ref}>{this.props.children}</div>;
  }
}

export default function MainPageFramework(props) {
  const { id, stepper = null, contentSX = {}, actionBar = null } = props;
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [showNav, setShowNav] = useState(
    document.documentElement.scrollHeight <= window.innerHeight
  );
  const [docHeight, setDocHeight] = useState(null);
  const [popperBottom, setPopperBottom] = useState(0);
  const [heightDifference, setHeightDefference] = useState(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [disableScrollTop, setDisableScrollTop] = useState(null);
  
  const handleScroll = useCallback(
    debounce(() => {
      setScrollTop(
        document.documentElement.scrollTop || document.body.scrollTop
      );
    }),
    []
  );
  const handleResize = () => {
    setWindowHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setShowNav(
      docHeight <= windowHeight ||
        docHeight - (scrollTop + windowHeight + 1) <= 0
    );
  }, [docHeight, windowHeight, scrollTop]);

  useEffect(() => {
    if (docHeight && popperBottom) {
      if (popperBottom + 160 >= docHeight) {
        setHeightDefference(popperBottom + 160 - docHeight);
      }else if(popperBottom+92>window.innerHeight){
        window.scrollTo(0, popperBottom+92-window.innerHeight); //这里是因为popperBottom已经加上了scrollTop
        setTimeout(() => {
          setDisableScrollTop(
            document.documentElement.scrollTop || document.body.scrollTop
          );
        }, 100);
      }
    }
    if (!popperBottom) {
      setHeightDefference(null);
      setTimeout(() => {
        setDisableScrollTop(null);
      }, 100);
    }
  }, [popperBottom]);

  useEffect(() => {
    if (heightDifference) {
      window.scrollTo(0, popperBottom);
      setTimeout(() => {
        setDisableScrollTop(
          document.documentElement.scrollTop || document.body.scrollTop
        );
      }, 100);
    }
  }, [heightDifference]);
  useEffect(() => {
    if (disableScrollTop) {
      document.body.style.overflow = 'hidden'; 
    }else{
      document.body.style.overflow = 'auto'; 
    }
  }, [disableScrollTop]);
  return (
    <GetPopperBottomContext.Provider value={{ setValue: setPopperBottom }}>
      <DocBox setDocHeight={setDocHeight}>
        {/* header 需要注意的header是fixed，它并不会占用文档的高度 */}
        {stepper}
        {/* 内容区，也是文档高度的贡献区 */}
        <Box sx={{ backgroundColor: '#ffffff', minHeight: window.innerHeight,width:'100%',minWidth:'1041px' }}>
          {/* fake header 这两个box是用来顶替上面两个fixed的header的，因为我们希望两个header占领一部分的文档的高度 */}
          {/* <Box id='my-header' sx={{ width: '100%', height: '56px' }} /> */}
          {/* {stepper && <Box sx={{ width: '100%', height: '60px' }} />} */}
          {/* 真正的内容区 */}
          <Box
            sx={{
              ...contentSX,
              padding: '20px 0px 32px 0px',
              ...AllCentered,
              paddingTop: stepper ? '10px' : '59px',
            }}
          >
            {props.children}
          </Box>
          {heightDifference && <Box sx={{ height: heightDifference }} />}
          {/* fake footer ,与header同理 */}
          {actionBar && <Box sx={{ width: '100%', height: '60px' }} />}
          {/* <Box sx={{ width: '100%', height: '68px' }} /> */}
          <Box sx={{ height: '68px' }} />
        </Box>
        {/* Footer footer与header一样都是fixed 的，它并不会占用文档的高度 */}
        {actionBar && (
          <Box
            sx={{
              position: 'fixed',
              bottom: '0px',
              width: '97.3%',
              // zIndex:2023 //higher than DatePicker zIndex
            }}
          >
            {actionBar}
          </Box>
        )}
      </DocBox>
    </GetPopperBottomContext.Provider>
  );
}

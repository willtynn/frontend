import {
    Alert,
    Box,
    Link,
    Snackbar,
    SnackbarContent,
    Stack,
    Typography,
  } from '@mui/material';
  import React, { useEffect, useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { closeSnackbar } from '../../actions/snackbarAction';
  import { FormattedMessage } from 'react-intl';
  import SuccessIcon from '../../assets/popup/success.svg';
  import InfoIcon from '../../assets/popup/info.svg';
  import WarningIcon from '../../assets/popup/warning.svg';
  import WarningIconM1S2 from '../../assets/popup/warningm1s2.svg';
  import ErrorIcon from '../../assets/popup/error.svg';
  import Slide from '@mui/material/Slide';
  import { handleLinkWithoutProtocol } from '../../utils/commonUtils';
  import { fontFamily } from "@/utils/commonUtils";
  
  function TransitionRight(props) {
    return <Slide {...props} direction='left' />;
  }
  
  const icons = {
    info: <InfoIcon />,
    success: <SuccessIcon />,
    error: <ErrorIcon />,
    warning: <WarningIconM1S2 />,
    plain: null,
  };
  
  const titles = {
    info: 'Information',
    error: 'Error',
    success: 'Successful',
    warning: 'Warning',
    plain: null,
  };
  
  export const SEVERITIES = {
    info: 'info',
    error: 'error',
    success: 'success',
    warning: 'warning',
    plain: null,
  };
  
  function SnackbarBody(props) {
    const { title, content, action } = props;
    return (
      <Box 
      sx={{
        paddingTop: '2px',
        height: '56px',
        width: '482px',//zhaoyicheng modify m1s2 20230614
      }}>
        {/* 纵向布局，右侧的文字 */}
        <Stack
          spacing={'12px'}
        >
          <Typography
            color={(title==='Warning')?'#D97706':'Gray600.main'}
            fontFamily={'Inter'}
            fontWeight={600}
            fontSize='14px'
            lineHeight='17px'
            fontStyle='normal'
          >
            {title}
          </Typography>
          <Typography
            color='#596A7C'
            fontWeight={400}
            fontSize='14px'
            lineHeight='17px'
            fontStyle='normal'
          >
            {content}
          </Typography>
          {action?.actionTitle && (
            <Link
              color='primary'
              href={handleLinkWithoutProtocol(action.actionLink)}
            >
              {action.actionTitle}
            </Link>
          )}
        </Stack>
      </Box>
    );
  }
  
  /**
   * 【注意】：
   *    已经在全局创建了这个组件，在需要的地方直接dispatch就行了
   *    不需要自己创建组件了，不然可能出现两次弹窗
   * ---------------------------------------
   * 功能说明：
   * 支持使用Intl的底部弹窗，
   * 要求：通过dispatch(setSnackbarMessageAndOpen(id: string,
   *                                            values: obj,
   *                                            severity: SEVERITIES,
   *                                            position: obj))来显示
   *                                        position 的格式直接参考reducer中的
   * SEVERITIES为最底下的字符串，为方便维护用Obj模拟了枚举的方式
   * 其中id需要对应到intl的id，例如en.js中的
   * values的格式是：
   * {
   *   key1: value1,
   *   key2: value2,
   *   ...
   * }
   * 这其中的key1、key2需要与你在en.js中对应字符串中声明的key名称一致，
   * 【注意】：
   *    而value1、value2
   *      【可以是】直接的字符串，
   *      【也可以是】en.js中的某个id，
   *      【也可以是】<FormattedMessage/>组件
   */
  export default function CommonSnackBar(props) {
    const { sx, ...other } = props;
    const dispatch = useDispatch();
    const { open, messageId, values, severity, position, action, key } = useSelector(
      state => {
        return {
          open: state.Snack.open,
          messageId: state.Snack.messageId,
          values: state.Snack.values,
          severity: state.Snack.severity,
          position: state.Snack.position,
          action: state.Snack.action,
        };
      }
    );
  
    // 真正展示出来的values，会通过intl取一遍值
    const [displayValues, setDisplayValues] = useState({});
    useEffect(() => {
      // 通过values的变化来修改需要展示的values，直接用values每个值去寻找对应的字符串
      let temp = {};
      for (const key in values) {
        if (typeof values[key] === 'object') {
          // 如果传入的value本身就是FormattedMessage的话，则不需要再次构造
          // 这段代码是为了兼容以往的一些实现，因此直接传入了FormattedMessage也是可行的
          temp[key] = values[key];
          continue;
        }
        // 传入的并非FormattedMessage，自动构造成他
        temp[key] = (
          <FormattedMessage id={values[key]} defaultMessage={values[key]} />
        );
      }
      setDisplayValues(temp);
    }, [values]);
  
    return (
      <Snackbar
        key={messageId}
        anchorOrigin={position} // { vertical: "top", horizontal: "center" }
        open={open}
        autoHideDuration={3000}
        TransitionComponent={TransitionRight}
        onClose={() => {
          dispatch(closeSnackbar());
        }}
        sx={{
          ...sx,
          top: '76px !important', // 不知为何使用&.MuiSnackbar-anchorOriginTopRight无效
          right: '36px !important',
          maxWidth: '624px',
          
        }}
        {...other}
      >
        {severity ? ( // 需要根据severity变化颜色和图表等内容
          <Alert
            severity={severity}
            icon={icons[severity]}
            sx={{
              borderRadius: '5px',
              //boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.11)',
              boxShadow: '0px 12px 24px rgba(38, 46, 53, 0.12)',
              backgroundColor: severity==='warning'?'#FFFBEB':'none',
              border: severity==='warning'?'1px solid #FFCA7B':'none',
            }}
          >
            <SnackbarBody
              title={titles[severity]}
              content={<FormattedMessage id={messageId} values={displayValues} />}
              action={action}
            />
          </Alert>
        ) : (
          <SnackbarContent
            className='snackbar-primary'
            message={<FormattedMessage id={messageId} values={displayValues} />}
          />
        )}
      </Snackbar>
    );
  }
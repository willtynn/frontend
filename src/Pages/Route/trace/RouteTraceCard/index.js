/**
 * src\Pages\Route\trace\RouteTraceCard\index.js
 */
import React from 'react';
import styled from "@emotion/styled"
import { fontFamily } from "@/utils/commonUtils";
import './index.css';
import {calculateDuration} from '../functions/func.js'

import {
    Card,
    CardContent,
    Typography,
    Box,
    Stack,
    Divider,
    CardActionArea
  } from "@mui/material";
import {
  SmallLightFont,
  NormalFontBlack,
} from "@/components/Fonts";


import { useIntl } from 'react-intl';
//fuctions-start
//#region

function getTime(stamp){
  const date = new Date(stamp / 1000);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return hour.toString().padStart(2,0) + ':' + minute.toString().padStart(2,0) + ':' + second.toString().padStart(2,0);
}


//#endregion
//fuctions-end


export function RouteTraceCard(props) {
  const { nodeID, traceID, spanNum, timeStamp, duration, progress, action} = props;

  const intl = useIntl();


  function getDate(stamp){
    const date = new Date(stamp / 1000);
    //如果是今天或者昨天，直接返回是哪天，否则返回具体日期
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (24 * 3600 * 1000));
    if(days === 0){
      return intl.messages["popWindowToday"];
    }else if(days === 1){
      return intl.messages["popWindowYesterday"];
    }else{
      return date.toLocaleDateString();
    }
  }
  
  function calculateTimeInterval(stamp){
    const now = new Date();
    const time = new Date(stamp / 1000);
    const diff = now.getTime() - time.getTime();
    const days = Math.floor(diff / (24 * 3600 * 1000));
    if(days > 0){
      let result = `${days} ` + intl.messages["popWindowDaysAgo"];
      return result;
    }
    const leave1 = diff % (24 * 3600 * 1000);
    const hours = Math.floor(leave1 / (3600 * 1000));
    if(hours > 0){
      let result = `${hours} ` + intl.messages["popWindowHoursAgo"];
      return result;
    }
    const leave2 = leave1 % (3600 * 1000);
    const minutes = Math.floor(leave2 / (60 * 1000));
    if(minutes > 0){
      let result = `${minutes} ` + intl.messages["popWindowMinutesAgo"];
      return result;
    }
    const leave3 = leave2 % (60 * 1000);
    const seconds = Math.round(leave3 / 1000);
    if(seconds > 0){
      let result = `${seconds} ` + intl.messages["popWindowSecondsAgo"];
      return result;
    }
    return 'NaN';
  }

  const styleSpanNum = 
    {
      border: 1, 
      borderColor: 'grey.500',
      borderRadius: '3px',
      bgcolor: 'grey.100',
      height: '20px',
      width: (47 + (Math.log(spanNum) / Math.log(10) * 8))
    }
  const styleSpanNumFont =
    {
      paddingLeft: "3px"
    }
  const styleSpanActionArea =
    {
      height: "20px", 
      width: (47 + (Math.log(spanNum) / Math.log(10) * 8))
    }
  const styleTime =
    {
      right: 0,
    }
  
  //fonts-start
  //#region
  const NormalFontGreen = styled(Typography)({
    color: 'var(--gray-500, #14A1A6)',
    fontSize: '14px',
    fontFamily: fontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '16px',
  });

  const SmallLightFontGreen = styled(Typography)({
    color: 'var(--gray-500, #14A1A6)',
    fontSize: '12px',
    fontFamily: fontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '16px',
  });
  //#endregion
  //fonts-end

  const leftDiv = React.useRef(null);
  const rightDiv = React.useRef(null);
  const progressStack = React.useRef(null);

  React.useEffect(() => {
    if(leftDiv.current && rightDiv.current && progressStack.current){
      let length = progressStack.current.offsetWidth - 30;
      leftDiv.current.style.width = (progress / 100 * length) + 'px';
      rightDiv.current.style.width = ((100 - progress) / 100 * length) + 'px';
      //TODO:在用户改变浏览器窗口大小时（尤其是扩大时），条不会随之伸长。
    }
  }, [])

  return (
    <Card ref={progressStack} className="card">
      <CardContent>
        <Stack direction="row">
          <div ref={leftDiv} style={{background: "rgba(20, 161, 166, 0.65)", height: "15px"}}></div>
          <div ref={rightDiv} style={{background: "rgba(236,236,236,1)", height: "15px"}}></div>
        </Stack>

        <div className='space1'/>

        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={1}>
            <NormalFontBlack>
              {nodeID}
            </NormalFontBlack>
            <SmallLightFont>
              {traceID}
            </SmallLightFont>
          </Stack>
          <SmallLightFont>
            {calculateDuration(duration)}
          </SmallLightFont>
        </Stack>

        <div className='space2'/>

        <Stack className='middle-box' direction="row" spacing={1} justifyContent="space-between">
          <CardActionArea style={styleSpanActionArea} onClick={action}>
            <Box sx={styleSpanNum}>
              <SmallLightFont style={styleSpanNumFont}>
                {spanNum} Span{spanNum > 1 ? 's' : ''}
              </SmallLightFont>
            </Box>
          </CardActionArea>
          <Box className='time' sx={styleTime}>
            <Stack direction="row" justifyContent="right">
              <NormalFontGreen>
                {getDate(timeStamp)}
              </NormalFontGreen>
              <Divider orientation="vertical" sx={{ width: "5px" }}/>
              <NormalFontGreen>
                {getTime(timeStamp)}
              </NormalFontGreen>
            </Stack>
            <Stack direction="row" justifyContent="right">
              <SmallLightFontGreen>
                {calculateTimeInterval(timeStamp)}
              </SmallLightFontGreen>
            </Stack>
          </Box>
        </Stack>
        
      </CardContent>
    </Card>
  );
}



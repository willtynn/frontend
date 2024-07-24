import { Box, Stack, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import { fontFamily } from "../../utils/commonUtils";
export const SERVICE_STATUS = {
  PUBLISH: 1,
  RUN: 2,
  ABNORMAL: 3,
  STOP: 4
}
const iconStyle = {
  width: '40px',
  height: '40px',
  padding: '6px',
  borderRadius: '6px',
  color: '#fff'
}
export default function ServiceStatusBox({ status, title }) {
  return (
    <Box sx={{
      backgroundColor: 'rgb(243,246,251)',
      padding: '16px',
      height: '100%',
      flexGrow:1
    }}>
      <Stack sx={{
        flexDirection: 'row',
        gap: '18px'
      }} >
        {
          status === SERVICE_STATUS.PUBLISH ? <SendIcon sx={{ ...iconStyle, backgroundColor: 'rgb(36,166,220)' }} />
            : (status === SERVICE_STATUS.RUN ? <SlideshowIcon sx={{ ...iconStyle, backgroundColor: 'rgb(148,130,214)' }} />
              : (status === SERVICE_STATUS.ABNORMAL ? <ReportProblemOutlinedIcon sx={{ ...iconStyle, backgroundColor: 'rgb(130,135,168)' }} />
                : <StopCircleOutlinedIcon sx={{ ...iconStyle, backgroundColor: 'rgb(33,193,150)' }} />))
        }
        <Stack>
          <Typography sx={{
            fontSize:'24px',
            fontWeight:500,
            lineHeight:1,
            width:'fit-content',
            fontFamily:fontFamily
          }}>
            {title}
          </Typography>
          <Typography sx={{
            fontSize:'16px',
            lineHeight:1,
            color:'rgb(13 56 99)',
            width:'fit-content',
            fontFamily:fontFamily
          }}>
            {
              status === SERVICE_STATUS.PUBLISH ? "已发布"
                : (status === SERVICE_STATUS.RUN ? "运行中"
                  : (status === SERVICE_STATUS.ABNORMAL ? "异常服务"
                    : "已停止"))
            }
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}
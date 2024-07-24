import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { fontFamily } from '../../utils/commonUtils';
export const SUMMARY_TYPE = {
  TABLE: 1,
  GRAPH: 2,
  CHART: 3
}
export default function SummaryBox({ title, children, type }) {
  return (
    <Stack sx={{
      padding: '16px',
      backgroundColor: '#fff',
      height: '100%',
      gap: '16px',
      boxShadow: '0px 4px 10px rgb( 46 38 61 / 0.12)',
      position: 'relative'
    }}>
      <Stack sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography sx={{
          color: 'rgb(13 56 99)',
          fontSize: '1.1rem',
          fontWeight: 500,
          fontFamily: fontFamily
        }}>
          {title}
        </Typography>
        <Stack sx={{
          flexDirection: 'row'
        }}>
          <IconButton sx={{
            padding: '4px'
          }}>
            <RefreshIcon />
          </IconButton>
          <IconButton sx={{
            padding: '4px'
          }}>
            <DescriptionOutlinedIcon />
          </IconButton>
        </Stack>
      </Stack>

      {
        children !== null && children !== undefined ? children :
          <Stack sx={{
            width: '100%',
            position: 'absolute',
            bottom: '20%',
            left: '50%',
            translate: '-50%'
          }}>
            {/*<Box>*/}
            {/*  <img width={'30%'} style={{ maxWidth: '100px' }} src={type === SUMMARY_TYPE.TABLE ? '/NoData-Table.svg' : '/NoData.svg'} />*/}
            {/*</Box>*/}
            <Typography>暂无数据</Typography>
          </Stack>
      }

    </Stack>
  )
}
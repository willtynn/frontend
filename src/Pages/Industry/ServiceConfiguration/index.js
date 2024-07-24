import { Box, Paper, Stack, Typography } from "@mui/material";
import { fontFamily } from "../utils/commonUtils";
import { AddButton } from "../components/StyledButton/AddButton";
import SearchInput from "../components/StyledInput/SearchInput";
import ConfigurationTable from "./ConfigurationTable";

export default function ServiceConfiguration() {
  return (
    <Paper sx={{
      boxShadow: '0px 4px 10px rgb( 46 38 61 / 0.12)',
      overflow: 'hidden',
      backgroundColor: '#fff'
    }}>
      <Stack sx={{
        padding: '24px',
        gap: '24px',
      }}>
        <Stack>
          <Typography sx={{
            width: 'fit-content',
            color: '#183177',
            fontSize: '1.125rem',
            fontWeight: 600,
            fontFamily: fontFamily
          }}>
            服务配置
          </Typography>
        </Stack>
        <Stack sx={{
          flexDirection:'row',
          justifyContent:'flex-start',
          gap:'32px'
        }}>
          <Box sx={{
            minWidth:'250px'
          }}>
            <SearchInput/>
          </Box>
          <AddButton>添加服务</AddButton>
        </Stack>
        <Box sx={{
          overflowX:'auto'
        }}>
          <ConfigurationTable/>
        </Box>
      </Stack>
    </Paper>
  )
}
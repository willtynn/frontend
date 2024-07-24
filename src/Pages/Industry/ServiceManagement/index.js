import { Box, Paper, Stack, Typography } from "@mui/material";
import { fontFamily } from "../../../utils/commonUtils";
import ServiceListTable from "./ServiceListTable";
import { AddButton } from "../components/StyledButton/AddButton";
import SearchInput from "../components/StyledInput/SearchInput";
import { useState } from "react";
import ServiceAddModal from "./ServiceAddModal.js";

export default function ServiceManagement() {
  
  const [modalOpen, setModalOpen] = useState(false)
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
            服务管理
          </Typography>
        </Stack>
        <Stack sx={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          gap: '32px'
        }}>
          <Box sx={{
            minWidth: '250px'
          }}>
            <SearchInput />
          </Box>
          <AddButton onClick={() => setModalOpen(true)}>添加服务</AddButton>
          <ServiceAddModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        </Stack>
        <Box sx={{
          overflowX: 'auto'
        }}>
          <ServiceListTable />
        </Box>
      </Stack>
    </Paper>
  )
}
import { Stack } from "@mui/material";
import { Section1 } from "./Section1";
import { Section2 } from "./Section2";
import { Section3 } from "./Section3";
import {Box} from "@mui/system";

export default function IndustryOverview() {
  return (
    <Box sx={{
      flexGrow:1,
      height:'100%',
      overflowY: 'auto'
    }}>
      <Box sx={{
        padding: '0 24px 24px 24px',
        height:'100%'
      }}>
        <Stack sx={{
          gap: '24px',
          height:'100%',
        }}>
          <Section1 />
          <Section2 />
          <Section3 />
        </Stack>
      </Box>
    </Box>
  )
}
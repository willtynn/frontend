import { Stack } from "@mui/material";
import { RunStatus } from "./module/RunStatus";
import { CpuRank } from "./module/CpuRank";
import { MemRank } from "./module/MemRank";
import { ServiceList } from "./module/ServiceList";
import {Box} from "@mui/system";

import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

export default function IndustryOverview() {

  const layout = [
    { i: "aaa", x: 0, y: 0, w: 12, h: 3 },
    { i: "bbb", x: 0, y: 4, w: 6, h: 12 },
    { i: "bbbb", x: 6, y: 4, w: 6, h: 12 },
    { i: "ccc", x: 0, y: 17, w: 12, h: 15 }
  ];

  return (
      <Box sx={{
        padding: '0 24px 24px 24px',
        height:'100%',
        position: 'relative',
      }}>
        <ReactGridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={20}
          isBounded={true}
          isResizable={false}
          >
            <div key="aaa" style={{
              paddingLeft: '10px',
            }}
            onMouseDown={(e) => e.preventDefault()}
            ><RunStatus/></div>
            <div key="bbb" style={{
              paddingLeft: '10px',
            }}
            onMouseDown={(e) => e.preventDefault()}
            ><CpuRank/></div>
            <div key="bbbb" style={{
              paddingLeft: '10px',
            }}
            onMouseDown={(e) => e.preventDefault()}
            ><MemRank/></div>
            <div key="ccc" style={{
              paddingLeft: '10px',
            }}
            onMouseDown={(e) => e.preventDefault()}
            ><ServiceList/></div>
          </ReactGridLayout>
      </Box>
  )
}
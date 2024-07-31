import { Stack } from "@mui/material";
import { Section1 } from "./Section1";
import { Section2 } from "./Section2";
import { Section3 } from "./Section3";
import {Box} from "@mui/system";

import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

export default function IndustryOverview() {

  const layout = [
    { i: "aaa", x: 0, y: 0, w: 12, h: 3 },
    { i: "bbb", x: 0, y: 4, w: 12, h: 12 },
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
            ><Section1/></div>
            <div key="bbb" style={{
              paddingLeft: '10px',
            }}
            onMouseDown={(e) => e.preventDefault()}
            ><Section2/></div>
            <div key="ccc" style={{
              paddingLeft: '10px',
            }}
            onMouseDown={(e) => e.preventDefault()}
            ><Section3/></div>
          </ReactGridLayout>
      </Box>
  )
}
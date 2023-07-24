import React from "react";
import ReactDOM from "react-dom";
import DagreGraph from "dagre-d3-react";
import { nodes, links } from "./data";
import { Stack, Box } from "@mui/material";
import { App } from "./app";

import "./index.css";

function ServiceDependency() {
  return (
    <Stack>
    <div className="App">
      <DagreGraph
        nodes={nodes}
        links={links}
        rankdir="TB"
        width="800"
        height="1200"
        animate={1000}
        shape="circle"
        fitBoundaries
        onNodeClick={e => console.log(e)}
        onRelationshipClick={e => console.log(e)}
      />
    </div>
    <Box>
      <App></App>
    </Box>
    </Stack>
  );
}

export default ServiceDependency;
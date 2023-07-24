import React from "react";
import ReactDOM from "react-dom";
import { nodes, links } from "./data";
import { Stack, Box } from "@mui/material";
import { Canvas } from "./canvas";

const data = {
  invoked: [
    {
      id: "service_a",
      invoke_info: {
        time: "2023-07-24 16:00:00"
      }
    },
    {
      id: "service_b",
      invoke_info: {
        time: "2023-07-24 16:10:00"
      }
    }
  ],
  invoking: [
    {
      id: "service_c",
      invoke_info: {
        time: "2023-07-24 16:20:00"
      }
    },
    {
      id: "service_d",
      invoke_info: {
        time: "2023-07-24 16:30:00"
      }
    }
  ]
}



function ServiceDependency() {

  const transformData = (data) => {
    let nodes = []
    let links = []
    nodes.push(data.invoked.concat(data.invoking).map(
      (item, index) => {
        return {
          id: item.id,
          label: item.id
        }
      }
    ))
  }

  return (
    <Box>
      <Canvas />
    </Box>
  );
}

export default ServiceDependency;
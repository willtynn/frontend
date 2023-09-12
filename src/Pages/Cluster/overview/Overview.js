import { useEffect, useState } from "react"
import { DAGCanvas } from "./canvas"
import { Box } from "@mui/material";

export default function ClusterOverview() {

  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    let tmpNodes = [];
    let tmpLinks = [];
    tmpNodes.push({
      id: "1",
      label: "node1"
    });
    tmpNodes.push({
      id: "2",
      label: "node2"
    });

    tmpLinks.push({
      source: "1",
      target: "2",
      label: "link_a"
    })

    setNodes(tmpNodes);
    setLinks(tmpLinks);

  }, []);

  return (
    <Box>
      <DAGCanvas nodes={nodes} links={links} />
    </Box>
  )
}

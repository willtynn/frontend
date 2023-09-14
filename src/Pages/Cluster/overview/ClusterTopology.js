import { ClusterCanvas } from './canvas';
import { Box, Stack } from '@mui/material';
import ArrowDown from '@/assets/ArrowDown.svg';
import ArrowUp from '@/assets/ArrowUp.svg';
import { useState, useEffect } from 'react';
export default function ClusterTopology(props) {
  const { clusterId, graph, handleNodeClick } = props;

  const [open, setOpen] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    let nodeSet = new Set();
    let tmpLinks = [];
    let tmpNodes = [];
    for(const link of graph) {
      nodeSet.add(link.srcId);
      nodeSet.add(link.desId);
      tmpLinks.push({
        source: link.srcId,
        target: link.desId,
      });
    }
    for(const node of nodeSet) {
      tmpNodes.push({
        id: node,
        label: node,
      });
    }
    setNodes(tmpNodes);
    setLinks(tmpLinks);
  }, [graph]);

  const handleClusterClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <Box
        onClick={handleClusterClick}
        sx={{
          cursor: 'pointer',
          borderRadius: '4px',
          height: '42px',
          bgcolor: 'red',
          p: '7px 14px 7px 11px',
        }}
      >
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Box
            sx={{
              borderRadius: '4px',
              height: '28px',
              minWidth: '64px',
              bgcolor: 'green',
              p: "0px 6px",
              fontFamily: "Open Sans",
              fontSize: "14px",
              lineHeight: "26px"
            }}
          >
            {clusterId}
          </Box>
          {open ? <ArrowUp /> : <ArrowDown />}
        </Stack>
      </Box>
      {open ? <ClusterCanvas id={clusterId} nodes={nodes} links={links} handleNodeClick={handleNodeClick} /> : <></>}
    </Box>
  );
}

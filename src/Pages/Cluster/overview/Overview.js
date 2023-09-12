import { useEffect, useState } from 'react';
import { DAGCanvas } from './canvas';
import { Box } from '@mui/material';

export default function ClusterOverview() {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    let tmpNodes = [];
    let tmpLinks = [];
    tmpNodes.push({
      id: '1',
      label: 'node1',
    });
    tmpNodes.push({
      id: '2',
      label: 'node2',
    });

    tmpLinks.push({
      source: '1',
      target: '2',
      label: 'link_a',
    });

    setNodes(tmpNodes);
    setLinks(tmpLinks);
  }, []);

  return (
    <Box>
      <DAGCanvas nodes={nodes} links={links} />
      <div
        style={{
          width: '20px',
          height: '20px',
          position: "relative",
          overflow: 'visible'
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '20px',
            backgroundColor: 'red',
            textAlign: 'center',
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          12ggg
        </div>
      </div>
    </Box>
  );
}

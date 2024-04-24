import { ClusterCanvas } from './canvas';
import { Box, Stack } from '@mui/material';
import ArrowDown from '@/assets/ArrowDown.svg';
import ArrowUp from '@/assets/ArrowUp.svg';
import { useState, useEffect } from 'react';
import { YaHeiLargeFont } from '@/components/Fonts';
import InfoCard from '@/components/InfoCard';
import { useIntl } from 'react-intl';
import InfoAlert from '@/assets/InfoAlert.svg';
import { fontFamily } from "@/utils/commonUtils";

export function ClusterTopologyOnlyCanvas(props) {
  const { clusterId, points, graph, handleNodeClick } = props;
  const intl = useIntl();
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    let dict = {}
    if (points) {
      for(const server of points) {
        dict[server.id] = server
      }
    } else {
      return
    }
    
    if (graph === null || graph === undefined) {
      setDisplay(false);
    } else {
      let nodeSet = new Set();
      let tmpLinks = [];
      let tmpNodes = [];
      for (const link of graph) {
        nodeSet.add(link.srcId);
        nodeSet.add(link.desId);
        const linkLabel = `${intl.messages['common.bandwidth']}:${link.bandwidth} Kbps;\n${intl.messages['common.delay']}: ${link.delay} ms`;
        tmpLinks.push({
          source: link.srcId,
          target: link.desId,
          label: linkLabel
        });
      }
      for (const node of nodeSet) {
        tmpNodes.push({
          id: node,
          label: node,
          hostname: dict[node].hostname,
          ip: dict[node].ip,
          description: dict[node].description,
        });
      }
      setNodes(tmpNodes);
      setLinks(tmpLinks);
      setDisplay(true);
    }
  }, [graph]);

  return (
    <InfoCard title={intl.messages['cluster.clusterTopology']}>
      <Box
        sx={{
          minHeight: '400px',
          height: "600px",
          width: "2000px",
        }}
      >
        {display ? (
          <ClusterCanvas
            id={clusterId}
            nodes={nodes}
            links={links}
            handleNodeClick={handleNodeClick}
          />
        ) : (
          <Stack sx={{
            pt: "160px"
          }} direction="row" spacing={2} alignItems="center" justifyContent="center">
            <InfoAlert />
            <YaHeiLargeFont>{intl.messages['cluster.clusterSelectHint']}</YaHeiLargeFont>
          </Stack>
        )}
      </Box>
    </InfoCard>
  );
}

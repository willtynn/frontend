/**
 * src\Pages\Cluster\overview\ClusterTopology.js
 */
import { ClusterCanvas } from './canvas';
import { Box, Stack } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { YaHeiLargeFont } from '@/components/Fonts';
import InfoCard from '@/components/InfoCard';
import { useIntl } from 'react-intl';
import InfoAlert from '@/assets/InfoAlert.svg';
import {MarkerType} from "reactflow";

export function ClusterTopologyOnlyCanvas(props) {
  const { clusterId, points, graph, handleNodeClick } = props;
  const intl = useIntl();
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [display, setDisplay] = useState(false);
  const box = useRef();

  useEffect(() => {
    if (points && points.length > 0) {
      //console.log('points:', points);
      //console.log('graph:', graph);
      const tmpNodes = points.map(server => ({
        id: server.id,
        label: server.id,
        hostname: server.hostname,
        ip: server.ip,
        description: server.description,
        position: server.pos,
      }));

      const tmpLinks = graph.map(link => ({
        source: link.srcId,
        target: link.desId,
        data: { label: `${intl.messages['common.bandwidth']}: ${link.bandwidth}` },
        markerEnd: {
          type: MarkerType.Arrow,
          width: 12,
          height: 12,
          color: '#000',
          strokeWidth: 1.75,
        },
        type: 'customEdge',
      }));

      setNodes(tmpNodes);
      setLinks(tmpLinks);
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, [graph, points, intl.messages]);

  return (
      <InfoCard title={intl.messages['cluster.clusterTopology']}>
        <Box
            sx={{
              minHeight: '400px',
            }}
            ref={box}
        >
          {display ? (
              <ClusterCanvas
                  id={clusterId}
                  nodes={nodes}
                  links={links}
                  handleNodeClick={handleNodeClick}
                  parent={box}
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

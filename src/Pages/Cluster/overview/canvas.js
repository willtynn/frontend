/**
 * src\Pages\Cluster\overview\canvas.js
 */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import ReactFlow, { Controls, Background, MarkerType } from 'reactflow';
import { useIntl } from 'react-intl';
import { CustomEdge, CustomNode } from '../../../components/Reactflow';

import 'reactflow/dist/style.css';

const nodeTypes = {
  customNode: CustomNode,
};
const edgeTypes = {
  customEdge: CustomEdge,
};

const snapGrid = [20, 20];

const getNodeShortId = (nodeId) => {
  const parts = nodeId.split('::');
  return parts.length > 1 ? parts[1] : nodeId;
};

const getLayout = (nodes, edges) => {
  const radius = 420; // 圆的半径
  const centerX = 600; // 圆心的 x 坐标
  const centerY = 400; // 圆心的 y 坐标
  const angleStep = (2 * Math.PI) / 5; // 每个顶点的角度步长

  const positions = [];
  for (let i = 0; i < 5; i++) {
    const angle = i * angleStep - Math.PI / 2; // 调整角度使一个顶点向上
    positions.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    });
  }

  nodes.forEach((node, index) => {
    if (index < positions.length) {
      node.position = positions[index];
    }
  });

  edges.forEach((edge) => {
    const sourceNode = nodes.find(node => node.id === edge.source);
    const targetNode = nodes.find(node => node.id === edge.target);

    if (sourceNode && targetNode) {
      const midX = (sourceNode.position.x + targetNode.position.x) / 2;
      const midY = (sourceNode.position.y + targetNode.position.y) / 2;

      const offsetY = edge.source < edge.target ? -10 : 10;  // 根据源和目标的 id 调整偏移量

      // 设置标签位置
      edge.data.labelPosition = { x: midX, y: midY + offsetY };
      edge.data.label = `${getNodeShortId(edge.source)}->${getNodeShortId(edge.target)}:${edge.data.label.split(': ')[1]}`;
    }
  });

  return { nodes, edges };
};



export function ClusterCanvas(props) {
  const { id, nodes, links, handleNodeClick, parent } = props;
  const dispatch = useDispatch();
  const intl = useIntl();

  const [n, setN] = useState([]);
  const [e, setE] = useState([]);

  const [noData, setNoData] = useState(false);

  useEffect(() => {
    let nodes_tmp = [];
    let edges_tmp = [];

    nodes.forEach((item, index) => {
      nodes_tmp.push({
        id: item.id,
        data: {
          label: item.label,
          hostname: item.hostname,
          ip: item.ip,
          description: item.description,
          infoList: ["hostname", "ip", "description"],
          source: item.data.source,
          target: item.data.target,
        },
        type: 'customNode',
        targetPosition: item.data.target,
        sourcePosition: item.data.source,
        style: {
          backgroundColor: '#FFF',
          borderRadius: '10px',
          border: '2px solid #000',
        },
      });
    });

    links.forEach((item, index) => {
      edges_tmp.push({
        id: JSON.stringify(item),
        source: item.source,
        target: item.target,
        sourcePosition: item.sourcePosition,
        targetPosition: item.targetPosition,
        animated: true,
        markerEnd: {
          type: MarkerType.Arrow,
          width: 12,
          height: 12,
          color: '#000',
          strokeWidth: 1.75,
        },
        data: {
          label: item.data.label, // 显示带宽信息
        },
        type: 'customEdge',
      });
    });

    const res = getLayout(nodes_tmp, edges_tmp);

    setN(res.nodes);
    setE(res.edges);
  }, [nodes, links]);

  return (
      <div
          style={{
            width: parent.current ? parent.current.clientWidth : '100%',
            height: parent.current ? parent.current.clientHeight : '100%',
          }}
      >
        {noData ? (
            <Box
                sx={{
                  width: '90%',
                  height: '200px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid #BFBFBF',
                  boxShadow: '2px 0px 8px rgba(35,45,65,.28)',
                }}
            >
              <span>{intl.messages['routeTrace.popWindowNoLinkDiagram']}</span>
            </Box>
        ) : (
            <ReactFlow
                style={{ backgroundColor: '#FFFFFF' }}
                nodes={n}
                edges={e}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                // onNodesChange={onNodesChange}
                // onEdgesChange={onEdgesChange}
                snapToGrid={true}
                snapGrid={snapGrid}
                fitView
                // attributionPosition="bottom-left"
                nodesConnectable={false}
                elementsSelectable={false}
            >
              <Controls />
              <Background />
            </ReactFlow>
        )}
      </div>
  );
}

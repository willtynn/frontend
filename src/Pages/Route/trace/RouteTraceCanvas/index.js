/**
 * src\Pages\Route\trace\RouteTraceCanvas_New\index.js
 */
import React from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { getRouteTraceDetail } from '@/actions/routeAction';
import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';
import ReactFlow, { Controls, Background, MarkerType } from 'reactflow';
import { useIntl } from 'react-intl';


import dagre from "dagre";

import 'reactflow/dist/style.css';



const nodeTypes = {
  customNode: CustomNode,
};
const edgeTypes = {
  customEdge: CustomEdge,
};

const snapGrid = [20, 20];

const findNode = (nodes, id) => nodes.find((n) => n.id === id) || null;

const getLayout = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'TB' }); // 设置布局方向为从上到下，从左到右为LR
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 300, height: 170 });
  });
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const n = dagreGraph.node(node.id);
    //node.targetPosition = 'top';
    //node.sourcePosition = 'bottom';
    node.position = {
      x: n.x - 150, // 300 / 2
      y: n.y - 85, // 170 / 2
    };
    return node;
  });
  return { nodes, edges };
}


export function RouteTraceCanvas(props) {
  const dispatch = useDispatch();
  const intl = useIntl();

  const { id } = props;
  
  //const [nodes, setNodes, onNodesChange] = useNodesState([]);
  //const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes] = React.useState([]);
  const [edges, setEdges] = React.useState([]);

  const [noData, setNoData] = React.useState(false);

  /*
  const { routeTraceDetail } = useSelector(state => {
    return {
      routeTraceDetail: state.Route.routeTraceDetail,
    };
  });*/
  const routeTraceDetail = useSelector(state => {
    return state.Route.routeTraceDetail;
  });

  useEffect(() => {
    dispatch(getRouteTraceDetail(id));
  }, [id]);

  useEffect(() => {
    if (
      routeTraceDetail === null ||
      routeTraceDetail === undefined ||
      routeTraceDetail.nodes === undefined ||
      routeTraceDetail.edges === undefined
    ) {
      return;
    }

    if (
      routeTraceDetail.nodes.length === 0 &&
      routeTraceDetail.edges.length === 0
    ) {
      setNoData(true);
      return;
    } else setNoData(false);

    const nodes_raw = routeTraceDetail.nodes;
    const edges_raw = routeTraceDetail.edges;

    let nodes_tmp = [];
    for (let i = 0; i < nodes_raw.length; i++) {
      const item = nodes_raw[i];
      nodes_tmp.push({
        id: item.ip,
        data: { 
          ip: item.ip, 
          service: item.service, 
          duration: item.duration, 
          host_ip: item.host_ip,
          onlyip: false
        },
        type: 'customNode',
        targetPosition: 'top',
        sourcePosition: 'bottom',
        style: { backgroundColor: '#FFF', borderRadius: '10px', border: '2px solid #000' },
      });
    }

    let edges_tmp = [];
    for (let i = 0; i < edges_raw.length; i++) {
      const item = edges_raw[i];
      if (findNode(nodes_tmp, item.start) === null) {
        nodes_tmp.push({
          id: item.start,
          data: { ip: item.start, onlyip: true },
          type: 'customNode',
          targetPosition: 'top',
          sourcePosition: 'bottom',
          style: { backgroundColor: '#FFF', borderRadius: '10px', border: '2px solid #000' },
        });
      }
      if (findNode(nodes_tmp, item.end) === null) {
        nodes_tmp.push({
          id: item.end,
          data: { ip: item.end, onlyip: true },
          type: 'customNode',
          targetPosition: 'top',
          sourcePosition: 'bottom',
          style: { backgroundColor: '#FFF', borderRadius: '10px', border: '2px solid #000' },
        });
      }

      edges_tmp.push({
        id: JSON.stringify(item),
        source: item.start,
        target: item.end,
        animated: true,
        markerEnd: {
          type: MarkerType.Arrow,
          width: 12,
          height: 12,
          color: '#000',
          strokeWidth: 1.75,
        },
        data: {
          label: item.info,
        },
        type: 'customEdge',
      });
    }

    const res = getLayout(nodes_tmp, edges_tmp);

    setNodes(res.nodes);
    setEdges(res.edges);
  }, [routeTraceDetail]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
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
            style={{ backgroundColor: '#FFFFFF'}}
            nodes={nodes}
            edges={edges}
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

          {/*
          鸟瞰图太占位置，所以不显示
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.type === 'input') return '#0041d0';
              if (n.type === 'customNode') return '#FFFF00';
              if (n.type === 'output') return '#ff0072';
            }}
            nodeColor={(n) => {
              if (n.type === 'customNode') return '#00FFd0';
              return '#fff';
            }}
          />*/}
          </ReactFlow>
      )}
    </div>
  );
}

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

import 'reactflow/dist/style.css';



const nodeTypes = {
  customNode: CustomNode,
};
const edgeTypes = {
  customEdge: CustomEdge,
};

const snapGrid = [20, 20];

const findNode = (nodes, id) => nodes.find((n) => n.id === id) || null;

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
  }, []);

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
        position: { x: i % 2 == 0 ? 100 : -100, y: 200 * i },
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

    let noNode = 1;
    let edges_tmp = [];
    for (let i = 0; i < edges_raw.length; i++) {
      const item = edges_raw[i];
      if (findNode(nodes_tmp, item.start) === null) {
        nodes_tmp.push({
          id: item.start,
          position: { x: noNode % 2 == 0 ? 100 : -100 , y: -200 * noNode++ },
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
          position: { x: noNode % 2 == 0 ? 100 : -100, y: -200 * noNode++ },
          data: { ip: item.end, onlyip: true },
          type: 'customNode',
          targetPosition: 'top',
          sourcePosition: 'bottom',
          style: { backgroundColor: '#FFF', borderRadius: '10px', border: '2px solid #000' },
        });
      }
      /*
      edges_tmp.push({
        id: JSON.stringify(item),
        source: item.start,
        target: item.end,
        animated: true,
        style: { stroke: '#000', strokeWidth: 2 },
        markerEnd: {
          type: 'arrow',
          width: 12,
          height: 12,
          color: '#000',
          strokeWidth: 1.5,
        },
        label: (<EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            background: '#ffcc00ee',
            padding: '5px 8px',
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
          }}
          className="nodrag nopan"
        >
          {item.info}
        </div>
      </EdgeLabelRenderer>),
      labelBgPadding: [8, -50],
        /*data: {
          label: item.info,
        },*
        type: 'customEdge1',
      });*/

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

    setNodes(nodes_tmp);
    setEdges(edges_tmp);
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

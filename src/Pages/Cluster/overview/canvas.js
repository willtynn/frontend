import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { getRouteTraceDetail } from '@/actions/routeAction';
import ReactFlow, { Controls, Background, MarkerType } from 'reactflow';
import { useIntl } from 'react-intl';
import { CustomEdge, CustomNode } from '@/components/Reactflow';
import dagre from 'dagre';

import 'reactflow/dist/style.css';

const nodeTypes = {
  customNode: CustomNode,
};
const edgeTypes = {
  customEdge: CustomEdge,
};

const snapGrid = [20, 20];

const findNode = (nodes, id) => nodes.find(n => n.id === id) || null;

const getLayout = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'TB' }); // 设置布局方向为从上到下，从左到右为LR
  nodes.forEach(node => {
    dagreGraph.setNode(node.id, { width: 300, height: 170 });
  });
  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
  dagre.layout(dagreGraph);

  nodes.forEach(node => {
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
};

export function ClusterCanvas(props) {
  const { id, nodes, links, handleNodeClick, handleLinkClick } = props;
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
        },
        type: 'customNode',
        targetPosition: 'top',
        sourcePosition: 'bottom',
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
        animated: true,
        markerEnd: {
          type: MarkerType.Arrow,
          width: 12,
          height: 12,
          color: '#000',
          strokeWidth: 1.75,
        },
        data: {
          label: item.label,
        },
        type: 'customEdge',
      });
    });

    const res = getLayout(nodes_tmp, edges_tmp);

    setN(res.nodes);
    setE(res.edges);
  }, []);

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

// import * as d3 from 'd3';
// import dagreD3 from 'dagre-d3';
// import { useEffect, useState, useRef } from 'react';
// import { Box } from '@mui/material';

// import { digitInCircle, textUnderPolygon } from '@/utils/commonUtils';
// import { fontFamily } from "@/utils/commonUtils";

// import './canvas.css';

// const normalEdgeStyle = {
//   style: 'stroke: #573CC4; stroke-width: 2.2px; fill: none;',
//   arrowheadStyle: 'fill: #573CC4; width: 2px; stroke-width: 1px;',
// };

// export function ClusterCanvas(props) {
//   const { id, nodes, links, handleNodeClick, handleLinkClick } = props;
//   const canvasBox = useRef();

//   useEffect(() => {
//     if (!nodes || nodes.length == 0 || !links || links.length == 0) {
//       return;
//     }
//     var g = new dagreD3.graphlib.Graph({ compound: true })
//       .setGraph({

//         nodesep: 100,
//         ranksep: 100, // 层与层之间的间距
//         // rankdir: "LR",
//       })
//       // .setDefaultEdgeLabel(() => {
//       //   return {};
//       // });

//     nodes.forEach((item, index) => {
//       g.setNode(item.id, {
//         shape: "hexagonWithCircle",
//         id: item.id,
//         labelType: 'html',
//         // label: `${digitInCircle(12, 30, "#55AAAA")}${textUnderPolygon(item.label, 15, "#000", null, 45)}${textUnderPolygon(12 !== 1 ? 12 + " service instances": "1 service instance", 8, "#5E5E5E", "#FFF", 65)}`,
//         label: `${textUnderPolygon(item.label, 15, "#000", null, 45)}${textUnderPolygon(12 !== 1 ? 12 + " service instances": "1 service instance", 8, "#5E5E5E", "#FAFAFA", 65)}`,
//         style: 'fill: #ffd47f',
//         class: `server_node_${id}`,
//       });
//     });

//     links.forEach((item, index) => {
//       g.setEdge(item.source, item.target, {
//         label: item.label,
//         arrowhead: 'vee',
//         curve: d3.curveBasis,
//         ...normalEdgeStyle,
//         class: 'cluster_link',
//       });
//     });

//     g.nodes().forEach(function (v) {
//       var node = g.node(v);
//       // Round the corners of the nodes
//       node.rx = node.ry = 5;
//     });

//     // Create the renderer
//     var render = new dagreD3.render();

//     render.shapes().hexagonWithCircle = function(parent, bbox, node) {
//       let shapeSvg = parent.insert("g", ":first-child")
//         // .html('<svg width="96" height="87" viewBox="0 0 96 87" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.6801 2.5H64.3199C68.7946 2.5 72.9279 4.89185 75.1576 8.77145L91.5369 37.2715C93.7533 41.1281 93.7533 45.872 91.5369 49.7285L75.1576 78.2286C72.9279 82.1081 68.7946 84.5 64.3199 84.5H31.6801C27.2054 84.5 23.0721 82.1081 20.8424 78.2285L4.46308 49.7285C2.24665 45.8719 2.24665 41.128 4.46309 37.2715L20.8424 8.77144C23.0721 4.89185 27.2054 2.5 31.6801 2.5Z" fill="white" stroke="#5FC976" stroke-width="5"/></svg>')
//         .html('<svg width="100" height="87" viewBox="0 0 100 87" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.8424 8.77144C25.0721 4.89185 29.2054 2.5 33.6801 2.5H66.3199C70.7946 2.5 74.9279 4.89185 77.1576 8.77145L93.5369 37.2715C95.7533 41.128 95.7533 45.872 93.5369 49.7285L77.1576 78.2285C74.9279 82.1081 70.7946 84.5 66.3199 84.5H33.6801C29.2054 84.5 25.0721 82.1081 22.8424 78.2285L6.46308 49.7285C4.24665 45.8719 4.24665 41.128 6.46309 37.2714L22.8424 8.77144Z" fill="white" stroke="#5FC976" stroke-width="5"/><g filter="url(#filter0_d_1_8)"><circle cx="50" cy="43" r="6" fill="black"/></g><defs><filter id="filter0_d_1_8" x="40" y="37" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_8"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_8" result="shape"/></filter></defs></svg>')
//         .attr("transform", "translate(-50,-43.5)")

//       node.intersect = function(point) {
//         return dagreD3.intersect.rect(node, point);
//       };

//       return shapeSvg;
//     };
//     // Set up an SVG group so that we can translate the final graph.
//     var svg = d3.select(document.getElementById(`${id}_svg-canvas`));
//     let svgGroup = d3.select(document.getElementById(`${id}_g-canvas`));

//     // Run the renderer. This is what draws the final graph.
//     render(svgGroup, g);

//     const server_nodes = document.getElementsByClassName(`server_node_${id}`);
//     for (const server_node of server_nodes) {
//       server_node.onclick = () => {
//         handleNodeClick(server_node.id);
//       };
//     }

//     // Center the graph
//     var xCenterOffset = (svg.property("width").baseVal.value - g.graph().width) / 2;
//     svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 50)');
//     svg.attr('height', g.graph().height + 100);
//     const polygon_texts = document.getElementsByClassName("polygon_text")
//     for(let i = 0; i < polygon_texts.length; i++) {
//       polygon_texts[i].style.left=`${-polygon_texts[i].clientWidth / 2}px`
//     }
//   }, [links]);

//   return (
//     <Box
//       sx={{
//         fontFamily: fontFamily,
//         minHeight: "400px"
//       }}
//       ref={canvasBox}
//     >
//       <svg style={{width: "100%"}} id={`${id}_svg-canvas`} height='1000'>
//         <g id={`${id}_g-canvas`}></g>
//       </svg>
//     </Box>
//   );
// }

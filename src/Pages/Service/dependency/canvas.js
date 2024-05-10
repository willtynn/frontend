/**
 * src\Pages\Service\dependency\canvas.js
 */
import { useRef } from 'react';
import * as d3 from 'd3';
import dagreD3 from 'dagre-d3';
import { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { fontFamily } from '@/utils/commonUtils';
import './styles.css';
import { setSnackbarMessageAndOpen } from '../../../actions/snackbarAction';
import { SEVERITIES } from '../../../components/CommonSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { decodeInterfaceForService, decodeInterfaceForInterface } from '../../../utils/commonUtils';
import { useIntl } from 'react-intl';
import ReactFlow, { Controls, Background, MarkerType } from 'reactflow';
import { TooltipEdge, CustomNode, SelfConnectEdge } from '@/components/Reactflow';
import dagre from 'dagre';
import { addEdge } from 'reactflow';

import 'reactflow/dist/style.css';

const normalEdgeStyle = {
  style: 'stroke: #333; stroke-width: 1px; fill: none;',
  arrowheadStyle: 'fill: #333; width: 1px;',
};

const nodeTypes = {
  customNode: CustomNode,
};
const edgeTypes = {
  customEdge: TooltipEdge,
  selfConnectEdge: SelfConnectEdge,
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

export function ThreeLayerCanvas(props) {
  const { nodes, links, handleNodeClick, services, parent, onEdgeMouseEnter, onEdgeMouseLeave } = props;
  const dispatch = useDispatch();
  const intl = useIntl();

  const [n, setN] = useState([]);
  const [e, setE] = useState([]);

  const [noData, setNoData] = useState(false);

  useEffect(() => {
    let nodes_tmp = [];
    let edges_tmp = [];

    nodes.forEach((item, index) => {
      if (item.type == 'target') {
        nodes_tmp.push({
          id: item.id,
          data: {
            label: item.label,
            repo: services[item.id].repo,
            imageUrl: services[item.id].imageUrl,
            infoList: ["repo", "imageUrl"]
          },
          type: 'customNode',
          targetPosition: 'top',
          sourcePosition: 'bottom',
          style: {
            backgroundColor: '#FFF',
            borderRadius: '10px',
            border: '2px solid #000',
          },
          onClick: () => handleNodeClick(item.id)
        });
      } else {
        nodes_tmp.push({
          id: item.id,
          data: {
            label: item.label,
            repo: services[item.id].repo,
            imageUrl: services[item.id].imageUrl,
            infoList: ["repo", "imageUrl"]
          },
          type: 'customNode',
          targetPosition: 'top',
          sourcePosition: 'bottom',
          style: {
            backgroundColor: '#FFF',
            borderRadius: '10px',
            border: '2px solid #000',
          },
          onClick: () => handleNodeClick(item.id)
        });
      }
      
    });

    links.forEach((item, index) => {
      let edgeType = 'customEdge';
      if (item.source == item.target) {
        edgeType = 'selfConnectEdge';
      }
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
          caller: item.invoke_info.caller,
          callerPath: item.invoke_info.callerPath,
          callee: item.invoke_info.callee,
          calleePath: item.invoke_info.calleePath,
          // infoList: ["caller", "callerPath", "callee", "calleePath"]
        },
        type: edgeType,
      });
    });

    const res = getLayout(nodes_tmp, edges_tmp);

    setN(res.nodes);
    setE(res.edges);
  }, [nodes, links]);

  return (
    <div
      style={{
        width: parent.current.clientWidth,
        height: parent.current.clientHeight,
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
          onEdgeMouseEnter={onEdgeMouseEnter}
          onEdgeMouseLeave={onEdgeMouseLeave}
          onEdgeClick={() => {}}
        >
          <Controls />
          <Background />
        </ReactFlow>
      )}
    </div>
  );
}

// export function ThreeLayerCanvas(props) {
//   const { nodes, links, handleNodeClick, services } = props;
//   const intl = useIntl();
//   const [graph, setGraph] = useState(
//     new dagreD3.graphlib.Graph({ compound: true })
//       .setGraph({})
//       .setDefaultEdgeLabel(() => {
//         return {};
//       })
//   );

//   const dispatch = useDispatch();

//   const [id, setId] = useState('');
//   const [repo, setRepo] = useState('');
//   const [imageUrl, setImageUrl] = useState('');

//   const [callerId, setCallerId] = useState('');
//   const [callerPath, setCallerPath] = useState('');
//   const [calleeId, setCalleeId] = useState('');
//   const [calleePath, setCalleePath] = useState('');

//   const [svgWidth, setSvgWidth] = useState(0);

//   const nodeTooltip = useRef(null);
//   const edgeTooltip = useRef(null);

//   useEffect(() => {
//     var g = new dagreD3.graphlib.Graph({ compound: true })
//       .setGraph({})
//       .setDefaultEdgeLabel(() => {
//         return {};
//       });

//     nodes.forEach((item, index) => {
//       if (item.type === 'target') {
//         g.setNode(item.id, {
//           label: item.label,
//           class: 'service_node',
//           id: item.id,
//           style: 'fill: #ffd47f',
//         });
//       } else {
//         g.setNode(item.id, {
//           label: item.label,
//           class: 'service_node',
//           id: item.id,
//         });
//       }
//     });

//     links.forEach((item, index) => {
//       g.setEdge(item.source, item.target, {
//         ...normalEdgeStyle,
//         class: 'service_link',
//         id: JSON.stringify(item.invoke_info),
//       });
//     });

//     g.nodes().forEach(function (v) {
//       var node = g.node(v);
//       // Round the corners of the nodes
//       if (node) {
//         node.rx = node.ry = 5;
//       }
//     });

//     setGraph(g);
//   }, [links]);

//   useEffect(() => {
//     // Create the renderer
//     var render = new dagreD3.render();
//     // Set up an SVG group so that we can translate the final graph.
//     var svg = d3.select(document.getElementById('svg-canvas'));
//     let svgGroup = d3.select(document.getElementById('g-canvas'));
//     // Run the renderer. This is what draws the final graph.
//     try {
//       render(svgGroup, graph);
//     } catch (error) {
//       if (error.message.includes('Cannot set properties of undefined')) {
//         dispatch(
//           setSnackbarMessageAndOpen(
//             'serviceDependency.graphNotFound',
//             {},
//             SEVERITIES.warning
//           )
//         );
//       }
//     }

//     // if (graph._label.height == undefined || graph._label.height == -Infinity) {
//     //   return;
//     // }

//     const service_nodes = document.getElementsByClassName('service_node');
//     for (const service_node of service_nodes) {
//       service_node.addEventListener('click', () => {
//         handleNodeClick(service_node.id);
//       });
//       service_node.addEventListener('mouseover', e => {
//         setId(service_node.id);
//         setRepo(services[service_node.id].repo);
//         setImageUrl(services[service_node.id].imageUrl);
//         nodeTooltip.current.style.display = 'block';
//         nodeTooltip.current.style.top = e.clientY + 20 + 'px';
//         nodeTooltip.current.style.left = e.clientX + 'px';
//       });
//       service_node.addEventListener('mouseleave', function () {
//         nodeTooltip.current.style.display = 'none';
//       });
//     }

//     const service_links = document.getElementsByClassName('service_link');
//     for (const service_link of service_links) {
//       const service_link_info = JSON.parse(service_link.id);
//       service_link.addEventListener('mouseover', e => {
//         setCallerId(service_link_info.caller);
//         setCallerPath(service_link_info.callerPath);
//         setCalleeId(service_link_info.callee);
//         setCalleePath(service_link_info.calleePath);
//         edgeTooltip.current.style.display = 'block';
//         edgeTooltip.current.style.top = e.clientY + 20 + 'px';
//         edgeTooltip.current.style.left = e.clientX + 'px';
//       });
//       service_link.addEventListener('mouseleave', function () {
//         edgeTooltip.current.style.display = 'none';
//       });
//     }
//     // Center the graph
//     var xCenterOffset =
//       (svg.property('width').baseVal.value - graph.graph().width) / 2;
//     // svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 50)');

//     svg.attr('height', graph.graph().height + 100);

//     setSvgWidth(graph.graph().width);
//   }, [graph]);

//   window.onresize = () => {
//     var svg = d3.select(document.getElementById('svg-canvas'));
//     let svgGroup = d3.select(document.getElementById('g-canvas'));
//     var xCenterOffset =
//       (svg.property('width').baseVal.value - graph.graph().width) / 2;
//     svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 50)');
//   };

//   return (
//     <Box
//       sx={{
//         fontFamily: fontFamily,
//         width: '100%',
//         overflow: 'auto',
//         p: '20px',
//       }}
//     >
//       <svg
//         style={{ minWidth: '100%' }}
//         width={svgWidth ? svgWidth + 40 : 'none'}
//         id='svg-canvas'
//         height='600'
//       >
//         <g id='g-canvas'></g>
//       </svg>
//       <Box
//         ref={nodeTooltip}
//         sx={{
//           bgcolor: '#242E42',
//           position: 'absolute',
//           borderRadius: '5px',
//           p: '12px',
//           color: '#FFFFFF',
//           display: 'none',
//           fontSize: '12px',
//           fontWeight: 400,
//           fontStyle: 'normal',
//           fontStretch: 'normal',
//           lineHeight: 1.67,
//           letterSpacing: 'normal',
//         }}
//       >
//         <Stack direction='column' spacing={1}>
//           <Stack direction='row' spacing={1}>
//             <Box sx={{ width: '80px' }}>ID</Box>
//             <Box>{id}</Box>
//           </Stack>
//           <Stack direction='row' spacing={1}>
//             <Box sx={{ width: '80px' }}>{intl.messages['common.repo']}</Box>
//             <Box>{repo}</Box>
//           </Stack>
//           <Stack direction='row' spacing={1}>
//             <Box sx={{ width: '80px' }}>{intl.messages['common.imageUrl']}</Box>
//             <Box>{imageUrl}</Box>
//           </Stack>
//         </Stack>
//       </Box>

//       <Box
//         ref={edgeTooltip}
//         sx={{
//           bgcolor: '#242E42',
//           position: 'absolute',
//           borderRadius: '5px',
//           p: '12px',
//           color: '#FFFFFF',
//           display: 'none',
//           fontSize: '12px',
//           fontWeight: 400,
//           fontStyle: 'normal',
//           fontStretch: 'normal',
//           lineHeight: 1.67,
//           letterSpacing: 'normal',
//         }}
//       >
//         <Stack direction='column' spacing={1}>
//           <Stack direction='row' spacing={1}>
//             <Box sx={{ width: '80px' }}>{intl.messages['serviceDependency.sourceInterfaceId']}</Box>
//             <Box>{callerId}</Box>
//           </Stack>
//           <Stack direction='row' spacing={1}>
//             <Box sx={{ width: '80px' }}>{intl.messages['serviceDependency.sourceInterfacePath']}</Box>
//             <Box>{callerPath}</Box>
//           </Stack>
//           <Stack direction='row' spacing={1}>
//             <Box sx={{ width: '80px' }}>{intl.messages['serviceDependency.targetInterfaceId']}</Box>
//             <Box>{calleeId}</Box>
//           </Stack>
//           <Stack direction='row' spacing={1}>
//             <Box sx={{ width: '80px' }}>{intl.messages['serviceDependency.targetInterfacePath']}</Box>
//             <Box>{calleePath}</Box>
//           </Stack>
//         </Stack>
//       </Box>
//     </Box>
//   );
// }



export function EdgeCenterCanvas(props) {
  const { nodes, links, handleNodeClick, services, target, parent } = props;
  const dispatch = useDispatch();
  const intl = useIntl();

  const [n, setN] = useState([]);
  const [e, setE] = useState([]);

  const [noData, setNoData] = useState(false);
  const service = decodeInterfaceForService(target);

  useEffect(() => {
    let nodes_tmp = [];
    let edges_tmp = [];

    nodes.forEach((item, index) => {
      if (item.id == service) {
        nodes_tmp.push({
          id: item.id,
          data: {
            label: item.label,
            repo: services[item.id].repo,
            imageUrl: services[item.id].imageUrl,
            infoList: ["repo", "imageUrl"]
          },
          type: 'customNode',
          targetPosition: 'top',
          sourcePosition: 'bottom',
          style: {
            backgroundColor: '#FFF',
            borderRadius: '10px',
            border: '2px solid #000',
          },
          onClick: () => handleNodeClick(item.id)
        });
      } else {
        nodes_tmp.push({
          id: item.id,
          data: {
            label: item.label,
            repo: services[item.id].repo,
            imageUrl: services[item.id].imageUrl,
            infoList: ["repo", "imageUrl"]
          },
          type: 'customNode',
          targetPosition: 'top',
          sourcePosition: 'bottom',
          style: {
            backgroundColor: '#FFF',
            borderRadius: '10px',
            border: '2px solid #000',
          },
          onClick: () => handleNodeClick(item.id)
        });
      }
      
    });

    links.forEach((item, index) => {
      let edgeType = 'customEdge';
      if (item.source == item.target) {
        edgeType = 'selfConnectEdge';
      }
      if (item.center) {
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
            caller: item.invoke_info.caller,
            callerPath: item.invoke_info.callerPath,
            callee: item.invoke_info.callee,
            calleePath: item.invoke_info.calleePath,
            // infoList: ["caller", "callerPath", "callee", "calleePath"]
          },
          type: edgeType,
        });
      } else {
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
            caller: item.invoke_info.caller,
            callerPath: item.invoke_info.callerPath,
            callee: item.invoke_info.callee,
            calleePath: item.invoke_info.calleePath,
            // infoList: ["caller", "callerPath", "callee", "calleePath"]
          },
          type: edgeType,
        });
      }
      
    });

    const res = getLayout(nodes_tmp, edges_tmp);

    setN(res.nodes);
    setE(res.edges);
    
  }, [nodes, links]);

  // const onConnect = (params) => setN(addEdge(params, n));

  return (
    <div
      style={{
        width: parent.current.clientWidth,
        height: parent.current.clientHeight,
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
          // onConnect={onConnect}
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

// export function EdgeCenterCanvas(props) {
//   const { nodes, links, handleNodeClick, services, target } = props;
//   const intl = useIntl();
//   const [graph, setGraph] = useState(
//     new dagreD3.graphlib.Graph({ compound: true })
//       .setGraph({})
//       .setDefaultEdgeLabel(() => {
//         return {};
//       })
//   );

//   const dispatch = useDispatch();

//   const [id, setId] = useState('');
//   const [repo, setRepo] = useState('');
//   const [imageUrl, setImageUrl] = useState('');

//   const [callerId, setCallerId] = useState('');
//   const [callerPath, setCallerPath] = useState('');
//   const [calleeId, setCalleeId] = useState('');
//   const [calleePath, setCalleePath] = useState('');

//   const [svgWidth, setSvgWidth] = useState(0);

//   const nodeTooltip = useRef(null);
//   const edgeTooltip = useRef(null);

//   const service = decodeInterfaceForService(target);

//   useEffect(() => {
//     var g = new dagreD3.graphlib.Graph({ compound: true })
//       .setGraph({})
//       .setDefaultEdgeLabel(() => {
//         return {};
//       });

//     // Here we're setting the nodes
//     nodes.forEach((item, index) => {
//       if (item.id == service) {
//         g.setNode(item.id, {
//           label: item.label,
//           class: 'service_node',
//           id: item.id,
//           style: 'fill: #ffd47f',
//         });
//       } else {
//         g.setNode(item.id, {
//           label: item.label,
//           class: 'service_node',
//           id: item.id,
//         });
//       }
//     });

//     links.forEach((item, index) => {
//       const calleePath = item.invoke_info.calleePath ?? "";
//       if (item.center) {
//         g.setEdge(item.source, item.target, {
//           label: calleePath,
//           style: 'stroke: #f66; stroke-width: 1.5px; fill: none;',
//           arrowheadStyle: 'fill: #f66; width: 1.5px;',
//           class: 'service_link',
//           id: JSON.stringify(item.invoke_info),
//         });
//       } else {
//         g.setEdge(item.source, item.target, {
//           label: calleePath,
//           ...normalEdgeStyle,
//           class: 'service_link',
//           id: JSON.stringify(item.invoke_info),
//         });
//       }
//     });

//     g.nodes().forEach(function (v) {
//       var node = g.node(v);
//       // Round the corners of the nodes
//       if (node) {
//         node.rx = node.ry = 5;
//       }
//     });

//     setGraph(g);
//   }, [links]);

//   useEffect(() => {
//     // Create the renderer
//     var render = new dagreD3.render();

//     // Set up an SVG group so that we can translate the final graph.

//     let svg = d3.select(document.getElementById('interface_svg-canvas'));
//     let svgGroup = d3.select(document.getElementById('interface_g-canvas'));

//     // Run the renderer. This is what draws the final graph.
//     try {
//       render(svgGroup, graph);
//     } catch (error) {
//       console.log(graph.graph().width);
//       if (
//         error.message.includes('Cannot set properties of undefined') &&
//         graph.graph().width == undefined
//       ) {
//         dispatch(
//           setSnackbarMessageAndOpen(
//             'serviceDependency.graphNotFound',
//             {},
//             SEVERITIES.info
//           )
//         );
//       }
//     }

//     const service_nodes = document.getElementsByClassName('service_node');
//     for (const service_node of service_nodes) {
//       service_node.addEventListener('click', () => {
//         handleNodeClick(service_node.id);
//       });
//       service_node.addEventListener('mouseover', e => {
//         setId(service_node.id);
//         setRepo(services[service_node.id].repo);
//         setImageUrl(services[service_node.id].imageUrl);
//         nodeTooltip.current.style.display = 'block';
//         nodeTooltip.current.style.top = e.clientY + 20 + 'px';
//         nodeTooltip.current.style.left = e.clientX + 'px';
//       });
//       service_node.addEventListener('mouseleave', function () {
//         nodeTooltip.current.style.display = 'none';
//       });
//     }

//     const service_links = document.getElementsByClassName('service_link');
//     for (const service_link of service_links) {
//       const service_link_info = JSON.parse(service_link.id);
//       service_link.addEventListener('mouseover', e => {
//         setCallerId(service_link_info.caller);
//         setCallerPath(service_link_info.callerPath);
//         setCalleeId(service_link_info.callee);
//         setCalleePath(service_link_info.calleePath);
//         edgeTooltip.current.style.display = 'block';
//         edgeTooltip.current.style.top = e.clientY + 20 + 'px';
//         edgeTooltip.current.style.left = e.clientX + 'px';
//       });
//       service_link.addEventListener('mouseleave', function () {
//         edgeTooltip.current.style.display = 'none';
//       });
//     }

//     // Center the graph
//     var xCenterOffset =
//       (svg.property('width').baseVal.value - graph.graph().width) / 2;
//     // svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 50)');

//     svg.attr('height', graph.graph().height + 100);

//     setSvgWidth(graph.graph().width);
//   }, [graph]);

//   window.onresize = () => {
//     let svg = d3.select(document.getElementById('interface_svg-canvas'));
//     let svgGroup = d3.select(document.getElementById('interface_g-canvas'));
//     var xCenterOffset =
//       (svg.property('width').baseVal.value - graph.graph().width) / 2;
//     svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 50)');
//   };

//   return (
//     <Box
//       sx={{
//         fontFamily: fontFamily,
//         width: '100%',
//         overflow: 'auto',
//         p: '20px',
//       }}
//     >
//       <svg
//         style={{ minWidth: '100%' }}
//         width={svgWidth ? svgWidth + 40 : 'none'}
//         id='interface_svg-canvas'
//         height='1000'
//       >
//         <g id='interface_g-canvas'></g>
//       </svg>

//       <Box
//         ref={nodeTooltip}
//         sx={{
//           bgcolor: '#242E42',
//           position: 'absolute',
//           borderRadius: '5px',
//           p: '12px',
//           color: '#FFFFFF',
//           display: 'none',
//           fontSize: '12px',
//           fontWeight: 400,
//           fontStyle: 'normal',
//           fontStretch: 'normal',
//           lineHeight: 1.67,
//           letterSpacing: 'normal',
//         }}
//       >
//         <Stack direction='column' spacing={1}>
//           <Stack direction='row' spacing={1}>
//             <Box sx={{ width: '80px' }}>ID</Box>
//             <Box>{id}</Box>
//           </Stack>
//           <Stack direction='row' spacing={1}>
//             <Box sx={{ width: '80px' }}>{intl.messages['common.repo']}</Box>
//             <Box>{repo}</Box>
//           </Stack>
//           <Stack direction='row' spacing={1}>
//             <Box sx={{ width: '80px' }}>{intl.messages['common.imageUrl']}</Box>
//             <Box>{imageUrl}</Box>
//           </Stack>
//         </Stack>
//       </Box>

//       <Box
//         ref={edgeTooltip}
//         sx={{
//           bgcolor: '#242E42',
//           position: 'absolute',
//           borderRadius: '5px',
//           p: '12px',
//           color: '#FFFFFF',
//           display: 'none',
//           fontSize: '12px',
//           fontWeight: 400,
//           fontStyle: 'normal',
//           fontStretch: 'normal',
//           lineHeight: 1.67,
//           letterSpacing: 'normal',
//         }}
//       >
//         <Stack direction='column' spacing={1}>
//           <Stack direction='row' spacing={1}>
//             <Box sx={{ width: '80px' }}>{intl.messages['serviceDependency.sourceInterfaceId']}</Box>
//             <Box>{callerId}</Box>
//           </Stack>
//           <Stack direction='row' spacing={1}>
//             <Box sx={{ width: '80px' }}>{intl.messages['serviceDependency.sourceInterfacePath']}</Box>
//             <Box>{callerPath}</Box>
//           </Stack>
//           <Stack direction='row' spacing={1}>
//             <Box sx={{ width: '80px' }}>{intl.messages['serviceDependency.targetInterfaceId']}</Box>
//             <Box>{calleeId}</Box>
//           </Stack>
//           <Stack direction='row' spacing={1}>
//             <Box sx={{ width: '80px' }}>{intl.messages['serviceDependency.targetInterfacePath']}</Box>
//             <Box>{calleePath}</Box>
//           </Stack>
//         </Stack>
//       </Box>
//     </Box>
//   );
// }

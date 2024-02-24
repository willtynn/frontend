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
// import D3Tip from '../../../components/Tip/D3Tip';

const normalEdgeStyle = {
  style: 'stroke: #333; stroke-width: 3px; fill: none;',
  arrowheadStyle: 'fill: #333; width: 3px;',
};

export function ThreeLayerCanvas(props) {
  const { nodes, links, handleNodeClick, services } = props;
  const [graph, setGraph] = useState(
    new dagreD3.graphlib.Graph({ compound: true })
      .setGraph({})
      .setDefaultEdgeLabel(() => {
        return {};
      })
  );

  const [id, setId] = useState('');
  const [repo, setRepo] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [callerId, setCallerId] = useState('');
  const [callerPath, setCallerPath] = useState('');
  const [calleeId, setCalleeId] = useState('');
  const [calleePath, setCalleePath] = useState('');

  const [svgWidth, setSvgWidth] = useState(0);

  const nodeTooltip = useRef(null);
  const edgeTooltip = useRef(null);

  useEffect(() => {
    var g = new dagreD3.graphlib.Graph({ compound: true })
      .setGraph({})
      .setDefaultEdgeLabel(() => {
        return {};
      });

    nodes.forEach((item, index) => {
      if (item.type === 'target') {
        g.setNode(item.id, {
          label: item.label,
          class: 'service_node',
          id: item.id,
          style: 'fill: #ffd47f',
        });
      } else {
        g.setNode(item.id, {
          label: item.label,
          class: 'service_node',
          id: item.id,
        });
      }
    });

    links.forEach((item, index) => {
      g.setEdge(item.source, item.target, {
        ...normalEdgeStyle,
        class: 'service_link',
        id: JSON.stringify(item.invoke_info),
      });
    });

    g.nodes().forEach(function (v) {
      var node = g.node(v);
      // Round the corners of the nodes
      node.rx = node.ry = 5;
    });

    setGraph(g);
  }, [links]);

  useEffect(() => {
    // Create the renderer
    var render = new dagreD3.render();
    // Set up an SVG group so that we can translate the final graph.
    var svg = d3.select(document.getElementById('svg-canvas'));
    let svgGroup = d3.select(document.getElementById('g-canvas'));
    // Run the renderer. This is what draws the final graph.
    render(svgGroup, graph);

    // if (graph._label.height == undefined || graph._label.height == -Infinity) {
    //   return;
    // }

    const service_nodes = document.getElementsByClassName('service_node');
    for (const service_node of service_nodes) {
      service_node.addEventListener('click', () => {
        handleNodeClick(service_node.id);
      });
      service_node.addEventListener('mouseover', e => {
        setId(service_node.id);
        setRepo(services[service_node.id].repo)
        setImageUrl(services[service_node.id].imageUrl)
        nodeTooltip.current.style.display = 'block';
        nodeTooltip.current.style.top = e.clientY + 20 + 'px';
        nodeTooltip.current.style.left = e.clientX + 'px';
      });
      service_node.addEventListener('mouseleave', function () {
        nodeTooltip.current.style.display = 'none';
      });
    }

    const service_links = document.getElementsByClassName('service_link');
    for (const service_link of service_links) {
      const service_link_info = JSON.parse(service_link.id);
      service_link.addEventListener('mouseover', e => {
        setCallerId(service_link_info.caller);
        setCallerPath(service_link_info.callerPath)
        setCalleeId(service_link_info.callee)
        setCalleePath(service_link_info.calleePath)
        edgeTooltip.current.style.display = 'block';
        edgeTooltip.current.style.top = e.clientY + 20 + 'px';
        edgeTooltip.current.style.left = e.clientX + 'px';
      });
      service_link.addEventListener('mouseleave', function () {
        edgeTooltip.current.style.display = 'none';
      });
    }
    // Center the graph
    var xCenterOffset =
      (svg.property('width').baseVal.value - graph.graph().width) / 2;
    // svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 50)');

    svg.attr('height', graph.graph().height + 100);

    setSvgWidth(graph.graph().width);
  }, [graph]);

  window.onresize = () => {
    var svg = d3.select(document.getElementById('svg-canvas'));
    let svgGroup = d3.select(document.getElementById('g-canvas'));
    var xCenterOffset =
      (svg.property('width').baseVal.value - graph.graph().width) / 2;
    svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 50)');
  };

  return (
    <Box
      sx={{
        fontFamily: fontFamily,
        width: '100%',
        overflow: 'auto',
        p: "20px"
        // ...shadowStyle,
      }}
    >
      <svg style={{ minWidth: '100%' }} width={svgWidth ? svgWidth + 40 : "none"} id='svg-canvas' height='600'>
        <g id='g-canvas'></g>
      </svg>
      <Box
        ref={nodeTooltip}
        sx={{
          bgcolor: '#242E42',
          position: 'absolute',
          borderRadius: '5px',
          p: '12px',
          color: '#FFFFFF',
          display: 'none',
          fontSize: '12px',
          fontWeight: 400,
          fontStyle: 'normal',
          fontStretch: 'normal',
          lineHeight: 1.67,
          letterSpacing: 'normal',
        }}
      >
        <Stack direction='column' spacing={1}>
          <Stack direction='row' spacing={1}>
            <Box sx={{width: "80px"}}>ID</Box>
            <Box>{id}</Box>
          </Stack>
          <Stack direction='row' spacing={1}>
            <Box sx={{width: "80px"}}>代码仓库地址</Box>
            <Box>{repo}</Box>
          </Stack>
          <Stack direction='row' spacing={1}>
            <Box sx={{width: "80px"}}>镜像仓库地址</Box>
            <Box>{imageUrl}</Box>
          </Stack>
        </Stack>
      </Box>

      <Box
        ref={edgeTooltip}
        sx={{
          bgcolor: '#242E42',
          position: 'absolute',
          borderRadius: '5px',
          p: '12px',
          color: '#FFFFFF',
          display: 'none',
          fontSize: '12px',
          fontWeight: 400,
          fontStyle: 'normal',
          fontStretch: 'normal',
          lineHeight: 1.67,
          letterSpacing: 'normal',
        }}
      >
        <Stack direction='column' spacing={1}>
          <Stack direction='row' spacing={1}>
            <Box sx={{width: "80px"}}>源接口ID</Box>
            <Box>{callerId}</Box>
          </Stack>
          <Stack direction='row' spacing={1}>
            <Box sx={{width: "80px"}}>源接口路径</Box>
            <Box>{callerPath}</Box>
          </Stack>
          <Stack direction='row' spacing={1}>
            <Box sx={{width: "80px"}}>目标接口ID</Box>
            <Box>{calleeId}</Box>
          </Stack>
          <Stack direction='row' spacing={1}>
            <Box sx={{width: "80px"}}>目标接口路径</Box>
            <Box>{calleePath}</Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export function EdgeCenterCanvas(props) {
  const { nodes, links, handleNodeClick, services } = props;
  const [graph, setGraph] = useState(
    new dagreD3.graphlib.Graph({ compound: true })
      .setGraph({})
      .setDefaultEdgeLabel(() => {
        return {};
      })
  );

  const [id, setId] = useState('');
  const [repo, setRepo] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [callerId, setCallerId] = useState('');
  const [callerPath, setCallerPath] = useState('');
  const [calleeId, setCalleeId] = useState('');
  const [calleePath, setCalleePath] = useState('');

  const [svgWidth, setSvgWidth] = useState(0);

  const nodeTooltip = useRef(null);
  const edgeTooltip = useRef(null);

  useEffect(() => {
    var g = new dagreD3.graphlib.Graph({ compound: true })
      .setGraph({})
      .setDefaultEdgeLabel(() => {
        return {};
      });

    // Here we're setting the nodes
    nodes.forEach((item, index) => {
      g.setNode(item.id, {
        label: item.label,
        class: 'service_node',
        id: item.id,
      });
    });

    links.forEach((item, index) => {
      if (item.center) {
        g.setEdge(item.source, item.target, {
          style: 'stroke: #f66; stroke-width: 3px; fill: none;',
          arrowheadStyle: 'fill: #f66; width: 3px;',
          class: 'service_link',
          id: JSON.stringify(item.invoke_info),
        });
      } else {
        g.setEdge(item.source, item.target, {
          ...normalEdgeStyle,
          class: 'service_link',
          id: JSON.stringify(item.invoke_info),
        });
      }
    });

    g.nodes().forEach(function (v) {
      var node = g.node(v);
      // Round the corners of the nodes
      node.rx = node.ry = 5;
    });

    setGraph(g);
  }, [links]);

  useEffect(() => {
    // Create the renderer
    var render = new dagreD3.render();

    // Set up an SVG group so that we can translate the final graph.

    let svg = d3.select(document.getElementById('interface_svg-canvas'));
    let svgGroup = d3.select(document.getElementById('interface_g-canvas'));

    // Run the renderer. This is what draws the final graph.
    render(svgGroup, graph);

    const service_nodes = document.getElementsByClassName('service_node');
    for (const service_node of service_nodes) {
      service_node.addEventListener('click', () => {
        handleNodeClick(service_node.id);
      });
      service_node.addEventListener('mouseover', e => {
        setId(service_node.id);
        setRepo(services[service_node.id].repo)
        setImageUrl(services[service_node.id].imageUrl)
        nodeTooltip.current.style.display = 'block';
        nodeTooltip.current.style.top = e.clientY + 20 + 'px';
        nodeTooltip.current.style.left = e.clientX + 'px';
      });
      service_node.addEventListener('mouseleave', function () {
        nodeTooltip.current.style.display = 'none';
      });
    }

    const service_links = document.getElementsByClassName('service_link');
    for (const service_link of service_links) {

      const service_link_info = JSON.parse(service_link.id);
      service_link.addEventListener('mouseover', e => {
        setCallerId(service_link_info.caller);
        setCallerPath(service_link_info.callerPath)
        setCalleeId(service_link_info.callee)
        setCalleePath(service_link_info.calleePath)
        edgeTooltip.current.style.display = 'block';
        edgeTooltip.current.style.top = e.clientY + 20 + 'px';
        edgeTooltip.current.style.left = e.clientX + 'px';
      });
      service_link.addEventListener('mouseleave', function () {
        edgeTooltip.current.style.display = 'none';
      });

    }

    // Center the graph
    var xCenterOffset =
      (svg.property('width').baseVal.value - graph.graph().width) / 2;
    // svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 50)');

    svg.attr('height', graph.graph().height + 100);

    setSvgWidth(graph.graph().width);
  }, [graph]);

  window.onresize = () => {
    let svg = d3.select(document.getElementById('interface_svg-canvas'));
    let svgGroup = d3.select(document.getElementById('interface_g-canvas'));
    var xCenterOffset =
      (svg.property('width').baseVal.value - graph.graph().width) / 2;
    svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 50)');
  };

  return (
    <Box
      sx={{
        fontFamily: fontFamily,
        width: '100%',
        p: "20px"
      }}
    >
      <svg style={{ minWidth: '100%' }} width={svgWidth ? svgWidth + 40 : "none"} id='interface_svg-canvas' height='1000'>
        <g id='interface_g-canvas'></g>
      </svg>

      <Box
        ref={nodeTooltip}
        sx={{
          bgcolor: '#242E42',
          position: 'absolute',
          borderRadius: '5px',
          p: '12px',
          color: '#FFFFFF',
          display: 'none',
          fontSize: '12px',
          fontWeight: 400,
          fontStyle: 'normal',
          fontStretch: 'normal',
          lineHeight: 1.67,
          letterSpacing: 'normal',
        }}
      >
        <Stack direction='column' spacing={1}>
          <Stack direction='row' spacing={1}>
            <Box sx={{width: "80px"}}>ID</Box>
            <Box>{id}</Box>
          </Stack>
          <Stack direction='row' spacing={1}>
            <Box sx={{width: "80px"}}>代码仓库地址</Box>
            <Box>{repo}</Box>
          </Stack>
          <Stack direction='row' spacing={1}>
            <Box sx={{width: "80px"}}>镜像仓库地址</Box>
            <Box>{imageUrl}</Box>
          </Stack>
        </Stack>
      </Box>

      <Box
        ref={edgeTooltip}
        sx={{
          bgcolor: '#242E42',
          position: 'absolute',
          borderRadius: '5px',
          p: '12px',
          color: '#FFFFFF',
          display: 'none',
          fontSize: '12px',
          fontWeight: 400,
          fontStyle: 'normal',
          fontStretch: 'normal',
          lineHeight: 1.67,
          letterSpacing: 'normal',
        }}
      >
        <Stack direction='column' spacing={1}>
          <Stack direction='row' spacing={1}>
            <Box sx={{width: "80px"}}>源接口ID</Box>
            <Box>{callerId}</Box>
          </Stack>
          <Stack direction='row' spacing={1}>
            <Box sx={{width: "80px"}}>源接口路径</Box>
            <Box>{callerPath}</Box>
          </Stack>
          <Stack direction='row' spacing={1}>
            <Box sx={{width: "80px"}}>目标接口ID</Box>
            <Box>{calleeId}</Box>
          </Stack>
          <Stack direction='row' spacing={1}>
            <Box sx={{width: "80px"}}>目标接口路径</Box>
            <Box>{calleePath}</Box>
          </Stack>
        </Stack>
      </Box>

    </Box>
  );
}

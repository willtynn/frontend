import * as d3 from 'd3';
import dagreD3 from 'dagre-d3';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { shadowStyle } from '@/utils/commonUtils';
import { digitInCircle } from '@/utils/commonUtils';

import './canvas.css';

const normalEdgeStyle = {
  style: 'stroke: #333; stroke-width: 3px; fill: none;',
  arrowheadStyle: 'fill: #333; width: 3px;',
};

export function ClusterCanvas(props) {
  const { id, nodes, links, handleNodeClick, handleLinkClick } = props;

  useEffect(() => {
    if(!nodes || nodes.length == 0 || !links || links.length == 0) {
      return
    }
    var g = new dagreD3.graphlib.Graph({ compound: true })
      .setGraph({})
      .setDefaultEdgeLabel(() => {
        return {};
      });


    nodes.forEach((item, index) => {
      g.setNode(item.id, {
        id: item.id,
        labelType: "html",
        label: `${item.label}${digitInCircle(12)}`,
        style: 'fill: #ffd47f',
        class: `server_node_${id}`
      });
    });

    links.forEach((item, index) => {
      g.setEdge(item.source, item.target, {
        label: item.label,
        ...normalEdgeStyle,
        class: 'server_link',
      });
    });

    

    g.nodes().forEach(function (v) {
      var node = g.node(v);
      // Round the corners of the nodes
      node.rx = node.ry = 5;
    });

    // Create the renderer
    var render = new dagreD3.render();

    // Set up an SVG group so that we can translate the final graph.

    var svg = d3.select(document.getElementById(`${id}_svg-canvas`));
    let svgGroup = d3.select(document.getElementById(`${id}_g-canvas`));

    // Run the renderer. This is what draws the final graph.
    render(svgGroup, g);

    const server_nodes = document.getElementsByClassName(`server_node_${id}`);
    for (const server_node of server_nodes) {
      // server_node.addEventListener('click', () => {
        
      //   console.log("Click from canvas", id, server_node.id)
      //   handleNodeClick(server_node.id);
      // });
      server_node.onclick =() => {
        console.log("Click from canvas", id, server_node.id)
        handleNodeClick(server_node.id);
      }
    }

    const server_links = document.getElementsByClassName('server_link');
    for (const server_link of server_links) {
      server_link.addEventListener('click', () => {
        const server_link_info = JSON.parse(server_link.id);
        handleLinkClick({});
      });
    }

    // Center the graph
    // console.log(svg.attr("width"));
    // var xCenterOffset = 10;
    // console.log(xCenterOffset);
    var xCenterOffset = (svg.attr('width') - g.graph().width) / 2;

    svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 20)');

    svg.attr('height', g.graph().height + 40);
  }, [links]);

  return (
    <Box
      sx={{
        fontFamily: 'Open Sans',
        ...shadowStyle,
      }}
    >
      <svg id={`${id}_svg-canvas`} width='800' height='600'>
        <g id={`${id}_g-canvas`}></g>
      </svg>
    </Box>
  );
}

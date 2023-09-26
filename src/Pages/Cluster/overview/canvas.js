import * as d3 from 'd3';
import dagreD3 from 'dagre-d3';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { shadowStyle } from '@/utils/commonUtils';
import { digitInCircle, textUnderPolygon } from '@/utils/commonUtils';

import './canvas.css';

const normalEdgeStyle = {
  style: 'stroke: #333; stroke-width: 3px; fill: none;',
  arrowheadStyle: 'fill: #333; width: 3px;',
};

export function ClusterCanvas(props) {
  const { id, nodes, links, handleNodeClick, handleLinkClick } = props;

  useEffect(() => {
    if (!nodes || nodes.length == 0 || !links || links.length == 0) {
      return;
    }
    var g = new dagreD3.graphlib.Graph({ compound: true })
      .setGraph({})
      .setDefaultEdgeLabel(() => {
        return {};
      });

    nodes.forEach((item, index) => {
      g.setNode(item.id, {
        shape: "hexagonWithCircle",
        id: item.id,
        labelType: 'html',
        label: `${digitInCircle(12)}${textUnderPolygon(item.label)}`,
        style: 'fill: #ffd47f',
        class: `server_node_${id}`,
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

    render.shapes().hexagonWithCircle = function(parent, bbox, node) {
      let shapeSvg = parent.insert("g", ":first-child")
        .html('<svg width="96" height="87" viewBox="0 0 96 87" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.6801 2.5H64.3199C68.7946 2.5 72.9279 4.89185 75.1576 8.77145L91.5369 37.2715C93.7533 41.1281 93.7533 45.872 91.5369 49.7285L75.1576 78.2286C72.9279 82.1081 68.7946 84.5 64.3199 84.5H31.6801C27.2054 84.5 23.0721 82.1081 20.8424 78.2285L4.46308 49.7285C2.24665 45.8719 2.24665 41.128 4.46309 37.2715L20.8424 8.77144C23.0721 4.89185 27.2054 2.5 31.6801 2.5Z" fill="white" stroke="#5FC976" stroke-width="5"/></svg>')
        .attr("transform", "translate(-50,-43.5)")
    
      node.intersect = function(point) {
        return dagreD3.intersect.rect(node, point);
      };
    
      return shapeSvg;
    };
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
      server_node.onclick = () => {
        console.log('Click from canvas', id, server_node.id);
        handleNodeClick(server_node.id);
      };
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

    svg.attr('height', g.graph().height + 200);

    const polygon_texts = document.getElementsByClassName("polygon_text")
    console.log(polygon_texts)
    for(let i = 0; i < polygon_texts.length; i++) {
      polygon_texts[i].style.left=`${-polygon_texts[i].clientWidth / 2}px`
    }
  }, [links]);

  return (
    <Box
      sx={{
        fontFamily: 'Open Sans',
        ...shadowStyle,
      }}
    >
      <svg id={`${id}_svg-canvas`} width='800' height='1000'>
        <g id={`${id}_g-canvas`}></g>
      </svg>
    </Box>
  );
}

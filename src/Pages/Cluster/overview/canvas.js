import * as d3 from 'd3';
import dagreD3 from 'dagre-d3';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { shadowStyle } from '@/utils/commonUtils';
import { digitInCircle, textUnderPolygon } from '@/utils/commonUtils';

import './canvas.css';

const normalEdgeStyle = {
  style: 'stroke: #573CC4; stroke-width: 2.2px; fill: none;',
  arrowheadStyle: 'fill: #573CC4; width: 2px; stroke-width: 1px;',
};

export function ClusterCanvas(props) {
  const { id, nodes, links, handleNodeClick, handleLinkClick } = props;

  useEffect(() => {
    if (!nodes || nodes.length == 0 || !links || links.length == 0) {
      return;
    }
    var g = new dagreD3.graphlib.Graph({ compound: true })
      .setGraph({
        
        nodesep: 100,
        ranksep: 100, // 层与层之间的间距
        // rankdir: "LR",
      })
      // .setDefaultEdgeLabel(() => {
      //   return {};
      // });

    nodes.forEach((item, index) => {
      g.setNode(item.id, {
        shape: "hexagonWithCircle",
        id: item.id,
        labelType: 'html',
        // label: `${digitInCircle(12, 30, "#55AAAA")}${textUnderPolygon(item.label, 15, "#000", null, 45)}${textUnderPolygon(12 !== 1 ? 12 + " service instances": "1 service instance", 8, "#5E5E5E", "#FFF", 65)}`,
        label: `${textUnderPolygon(item.label, 15, "#000", null, 45)}${textUnderPolygon(12 !== 1 ? 12 + " service instances": "1 service instance", 8, "#5E5E5E", "#FAFAFA", 65)}`,
        style: 'fill: #ffd47f',
        class: `server_node_${id}`,
      });
    });

    links.forEach((item, index) => {
      g.setEdge(item.source, item.target, {
        label: item.label,
        arrowhead: 'vee',
        curve: d3.curveBasis,
        ...normalEdgeStyle,
        class: 'cluster_link',
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
        // .html('<svg width="96" height="87" viewBox="0 0 96 87" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.6801 2.5H64.3199C68.7946 2.5 72.9279 4.89185 75.1576 8.77145L91.5369 37.2715C93.7533 41.1281 93.7533 45.872 91.5369 49.7285L75.1576 78.2286C72.9279 82.1081 68.7946 84.5 64.3199 84.5H31.6801C27.2054 84.5 23.0721 82.1081 20.8424 78.2285L4.46308 49.7285C2.24665 45.8719 2.24665 41.128 4.46309 37.2715L20.8424 8.77144C23.0721 4.89185 27.2054 2.5 31.6801 2.5Z" fill="white" stroke="#5FC976" stroke-width="5"/></svg>')
        .html('<svg width="104" height="95" viewBox="0 0 104 95" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_1_8)"><path d="M22.6749 7.52573C25.3504 2.87022 30.3105 0 35.6801 0H68.3199C73.6895 0 78.6496 2.87022 81.3251 7.52574L97.7045 36.0257C100.364 40.6537 100.364 46.3463 97.7044 50.9743L81.3251 79.4743C78.6496 84.1298 73.6895 87 68.3199 87H35.6801C30.3105 87 25.3504 84.1298 22.6749 79.4743L6.29555 50.9743C3.63583 46.3463 3.63583 40.6537 6.29555 36.0257L22.6749 7.52573Z" fill="white"/><path d="M35.6801 2.5H68.3199C72.7946 2.5 76.9279 4.89185 79.1576 8.77145L95.5369 37.2715C97.7533 41.1281 97.7533 45.872 95.5369 49.7285L79.1576 78.2286C76.9279 82.1081 72.7946 84.5 68.3199 84.5H35.6801C31.2054 84.5 27.0721 82.1081 24.8424 78.2285L8.46308 49.7285C6.24665 45.8719 6.24665 41.128 8.46309 37.2715L24.8424 8.77144C27.0721 4.89185 31.2054 2.5 35.6801 2.5Z" stroke="#5FC976" stroke-width="5"/></g><g filter="url(#filter1_d_1_8)"><circle cx="52" cy="43" r="6" fill="black"/></g><defs><filter id="filter0_d_1_8" x="0.300751" y="0" width="103.398" height="95" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_8"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_8" result="shape"/></filter><filter id="filter1_d_1_8" x="42" y="37" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_8"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_8" result="shape"/></filter></defs></svg>')
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
        handleNodeClick(server_node.id);
      };
    }

    // Center the graph
    // console.log(svg.attr("width"));
    // var xCenterOffset = 10;
    // console.log(xCenterOffset);
    var xCenterOffset = (svg.attr('width') - g.graph().width) / 2;

    svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 20)');

    svg.attr('height', g.graph().height + 200);

    const polygon_texts = document.getElementsByClassName("polygon_text")
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

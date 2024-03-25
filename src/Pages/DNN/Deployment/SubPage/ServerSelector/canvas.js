import * as d3 from 'd3';
import dagreD3 from 'dagre-d3';
import { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';

import { digitInCircle, textUnderPolygon } from '@/utils/commonUtils';
import { fontFamily } from "@/utils/commonUtils";

import './canvas.css';

const normalEdgeStyle = {
  style: 'stroke: #573CC4; stroke-width: 2.2px; fill: none;',
  arrowheadStyle: 'fill: #573CC4; width: 2px; stroke-width: 1px;',
};

export function ClusterCanvas(props) {
  const { id, nodes, links, handleNodeClick, selectedServerID} = props;
  const canvasBox = useRef();
  const dictionary = {}

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

    nodes.forEach((item, index) => {
      g.setNode(item.id, {
        shape: "hexagonWithCircle",
        id: item.id,
        labelType: 'html',
        label: `${textUnderPolygon(item.label, 15, "#000", null, 45)}`,
        style: 'fill: #ffd47f',
        class: `server_node_${id}`,
        click: 'N'
      });
      dictionary[item.id] = ['N']
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

    render.shapes().hexagonWithCircle = function (parent, bbox, node) {
      let shapeSvg
      if (node.click == 'N') {
        shapeSvg = parent.insert("g", ":first-child")
          .html('<svg width="100" height="87" viewBox="0 0 100 87" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.8424 8.77144C25.0721 4.89185 29.2054 2.5 33.6801 2.5H66.3199C70.7946 2.5 74.9279 4.89185 77.1576 8.77145L93.5369 37.2715C95.7533 41.128 95.7533 45.872 93.5369 49.7285L77.1576 78.2285C74.9279 82.1081 70.7946 84.5 66.3199 84.5H33.6801C29.2054 84.5 25.0721 82.1081 22.8424 78.2285L6.46308 49.7285C4.24665 45.8719 4.24665 41.128 6.46309 37.2714L22.8424 8.77144Z" fill="white" stroke="#5fc976" stroke-width="5"/><g filter="url(#filter0_d_1_8)"><circle cx="50" cy="43" r="6" fill="black"/></g><defs><filter id="filter0_d_1_8" x="40" y="37" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_8"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_8" result="shape"/></filter></defs></svg>')
          .attr("transform", "translate(-50,-43.5)")
      } else {
        shapeSvg = parent.insert("g", ":first-child")
          .html('<svg width="100" height="87" viewBox="0 0 100 87" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.8424 8.77144C25.0721 4.89185 29.2054 2.5 33.6801 2.5H66.3199C70.7946 2.5 74.9279 4.89185 77.1576 8.77145L93.5369 37.2715C95.7533 41.128 95.7533 45.872 93.5369 49.7285L77.1576 78.2285C74.9279 82.1081 70.7946 84.5 66.3199 84.5H33.6801C29.2054 84.5 25.0721 82.1081 22.8424 78.2285L6.46308 49.7285C4.24665 45.8719 4.24665 41.128 6.46309 37.2714L22.8424 8.77144Z" fill="white" stroke="red" stroke-width="5"/><g filter="url(#filter0_d_1_8)"><circle cx="50" cy="43" r="6" fill="black"/></g><defs><filter id="filter0_d_1_8" x="40" y="37" width="20" height="20" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_8"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_8" result="shape"/></filter></defs></svg>')
          .attr("transform", "translate(-50,-43.5)")
      }


      node.intersect = function (point) {
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
      server_node.onclick = () => {
        if (dictionary[server_node.id] == 'N'){
          dictionary[server_node.id] = 'Y'
        }else{
          dictionary[server_node.id] = 'N'
        }
        g.setNode(server_node.id, {
          shape: "hexagonWithCircle",
          id: server_node.id,
          labelType: 'html',
          label: `${textUnderPolygon(server_node.id, 15, "#000", null, 45)}`,
          style: 'fill: #ffd47f',
          class: `server_node_${id}`,
          click: dictionary[server_node.id]
        });
        g.nodes().forEach(function (v) {
          var node = g.node(v);
          // Round the corners of the nodes
          node.rx = node.ry = 5;
        });
        render(svgGroup, g);
        // Center the graph
        var xCenterOffset = (svg.property("width").baseVal.value - g.graph().width) / 2;
        svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 50)');
        svg.attr('height', g.graph().height + 100);
        const polygon_texts = document.getElementsByClassName("polygon_text")
        for (let i = 0; i < polygon_texts.length; i++) {
          polygon_texts[i].style.left = `${-polygon_texts[i].clientWidth / 2}px`
        }
        console.log(server_node.id)
        console.log(selectedServerID)
        handleNodeClick(server_node.id);
      };
    }

    // Center the graph
    var xCenterOffset = (svg.property("width").baseVal.value - g.graph().width) / 2;
    svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 50)');
    svg.attr('height', g.graph().height + 100);
    const polygon_texts = document.getElementsByClassName("polygon_text")
    for (let i = 0; i < polygon_texts.length; i++) {
      polygon_texts[i].style.left = `${-polygon_texts[i].clientWidth / 2}px`
    }
  }, [links]);



  return (
    <Box
      sx={{
        fontFamily: fontFamily,
        minHeight: "400px"
      }}
      ref={canvasBox}
    >
      <svg style={{ width: "100%" }} id={`${id}_svg-canvas`} height='1000'>
        <g id={`${id}_g-canvas`}></g>
      </svg>
    </Box>
  );
}

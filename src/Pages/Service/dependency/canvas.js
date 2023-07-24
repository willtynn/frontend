import React from "react";
import * as d3 from "d3";
import dagreD3 from "dagre-d3";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import "./styles.css";

export function Canvas(props) {

  const { nodes, links } = props

  useEffect(() => {
    var g = new dagreD3.graphlib.Graph({ compound: true })
      .setGraph({})
      .setDefaultEdgeLabel(() => { return {} });

    g.setNode("top_group", {
      label: "调用当前服务的服务",
      clusterLabelPos: "top",
      style: "fill: #ffd47f"
    });
    g.setNode("bottom_group", {
      label: "当前服务调用的服务",
      clusterLabelPos: "top",
      style: "fill: #5f9488"
    });

    // Here we're setting the nodes
    nodes.forEach((item, index) => {
      g.setNode(item.id, { label: item.label });
      if(item.type === "invoked") {
        g.setParent(item.id, "top_group");
      } else if(item.type === "invoking") {
        g.setParent(item.id, "bottom_group");
      }
    })

    links.forEach((item, index) => {
      g.setEdge(item.source, item.target);
    })

    g.nodes().forEach(function (v) {
      var node = g.node(v);
      // Round the corners of the nodes
      node.rx = node.ry = 5;
    });

    // Create the renderer
    var render = new dagreD3.render();

    // Set up an SVG group so that we can translate the final graph.

    var svg = d3.select(document.getElementById("svg-canvas"))
    let svgGroup = d3.select(document.getElementById("g-canvas"))

    // Run the renderer. This is what draws the final graph.
    render(svgGroup, g);

    // Center the graph
    // console.log(svg.attr("width"));
    var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
    // console.log(xCenterOffset);
    svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
    svg.attr("height", g.graph().height + 40);

  }, [links])

  return (
    <Box
      sx={{
        fontFamily: 'Open Sans',
        textAlign: 'center'
      }}
    >
      <svg id="svg-canvas" width="800" height="600">
        <g id="g-canvas"></g>
      </svg>
    </Box>
  );

}
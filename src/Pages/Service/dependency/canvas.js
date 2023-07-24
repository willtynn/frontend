import React from "react";
import * as d3 from "d3";
import dagreD3 from "dagre-d3";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import "./styles.css";

export function Canvas(props) {

  

  const [graph, setGraph] = useState(null);

  const handleclick = () => {
    // Create the input graph
    var g = new dagreD3.graphlib.Graph({ compound: true })
      .setGraph({})
      .setDefaultEdgeLabel(() => {});

    // Here we're setting the nodes
    g.setNode("a", { label: "A" });
    g.setNode("b", { label: "B" });
    g.setNode("c", { label: "C" });
    g.setNode("d", { label: "D" });
    g.setNode("e", { label: "E" });
    g.setNode("f", { label: "F" });
    g.setNode("g", { label: "G" });
    g.setNode("group", {
      label: "Group",
      clusterLabelPos: "top",
      style: "fill: #d3d7e8"
    });
    g.setNode("top_group", {
      label: "Top Group",
      clusterLabelPos: "bottom",
      style: "fill: #ffd47f"
    });
    g.setNode("bottom_group", {
      label: "Bottom Group",
      style: "fill: #5f9488"
    });

    // Set the parents to define which nodes belong to which cluster
    g.setParent("top_group", "group");
    g.setParent("bottom_group", "group");
    g.setParent("b", "top_group");
    g.setParent("c", "bottom_group");
    g.setParent("d", "bottom_group");
    g.setParent("e", "bottom_group");
    g.setParent("f", "bottom_group");

    // Set up edges, no special attributes.
    g.setEdge("a", "b");
    g.setEdge("b", "c");
    g.setEdge("b", "d");
    g.setEdge("b", "e");
    g.setEdge("b", "f");
    g.setEdge("b", "g");

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
    console.log(svg.attr("width"));
    var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
    console.log(xCenterOffset);
    svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
    svg.attr("height", g.graph().height + 40);
  }
  

  return (
    <Box 
      sx={{
        fontFamily: 'Open Sans',
        textAlign: 'center'
      }}
    >
      <button onClick={handleclick}>click</button>
      <svg id="svg-canvas" className="wtf" width="800" height="600">
        <g id="g-canvas"></g>
      </svg>
    </Box>
  );

}
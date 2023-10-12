import React from "react";
import * as d3 from "d3";
import dagreD3 from "dagre-d3";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { shadowStyle } from "@/utils/commonUtils";
import { fontFamily } from "@/utils/commonUtils";
import "./styles.css";

const normalEdgeStyle = {
  style: "stroke: #333; stroke-width: 3px; fill: none;",
  arrowheadStyle: "fill: #333; width: 3px;",
}

export function ThreeLayerCanvas(props) {

  const { nodes, links, handleNodeClick, handleLinkClick } = props

  useEffect(() => {
    var g = new dagreD3.graphlib.Graph({ compound: true })
      .setGraph({})
      .setDefaultEdgeLabel(() => { return {} });
    
    let top_count = 0, bottom_count = 0;
    g.setNode("top_group", {
      label: "调用当前服务的服务",
      clusterLabelPos: "top",
      style: "fill: #ffd47f"
    });
    g.setNode("bottom_group", {
      label: "当前服务调用的服务",
      clusterLabelPos: "bottom",
      style: "fill: #5f9488"
    });
    // g.removeNode("bottom_group");
    // Here we're setting the nodes
    nodes.forEach((item, index) => {
      g.setNode(item.id, { label: item.label, class: "service_node", id: item.id });
      if (item.type === "invoked") {
        ++top_count;
        g.setParent(item.id, "top_group");
      } else if (item.type === "invoking") {
        ++bottom_count;
        g.setParent(item.id, "bottom_group");
      }
    })
    if(top_count === 0) {
      g.removeNode("top_group");
    }
    if(bottom_count === 0) {
      g.removeNode("bottom_group");
    }

    links.forEach((item, index) => {
      g.setEdge(item.source, item.target, { 
        ...normalEdgeStyle,
        class: "service_link", 
        id: JSON.stringify(item.invoke_info) 
      });
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

    const service_nodes = document.getElementsByClassName("service_node")
    for (const service_node of service_nodes) {
      service_node.addEventListener("click", () => {
        handleNodeClick(service_node.id);
      });
    }

    const service_links = document.getElementsByClassName("service_link")
    for (const service_link of service_links) {
      service_link.addEventListener("click", () => {
        const service_link_info = JSON.parse(service_link.id)
        handleLinkClick(service_link_info);
      });
    }

    // Center the graph
    // console.log(svg.attr("width"));
    var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;

    svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");

    svg.attr("height", g.graph().height + 40);

  }, [links])

  return (
    <Box
      sx={{
        fontFamily: fontFamily,
        ...shadowStyle
      }}
    >
      <svg id="svg-canvas" width="800" height="600">
        <g id="g-canvas"></g>
      </svg>
    </Box>
  );

}

export function EdgeCenterCanvas(props) {

  const { nodes, links, handleNodeClick, handleLinkClick } = props

  useEffect(() => {
    var g = new dagreD3.graphlib.Graph({ compound: true })
      .setGraph({})
      .setDefaultEdgeLabel(() => { return {} });

    // Here we're setting the nodes
    nodes.forEach((item, index) => {
      g.setNode(item.id, { label: item.label, class: "service_node", id: item.id });
    })

    links.forEach((item, index) => {
      if (item.center) {
        g.setEdge(
          item.source,
          item.target,
          {
            label: item.invoke_info.callee,
            style: "stroke: #f66; stroke-width: 3px; fill: none;",
            arrowheadStyle: "fill: #f66; width: 3px;",
            class: "service_link",
            id: JSON.stringify(item)
          }
        );
      } else {
        g.setEdge(
          item.source,
          item.target,
          {
            label: item.invoke_info.callee,
            ...normalEdgeStyle,
            class: "service_link",
            id: JSON.stringify(item)
          }
        );
      }

    })

    g.nodes().forEach(function (v) {
      var node = g.node(v);
      // Round the corners of the nodes
      node.rx = node.ry = 5;
    });

    // Create the renderer
    var render = new dagreD3.render();

    // Set up an SVG group so that we can translate the final graph.

    var svg = d3.select(document.getElementById("interface_svg-canvas"))
    let svgGroup = d3.select(document.getElementById("interface_g-canvas"))

    // Run the renderer. This is what draws the final graph.
    render(svgGroup, g);

    const service_nodes = document.getElementsByClassName("service_node")
    for (const service_node of service_nodes) {
      service_node.addEventListener("click", () => {
        handleNodeClick(service_node.id);
      });
    }

    const service_links = document.getElementsByClassName("service_link")
    for (const service_link of service_links) {
      service_link.addEventListener("click", () => {
        const service_link_info = JSON.parse(service_link.id)
        handleLinkClick({
          source: service_link_info.source,
          target: service_link_info.target,
          ...service_link_info.invoke_info
        });
      });
    }

    // Center the graph
    // console.log(svg.attr("width"));
    // var xCenterOffset = 10;
    // console.log(xCenterOffset);
    var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;

    svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");

    svg.attr("height", g.graph().height + 40);

  }, [links])

  return (
    <Box
      sx={{
        fontFamily: fontFamily,
        ...shadowStyle
      }}
    >
      <svg id="interface_svg-canvas" width="800" height="600">
        <g id="interface_g-canvas"></g>
      </svg>
    </Box>
  );

}
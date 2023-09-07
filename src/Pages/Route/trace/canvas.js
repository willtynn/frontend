import React from "react";
import * as d3 from "d3";
import dagreD3 from "dagre-d3";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { shadowStyle } from "@/utils/commonUtils";

import "./styles.css";
import { getRouteTraceDetail } from "@/actions/routeAction";

const normalEdgeStyle = {
  style: "stroke: #333; stroke-width: 3px; fill: none;",
  arrowheadStyle: "fill: #333; width: 3px;",
}

export function RouteTraceCanvas(props) {


  const dispatch = useDispatch();

  const { id, handleNodeClick, handleLinkClick } = props

  const {
    routeTraceDetail
  } = useSelector(state => {
    return {
      routeTraceDetail: state.Route.routeTraceDetail
    };
  });

  useEffect(() => {
    dispatch(getRouteTraceDetail(id));
  },[]);

  useEffect(() => {

    if (routeTraceDetail === null || routeTraceDetail === undefined || routeTraceDetail.nodes === undefined || routeTraceDetail.edges === undefined) {
      return;
    }
    
    const nodes = routeTraceDetail.nodes;
    const edges = routeTraceDetail.edges;
    console.log(nodes);

    var g = new dagreD3.graphlib.Graph({ compound: true })
      .setGraph({})
      .setDefaultEdgeLabel(() => { return {} });

    // Here we're setting the nodes
    nodes.forEach((item, index) => {
      console.log(item);
      g.setNode(
        item.ip, 
        { 
          label: item.name === "" || item.name.trim() === "" ? item.ip : item.name, 
          class: "trace_node", 
          id: item.id 
        });
    })

    console.log("A");
    edges.forEach((item, index) => {
      g.setEdge(
        item.start,
        item.end,
        {
          label: item.info,
          style: "stroke: #f66; stroke-width: 2px; stroke-dasharray: 5, 5; fill: none;",
          arrowheadStyle: "fill: #f66; width: 2px;",
          class: "trace_link",
          id: JSON.stringify(item)
        }
      );
    })
    console.log("BB");

    console.log(g.nodes())
    g.nodes().forEach(function (v) {
      var node = g.node(v);
      console.log(node);
      // Round the corners of the nodes
      node.rx = node.ry = 5;
    });

    // Create the renderer
    var render = new dagreD3.render();
    console.log("CCC");

    // Set up an SVG group so that we can translate the final graph.
    var svg = d3.select(document.getElementById("trace_svg-canvas"))
    let svgGroup = d3.select(document.getElementById("trace_g-canvas"))
    console.log("DDDD");

    // Run the renderer. This is what draws the final graph.
    render(svgGroup, g);
    console.log("EEEEEE");

    /*
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
    }*/

    // Center the graph
    // console.log(svg.attr("width"));
    // var xCenterOffset = 10;
    // console.log(xCenterOffset);
    
    var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;

    svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");

    svg.attr("height", g.graph().height + 40);

  }, [routeTraceDetail])

  return (
    <Box
      sx={{
        fontFamily: 'Open Sans',
        ...shadowStyle,
        width: "100%",
        height: "100%"
      }}
    >
      <svg id="trace_svg-canvas" width="100%" height="100%">
        <g id="trace_g-canvas"></g>
      </svg>
    </Box>
  );

}
import React from "react";
import * as d3 from "d3";
import tooltip from "./tip.js";
import dagreD3 from "dagre-d3";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { fontFamily } from "@/utils/commonUtils";
import "./styles.css";
import { getRouteTraceDetail } from "@/actions/routeAction";


export function RouteTraceCanvas(props) {


  const dispatch = useDispatch();

  const { id } = props

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

    var g = new dagreD3.graphlib.Graph({ compound: true })
      .setGraph({})
      .setDefaultEdgeLabel(() => { return {} });

    // Here we're setting the nodes
    nodes.forEach((item, index) => {
      g.setNode(
        item.ip, 
        { 
          label: item.name === "" || item.name.trim() === "" ? item.ip : item.name, 
          class: "trace_node", 
          id: item.id 
        });
    })

    /*
    let d3Tip = tooltip()

    var tip = tooltip.tip()
      //类名可以自己设置；假如另有一个矩阵图，也需要添加d3-tip，则应创建2个tip，类名可分别设置为d3-tip_bar，d3-tip_matrix，方便分别控制。
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
      //d是数据集中的一条数据，它和一个矩形条绑定在一起。
      return "<strong>Frequency:</strong> <span style='color:red'>uhafj</span>";
      })*/
    
    // edges.forEach((item, index) => {
    //   g.setEdge(
    //     item.start,
    //     item.end,
    //     {
    //       label: "<div style=\"width: 100px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; word-break: break-all;\">" + item.info + "</div>",
    //       labelType: "html",
    //       style: "stroke: #74C67A; stroke-width: 2px; stroke-dasharray: 5, 5; fill: none;",
    //       arrowheadStyle: "fill: #74C67A; width: 2px;",
    //       class: "trace_link",
    //       id: JSON.stringify(item),
    //     }
    //   ).on("mouseover", tip.show());
    // }
    // )
    g.nodes().forEach(function (v) {
      var node = g.node(v);
      // Round the corners of the nodes
      node.rx = node.ry = 5;
    });

    // Create the renderer
    var render = new dagreD3.render();

    // Set up an SVG group so that we can translate the final graph.
    var svg = d3.select(document.getElementById("trace_svg-canvas"));
    let svgGroup = d3.select(document.getElementById("trace_g-canvas"));

    // Run the renderer. This is what draws the final graph.
    render(svgGroup, g);

    // Center the graph
    // console.log(svg.attr("width"));
    // var xCenterOffset = 10;
    // console.log(xCenterOffset);
    svg.attr("height", g.graph().height + 50);
    svg.attr("width", g.graph().width + 40);
    
    //svg.attr("height", refSvg.current.offsetHeight);
    //svg.attr("width", refSvg.current.offsetWidth);

    var xCenterOffset = 20;
    svgGroup.attr("transform", "translate(" + xCenterOffset + ", 25)");
  }, [routeTraceDetail])

  return (
    <Box
      sx={{
        fontFamily: fontFamily,
        overflow: "auto"
      }}
    >
      <svg id="trace_svg-canvas" sx={{ width: "100%", boxShadow: "1px 1px 4px 1px #B5B5B8" }} >
        <g id="trace_g-canvas"></g>
      </svg>
    </Box>
  );

}
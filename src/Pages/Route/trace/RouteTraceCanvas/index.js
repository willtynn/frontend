/**
 * src\Pages\Route\trace\RouteTraceCanvas\index.js
 */
import React from 'react';
import * as d3 from 'd3';
import dagreD3 from 'dagre-d3';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { fontFamily } from '@/utils/commonUtils';
import './styles.css';
import { getRouteTraceDetail } from '@/actions/routeAction';

import { useIntl } from 'react-intl';

export function RouteTraceCanvas(props) {
  const dispatch = useDispatch();
  const intl = useIntl();

  const { id } = props;

  const [noData, setNoData] = React.useState(false);

  const { routeTraceDetail } = useSelector(state => {
    return {
      routeTraceDetail: state.Route.routeTraceDetail,
    };
  });

  useEffect(() => {
    dispatch(getRouteTraceDetail(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      routeTraceDetail === null ||
      routeTraceDetail === undefined ||
      routeTraceDetail.nodes === undefined ||
      routeTraceDetail.edges === undefined
    ) {
      return;
    }

    if (
      routeTraceDetail.nodes.length === 0 &&
      routeTraceDetail.edges.length === 0
    ) {
      setNoData(true);
      return;
    } else setNoData(false);

    const nodes = routeTraceDetail.nodes;
    const edges = routeTraceDetail.edges;

    var g = new dagreD3.graphlib.Graph({ compound: true })
      .setGraph({})
      .setDefaultEdgeLabel(() => {
        return {};
      });

    // Here we're setting the nodes
    /*旧方案
    nodes.forEach((item, index) => {
      g.setNode(item.ip, {
        label:
          item.name === '' || item.name.trim() === '' ? item.ip : item.name,
        labelType: 'html',
        labelStyle: 'overflow: hidden;text-overflow: ellipsis;',
        class: 'trace_node',
        id: item.id,
      });
    });*/
    nodes.forEach((item, index) => {
      let label = 
      "<div style=\"width:max-content;text-align: center;\"> \
      <strong style=\"font-size:16px\">" + item.service + "</strong><br> \
      <table><tbody> \
      <tr align=\"left\"><td><em style=\"font-size:14px\">IP&nbsp;&nbsp;&nbsp;</em></td><td>" + item.ip + "</td></tr> \
      <tr align=\"left\"><td><em>" + intl.messages['routeTrace.popWindowTimeConsuming'] + "&nbsp;&nbsp;&nbsp;</em></td><td>" + item.duration + "</td></tr> \
      <tr align=\"left\"><td><em>Host&nbsp;&nbsp;&nbsp;</em></td><td>" + item.host_ip + "</td></tr> \
      </tbody></table></div>";
      g.setNode(item.ip, {
        label:
          label,
        labelType: 'html',
        labelStyle: 'overflow: hidden;text-overflow: ellipsis;',
        class: 'trace_node',
        id: item.id,
      });
    });

    edges.forEach((item, index) => {
      // 处理边中的某个节点在上面的nodes中不存在的奇怪情况
      if (!g.hasNode(item.start)) {
        g.setNode(item.start, {
          label: item.start,
          labelStyle: 'overflow: hidden;text-overflow: ellipsis;',
          class: 'trace_node',
          id: item.start,
        });
      }
      if (!g.hasNode(item.end)) {
        g.setNode(item.end, {
          label: item.end,
          labelStyle: 'overflow: hidden;text-overflow: ellipsis;',
          class: 'trace_node',
          id: item.end,
        });
      }
      g.setEdge(item.start, item.end, {
        label: item.info, //"<div style=\"max-width:100px;height:90px;overflow: auto;text-overflow: ellipsis;word-break: break-all;\">" + item.info + "</div>",
        labelType: 'html',
        style:
          'stroke: #74C67A; stroke-width: 2px; stroke-dasharray: 5, 5; fill: none;',
        labelStyle: 'max-width:300px;overflow: hidden;text-overflow: ellipsis;',
        arrowheadStyle: 'fill: #74C67A; width: 2px;',
        class: 'trace_link',
        id: JSON.stringify(item),
      }); //.on("mouseover", (e)=> console.log(e));
    });

    
    g.nodes().forEach(function (v) {
      var node = g.node(v);
      // Round the corners of the nodes
      node.rx = node.ry = 5;
    });

    // Create the renderer
    var render = new dagreD3.render();

    // Set up an SVG group so that we can translate the final graph.
    var svg = d3.select(document.getElementById('trace_svg-canvas'));
    let svgGroup = d3.select(document.getElementById('trace_g-canvas'));

    // *********** ToolTip ***************
    function createTooltip() {
      return d3.select('body').append('div').classed('tooltip', true);
    }

    let tooltip = createTooltip();
    //tooltip显示
    function tipVisible(textContent, x, y) {
      tooltip
        .transition()
        .duration(400)
        .style('opacity', 0.9)
        .style('display', 'block');
      tooltip
        .html(textContent)
        .style('left', x + 'px')
        .style('top', y + 'px');
    }
    //tooltip隐藏
    function tipHidden() {
      tooltip
        .transition()
        .duration(400)
        .style('opacity', 0)
        .style('display', 'none');
    }
    // *********** ToolTip ***************

    //鼠标悬停显示隐藏tooltip
    svgGroup
      .selectAll('g.edgeLabel')
      .on('mouseover', function (v) {
        //console.log(v.toElement.innerText);
        tipVisible(v.toElement.innerText, v.pageX, v.pageY);
      })
      .on('mouseout', function (_) {
        tipHidden();
      });
    svgGroup
      .selectAll('g.node')
      .on('mouseover', function (v) {
        //console.log(v.toElement.innerText);
        if (v.toElement.innerText === 'undefined') {
          return;
        }
        tipVisible(v.toElement.innerText, v.pageX, v.pageY);
      })
      .on('mouseout', function (_) {
        tipHidden();
      });

    // Run the renderer. This is what draws the final graph.
    render(svgGroup, g);

    // Center the graph
    // console.log(svg.attr("width"));
    // var xCenterOffset = 10;
    // console.log(xCenterOffset);
    svg.attr('height', g.graph().height + 50);
    svg.attr('width', g.graph().width + 40);

    //svg.attr("height", refSvg.current.offsetHeight);
    //svg.attr("width", refSvg.current.offsetWidth);

    var xCenterOffset = 20;
    svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 25)');
  }, [routeTraceDetail]);

  return (
    <Box
      sx={{
        width: '100%',
        fontFamily: fontFamily,
        overflow: 'auto',
      }}
    >
      {noData ? (
        <Box
          sx={{
            width: '90%',
            height: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #BFBFBF',
            boxShadow: '2px 0px 8px rgba(35,45,65,.28)',
          }}
        >
          <span>{intl.messages['routeTrace.popWindowNoLinkDiagram']}</span>
        </Box>
      ) : (
        <svg
          id='trace_svg-canvas'
          sx={{ width: '100%', boxShadow: '2px 0px 8px rgba(35,45,65,.28)' }}
        >
          <g id='trace_g-canvas' />
        </svg>
      )}
    </Box>
  );
}

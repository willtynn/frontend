/**
 * src\Pages\Cluster\network\canvas.js
 */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import ReactFlow, { Controls, Background, MarkerType } from 'reactflow';
import { useIntl } from 'react-intl';
import { CustomEdge, CustomNode } from '@/components/Reactflow';
import dagre from 'dagre';

import 'reactflow/dist/style.css';

const nodeTypes = {
    customNode: CustomNode,
};
const edgeTypes = {
    customEdge: CustomEdge,
};

const snapGrid = [20, 20];

const findNode = (nodes, id) => nodes.find(n => n.id === id) || null;

const getLayout = (nodes, edges) => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: 'TB' }); // 设置布局方向为从上到下，从左到右为LR
    nodes.forEach(node => {
        dagreGraph.setNode(node.id, { width: 300, height: 170 });
    });
    edges.forEach(edge => {
        dagreGraph.setEdge(edge.source, edge.target);
    });
    dagre.layout(dagreGraph);

    nodes.forEach(node => {
        const n = dagreGraph.node(node.id);
        //node.targetPosition = 'top';
        //node.sourcePosition = 'bottom';
        node.position = {
            x: n.x - 150, // 300 / 2
            y: n.y - 85, // 170 / 2
        };
        return node;
    });
    return { nodes, edges };
};

export function ClusterCanvas(props) {
    const { id, nodes, links, handleNodeClick, parent } = props;
    const dispatch = useDispatch();
    const intl = useIntl();

    const [n, setN] = useState([]);
    const [e, setE] = useState([]);

    const [noData, setNoData] = useState(false);

    useEffect(() => {
        let nodes_tmp = [];
        let edges_tmp = [];

        nodes.forEach((item, index) => {
            nodes_tmp.push({
                id: item.id,
                data: {
                    label: item.label,
                    hostname: item.hostname,
                    ip: item.ip,
                    description: item.description,
                    infoList: ["hostname", "ip", "description"]
                },
                type: 'customNode',
                targetPosition: 'top',
                sourcePosition: 'bottom',
                style: {
                    backgroundColor: '#FFF',
                    borderRadius: '10px',
                    border: '2px solid #000',
                },
            });
        });

        links.forEach((item, index) => {
            edges_tmp.push({
                id: JSON.stringify(item),
                source: item.source,
                target: item.target,
                animated: true,
                markerEnd: {
                    type: MarkerType.Arrow,
                    width: 12,
                    height: 12,
                    color: '#000',
                    strokeWidth: 1.75,
                },
                data: {
                    label: item.label,
                },
                type: 'customEdge',
            });
        });

        const res = getLayout(nodes_tmp, edges_tmp);

        setN(res.nodes);
        setE(res.edges);
    }, [nodes, links]);

    return (
        <div
            style={{
                width: parent.current.clientWidth,
                height: parent.current.clientHeight,
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
                <ReactFlow
                    style={{ backgroundColor: '#FFFFFF' }}
                    nodes={n}
                    edges={e}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    // onNodesChange={onNodesChange}
                    // onEdgesChange={onEdgesChange}
                    snapToGrid={true}
                    snapGrid={snapGrid}
                    fitView
                    // attributionPosition="bottom-left"
                    nodesConnectable={false}
                    elementsSelectable={false}
                >
                    <Controls />
                    <Background />
                </ReactFlow>
            )}
        </div>
    );
}
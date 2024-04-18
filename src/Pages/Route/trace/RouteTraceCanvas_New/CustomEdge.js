import React from 'react';
import {  
  getBezierPath, 
  EdgeLabelRenderer, 
  BaseEdge,
  MarkerType,
} from 'reactflow';

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge 
        id={id} 
        path={edgePath}
        style={{ 
          stroke: '#000',
          strokeWidth: 2 
        }}
        
        markerEnd={{
          type: MarkerType.Arrow,
          width: 8,
          height: 8,
          color: '#000',
          strokeWidth: 1.5,
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: '#ffcc00ee',
            padding: '5px 8px',
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
          }}
          className="nodrag nopan"
        >
          {data.label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;

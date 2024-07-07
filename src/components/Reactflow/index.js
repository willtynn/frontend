/**
 * src\components\Reactflow\index.js
 */
import {
    getBezierPath,
    EdgeLabelRenderer,
    BaseEdge,
    Handle,
    Position,
    BezierEdge,
    EdgeProps,
} from 'reactflow';
import { memo } from 'react';
import { Box, Stack } from '@mui/material';
import { useIntl } from 'react-intl';
import { fontFamily } from '@/utils/commonUtils';
import { useEffect } from 'react';

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

    //const offsetLabelX = data.labelPosition ? data.labelPosition.x : labelX;
    //const offsetLabelY = data.labelPosition ? data.labelPosition.y : labelY;
    // 使用固定的偏移量，确保标签相对于路径的正确位置
    const offsetX = 0;
    const offsetY = parseInt(sourceX) < parseInt(targetX) ? -8 : 8;
    console.log(`CustomEdge id: ${id}`, { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, markerEnd });
    return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: '#000',
          strokeWidth: 2,
          animated: true,
        }}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer>
          {data.label && (
              <div
                  style={{
                      position: 'absolute',
                      transform: `translate(-50%, -50%) translate(${labelX + offsetX}px, ${labelY + offsetY}px)`,
                      background: 'white',
                      padding: '2px 4px',
                      borderRadius: '2px',
                      fontSize: '6px',
                      color: '#000',
                      textAnchor: 'middle',
                      pointerEvents: 'none',
                      fontWeight: 'bold',
                      zIndex: 100 ,/* 确保标签在其他元素之上 */
                  }}
              >
                  {data.label}
              </div>
          )}
      </EdgeLabelRenderer>
    </>
  );
};

export const TooltipEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
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
          strokeWidth: 2,
          animated: true,
        }}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer>
        
      </EdgeLabelRenderer>
    </>
  );
};

export const SelfConnectEdge = ({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}) => {
  // we are using the default bezier edge when source and target ids are different
  if (source !== target) {
    console.error('SelfConnecting must have the same source and target id');
  }

  const [_, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const radiusY = (sourceY - targetY) * 0.6;
  const radiusX = 120;
  // Move the pen to sourceX, sourceY, then draw a curve to targetX+2, targetY
  // x-axis-rotation is 0, large-arc-flag is 1 which means the arc should be greater
  // than 180 degree, sweep-flag is 0 which means the arc should be drawn in a negative angle
  // the end point of the arc is targetX+2, targetY

  // the center of the ellipse is at
  // the radius of the ellipse is (radiusX, radiusY)
  const edgePath = `M ${sourceX} ${sourceY} A ${radiusX} ${radiusY} 0 1 0 ${
    targetX + 2
  } ${targetY}`;
  // 根据椭圆方程计算的label的位置
  const realLabelX =
    Math.sqrt(
      radiusX ** 2 * (1 - (sourceY - targetY) ** 2 / radiusY ** 2 / 4)
    ) +
    radiusX +
    labelX;
  const realLabelY = labelY;

  /*
  {
    "id": "{\"source\":\"train-ticket/ts-config-service\",\"target\":\"train-ticket/ts-config-service\",\"invoke_info\":{\"caller\":\"train-ticket/ts-config-service::/api/v1/configservice/configs:Get\",\"callerPath\":\"/api/v1/configservice/configs\",\"callee\":\"train-ticket/ts-config-service::/api/v1/configservice/configs:Get\",\"calleePath\":\"/api/v1/configservice/configs\",\"responseSize\":\"191\",\"requestSize\":\"0\"}}",
    "source": "train-ticket/ts-config-service",
    "target": "train-ticket/ts-config-service",
    "selected": false,
    "animated": true,
    "data": {
        "caller": "train-ticket/ts-config-service::/api/v1/configservice/configs:Get",
        "callerPath": "/api/v1/configservice/configs",
        "callee": "train-ticket/ts-config-service::/api/v1/configservice/configs:Get",
        "calleePath": "/api/v1/configservice/configs"
    },
    "sourceX": 282,
    "sourceY": 395.265625,
    "targetX": 282,
    "targetY": 218,
    "sourcePosition": "bottom",
    "targetPosition": "top",
    "markerStart": "url('#')",
    "markerEnd": "url('#1__color=#000&height=12&strokeWidth=1.75&type=arrow&width=12')"
  }
  */
  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: '#000',
          strokeWidth: 2,
          animated: true,
        }}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer>
      </EdgeLabelRenderer>
    </>
  );
};

const labelStyle = {
  fontFamily: fontFamily,
  fontSize: '15px',
  fontWeight: 600,
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.4,
  letterSpacing: 'normal',
  width: '30px',
};

const valueStyle = {
  textAlign: 'right',
  fontSize: '14px',
  fontWeight: 400,
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.67,
  letterSpacing: 'normal',
  width: '150px',
  overflowWrap: 'break-word',
  wordBreak: 'break-all',
};

export const CustomNode = memo(({ data, isConnectable }) => {
  const intl = useIntl();
  return (
    <>
      <Handle
        type='target'
        position={data.target}
        style={{
          backgroundColor: '#FFF',
          borderColor: '#000',
          borderWidth: '2px',
          width: '7px',
          height: '7px',
        }}
        isConnectable={isConnectable}
      />
      <Stack
        sx={{
          maxHeight: '170px',
          maxWidth: '300px',
        }}
      >
        <Box
          sx={{
            fontFamily: fontFamily,
            fontSize: '16px',
            fontWeight: 520,
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 1.4,
            letterSpacing: 'normal',
            wordBreak: 'break-all',

            width: '100%',
            padding: '5px 0px 5px 0px',
            color: '#FFFFFF',
            backgroundColor: '#6d4f47',
            borderRadius: '8px 8px 0px 0px',
            borderBottom: '2px solid #000',

            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          {data.label}
        </Box>

        <Stack sx={{ margin: '8px 13px' }} direction='column' spacing={0.25}>
          {data.infoList &&
            data.infoList.map((item, index) => (
              <Stack direction='row' spacing={0.5}>
                  <Box sx={labelStyle }>{item}</Box>
                  <Box sx={valueStyle }>{data[item]}</Box>
              </Stack>
            ))}
        </Stack>
      </Stack>

      <Handle
        type='source'
        position={data.source}
        style={{
          backgroundColor: '#FFF',
          borderColor: '#000',
          borderWidth: '2px',
          width: '7px',
          height: '7px',
        }}
        isConnectable={isConnectable}
      />
    </>
  );
});

import { getBezierPath, EdgeLabelRenderer, BaseEdge, Handle, Position } from 'reactflow';
import { memo } from 'react';
import { 
  Box,
  Stack
} from '@mui/material';
import { useIntl } from 'react-intl';
import { fontFamily } from '@/utils/commonUtils';

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
          className='nodrag nopan'
        >
          {data.label}
        </div>
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
        type="target"
        position={Position.Top}
        style={{
          backgroundColor: '#FFF',
          borderColor: '#000',
          borderWidth: '2px',
          width: '7px',
          height: '7px',
        }}
        isConnectable={isConnectable}
      />
      {
        data.onlyip ? (
          <Stack sx={{ 
              maxHeight: '170px',
              maxWidth: '300px',
            }}>
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

                width: "100%", 
                padding: '5px 0px 5px 0px',
                color: '#FFFFFF',
                backgroundColor: '#6d4f47', 
                borderRadius: '8px',
                
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <Box sx={{
                margin: '4px 9px',
              }}>
                {data.ip}
              </Box>
            </Box>
          </Stack>
        ) : (
          <Stack sx={{ 
            maxHeight: '170px',
            maxWidth: '300px',
          }}>
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

                width: "100%", 
                padding: '5px 0px 5px 0px',
                color: '#FFFFFF',
                backgroundColor: '#6d4f47', 
                borderRadius: '8px 8px 0px 0px',
                borderBottom: '2px solid #000',

                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex'
              }}
            >
                {data.service}
            </Box>

            <Stack sx={{ margin: '8px 13px' }} direction='column' spacing={0.25}>
              <Stack direction='row' spacing={0.5}>
                <Box sx={labelStyle}>IP</Box>
                <Box sx={valueStyle}>{data.ip}</Box>
              </Stack>
              <Stack direction='row' spacing={0.5}>
                <Box sx={labelStyle}>{intl.messages['routeTrace.popWindowTimeConsuming']}</Box>
                <Box sx={valueStyle}>{data.duration}</Box>
              </Stack>
              <Stack direction='row' spacing={0.5}>
                <Box sx={labelStyle}>Host</Box>
                <Box sx={valueStyle}>{data.host_ip}</Box>
              </Stack>
            </Stack>
          </Stack>
        )
      }
      
      <Handle
        type="source"
        position={Position.Bottom}
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


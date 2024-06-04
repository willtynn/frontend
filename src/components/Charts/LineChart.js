import { useState, useRef, useEffect } from 'react';
import './LineChart.css';
import { Box } from '@mui/material';

const data = [
  { x: 0, y: 0 },
  { x: 1.5, y: 30 },
  { x: 2, y: 15 },
  { x: 3, y: 7 },
  { x: 7, y: 20 },
];

export const StaticLineChart = () => {
  const maxX = Math.max(...data.map(point => point.x));
  const maxY = Math.max(...data.map(point => point.y));
  const chartRef = useRef(null);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const ratio = 0.15;
  const untiRatio = 1 - 2 * ratio;
  const paddingVertical = chartSize.height * ratio;
  const paddingHorizon = chartSize.width * ratio;

  const maxDataX = Math.max(...data.map(point => point.x));
  const maxDataY = Math.max(...data.map(point => point.y));

  useEffect(() => {
    if (chartRef.current) {
      const { width, height } = chartRef.current.getBoundingClientRect();
      setChartSize({ width, height });
    }
  }, []);

  const handleMouseMove = e => {
    const rect = chartRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = rect.height - (e.clientY - rect.top);
    const scaleX = (x - paddingHorizon) / (chartSize.width);
    const scaleY = y / chartSize.height;
    
    setHoveredPoint({
      x: (scaleX * maxDataX).toFixed(1),
      y: (scaleY * maxDataY).toFixed(1),
    });
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const points = data
    .map(
      point =>
        `${(point.x * chartSize.width) / maxDataX} ${
          chartSize.height - (point.y * chartSize.height) / maxDataY
        }`
    )
    .join(', ');

  return (
    <Box className='line-chart' ref={chartRef} style={{ paddingY: `${paddingVertical}px`, paddingX: `${paddingHorizon}px` }}>
      <svg
        width={chartSize.width}
        height={chartSize.height}
        viewBox={`0 0 ${chartSize.width} ${chartSize.height}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* x轴刻度 */}
        {data.map(point => (
          <g key={point.x}>
            <line
              x1={
                (point.x * (chartSize.width - 50)) /
                Math.max(...data.map(p => p.x))
              }
              y1={chartSize.height - 5}
              x2={
                (point.x * (chartSize.width - 50)) /
                Math.max(...data.map(p => p.x))
              }
              y2={chartSize.height + 5}
              style={{ stroke: 'black', strokeWidth: 2 }}
            />
            <text
              x={
                (point.x * (chartSize.width - 50)) /
                Math.max(...data.map(p => p.x))
              }
              y={chartSize.height + 20}
              textAnchor='middle'
            >
              {point.x}
            </text>
          </g>
        ))}

        {/* y轴刻度 */}
        {data.map(point => (
          <g key={point.y}>
            <line
              x1={-5}
              y1={
                chartSize.height -
                (point.y * chartSize.height) / Math.max(...data.map(p => p.y))
              }
              x2={5}
              y2={
                chartSize.height -
                (point.y * chartSize.height) / Math.max(...data.map(p => p.y))
              }
              style={{ stroke: 'black', strokeWidth: 2 }}
            />
            <text
              x={-20}
              y={
                chartSize.height -
                (point.y * chartSize.height) / Math.max(...data.map(p => p.y))
              }
              textAnchor='end'
            >
              {point.y}
            </text>
          </g>
        ))}
        <polyline
          points={`0 ${chartSize.height}, ${points}`}
          style={{ fill: 'none', stroke: 'blue', strokeWidth: 2 }}
        />
        {/* 坐标轴颜色 */}
        <line x1='0' y1='0' x2='0' y2='100%' stroke='black' />
        <line x1='0' y1='100%' x2='100%' y2='100%' stroke='black' />
        {hoveredPoint && (
          <text x='90%' y='10%' fontSize='3' fill='black'>
            {`(${hoveredPoint.x}, ${hoveredPoint.y})`}
          </text>
        )}
      </svg>
    </Box>
  );
};

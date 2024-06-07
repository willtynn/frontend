import { useState, useRef, useEffect } from 'react';
import './LineChart.css';
import { Box, Stack } from '@mui/material';

export const StaticLineChart = props => {
  const { data, period, count, tickCount } = props;

  const maxX = Math.max(...data.map(point => point.x));
  const maxY = Math.max(...data.map(point => point.y));
  const chartRef = useRef(null);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  const [hoveredPoint, setHoveredPoint] = useState(null);
  // const [xTickGap, setXTickGap] = useState(2);
  // const [yTickGap, setYTickGap] = useState(2);

  const ratio = 0.15;
  const paddingVertical = chartSize.height * ratio;
  const paddingHorizon = chartSize.width * ratio;

  // 计算刻度的间距
  const xTickGap = period / (tickCount - 1);
  const yTickGap = count / (tickCount - 1);

  // 生成刻度数组
  const xTicks = Array.from({ length: tickCount }, (_, i) => i * xTickGap);
  const yTicks = Array.from({ length: tickCount }, (_, i) => i * yTickGap);

  

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
    const scaleX = x / chartSize.width;
    const scaleY = y / chartSize.height;
    if (scaleX > 1.01 || scaleY > 1.01 || scaleX < -0.01 || scaleY < -0.01) {
      setHoveredPoint(null);
    } else {
      setHoveredPoint({
        x: (scaleX * maxX).toFixed(1),
        y: (scaleY * maxY).toFixed(1),
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const points = data
    .map(
      point =>
        `${(point.x * chartSize.width) / maxX} ${
          chartSize.height - (point.y * chartSize.height) / maxY
        }`
    )
    .join(', ');

  function generateUUID() {
    var d = new Date().getTime(); //Timestamp
    var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  return (
    <Stack sx={{
      width: "100%"
    }}
      alignItems="center"
      justifyContent='center'
    >
    <Box
      sx={{
        paddingY: `${paddingVertical}px`,
        paddingX: `${paddingHorizon}px`,
      }}
    >
      <Box className='line-chart' ref={chartRef}>
        <svg
          key='linechart-key'
          width={chartSize.width}
          height={chartSize.height}
          viewBox={`0 0 ${chartSize.width} ${chartSize.height}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            whiteSpace: 'nowrap',
            overflow: 'visible',
          }}
        >
          {/* x轴刻度 */}
          {xTicks.map((tick, index) => (
            <g key={generateUUID() + tick}>
              <line
                x1={(tick * chartSize.width) / Math.max(maxX)}
                y1={chartSize.height - 5}
                x2={(tick * chartSize.width) / Math.max(maxX)}
                y2={chartSize.height + 5}
                style={{ stroke: 'black', strokeWidth: 2 }}
              />
              <text
                x={(tick * chartSize.width) / Math.max(maxX)}
                y={chartSize.height + 20}
                textAnchor='middle'
              >
                {tick.toFixed(1)}
              </text>
            </g>
          ))}

          {/* y轴刻度 */}
          {yTicks.map((tick, index) => (
            <g key={generateUUID() + tick}>
              <line
                x1={-5}
                y1={
                  chartSize.height -
                  (tick * chartSize.height) / Math.max(maxY)
                }
                x2={5}
                y2={
                  chartSize.height -
                  (tick * chartSize.height) / Math.max(maxY)
                }
                style={{ stroke: 'black', strokeWidth: 2 }}
              />
              <text
                x={-20}
                y={
                  chartSize.height -
                  (tick * chartSize.height) / Math.max(maxY)
                }
                textAnchor='end'
              >
                {tick.toFixed(1)}
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
    </Box>
    </Stack>
  );
};

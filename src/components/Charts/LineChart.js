import { useState, useRef, useEffect } from 'react';
import './LineChart.css';

const data = [
  { x: 0, y: 0 },
  { x: 1, y: 10 },
  { x: 2, y: 15 },
  { x: 3, y: 7 },
  { x: 7, y: 20 },
];

export const StaticLineChart = () => {
  const maxX = Math.max(...data.map(point => point.x));
  const maxY = Math.max(...data.map(point => point.y));
  const scaleX = 100 / maxX;
  const scaleY = 100 / maxY;
  const chartRef = useRef(null);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [scale, setScale] = useState(1);

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
    const maxDataX = Math.max(...data.map(point => point.x));
    const maxDataY = Math.max(...data.map(point => point.y));
    setHoveredPoint({
      x: Math.round(scaleX * maxDataX),
      y: Math.round(scaleY * maxDataY),
    });
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const maxDataX = Math.max(...data.map(point => point.x));
  const maxDataY = Math.max(...data.map(point => point.y));

  const points = data
    .map(
      point =>
        `${(point.x * chartSize.width) / Math.max(...data.map(p => p.x))} ${
          chartSize.height -
          (point.y * chartSize.height) / Math.max(...data.map(p => p.y))
        }`
    )
    .join(', ');

  const xAxis = Array.from({ length: maxX + 1 }, (_, i) => {
    if (i % 2 === 0) {
      return (
        <g key={`x-${i}`}>
          <line
            x1={`${i * scaleX}%`}
            y1='100%'
            x2={`${i * scaleX}%`}
            y2='95%'
          />
          <text x={`${i * scaleX}%`} y='105%'>
            {i}
          </text>
        </g>
      );
    } else {
      return null;
    }
  });

  const yAxis = Array.from({ length: maxY + 1 }, (_, i) => {
    if (i % 3 === 0) {
      return (
        <g key={`y-${i}`}>
          <line
            x1='-3%'
            y1={`${100 - i * scaleY}%`}
            x2='0%'
            y2={`${100 - i * scaleY}%`}
          />
          <text x='-8%' y={`${100 - i * scaleY}%`}>
            {i}
          </text>
        </g>
      );
    } else {
      return null;
    }
  });

  return (
    <div className='line-chart' ref={chartRef}>
      <svg
        width={chartSize.width + 200}
        height={chartSize.height + 100}
        viewBox={`0 0 ${chartSize.width + 200} ${chartSize.height + 100}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ padding: '20px' }}
      >
        <g transform={`translate(100, -50)`}>
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
        </g>
      </svg>
    </div>
  );
};

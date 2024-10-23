import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { useSelector } from 'react-redux';




const LineChart = () => {
  const [xAxisKey, setXAxisKey] = useState('namespace');
  const [yAxisKey, setYAxisKey] = useState('average');

  const xAxisOptions = ['namespace', 'podName', 'name','samplesNum'];
  const yAxisOptions = ['average', 'median', 'max', 'min','p90','p95','p99','tps',,'errorRate'];

  const { aggregateReportEnhance, currentJointPlan } = useSelector(state => {
    return {
      aggregateReportEnhance: state.Application.aggregateReportEnhance,
      currentJointPlan: state.Application.currentJointPlan,
    };
  });


  const option = {
    xAxis: {
      type: 'category',
      data: aggregateReportEnhance.map(item => item[xAxisKey]),
      name: xAxisKey
    },
    yAxis: {
      type: 'value',
      name: yAxisKey
    },
    series: [{
      data: aggregateReportEnhance.map(item => item[yAxisKey]),
      type: 'line'
    }]
  };

  return (
    <div>
      <div>
        <label>
          X轴:
          <select value={xAxisKey} onChange={(e) => setXAxisKey(e.target.value)}>
            {xAxisOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Y轴:
          <select value={yAxisKey} onChange={(e) => setYAxisKey(e.target.value)}>
            {yAxisOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
      <ReactEcharts option={option} style={{ height: '400px' }} />
    </div>
  );
};

export default LineChart;

import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const LineChart = () => {
  const intl = useIntl();
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
<Box>
      <Box display="flex" alignItems="center" mb={2}>
        <FormControl variant="outlined" style={{ marginRight: '16px', minWidth: 200 }}>
          <InputLabel>{intl.messages['jointStressTesting.horiCoordinate']}</InputLabel>
          <Select
            value={xAxisKey}
            onChange={(e) => setXAxisKey(e.target.value)}
            label={intl.messages['jointStressTesting.horiCoordinate']}
          >
            {xAxisOptions.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box width="16px" /> {/* 添加一个空的 Box 作为间隔 */}
        
        <FormControl variant="outlined" style={{ minWidth: 200 }}>
          <InputLabel>{intl.messages['jointStressTesting.vertiCoordinate']}</InputLabel>
          <Select
            value={yAxisKey}
            onChange={(e) => setYAxisKey(e.target.value)}
            label={intl.messages['jointStressTesting.vertiCoordinate']}
          >
            {yAxisOptions.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <ReactEcharts option={option} style={{ height: '400px',marginLeft: '-90px'}} />
    </Box>
  );
};

export default LineChart;

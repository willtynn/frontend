import * as echarts from 'echarts';
import { Box } from "@mui/material";
import { useEffect, useRef } from 'react';
export default function BarChart({label, value, num}) {

  // 根据value对label进行排序
  function sortData(labels, values) {
    const sortedLabels = labels.map((label, index) => ({ label, value: values[index] }))
      .sort((a, b) => a.value - b.value)
      .map(item => item.label);
    const sortedValues = labels.map((_, index) => values[index])
      .sort((a, b) => a - b);
    return { sortedLabels, sortedValues };
  }

  const chartRef = useRef(null)
  useEffect(() => {
    if (!chartRef.current) return; // 确保DOM元素已挂载
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom,null,{
      height: num*30+'px'
    });
    const { sortedLabels, sortedValues } = sortData(label, value);
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        top:'0',
        left: '0',
        right: '5%',
        bottom: '1%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0],
        splitLine: {
          show: true
        }
      },
      yAxis: {
        type: 'category',
        data: sortedLabels
      },
      series: [
        {
          type: 'bar',
          data: sortedValues
        }
      ],
    };
    myChart.setOption(option);
    return () => {
      if (myChart) {
        myChart.dispose();
      }
    };
  }, [label, value, num]);

  return (
    <Box ref={chartRef} sx={{
      width: '100%',
      height: '300px',
      overflowX:'clip',
      overflowY:'auto'
    }} />
  )
}

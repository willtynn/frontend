import * as echarts from 'echarts';
import { Box } from "@mui/material";
import { useEffect, useRef } from 'react';
export default function BarChart({label, value, num, unit}) {

  // 根据value对label进行排序
  function sortData(labels, values) {
    const sortedLabels = labels.map((label, index) => ({ label, value: values[index] }))
      .sort((a, b) => a.value - b.value)
      .map(item => item.label);
    const sortedValues = labels.map((_, index) => values[index])
      .sort((a, b) => a - b);
    return { sortedLabels, sortedValues };
  }

  console.log(label,value,num,unit)
  

  const chartRef = useRef(null)
  useEffect(() => {
    if (!chartRef.current) return; // 确保DOM元素已挂载
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom,null,{
      // height: num*35+'px'
      width: chartRef.current.offsetWidth - 5,
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
        top:'1%',
        left: '1%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        name: unit,
        nameLocation: 'center',
        nameTextStyle: {
          fontWeight: 'bold',
          lineHeight: 40
        },
        nameGap: 20,
        boundaryGap: [0, 0],
        splitLine: {
          show: true
        },
        axisLabel: {
          formatter: '{value}'
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
      height: '100%',
      overflowX:'clip',
      overflowY:'clip'
    }} />
  )
}

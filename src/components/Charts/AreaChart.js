import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { formatDatetimeString, formatDatetimeStringWithoutYear } from '../../utils/commonUtils';
import { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';

export function TimeAdaptiveAreaChart(props) {

  const { data, keyName, value, width = 500, height = 500, pxGap=120 } = props;

  const [tickNum, setTickNum] = useState(3);
  const [ticks, setTicks] = useState([]);
  const chart = useRef(null);

  useEffect(() => {
    adaptChart();
  }, []);

  useEffect(() => {
    if (chart && chart.current && data && data.length > 0) {
      const intervalNum = tickNum - 1;
      const dataLength = data.length;
      if(dataLength >= tickNum) {
        const dataSliceLength = Math.floor(dataLength / intervalNum);
        const tmpTicks = [];
        for(let i = 0; i < intervalNum; i++) {
          tmpTicks.push(data[i * dataSliceLength][keyName]);
        }
        tmpTicks.push(data[data.length - 1][keyName]);
        setTicks(tmpTicks);
      } else {
        setTicks(data.map((record, index) => {
          return record[keyName];
        }));
      }
    } else {
      setTicks([]);
    }
    
  }, [tickNum]);

  const adaptChart = () => {
    if (chart && chart.current) {
      const clientWidth = chart.current.clientWidth;
      const tmpTickNum = Math.floor(clientWidth / pxGap);
      setTickNum(tmpTickNum);
    }
  }

  window.onresize = adaptChart;

  return (
    <Box sx={{width: "100%", height: "100%"}} ref={chart}>
      <ResponsiveContainer width="100%" height="100%" >
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey={keyName}
            ticks={ticks}
            tickFormatter={(value, index) => {
              return formatDatetimeStringWithoutYear(value);
            }}
            axisLine={false}
            tickSize={0}
            tickMargin={20}
          >

          </XAxis>


          <YAxis
            axisLine={false}
            tickSize={0}
          >
            <Label value="CPU用量 (%)" offset={-25} position="insideTop" />
          </YAxis>
          <Tooltip />
          <Area type="linear" dataKey={value} stroke="#55BCA8" activeDot={{ r: 6 }} fill='rgba(85,188,138,.2)'/>
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}

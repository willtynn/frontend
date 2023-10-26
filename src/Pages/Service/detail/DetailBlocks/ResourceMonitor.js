import React, { PureComponent } from 'react';
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';
import { KubeSimpleCard } from '../../../../components/InfoCard';

const data = [
  {
    name: '10:06',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '10:07',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '10:08',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '10:09',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '10:10',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '10:11',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '10:12',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '10:13',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '10:14',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '10:15',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '10:16',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '10:17',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '10:18',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '10:19',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '10:20',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '10:21',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },

  {
    name: '10:22',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '10:23',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '10:24',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '10:25',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function ResourceMonitor() {


  return (
    <KubeSimpleCard title='物理资源监控'>
      <Box sx={{
        height: "200px",
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" ticks={["10:06", "10:16"]} tickFormatter={(value, index) => {return value.substring(3)}} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </KubeSimpleCard>
  );

}

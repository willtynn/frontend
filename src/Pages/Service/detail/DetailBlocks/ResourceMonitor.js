import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';
import { KubeSimpleCard } from '../../../../components/InfoCard';
import { TimeAdaptiveAreaChart } from '../../../../components/Charts/AreaChart';

const data = [
  {
    name: (new Date("2018/07/09 14:13:11")).getTime(),
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: (new Date("2018/07/09 14:14:11")).getTime(),
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: (new Date("2018/07/09 14:15:11")).getTime(),
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: (new Date("2018/07/09 14:16:11")).getTime(),
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: (new Date("2018/07/09 14:17:11")).getTime(),
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: (new Date("2018/07/09 14:18:11")).getTime(),
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: (new Date("2018/07/09 14:19:11")).getTime(),
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: (new Date("2018/07/09 14:20:11")).getTime(),
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: (new Date("2018/07/09 14:21:11")).getTime(),
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: (new Date("2018/07/09 14:22:11")).getTime(),
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: (new Date("2018/07/09 14:23:11")).getTime(),
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: (new Date("2018/07/09 14:24:11")).getTime(),
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: (new Date("2018/07/09 14:25:11")).getTime(),
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: (new Date("2018/07/09 14:26:11")).getTime(),
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: (new Date("2018/07/09 14:27:11")).getTime(),
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: (new Date("2018/07/09 14:28:11")).getTime(),
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },

  {
    name: (new Date("2018/07/09 14:29:11")).getTime(),
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: (new Date("2018/07/09 14:30:11")).getTime(),
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: (new Date("2018/07/09 14:31:11")).getTime(),
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: (new Date("2018/07/09 14:32:11")).getTime(),
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
        <TimeAdaptiveAreaChart
          data={data}
          keyName="name"
          value="pv"
        />
      </Box>
    </KubeSimpleCard>
  );

}

import { DAGCanvas } from './canvas'
import { Box } from '@mui/material';
import ArrowDown from '@/assets/ArrowDown.svg';
import ArrowUp from '@/assets/ArrowUp.svg';
export default function ClusterTopology(props) {

  const { nodes, links } = props;




  return (
    <Box>
      <Box sx={{
        borderRadius: "4px",
        height: "42px",
        bgcolor: "red"
      }}>

        
      </Box>
      <DAGCanvas nodes={nodes} links={links} />
    </Box>
  )
}

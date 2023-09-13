import { useEffect, useState } from 'react';
import { DAGCanvas } from './canvas';
import { 
  Box,
  Stack
} from '@mui/material';

import { useDispatch, useSelector } from "react-redux";
import ClusterTopology from './ClusterTopology';

import {
  UPDATE_CLUSTERS,
  searchAllClusters 
} from '@/actions/clusterAction';

export default function ClusterOverview() {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [clusterData, setClusterData] = useState({});

  const dispatch = useDispatch();


  const {
    clusters
  } = useSelector(state => {
    return {
      clusters: state.Cluster.clusters,
    };
  });

  const fakeClusters =  [
    {
    "id": "cluster1",
    "servers": [
      {
        "id": "cluster1::h1",
        "pos": {
          "x": 63,
          "y": 84
        }
      },
      {
        "id": "cluster1::h2",
        "pos": {
          "x": 60,
          "y": 58
        }
      }
    ],
    "network": [
      {
        "srcId": "cluster1::h1",
        "desId": "cluster1::h2",
        "bandwidth": 77,
        "delay": 28,
        "hip": 89
      }
    ]
  },
  {
    "id": "cluster2",
    "servers": [
      {
        "id": "cluster2::h1",
        "pos": {
          "x": 63,
          "y": 84
        }
      },
      {
        "id": "cluster1::h2",
        "pos": {
          "x": 60,
          "y": 58
        }
      }
    ],
    "network": [
      {
        "srcId": "cluster1::h1",
        "desId": "cluster1::h2",
        "bandwidth": 77,
        "delay": 28,
        "hip": 89
      }
    ]
  }
]

  useEffect(() => {
    // dispatch(searchAllClusters());
    dispatch({ type: "UPDATE_CLUSTERS", data: fakeClusters});
  }, []);

  useEffect(() => {
    if(clusters === null) return;
    const tmpClusterData = {}
    clusters.forEach(cluster => {
      tmpClusterData[cluster.id] = {
        servers: cluster.servers,
        network: cluster.network
      }
    });
    setClusterData(tmpClusterData);
    let tmpNodes = [];
    let tmpLinks = [];
    for(const link of clusters[0].network) {
      tmpNodes.push({
        id: link.srcId,
        label: link.srcId,
      });
      tmpNodes.push({
        id: link.desId,
        label: link.desId,
      });
      tmpLinks.push({
        source: link.srcId,
        target: link.desId,
      });
    } 
    setNodes(tmpNodes);
    setLinks(tmpLinks);
  }, [clusters]);

  return (
    <Box>
      <Stack direction="column" spacing={2}>
        {
          clusters && clusters.map((item, index) => {
            return (
              <ClusterTopology />
            )
          })
        }
      </Stack>
      <DAGCanvas nodes={nodes} links={links} />
      <button onClick={() => { 
        const arr = Array.from({length:10000},(node,i)=> i+1) 
        arr.forEach((e) => {
          console.log(e);
        })
        console.log("wtfffff");
      }}>button</button>
    </Box>
  );
}

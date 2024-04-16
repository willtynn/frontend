import { useEffect, useState } from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ClusterTopologyOnlyCanvas } from './ClusterTopology';
import { UPDATE_SELECTED_SERVER } from '@/actions/clusterAction';
import ClusterInfo from './ClusterInfo';
import { useIntl } from 'react-intl';
import ClusterNode from '@/assets/ClusterNode.svg';
import { StyledAutocomplete } from '@/components/Input';
import { fontFamily } from '../../../utils/commonUtils';

const fakeInstancesData = {
  items: [
    {
      metadata: {
        name: 'jagger-es-index-cleaner-28242715-psq9k',
        labels: {
          app: 'jaeger',
          'app.kubernetes.io/managed-by': 'jaeger-operator',
          'job-name': 'jagger-es-index-cleaner-28242715',
          'app.kubernetes.io/name': 'jagger-es-index-cleaner',
          'app.kubernetes.io/part-of': 'jaeger',
          'app.kubernetes.io/instance': 'jagger',
          'controller-uid': '081a6c72-dac8-4909-8f10-936d81bc39fc',
          'app.kubernetes.io/component': 'cronjob-es-index-cleaner',
        },
      },
      status: {
        phase: 'Succeeded',
        hostIP: '192.168.1.173',
        podIP: '10.244.6.130',
        startTime: '2023-09-12T23:55:00.000+00:00',
      },
    },
    {
      metadata: {
        name: 'jagger-es-index-cleaner-28239835-8s2nl',
        labels: {
          app: 'jaeger',
          'app.kubernetes.io/managed-by': 'jaeger-operator',
          'job-name': 'jagger-es-index-cleaner-28239835',
          'app.kubernetes.io/name': 'jagger-es-index-cleaner',
          'app.kubernetes.io/part-of': 'jaeger',
          'app.kubernetes.io/instance': 'jagger',
          'controller-uid': '601ac280-4909-485b-a24c-84f0504caff0',
          'app.kubernetes.io/component': 'cronjob-es-index-cleaner',
        },
      },
      status: {
        phase: 'Succeeded',
        hostIP: '192.168.1.173',
        podIP: '10.244.6.162',
        startTime: '2023-09-10T23:55:08.000+00:00',
      },
    },
    {
      metadata: {
        name: 'mysql-558bcb5f99-n4hsk',
        labels: {
          app: 'mysql',
          'pod-template-hash': '558bcb5f99',
        },
      },
      status: {
        phase: 'Running',
        hostIP: '192.168.1.173',
        podIP: '10.244.6.176',
        startTime: '2023-08-14T08:16:14.000+00:00',
      },
    },
    {
      metadata: {
        name: 'kubefed-controller-manager-5c65ff8499-gj6kj',
        labels: {
          'pod-template-hash': '5c65ff8499',
          'kubefed-control-plane': 'controller-manager',
        },
      },
      status: {
        phase: 'Running',
        hostIP: '192.168.1.173',
        podIP: '10.244.6.174',
        startTime: '2023-08-14T07:42:47.000+00:00',
      },
    },
    {
      metadata: {
        name: 'logstash-58486bb89b-4hpsh',
        labels: {
          app: 'logstash',
          'pod-template-hash': '58486bb89b',
        },
      },
      status: {
        phase: 'Running',
        hostIP: '192.168.1.173',
        podIP: '10.244.6.181',
        startTime: '2023-08-08T06:17:16.000+00:00',
      },
    },
    {
      metadata: {
        name: 'jagger-query-7b86944786-ntx7w',
        labels: {
          app: 'jaeger',
          'app.kubernetes.io/managed-by': 'jaeger-operator',
          'app.kubernetes.io/name': 'jagger-query',
          'app.kubernetes.io/part-of': 'jaeger',
          'pod-template-hash': '7b86944786',
          'app.kubernetes.io/instance': 'jagger',
          'app.kubernetes.io/component': 'query',
        },
      },
      status: {
        phase: 'Running',
        hostIP: '192.168.1.173',
        podIP: '10.244.6.175',
        startTime: '2023-08-08T04:01:53.000+00:00',
      },
    },
    {
      metadata: {
        name: 'es-es-default-0',
        labels: {
          'elasticsearch.k8s.elastic.co/node-ml': 'true',
          'elasticsearch.k8s.elastic.co/version': '7.14.1',
          'controller-revision-hash': 'es-es-default-79899f447c',
          'elasticsearch.k8s.elastic.co/node-transform': 'true',
          'elasticsearch.k8s.elastic.co/node-data_frozen': 'true',
          'elasticsearch.k8s.elastic.co/node-data_content': 'true',
          'elasticsearch.k8s.elastic.co/node-data_hot': 'true',
          'elasticsearch.k8s.elastic.co/statefulset-name': 'es-es-default',
          'elasticsearch.k8s.elastic.co/http-scheme': 'http',
          'elasticsearch.k8s.elastic.co/node-ingest': 'true',
          'elasticsearch.k8s.elastic.co/node-master': 'true',
          'common.k8s.elastic.co/type': 'elasticsearch',
          'elasticsearch.k8s.elastic.co/node-data_warm': 'true',
          'elasticsearch.k8s.elastic.co/node-voting_only': 'false',
          'elasticsearch.k8s.elastic.co/node-remote_cluster_client': 'true',
          'elasticsearch.k8s.elastic.co/node-data_cold': 'true',
          'statefulset.kubernetes.io/pod-name': 'es-es-default-0',
          'elasticsearch.k8s.elastic.co/cluster-name': 'es',
          'elasticsearch.k8s.elastic.co/node-data': 'true',
        },
      },
      status: {
        phase: 'Running',
        hostIP: '192.168.1.173',
        podIP: '10.244.6.177',
        startTime: '2023-08-08T03:31:13.000+00:00',
      },
    },
    {
      metadata: {
        name: 'filebeat-beat-filebeat-9lkrk',
        labels: {
          'controller-revision-hash': '696668bf7',
          'pod-template-generation': '4',
          'beat.k8s.elastic.co/name': 'filebeat',
          'beat.k8s.elastic.co/version': '7.14.1',
          'common.k8s.elastic.co/type': 'beat',
        },
      },
      status: {
        phase: 'Running',
        hostIP: '192.168.1.173',
        podIP: '192.168.1.173',
        startTime: '2023-08-08T03:25:37.000+00:00',
      },
    },
  ],
  totalItems: 18,
  valueMap: {},
};

export default function ClusterOverview() {
  const [clusterData, setClusterData] = useState({});
  const [targetCluster, setTargetCluster] = useState('');
  // cluster id 构成的数组
  const [clusterList, setClusterList] = useState([]);
  // const currentServer = useRef('');
  const [currentServer, setCurrentServer] = useState(null);
  const [instancesData, setInstancesData] = useState({});

  const dispatch = useDispatch();
  const intl = useIntl();

  const { selectedInstanceName, clusters, selectedServer } = useSelector(
    state => {
      return {
        selectedInstanceName: state.Cluster.selectedInstanceName,
        clusters: state.Cluster.clusters,
        selectedServer: state.Cluster.selectedServer,
      };
    }
  );

  const fakeClusters = [
    {
      id: 'cluster1',
      servers: [
        {
          id: 'cluster1::h1',
          pos: {
            x: 63,
            y: 84,
          },
          hostname: '192.168.1.144',
          ip: '192.168.1.144',
          configuredRes: {
            cpu: 1,
            memory: 100,
          },
          usedRes: {
            cpu: 1,
            memory: 50,
          },
          totalRes: {
            cpu: 1,
            memory: 100,
          },
          cpuInfo: '无',
          description: 'Description',
        },
        {
          id: 'cluster1::h2',
          pos: {
            x: 60,
            y: 58,
          },
          hostname: '192.168.1.145',
          ip: '192.168.1.145',
          configuredRes: {
            cpu: 1,
            memory: 100,
          },
          usedRes: {
            cpu: 1,
            memory: 50,
          },
          totalRes: {
            cpu: 1,
            memory: 100,
          },
          cpuInfo: '无',
          description: 'Description',
        },
      ],
      network: [
        {
          srcId: 'cluster1::h1',
          desId: 'cluster1::h2',
          bandwidth: 77,
          delay: 28,
          hip: 89,
        },
      ],
    },
    {
      id: 'cluster2',
      servers: [
        {
          id: 'cluster2::h1',
          pos: {
            x: 63,
            y: 84,
          },
          hostname: '192.168.1.146',
          ip: '192.168.1.146',
          configuredRes: {
            cpu: 1,
            memory: 100,
          },
          usedRes: {
            cpu: 1,
            memory: 50,
          },
          totalRes: {
            cpu: 1,
            memory: 100,
          },
          cpuInfo: '无',
          description: 'Description',
        },
        {
          id: 'cluster2::h2',
          pos: {
            x: 60,
            y: 58,
          },
          hostname: '192.168.1.147',
          ip: '192.168.1.147',
          configuredRes: {
            cpu: 1,
            memory: 100,
          },
          usedRes: {
            cpu: 1,
            memory: 50,
          },
          totalRes: {
            cpu: 1,
            memory: 100,
          },
          cpuInfo: '无',
          description: 'Description',
        },
      ],
      network: [
        {
          srcId: 'cluster2::h1',
          desId: 'cluster2::h2',
          bandwidth: 77,
          delay: 28,
          hip: 89,
        },
      ],
    },
  ];

  useEffect(() => {
    // dispatch(searchAllClusters());
    dispatch({ type: 'UPDATE_CLUSTERS', data: fakeClusters });
  }, []);

  useEffect(() => {
    if (clusters === null) return;
    const tmpClusterData = {};
    const tmpClusterList = [];
    clusters.forEach(cluster => {
      tmpClusterData[cluster.id] = {
        servers: cluster.servers,
        network: cluster.network,
      };
      tmpClusterList.push(cluster.id);
    });
    setClusterData(tmpClusterData);
    setClusterList(tmpClusterList);
  }, [clusters]);

  useEffect(() => {
    if (clusterList && clusterList.length !== 0) {
      setTargetCluster(clusterList[0]);
    }
  }, [clusterList]);

  useEffect(() => {
    if (selectedServer === null) {
      return;
    }
    const tmpInstancesData = {};
    selectedServer.items.forEach(instance => {
      tmpInstancesData[instance.metadata.name] = instance;
    });
    setInstancesData(tmpInstancesData);
  }, [selectedServer]);

  useEffect(() => {
    setCurrentServer(null);
    setInstancesData({});
    dispatch({ type: 'UPDATE_SELECTED_SERVER', data: null });
    dispatch({ type: 'SELECT_SERVER', data: null });
    dispatch({ type: 'SELECT_INSTANCE', data: null });
  }, [targetCluster]);

  const handleNodeClick = id => {
    dispatch({ type: UPDATE_SELECTED_SERVER, data: fakeInstancesData });
    setCurrentServer(id);
  };

  return (
    <Box>
      <Box
        sx={{
          borderRadius: '4px',
          backgroundColor: '#FFFFFF',
          padding: '24px 20px',
          width: 'calc(100% - 40px)',
          height: '58px',
          mb: '12px',
        }}
      >
        <Stack direction='row' spacing={1}>
          <ClusterNode />
          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontStyle: 'normal',
                color: '#242e42',
                textShadow: '0 4px 8px rgba(36,46,66,.1)',
                fontSize: '24px',
                lineHeight: '32px',
              }}
            >
              {intl.messages['cluster.clusterNode']}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontStyle: 'normal',
                color: '#79879c',
                fontSize: '12px',
                lineHeight: 1.67,
              }}
            >
              {intl.messages['cluster.clusterNodeDescription']}
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Stack
        direction='row'
        spacing={1}
        sx={{
          mb: '20px',
        }}
      >
        <StyledAutocomplete
          height='32px'
          padding='6px 5px 5px 12px'
          value={targetCluster}
          onChange={(event, newValue) => {
            setTargetCluster(newValue);
          }}
          id='cluster_autocomplete'
          options={clusterList}
          sx={{
            width: '100%',
            color: '#36435c',
            fontFamily: fontFamily,
            fontSize: '12px',
            fontWeight: 600,
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 1.67,
            letterSpacing: 'normal',
          }}
          renderInput={params => (
            <TextField
              {...params}
              placeholder={intl.messages['common.selectCluster']}
            />
          )}
        />
      </Stack>
      <Stack direction='column' spacing={4}>
        <ClusterTopologyOnlyCanvas
          clusterId={targetCluster}
          graph={
            clusterData[targetCluster] && clusterData[targetCluster].network
          }
          handleNodeClick={handleNodeClick}
        />
        <ClusterInfo data={clusterData[targetCluster]} />

        {/* <InstanceList
            sx={{
              minHeight: "400px"
            }}
            instances={currentServer === null ? null : fakeInstancesData.items}
            // instances={clusterData[currentServer]}
          />
          <Box>
            <InstanceInfo instance={instancesData[selectedInstanceName]} />
          </Box> */}
      </Stack>

      {/* <Stack direction='row' justifyContent='space-between' spacing={4}>
        <Stack direction='column' spacing={2} sx={{ minWidth: '45%' }}>
          {clusters &&
            clusters.map((item, index) => {
              return (
                <ClusterTopology
                  clusterId={item.id}
                  graph={item.network}
                  handleNodeClick={handleNodeClick}
                />
              );
            })}
        </Stack>
        {listOpen ? (
          <InstanceList
            sx={{
              minWidth: '45%',
            }}
            handleClose={() => {
              setListOpen(false);
            }}
            instances={fakeInstancesData.items}
            // instances={clusterData[currentServer]}
          />
        ) : (
          <></>
        )}
      </Stack> */}
    </Box>
  );
}

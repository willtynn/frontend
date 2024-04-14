/**
 * src\Pages\Service\detail\index.js
 */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack } from '@mui/material';
import {
  getScheme,
  UPDATE_CURRENT_SCHEME,
} from '../../../../actions/schemeAction';
import GeneralInfo from './GeneralInfo';
import { DetailInfo } from './DetailInfo';
import { useParams } from 'react-router';
import { parseId } from '@/utils/commonUtils';

const data = {
  id: 8,
  name: 'ex3-test-2',
  namespace: 'wangteng',
  status: '未执行',
  time: '2024-03-16T07:57:20.000+00:00',
  scheme: [
    {
      serviceId: '1',
      serviceName: 'alexnet-p1-0',
      namespace: 'wangteng',
      imageUrl: '192.168.1.199:5000/wangteng/alexnet-p1:1.0',
      replicas: 1,
      ports: [
        {
          name: 'tcp-5000',
          protocol: 'TCP',
          containerPort: 5000,
        },
      ],
      resources: {
        requests: {
          cpu: '0.2',
          memory: null,
        },
        limits: {
          cpu: '0.2',
          memory: null,
        },
      },
    },
    {
      serviceId: '1',
      serviceName: 'alexnet-p1-1',
      namespace: 'wangteng',
      imageUrl: '192.168.1.199:5000/wangteng/alexnet-p1:1.0',
      replicas: 1,
      ports: [
        {
          name: 'tcp-5000',
          protocol: 'TCP',
          containerPort: 5000,
        },
      ],
      resources: {
        requests: {
          cpu: '0.4',
          memory: null,
        },
        limits: {
          cpu: '0.4',
          memory: null,
        },
      },
    },
    {
      serviceId: '1',
      serviceName: 'alexnet-p1-3',
      namespace: 'wangteng',
      imageUrl: '192.168.1.199:5000/wangteng/alexnet-p1:1.0',
      replicas: 1,
      ports: [
        {
          name: 'tcp-5000',
          protocol: 'TCP',
          containerPort: 5000,
        },
      ],
      resources: {
        requests: {
          cpu: '1.5',
          memory: null,
        },
        limits: {
          cpu: '1.5',
          memory: null,
        },
      },
    },
    {
      serviceId: '1',
      serviceName: 'alexnet-p2-0',
      namespace: 'wangteng',
      imageUrl: '192.168.1.199:5000/wangteng/alexnet-p2:1.0',
      replicas: 1,
      ports: [
        {
          name: 'tcp-5000',
          protocol: 'TCP',
          containerPort: 5000,
        },
      ],
      resources: {
        requests: {
          cpu: '0.6',
          memory: null,
        },
        limits: {
          cpu: '0.6',
          memory: null,
        },
      },
    },
    {
      serviceId: '1',
      serviceName: 'alexnet-p2-3',
      namespace: 'wangteng',
      imageUrl: '192.168.1.199:5000/wangteng/alexnet-p2:1.0',
      replicas: 1,
      ports: [
        {
          name: 'tcp-5000',
          protocol: 'TCP',
          containerPort: 5000,
        },
      ],
      resources: {
        requests: {
          cpu: '1.5',
          memory: null,
        },
        limits: {
          cpu: '1.5',
          memory: null,
        },
      },
    },
    {
      serviceId: '1',
      serviceName: 'vgg-p1-2',
      namespace: 'wangteng',
      imageUrl: '192.168.1.199:5000/wangteng/vgg-p1:1.0',
      replicas: 1,
      ports: [
        {
          name: 'tcp-5000',
          protocol: 'TCP',
          containerPort: 5000,
        },
      ],
      resources: {
        requests: {
          cpu: '3.0',
          memory: null,
        },
        limits: {
          cpu: '3.0',
          memory: null,
        },
      },
    },
    {
      serviceId: '1',
      serviceName: 'vgg-p2-0',
      namespace: 'wangteng',
      imageUrl: '192.168.1.199:5000/wangteng/vgg-p2:1.0',
      replicas: 1,
      ports: [
        {
          name: 'tcp-5000',
          protocol: 'TCP',
          containerPort: 5000,
        },
      ],
      resources: {
        requests: {
          cpu: '1.0',
          memory: null,
        },
        limits: {
          cpu: '1.0',
          memory: null,
        },
      },
    },
    {
      serviceId: '1',
      serviceName: 'vgg-p2-1',
      namespace: 'wangteng',
      imageUrl: '192.168.1.199:5000/wangteng/vgg-p2:1.0',
      replicas: 1,
      ports: [
        {
          name: 'tcp-5000',
          protocol: 'TCP',
          containerPort: 5000,
        },
      ],
      resources: {
        requests: {
          cpu: '1.4',
          memory: null,
        },
        limits: {
          cpu: '1.4',
          memory: null,
        },
      },
    },
    {
      serviceId: '1',
      serviceName: 'resnet-p1-4',
      namespace: 'wangteng',
      imageUrl: '192.168.1.199:5000/wangteng/resnet-p1:1.0',
      replicas: 1,
      ports: [
        {
          name: 'tcp-5000',
          protocol: 'TCP',
          containerPort: 5000,
        },
      ],
      resources: {
        requests: {
          cpu: '0.8',
          memory: null,
        },
        limits: {
          cpu: '0.8',
          memory: null,
        },
      },
    },
    {
      serviceId: '1',
      serviceName: 'resnet-p2-4',
      namespace: 'wangteng',
      imageUrl: '192.168.1.199:5000/wangteng/resnet-p2:1.0',
      replicas: 1,
      ports: [
        {
          name: 'tcp-5000',
          protocol: 'TCP',
          containerPort: 5000,
        },
      ],
      resources: {
        requests: {
          cpu: '1.6',
          memory: null,
        },
        limits: {
          cpu: '1.6',
          memory: null,
        },
      },
    },
    {
      serviceId: '1',
      serviceName: 'resnet-p3-4',
      namespace: 'wangteng',
      imageUrl: '192.168.1.199:5000/wangteng/resnet-p3:1.0',
      replicas: 1,
      ports: [
        {
          name: 'tcp-5000',
          protocol: 'TCP',
          containerPort: 5000,
        },
      ],
      resources: {
        requests: {
          cpu: '1.6',
          memory: null,
        },
        limits: {
          cpu: '1.6',
          memory: null,
        },
      },
    },
  ],
};

export default function SchemeDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: UPDATE_CURRENT_SCHEME, data: data });
    // dispatch(getScheme(id));
  }, []);

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='flex-start'
    >
      <GeneralInfo />
      <DetailInfo />
    </Stack>
  );
}

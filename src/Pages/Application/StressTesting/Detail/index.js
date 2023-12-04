
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack } from '@mui/material';
import { useParams } from 'react-router';
import GeneralInfo from './GeneralInfo';
import DetailInfo from './DetailInfo';
import { UPDATE_CURRENT_PLAN } from '@/actions/applicationAction';

const data = {
  testPlanName: "Test Plan",
  status: "Running",
  serialized: false,
  functionalMode: false,
  tearDown: true,
  comment: "ddd",
  threadGroupList: [
    {
      threadGroupName: "Thread Group",
      threadNum: 1,
      rampUp: 1,
      scheduler: false,
      duration: null,
      delay: null,
      loopControllerVO: {
        loopNum: 1,
        continueForerever: false
      },
      httpSamplerProxyVO: {
        name: "HTTP请求默认值",
        protocol: "HTTP",
        server: "192.168.1.104:14447",
        path: "/getSomething",
        port: "1020",
        method: "GET",
        body: "'setSearchBy' is assigned a value but never used",
        useKeepAlive: "true",
        followRedirects: "true",
        arguments: {
          dd: "ddwr"
        }
      },
      headerManagerVO: {
        headerManagerName: "header manager",
        headerList: {
          dss: "www"
        }
      },
      timerList: [
        {
          name: "constant",
          threadDelay: 300,
          comment: ""
        },
        {
          name: "uniformRandom",
          constantDelayOffset: 0,
          randomDelayMaximum: 100,
          comment: ""
        }
      ]
    },
    {
      threadGroupName: "Thread Group2",
      threadNum: 1,
      rampUp: 1,
      scheduler: false,
      duration: null,
      delay: null,
      loopControllerVO: {
        loopNum: 1,
        continueForerever: false
      },
      httpSamplerProxyVO: {
        name: "HTTP请求默认值",
        protocol: "HTTP",
        server: "192.168.1.104:14447",
        path: "/getSomething",
        port: "1020",
        method: "GET",
        body: "'setSearchBy' is assigned a value but never used",
        useKeepAlive: "true",
        followRedirects: "true",
        arguments: {
          dd: "ddwr"
        }
      },
      headerManagerVO: {
        headerManagerName: "header manager",
        headerList: {
          dss: "www"
        }
      },
      timerList: [
        {
          name: "constant",
          threadDelay: 300,
          comment: ""
        },
        {
          name: "uniformRandom",
          constantDelayOffset: 0,
          randomDelayMaximum: 100,
          comment: ""
        }
      ]
    }
  ]
}

export function TestPlanDetail() {
  const { testPlanId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: UPDATE_CURRENT_PLAN, data: data});
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

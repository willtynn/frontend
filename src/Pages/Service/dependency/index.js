/**
 * src\Pages\Service\dependency\index.js
 */
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ThreeLayerCanvas, EdgeCenterCanvas, FreeCanvas } from './canvas';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Input,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
  TextField,
  Tooltip,
} from '@mui/material';
import { SmallLightFont, YaHeiLargeFont } from '@/components/Fonts';
import {
  UPDATE_EXACT_SERVICE,
  searchDependencies,
} from '@/actions/serviceAction';
import PropTypes from 'prop-types';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { setSnackbarMessageAndOpen } from '@/actions/snackbarAction';
import { SEVERITIES } from '@/components/CommonSnackbar';
import { fontFamily } from '@/utils/commonUtils';
import Dependency60 from '@/assets/Dependency60.svg';
import { useIntl } from 'react-intl';
import { Tabs } from '@mui/base/Tabs';
import {
  StyledTab,
  StyledTabsList,
  StyledTabPanel,
} from '@/components/Tab/CircleTab';
import InfoAlert from '@/assets/InfoAlert.svg';
import { KubeAutocomplete } from '../../../components/Input';
import { encodeId } from '../../../utils/commonUtils';

const fakeNodes = [
  {
    id: 'train-ticket/ts-admin-basic-info-service',
    label: 'train-ticket/ts-admin-basic-info-service',
  },
  {
    id: 'train-ticket/ts-basic-service',
    label: 'train-ticket/ts-basic-service',
  },
  {
    id: 'train-ticket/ts-food-service',
    label: 'train-ticket/ts-food-service',
  },
  {
    id: 'train-ticket/ts-preserve-other-service',
    label: 'train-ticket/ts-preserve-other-service',
  },
  {
    id: 'train-ticket/ts-preserve-service',
    label: 'train-ticket/ts-preserve-service',
  },
  {
    id: 'train-ticket/ts-station-service',
    label: 'train-ticket/ts-station-service',
  },
];

const fakeLinks = [
  {
    source: 'train-ticket/ts-admin-basic-info-service',
    target: 'train-ticket/ts-station-service',
    invoke_info: {
      caller:
        'train-ticket/ts-admin-basic-info-service::/api/v1/adminbasicservice/adminbasic/stations:Get',
      callerPath: '/api/v1/adminbasicservice/adminbasic/stations',
      callerDetail: {
        name: 'train-ticket/ts-admin-basic-info-service',
        repo: 'https://github.com/FudanSELab/train-ticket.git',
        imageUrl: 'codewisdom/ts-admin-basic-info-service-with-jaeger',
      },
      callee:
        'train-ticket/ts-station-service::/api/v1/stationservice/stations:Get',
      calleePath: '/api/v1/stationservice/stations',
      calleeDetail: {
        name: 'train-ticket/ts-station-service',
        repo: 'https://github.com/FudanSELab/train-ticket.git',
        imageUrl: 'codewisdom/ts-station-service-with-jaeger',
      },
      requestSize: '0',
      responseSize: '329',
    },
    center: true,
  },
  {
    source: 'train-ticket/ts-basic-service',
    target: 'train-ticket/ts-station-service',
    invoke_info: {
      caller: 'train-ticket/ts-basic-service::/api/v1/basicservice/basic/:Get',
      callerPath: '/api/v1/basicservice/basic/',
      callerDetail: {
        name: 'train-ticket/ts-basic-service',
        repo: 'https://github.com/FudanSELab/train-ticket.git',
        imageUrl: 'codewisdom/ts-basic-service-with-jaeger',
      },
      callee:
        'train-ticket/ts-station-service::/api/v1/stationservice/stations:Get',
      calleePath: '/api/v1/stationservice/stations',
      calleeDetail: {
        name: 'train-ticket/ts-station-service',
        repo: 'https://github.com/FudanSELab/train-ticket.git',
        imageUrl: 'codewisdom/ts-station-service-with-jaeger',
      },
      requestSize: '0',
      responseSize: '46',
    },
    center: true,
  },
  {
    source: 'train-ticket/ts-basic-service',
    target: 'train-ticket/ts-station-service',
    invoke_info: {
      caller:
        'train-ticket/ts-basic-service::/api/v1/basicservice/basic/travel:Post',
      callerPath: '/api/v1/basicservice/basic/travel',
      callerDetail: {
        name: 'train-ticket/ts-basic-service',
        repo: 'https://github.com/FudanSELab/train-ticket.git',
        imageUrl: 'codewisdom/ts-basic-service-with-jaeger',
      },
      callee:
        'train-ticket/ts-station-service::/api/v1/stationservice/stations:Get',
      calleePath: '/api/v1/stationservice/stations',
      calleeDetail: {
        name: 'train-ticket/ts-station-service',
        repo: 'https://github.com/FudanSELab/train-ticket.git',
        imageUrl: 'codewisdom/ts-station-service-with-jaeger',
      },
      requestSize: '0',
      responseSize: '46',
    },
    center: true,
  },
  {
    source: 'train-ticket/ts-food-service',
    target: 'train-ticket/ts-station-service',
    invoke_info: {
      caller: 'train-ticket/ts-food-service::/api/v1/foodservice/foods/:Get',
      callerPath: '/api/v1/foodservice/foods/',
      callerDetail: {
        name: 'train-ticket/ts-food-service',
        repo: 'https://github.com/FudanSELab/train-ticket.git',
        imageUrl: 'codewisdom/ts-food-service-with-jaeger',
      },
      callee:
        'train-ticket/ts-station-service::/api/v1/stationservice/stations:Get',
      calleePath: '/api/v1/stationservice/stations',
      calleeDetail: {
        name: 'train-ticket/ts-station-service',
        repo: 'https://github.com/FudanSELab/train-ticket.git',
        imageUrl: 'codewisdom/ts-station-service-with-jaeger',
      },
      requestSize: '0',
      responseSize: '46',
    },
    center: true,
  },
  {
    source: 'train-ticket/ts-preserve-other-service',
    target: 'train-ticket/ts-station-service',
    invoke_info: {
      caller:
        'train-ticket/ts-preserve-other-service::/api/v1/preserveotherservice/preserveOther:Post',
      callerPath: '/api/v1/preserveotherservice/preserveOther',
      callerDetail: {
        name: 'train-ticket/ts-preserve-other-service',
        repo: 'https://github.com/FudanSELab/train-ticket.git',
        imageUrl: 'codewisdom/ts-preserve-other-service-with-jaeger',
      },
      callee:
        'train-ticket/ts-station-service::/api/v1/stationservice/stations:Get',
      calleePath: '/api/v1/stationservice/stations',
      calleeDetail: {
        name: 'train-ticket/ts-station-service',
        repo: 'https://github.com/FudanSELab/train-ticket.git',
        imageUrl: 'codewisdom/ts-station-service-with-jaeger',
      },
      requestSize: '0',
      responseSize: '46',
    },
    center: true,
  },
  {
    source: 'train-ticket/ts-preserve-service',
    target: 'train-ticket/ts-station-service',
    invoke_info: {
      caller:
        'train-ticket/ts-preserve-service::/api/v1/preserveservice/preserve:Post',
      callerPath: '/api/v1/preserveservice/preserve',
      callerDetail: {
        name: 'train-ticket/ts-preserve-service',
        repo: 'https://github.com/FudanSELab/train-ticket.git',
        imageUrl: 'codewisdom/ts-preserve-service-with-jaeger',
      },
      callee:
        'train-ticket/ts-station-service::/api/v1/stationservice/stations:Get',
      calleePath: '/api/v1/stationservice/stations',
      calleeDetail: {
        name: 'train-ticket/ts-station-service',
        repo: 'https://github.com/FudanSELab/train-ticket.git',
        imageUrl: 'codewisdom/ts-station-service-with-jaeger',
      },
      requestSize: '0',
      responseSize: '46',
    },
    center: true,
  },
  // {
  //   source: 'train-ticket/ts-ticketinfo-service',
  //   target: 'train-ticket/ts-basic-service',
  //   invoke_info: {
  //     caller:
  //       'train-ticket/ts-ticketinfo-service::/api/v1/ticketinfoservice/ticketinfo/:Get',
  //     callerPath: '/api/v1/ticketinfoservice/ticketinfo/',
  //     callerDetail: {
  //       name: 'train-ticket/ts-ticketinfo-service',
  //       repo: 'https://github.com/FudanSELab/train-ticket.git',
  //       imageUrl: 'codewisdom/ts-ticketinfo-service-with-jaeger',
  //     },
  //     callee: 'train-ticket/ts-basic-service::/api/v1/basicservice/basic/:Get',
  //     calleePath: '/api/v1/basicservice/basic/',
  //     calleeDetail: {
  //       name: 'train-ticket/ts-basic-service',
  //       repo: 'https://github.com/FudanSELab/train-ticket.git',
  //       imageUrl: 'codewisdom/ts-basic-service-with-jaeger',
  //     },
  //     requestSize: '0',
  //     responseSize: '46',
  //   },
  //   center: false,
  // },
  // {
  //   source: 'train-ticket/ts-ticketinfo-service',
  //   target: 'train-ticket/ts-basic-service',
  //   invoke_info: {
  //     caller:
  //       'train-ticket/ts-ticketinfo-service::/api/v1/ticketinfoservice/ticketinfo/:Get',
  //     callerPath: '/api/v1/ticketinfoservice/ticketinfo/',
  //     callerDetail: {
  //       name: 'train-ticket/ts-ticketinfo-service',
  //       repo: 'https://github.com/FudanSELab/train-ticket.git',
  //       imageUrl: 'codewisdom/ts-ticketinfo-service-with-jaeger',
  //     },
  //     callee:
  //       'train-ticket/ts-basic-service::/api/v1/basicservice/basic/travel:Post',
  //     calleePath: '/api/v1/basicservice/basic/travel',
  //     calleeDetail: {
  //       name: 'train-ticket/ts-basic-service',
  //       repo: 'https://github.com/FudanSELab/train-ticket.git',
  //       imageUrl: 'codewisdom/ts-basic-service-with-jaeger',
  //     },
  //     requestSize: '339',
  //     responseSize: '223',
  //   },
  //   center: false,
  // },
  // {
  //   source: 'train-ticket/ts-ticketinfo-service',
  //   target: 'train-ticket/ts-basic-service',
  //   invoke_info: {
  //     caller:
  //       'train-ticket/ts-ticketinfo-service::/api/v1/ticketinfoservice/ticketinfo:Post',
  //     callerPath: '/api/v1/ticketinfoservice/ticketinfo',
  //     callerDetail: {
  //       name: 'train-ticket/ts-ticketinfo-service',
  //       repo: 'https://github.com/FudanSELab/train-ticket.git',
  //       imageUrl: 'codewisdom/ts-ticketinfo-service-with-jaeger',
  //     },
  //     callee: 'train-ticket/ts-basic-service::/api/v1/basicservice/basic/:Get',
  //     calleePath: '/api/v1/basicservice/basic/',
  //     calleeDetail: {
  //       name: 'train-ticket/ts-basic-service',
  //       repo: 'https://github.com/FudanSELab/train-ticket.git',
  //       imageUrl: 'codewisdom/ts-basic-service-with-jaeger',
  //     },
  //     requestSize: '0',
  //     responseSize: '44',
  //   },
  //   center: false,
  // },
  // {
  //   source: 'train-ticket/ts-ticketinfo-service',
  //   target: 'train-ticket/ts-basic-service',
  //   invoke_info: {
  //     caller:
  //       'train-ticket/ts-ticketinfo-service::/api/v1/ticketinfoservice/ticketinfo:Post',
  //     callerPath: '/api/v1/ticketinfoservice/ticketinfo',
  //     callerDetail: {
  //       name: 'train-ticket/ts-ticketinfo-service',
  //       repo: 'https://github.com/FudanSELab/train-ticket.git',
  //       imageUrl: 'codewisdom/ts-ticketinfo-service-with-jaeger',
  //     },
  //     callee:
  //       'train-ticket/ts-basic-service::/api/v1/basicservice/basic/travel:Post',
  //     calleePath: '/api/v1/basicservice/basic/travel',
  //     calleeDetail: {
  //       name: 'train-ticket/ts-basic-service',
  //       repo: 'https://github.com/FudanSELab/train-ticket.git',
  //       imageUrl: 'codewisdom/ts-basic-service-with-jaeger',
  //     },
  //     requestSize: '336',
  //     responseSize: '233',
  //   },
  //   center: false,
  // },
  {
    source: 'train-ticket/ts-preserve-other-service',
    target: 'train-ticket/ts-food-service',
    invoke_info: {
      caller:
        'train-ticket/ts-preserve-other-service::/api/v1/preserveotherservice/preserveOther:Post',
      callerPath: '/api/v1/preserveotherservice/preserveOther',
      callerDetail: {
        name: 'train-ticket/ts-preserve-other-service',
        repo: 'https://github.com/FudanSELab/train-ticket.git',
        imageUrl: 'codewisdom/ts-preserve-other-service-with-jaeger',
      },
      callee: 'train-ticket/ts-food-service::/api/v1/foodservice/orders:Post',
      calleePath: '/api/v1/foodservice/orders',
      calleeDetail: {
        name: 'train-ticket/ts-food-service',
        repo: 'https://github.com/FudanSELab/train-ticket.git',
        imageUrl: 'codewisdom/ts-food-service-with-jaeger',
      },
      requestSize: '155',
      responseSize: '226',
    },
    center: false,
  },
  {
    source: 'train-ticket/ts-preserve-service',
    target: 'train-ticket/ts-food-service',
    invoke_info: {
      caller:
        'train-ticket/ts-preserve-service::/api/v1/preserveservice/preserve:Post',
      callerPath: '/api/v1/preserveservice/preserve',
      callerDetail: {
        name: 'train-ticket/ts-preserve-service',
        repo: 'https://github.com/FudanSELab/train-ticket.git',
        imageUrl: 'codewisdom/ts-preserve-service-with-jaeger',
      },
      callee: 'train-ticket/ts-food-service::/api/v1/foodservice/orders:Post',
      calleePath: '/api/v1/foodservice/orders',
      calleeDetail: {
        name: 'train-ticket/ts-food-service',
        repo: 'https://github.com/FudanSELab/train-ticket.git',
        imageUrl: 'codewisdom/ts-food-service-with-jaeger',
      },
      requestSize: '155',
      responseSize: '226',
    },
    center: false,
  },
];

function ServiceDependency() {
  /**
   * 用于service的依赖图
   */
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  /**
   * 用户interface的依赖图
   */
  const [inodes, setInodes] = useState([]);
  const [ilinks, setIlinks] = useState([]);
  const [clickedLink, setClickedLink] = useState(null);
  const [tabValue, setTabValue] = useState(1);
  const [graph, setGraph] = useState(null);

  /**
   * 存在依赖关系的服务
   */
  const [positiveServices, setPositiveServices] = useState({});
  const [currentService, setCurrentService] = useState(null);

  /**
   * 存在依赖关系的接口
   */
  const [positiveInterfaces, setPositiveInterfaces] = useState({});
  const [currentInterface, setCurrentInterface] = useState(null);

  const [searchParams] = useSearchParams();
  const [paramChange, setParamChange] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const intl = useIntl();

  const { dependency } = useSelector(state => {
    return {
      dependency: state.Service.dependency,
    };
  });

  useEffect(() => {
    dispatch(searchDependencies());
    localStorage.setItem('serviceFrom', 'dependency');
  }, []);

  useEffect(() => {
    /**
     * 构造图
     */
    if (!dependency) {
      return;
    }
    let tmpGraph = {};
    let tmpPositiveServices = {};
    let tmpPositiveInterfaces = {};
    for (const call of dependency) {
      const caller_service = call.caller;
      tmpPositiveServices[caller_service] = call.callerDetail;
      const callees = call.callees;
      for (const [callee_service, call_info] of Object.entries(callees)) {
        if (!(caller_service in tmpGraph)) {
          tmpGraph[caller_service] = {
            invoked: [],
            invoking: [],
          };
        }
        if (!(callee_service in tmpGraph)) {
          tmpGraph[callee_service] = {
            invoked: [],
            invoking: [],
          };
        }
        // 记录每个服务的调用关系和被调用关系
        for (const single_call_info of call_info) {
          tmpGraph[caller_service].invoking.push([
            callee_service,
            true,
            {
              caller: single_call_info.caller,
              callerPath: single_call_info.callerPath,
              callerDetail: call.callerDetail,
              callee: single_call_info.callee,
              calleePath: single_call_info.calleePath,
              calleeDetail: single_call_info.calleeServiceDetail,
              ...single_call_info.extraData,
            },
          ]);
          tmpGraph[callee_service].invoked.push([
            caller_service,
            false,
            {
              caller: single_call_info.caller,
              callerPath: single_call_info.callerPath,
              callerDetail: call.callerDetail,
              callee: single_call_info.callee,
              calleePath: single_call_info.calleePath,
              calleeDetail: single_call_info.calleeServiceDetail,
              ...single_call_info.extraData,
            },
          ]);
          tmpPositiveServices[callee_service] =
            single_call_info.calleeServiceDetail;
          tmpPositiveInterfaces[single_call_info.callee] = {
            path: single_call_info.calleePath,
          };
        }
      }
    }
    setGraph(tmpGraph);
    setPositiveServices(tmpPositiveServices);
    setPositiveInterfaces(tmpPositiveInterfaces);
  }, [dependency]);

  useEffect(() => {
    const type = searchParams.get('type');
    const target_id = searchParams.get('id');
    if (type === 'service') {
      setTabValue(1);
      setCurrentService(target_id);
    } else if (type === 'interface') {
      setTabValue(2);
      setCurrentInterface(target_id);
    }
  }, [paramChange]);

  useEffect(() => {
    if (currentService !== null) {
      if (dependency === null) {
        dispatch(
          setSnackbarMessageAndOpen(
            'serviceDependency.serviceDependencyNotFound',
            {},
            SEVERITIES.warning
          )
        );
        return;
      }
      let nodes = [];
      let links = [];
      let graph_dict = {};

      for (const call of dependency) {
        const caller = call.caller;
        const callees = call.callees;
        for (const [callee_service, call_info] of Object.entries(callees)) {
          if (caller === currentService) {
            graph_dict[caller] = {
              id: caller,
              label: call.callerDetail.name,
              type: 'target',
            };
            for (const single_call_info of call_info) {
              // 如果已有节点，并且为target，则保持type（target > invoking = invoked）(解决非DAG颜色混乱的问题)
              if (
                !(
                  callee_service in graph_dict &&
                  graph_dict[callee_service].type === 'target'
                )
              ) {
                graph_dict[callee_service] = {
                  id: callee_service,
                  label: single_call_info.calleeServiceDetail.name,
                  type: 'invoking',
                };
              }
              links.push({
                source: caller,
                target: callee_service,
                invoke_info: {
                  caller: single_call_info.caller,
                  callerPath: single_call_info.callerPath,
                  callee: single_call_info.callee,
                  calleePath: single_call_info.calleePath,
                  ...single_call_info.extraData,
                },
              });
            }
          } else {
            for (const single_call_info of call_info) {
              if (callee_service === currentService) {
                if (!(callee_service in graph_dict)) {
                  graph_dict[callee_service] = {
                    id: callee_service,
                    label: single_call_info.calleeServiceDetail.name,
                    type: 'target',
                  };
                }

                graph_dict[caller] = {
                  id: caller,
                  label: call.callerDetail.name,
                  type: 'invoked',
                };
                links.push({
                  source: caller,
                  target: callee_service,
                  invoke_info: {
                    caller: single_call_info.caller,
                    callerPath: single_call_info.callerPath,
                    callee: single_call_info.callee,
                    calleePath: single_call_info.calleePath,
                    ...single_call_info.extraData,
                  },
                });
              }
            }
          }
        }
      }

      for (const node of Object.values(graph_dict)) {
        nodes.push(node);
      }

      if (nodes.length === 0 || links.length === 0) {
        dispatch(
          setSnackbarMessageAndOpen(
            'serviceDependency.serviceDependencyNotFound',
            {},
            SEVERITIES.warning
          )
        );
        clearVarible();
      } else {
        setNodes(nodes);
        setLinks(links);
      }
    }
  }, [currentService]);

  useEffect(() => {
    // console.log("currentInterface", currentInterface)
    if (currentInterface !== null) {
      if (dependency === null) {
        dispatch(
          setSnackbarMessageAndOpen(
            'serviceDependency.serviceDependencyNotFound',
            {},
            SEVERITIES.warning
          )
        );
        return;
      }
      let nodes = [];
      let links = [];
      let graph_dict = {};
      let target_up_nodes = [];
      let target_down_nodes = [];
      let flag = false;
      // 查看该接口是否被调用
      for (const key of Object.keys(graph)) {
        const invoking_arr = graph[key].invoking;
        for (const invoking_element of invoking_arr) {
          const [callee_node, isDown, invoke_info] = invoking_element;
          if (invoke_info.callee === currentInterface) {
            flag = true;
            target_up_nodes.push(key);
            target_down_nodes.push(callee_node);
            // 此时添加边，因为如果图为DAG，则后续不会再访问到
            links.push({
              source: key,
              target: callee_node,
              invoke_info: invoke_info,
              center: true,
            });
          }
        }
      }
      if (flag === false) {
        dispatch(
          setSnackbarMessageAndOpen(
            'serviceDependency.interfaceDependencyNotFound',
            {},
            SEVERITIES.warning
          )
        );
        clearVarible();
        return;
      }
      const _recursive_search = (node, isDown, path) => {
        graph_dict[node] = {
          id: node,
          label: positiveServices[node].name,
        };
        let arr;
        if (isDown) {
          arr = graph[node].invoking;
        } else {
          arr = graph[node].invoked;
        }
        for (const element of arr) {
          const [callee_node, _, invoke_info] = element;

          if (isDown) {
            links.push({
              source: node,
              target: callee_node,
              invoke_info: invoke_info,
              center: false,
            });
          } else {
            links.push({
              source: callee_node,
              target: node,
              invoke_info: invoke_info,
              center: false,
            });
          }
          if (path.find((value, index) => value === callee_node) === undefined) {
            _recursive_search(callee_node, isDown, [...path, callee_node]);
          }
        }
      };
      target_up_nodes = new Set(target_up_nodes);
      target_down_nodes = new Set(target_down_nodes);
      for (const up_node of target_up_nodes) {
        _recursive_search(up_node, false, [up_node]);
      }
      for (const down_node of target_down_nodes) {
        _recursive_search(down_node, true, [down_node]);
      }

      for (const node of Object.values(graph_dict)) {
        nodes.push(node);
      }
      if (nodes.length === 0 || links.length === 0) {
        dispatch(
          setSnackbarMessageAndOpen(
            'serviceDependency.interfaceDependencyNotFound',
            {},
            SEVERITIES.warning
          )
        );
        clearVarible();
      } else {
        setInodes(nodes);
        links = links.map((link, index) => {
          if (link.invoke_info.callee === currentInterface) {
            link.center = true;
          }
          return link;
        });
        setIlinks(links);
      }
    }
  }, [currentInterface]);

  const clearVarible = () => {
    /**
     * 将一些变量置为默认值
     */
    dispatch({ type: UPDATE_EXACT_SERVICE, data: null });
    setClickedLink(null);
    setNodes([]);
    setLinks([]);
    setInodes([]);
    setIlinks([]);
  };

  const handleNodeClick = id => {
    navigate(`/detail/service/${encodeId(id)}`);
  };

  const handleInterfaceNodeClick = id => {
    navigate(`/detail/service/${encodeId(id)}`);
  };

  const handleInterfaceLinkClick = data => {
    setClickedLink(data);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '800px',
        m: '16px',
      }}
    >
      <Box
        sx={{
          borderRadius: '4px',
          backgroundColor: '#FFFFFF',
          padding: '24px 20px',
          width: 'calc(100% - 40px)',
          height: '58px',
          boxShadow: '0 4px 8px 0 rgba(36,46,66,.06)',
        }}
      >
        <Stack direction='row' spacing={1}>
          <Dependency60 />
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
              服务依赖
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
              {intl.messages['serviceDependency.serviceDependencyDescription']}
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          boxShadow: '0 4px 8px 0 rgba(36,46,66,.06)',
          height: '32px',
          p: '6px 0px',
          bgcolor: '#EFF4F9',
        }}
      >
        <Box>
          <Tabs value={tabValue} onChange={(e, value) => setTabValue(value)}>
            <StyledTabsList>
              <StyledTab value={1}>服务依赖</StyledTab>
              <StyledTab value={2}>接口依赖</StyledTab>
            </StyledTabsList>

            <StyledTabPanel value={1}>
              <Box
                sx={{
                  boxShadow: '0px 0px 12px 0px rgba(38, 46, 53, 0.12)',
                  borderRadius: '5px',
                }}
              >
                <Box
                  sx={{
                    height: '32px',
                    padding: '10px 20px',
                    bgcolor: '#f9fbfd',
                  }}
                >
                  <KubeAutocomplete
                    height='32px'
                    padding='6px 5px 5px 12px'
                    value={currentService}
                    onChange={(event, newValue) => {
                      setCurrentService(newValue);
                    }}
                    id='positive_service_autocomplete'
                    noOptionsText='无可选服务'
                    options={Object.keys(positiveServices)}
                    filterOptions={(options, params) => {
                      const { inputValue } = params;
                      return options.filter((option, index) => {
                        return (
                          option.includes(inputValue) ||
                          positiveServices[option].name.includes(inputValue)
                        );
                      });
                    }}
                    renderOption={(props, option, state) => {
                      const composed = `${positiveServices[option].name} (${option}) `;
                      return (
                        <Tooltip title={composed} placement='top'>
                          <Box
                            {...props}
                            sx={{
                              overflow: 'hidden !important',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              display: 'block !important',
                            }}
                          >
                            {composed}
                          </Box>
                        </Tooltip>
                      );
                    }}
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
                    renderInput={params => {
                      const option = params.inputProps.value;
                      if (positiveServices[option]) {
                        params.inputProps.value = `${positiveServices[option].name} (${option}) `;
                      }
                      return <TextField {...params} placeholder='可选服务' />;
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    height: '100%',
                    bgcolor: '#FFFFFF',
                    borderRadius: '5px',
                    p: 0,
                  }}
                >
                  {nodes.length !== 0 ? (
                    <ThreeLayerCanvas
                      nodes={nodes}
                      links={links}
                      handleNodeClick={handleNodeClick}
                      services={positiveServices}
                    />
                  ) : (
                    <Box
                      sx={{
                        minHeight: '400px',
                        display: 'grid',
                      }}
                    >
                      <Stack
                        direction='row'
                        spacing={2}
                        alignItems='center'
                        justifyContent='center'
                      >
                        <InfoAlert />
                        <YaHeiLargeFont>
                          {intl.messages['serviceDependency.serviceBasedMsg']}
                        </YaHeiLargeFont>
                      </Stack>
                    </Box>
                  )}
                </Box>
              </Box>
            </StyledTabPanel>
            <StyledTabPanel value={2}>
              <Box
                sx={{
                  boxShadow: '0px 0px 12px 0px rgba(38, 46, 53, 0.12)',
                  borderRadius: '5px',
                }}
              >
                <Box
                  sx={{
                    height: '32px',
                    padding: '10px 20px',
                    bgcolor: '#f9fbfd',
                  }}
                >
                  <KubeAutocomplete
                    height='32px'
                    padding='6px 5px 5px 12px'
                    value={currentInterface}
                    onChange={(event, newValue) => {
                      setCurrentInterface(newValue);
                    }}
                    id='positive_interface_autocomplete'
                    noOptionsText='无可选接口'
                    options={Object.keys(positiveInterfaces)}
                    filterOptions={(options, params) => {
                      const { inputValue } = params;
                      return options.filter((option, index) => {
                        return (
                          option.includes(inputValue) ||
                          positiveInterfaces[option].path.includes(inputValue)
                        );
                      });
                    }}
                    renderOption={(props, option, state) => {
                      const composed = `${positiveInterfaces[option].path} (${option}) `;
                      return (
                        <Tooltip title={composed} placement='top'>
                          <Box
                            {...props}
                            sx={{
                              overflow: 'hidden !important',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              display: 'block !important',
                            }}
                          >
                            {composed}
                          </Box>
                        </Tooltip>
                      );
                    }}
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
                    renderInput={params => {
                      const option = params.inputProps.value;
                      if (positiveInterfaces[option]) {
                        params.inputProps.value = `${positiveInterfaces[option].path} (${option}) `;
                      }
                      return <TextField {...params} placeholder='可选接口' />;
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    height: '100%',
                    bgcolor: '#FFFFFF',
                    borderRadius: '5px',
                    p: 0,
                  }}
                >
                  {inodes.length !== 0 ? (
                    <EdgeCenterCanvas
                      nodes={inodes}
                      links={ilinks}
                      handleNodeClick={handleInterfaceNodeClick}
                      handleLinkClick={handleInterfaceLinkClick}
                      services={positiveServices}
                      target={currentInterface}
                    />
                  ) : (
                    <Box
                      sx={{
                        minHeight: '400px',
                        display: 'grid',
                      }}
                    >
                      <Stack
                        direction='row'
                        spacing={2}
                        alignItems='center'
                        justifyContent='center'
                      >
                        <InfoAlert />
                        <YaHeiLargeFont>
                          {intl.messages['serviceDependency.interfaceBasedMsg']}
                        </YaHeiLargeFont>
                      </Stack>
                    </Box>
                  )}
                </Box>

                {/* <FreeCanvas
                  nodes={fakeNodes}
                  links={fakeLinks}
                  handleNodeClick={() => {}}
                /> */}
              </Box>
            </StyledTabPanel>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
}

export default ServiceDependency;

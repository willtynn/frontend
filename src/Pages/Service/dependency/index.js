import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ThreeLayerCanvas, EdgeCenterCanvas } from './canvas';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Box,
  Input,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
  Tabs,
  Tab,
  Typography,
} from '@mui/material';
import { SmallLightFont, SuperLargeBoldFont } from '@/components/Fonts';
import { OutlinedButton } from '@/components/Button';
import {
  UPDATE_EXACT_SERVICE,
  searchServiceExactlyById,
  searchDependencies,
} from '@/actions/serviceAction';
import ServiceInfoBlock from '../module/ServiceInfoBlock';
import InvokeInfoBlock from '../module/InvokeInfoBlock';
import { fakeInfo } from '../query';
import PropTypes from 'prop-types';
import {
  SERVICE_DEPENDENCY,
  INTERFACE_DEPENDENCY,
} from '../module/ServiceInfoBlock';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { decodeInterfaceSymbol } from '@/utils/commonUtils';
import { setSnackbarMessageAndOpen } from '@/actions/snackbarAction';
import { SEVERITIES } from '@/components/CommonSnackbar';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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

  const [mode, setMode] = useState(0);
  const [queryContent, setQueryContent] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [clickedLink, setClickedLink] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [graph, setGraph] = useState(null);
  const [direction, setDirection] = useState('row');

  const [searchParams] = useSearchParams();
  const [paramChange, setParamChange] = useState(0);

  const dispatch = useDispatch();

  const serviceClick = useRef();
  const interfaceClick = useRef();
  const informationBox = useRef();

  const { exactService, dependency } = useSelector(state => {
    return {
      exactService: state.Service.exactService,
      dependency: state.Service.dependency,
    };
  });

  useEffect(() => {
    dispatch(searchDependencies());
  }, []);

  useEffect(() => {
    /**
     * 构造图
     */
    if (!dependency) {
      return;
    }
    let tmpGraph = {};
    for (const call of dependency) {
      const caller_service = call.caller;
      const callees = call.callees;
      for (const [callee_service, call_info] of Object.entries(callees)) {
        // const caller_service = decodeInterfaceSymbol(callee.caller)[0];
        // const callee_service = decodeInterfaceSymbol(callee.callee)[0];
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
        for (const single_call_info of call_info) {
          tmpGraph[caller_service].invoking.push([
            callee_service,
            true,
            {
              caller: single_call_info.caller,
              callee: single_call_info.callee,
              ...single_call_info.extraData,
            },
          ]);
          tmpGraph[callee_service].invoked.push([
            caller_service,
            false,
            {
              caller: single_call_info.caller,
              callee: single_call_info.callee,
              ...single_call_info.extraData,
            },
          ]);
        }
      }
    }
    setGraph(tmpGraph);
  }, [dependency]);

  useEffect(() => {
    const type = searchParams.get('type');
    const by = searchParams.get('by');
    const target_id = searchParams.get('id');
    if (type === 'service') {
      setTabValue(0);
      if (Number(by) === 0) {
        setMode(0);
        setQueryContent(target_id);
        setTimeout(() => {
          serviceClick.current.click();
        }, 400);
      } else if (Number(by) === 1) {
        setMode(1);
      }
    } else if (type === 'interface') {
      setTabValue(1);
      setQueryContent(target_id);
      setTimeout(() => {
        interfaceClick.current.click();
      }, 400);
    }
  }, [paramChange]);

  const resizeFunc = () => {
    if (!informationBox.current) {
      return;
    }
    if (informationBox.current.clientWidth < 1800) {
      setDirection('column');
    } else {
      setDirection('row');
    }
  }
  
  window.onresize = () => {
    resizeFunc()
  };

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

  const handleTabChange = (event, newValue) => {
    dispatch({ type: UPDATE_EXACT_SERVICE, data: null });
    setClickedLink(null);
    setTabValue(newValue);
  };

  const handleChange = event => {
    setMode(event.target.value);
  };

  const handleInputChange = event => {
    setQueryContent(event.target.value);
    if (event.target.value !== '') {
      setEmptyError(false);
    }
  };

  const handleSearchClick = e => {
    if (!queryContent || queryContent === '') {
      setEmptyError(true);
      return;
    }
    let nodes = [];
    let links = [];
    let graph_dict = {};

    for (const call of dependency) {
      const caller = call.caller;
      const callees = call.callees;
      for (const [callee_service, call_info] of Object.entries(callees)) {
        if (caller === queryContent) {
          graph_dict[caller] = {
            id: caller,
            label: caller,
            type: 'target',
          };
          for (const single_call_info of call_info) {
            graph_dict[callee_service] = {
              id: callee_service,
              label: callee_service,
              type: 'invoking',
            };
            links.push({
              source: caller,
              target: callee_service,
              invoke_info: {
                caller: single_call_info.caller,
                callee: single_call_info.callee,
                ...single_call_info.extraData,
              },
            });
          }
        } else {
          for (const single_call_info of call_info) {
            if (callee_service === queryContent) {
              if (!(callee_service in graph_dict)) {
                graph_dict[callee_service] = {
                  id: callee_service,
                  label: callee_service,
                  type: 'target',
                };
              }
              graph_dict[caller] = {
                id: caller,
                label: caller,
                type: 'invoked',
              };
              links.push({
                source: caller,
                target: callee_service,
                invoke_info: {
                  caller: single_call_info.caller,
                  callee: single_call_info.callee,
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
  };

  const handleInterfaceSearchClick = e => {
    if (!queryContent || queryContent === '') {
      setEmptyError(true);
      return;
    }
    let nodes = [];
    let links = [];
    let graph_dict = {};
    let target_up_nodes = [];
    let target_down_nodes = [];
    let flag = false;
    for (const key of Object.keys(graph)) {
      const invoking_arr = graph[key].invoking;
      for (const invoking_element of invoking_arr) {
        const [callee_node, isDown, invoke_info] = invoking_element;
        if (invoke_info.callee === queryContent) {
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
    const _recursive_search = (node, isDown) => {
      graph_dict[node] = {
        id: node,
        label: node,
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
          });
        } else {
          links.push({
            source: callee_node,
            target: node,
            invoke_info: invoke_info,
          });
        }
        _recursive_search(callee_node, isDown);
      }
    };
    target_up_nodes = new Set(target_up_nodes);
    target_down_nodes = new Set(target_down_nodes);
    for (const up_node of target_up_nodes) {
      _recursive_search(up_node, false);
    }
    for (const down_node of target_down_nodes) {
      _recursive_search(down_node, true);
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
      setIlinks(links);
    }
  };

  const handleNodeClick = id => {
    dispatch(searchServiceExactlyById(id));
  };

  const handleLinkClick = data => {
    setClickedLink(data);
  };

  const handleInterfaceNodeClick = id => {
    dispatch(searchServiceExactlyById(id));
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
      ref={informationBox}
    >
      <Stack
        direction='row'
        spacing={4}
        sx={{
          mb: '12px',
        }}
      >
        <SuperLargeBoldFont
          sx={{
            ml: '12px',
            fontSize: '32px !important',
            lineHeight: '54px !important',
          }}
        >
          服务依赖lailailai
        </SuperLargeBoldFont>
        {tabValue == 0 ? (
          <Stack direction='row' spacing={1}>
            <Stack>
              <SmallLightFont>Query</SmallLightFont>
              <FormControl>
                <Input
                  id='my-input'
                  aria-describedby='my-helper-text'
                  value={queryContent}
                  onChange={handleInputChange}
                  error={emptyError}
                />
                {!emptyError && mode === 1 ? (
                  <FormHelperText
                    sx={{
                      m: '3px 0px 0px 0px',
                    }}
                  >
                    Version Format should be "xx.xx.xx".
                  </FormHelperText>
                ) : (
                  <></>
                )}
                {emptyError ? (
                  <FormHelperText
                    sx={{
                      m: '3px 0px 0px 0px',
                      color: 'red',
                    }}
                  >
                    This field is required.
                  </FormHelperText>
                ) : (
                  <></>
                )}
              </FormControl>
            </Stack>
            <FormControl variant='standard'>
              <InputLabel
                id='service_search_mode_label'
                sx={{
                  color: 'var(--gray-500, #596A7C)',
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                }}
              >
                Search Mode
              </InputLabel>
              <Select
                labelId='service_search_mode_label'
                id='service_search_mode'
                value={mode}
                onChange={handleChange}
                sx={{
                  minWidth: '120px',
                }}
              >
                <MenuItem value={0}>By ID</MenuItem>
                <MenuItem value={1}>By Version</MenuItem>
              </Select>
            </FormControl>
            <OutlinedButton
              ref={serviceClick}
              sx={{
                mt: '16px !important',
                width: '84px',
                height: '32px',
              }}
              onClick={handleSearchClick}
            >
              Search
            </OutlinedButton>
          </Stack>
        ) : (
          <Stack direction='row' spacing={1}>
            <Stack>
              <SmallLightFont>Query</SmallLightFont>
              <FormControl>
                <Input
                  id='my-input'
                  aria-describedby='my-helper-text'
                  value={queryContent}
                  onChange={handleInputChange}
                  error={emptyError}
                />
                {emptyError ? (
                  <FormHelperText
                    sx={{
                      m: '3px 0px 0px 0px',
                      color: 'red',
                    }}
                  >
                    This field is required.
                  </FormHelperText>
                ) : (
                  <FormHelperText
                    sx={{
                      m: '3px 0px 0px 0px',
                    }}
                  >
                    Please enter interface id.
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
            <OutlinedButton
              ref={interfaceClick}
              sx={{
                mt: '16px !important',
                width: '84px',
                height: '32px',
              }}
              onClick={handleInterfaceSearchClick}
            >
              Search
            </OutlinedButton>
          </Stack>
        )}
      </Stack>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label='basic tabs example'
        >
          <Tab label='基于服务的依赖查询' {...a11yProps(0)} />
          <Tab label='基于接口的依赖查询' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabValue} index={0}>
        <Box>
          <Stack direction={direction} spacing={2}>
            {nodes.length !== 0 ? (
              <ThreeLayerCanvas
                nodes={nodes}
                links={links}
                handleNodeClick={handleNodeClick}
                handleLinkClick={handleLinkClick}
              />
            ) : (
              <></>
            )}
            <Stack direction='column' spacing={1}>
              {exactService !== null ? (
                <ServiceInfoBlock
                  data={exactService}
                  mode={mode}
                  page={SERVICE_DEPENDENCY}
                  cb={() => {
                    setParamChange(paramChange + 1);
                  }}
                  init={resizeFunc}
                />
              ) : (
                <></>
              )}
              {clickedLink !== null ? (
                <InvokeInfoBlock data={clickedLink} init={resizeFunc}/>
              ) : (
                <></>
              )}
            </Stack>
          </Stack>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <Box>
          <Stack direction={direction} spacing={2}>
            {inodes.length !== 0 ? (
              <EdgeCenterCanvas
                nodes={inodes}
                links={ilinks}
                handleNodeClick={handleInterfaceNodeClick}
                handleLinkClick={handleInterfaceLinkClick}
              />
            ) : (
              <></>
            )}
            <Stack direction='column' spacing={1}>
              {exactService !== null ? (
                <ServiceInfoBlock
                  data={exactService}
                  mode={0}
                  page={INTERFACE_DEPENDENCY}
                  cb={() => {
                    setParamChange(paramChange + 1);
                  }}
                  init={resizeFunc}
                />
              ) : (
                <></>
              )}
              {clickedLink !== null ? (
                <InvokeInfoBlock data={clickedLink} init={resizeFunc}/>
              ) : (
                <></>
              )}
            </Stack>
          </Stack>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}

export default ServiceDependency;

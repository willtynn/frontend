import React from "react";
import { useState, useEffect, useRef } from "react";
import { ThreeLayerCanvas, EdgeCenterCanvas } from "./canvas";
import { useDispatch, useSelector } from "react-redux";
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
  Typography
} from "@mui/material"
import { 
  SmallLightFont,
  SuperLargeBoldFont
} from "@/components/Fonts";
import { OutlinedButton } from "@/components/Button";
import {
  UPDATE_SERVICE_DEPENDENCY,
  UPDATE_SEARCH_SERVICE,
  UPDATE_INTERFACE_DEPENDENCY
} from "@/actions/serviceAction";
import ServiceInfoBlock from "../module/ServiceInfoBlock";
import InvokeInfoBlock from "../module/InvokeInfoBlock";
import { fakeInfo } from "../query";
import PropTypes from 'prop-types';
import { 
  SERVICE_DEPENDENCY,
  INTERFACE_DEPENDENCY
} from "../module/ServiceInfoBlock";
import { useParams, useSearchParams, useLocation } from "react-router-dom";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
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

const data = {
  invoked: [
    {
      id: "service_a",
      invoke_info: {
        interface_id: "interface_a",
        path: "test_service/interface_1",
        time: "2023-07-24 16:00:00"
      }
    },
    {
      id: "service_b",
      invoke_info: {
        interface_id: "interface_b",
        path: "test_service/interface_1",
        time: "2023-07-24 16:10:00"
      }
    }
  ],
  invoking: [
    {
      id: "service_c",
      invoke_info: {
        interface_id: "interface_c",
        path: "service_c/interface_1",
        time: "2023-07-24 16:20:00"
      }
    },
    {
      id: "service_d",
      invoke_info: {
        interface_id: "interface_d",
        path: "service_d/interface_1",
        time: "2023-07-24 16:30:00"
      }
    }
  ]
}

const interface_data = [
  {
    source: "service_a",
    target: "service_d",
    invoke_info: {
      interface_id: "interface_1",
      path: "service_c/interface_1",
      time: "2023-07-24 16:20:00"
    }
  },
  {
    source: "service_b",
    target: "service_d",
    invoke_info: {
      interface_id: "interface_2",
      path: "service_c/interface_1",
      time: "2023-07-24 16:20:00"
    }
  },
  {
    source: "service_c",
    target: "service_e",
    invoke_info: {
      interface_id: "interface_3",
      path: "service_c/interface_1",
      time: "2023-07-24 16:20:00"
    }
  },
  {
    source: "service_d",
    target: "service_f",
    invoke_info: {
      interface_id: "interface_4",
      path: "service_c/interface_1",
      time: "2023-07-24 16:20:00"
    }
  },
  {
    source: "service_e",
    target: "service_f",
    invoke_info: {
      interface_id: "interface_5",
      path: "service_c/interface_1",
      time: "2023-07-24 16:20:00"
    }
  },
  {
    source: "service_f",
    target: "service_g",
    invoke_info: {
      interface_id: "interface_6",
      path: "service_c/interface_1",
      time: "2023-07-24 16:20:00"
    }
  },
  {
    source: "service_g",
    target: "service_h",
    invoke_info: {
      interface_id: "interface_7",
      path: "service_c/interface_1",
      time: "2023-07-24 16:20:00"
    }
  },
  {
    source: "service_g",
    target: "service_i",
    invoke_info: {
      interface_id: "interface_8",
      path: "service_c/interface_1",
      time: "2023-07-24 16:20:00"
    }
  },
]



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
  const [queryContent, setQueryContent] = useState("");
  const [emptyError, setEmptyError] = useState(false);
  const [clickedLink, setClickedLink] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const [searchParams] = useSearchParams();
  const [paramChange, setParamChange] = useState(0);
  
  const dispatch = useDispatch();

  const serviceClick = useRef();
  const interfaceClick = useRef();

  const {
    queryResult,
    serviceDependency,
    interfaceDependency
  } = useSelector(state => {
    return {
      queryResult: state.Service.queryResult,
      serviceDependency: state.Service.serviceDependency,
      interfaceDependency: state.Service.interfaceDependency,
    };
  });

  useEffect(() => {
    const type = searchParams.get("type");
    const by = searchParams.get("by");
    const target_id = searchParams.get("id");
    // if(!type)
    if(type === "service") {
      setTabValue(0);
      if(Number(by) === 0) {
        setMode(0)
        setQueryContent(target_id)
        setTimeout(() => {
          serviceClick.current.click();
        }, 300)
        
      } else if(Number(by) === 1) {
        setMode(1)
      }
    } else if(type === "interface") {
      setTabValue(1);
      setQueryContent(target_id);
      setTimeout(() => {
        interfaceClick.current.click();
      }, 300)
    }

  }, [paramChange]);

  useEffect(() => {
    if (serviceDependency) {
      transformServiceData("test_service", serviceDependency);
    }
  }, [serviceDependency]);

  useEffect(() => {
    if (interfaceDependency) {
      tranformInterfaceData("interface_6", interfaceDependency);
    }
  }, [interfaceDependency])

  const handleTabChange = (event, newValue) => {
    dispatch({ type: UPDATE_SEARCH_SERVICE, data: null });
    dispatch({ type: UPDATE_SERVICE_DEPENDENCY, data: null });
    dispatch({ type: UPDATE_INTERFACE_DEPENDENCY, data: null });
    setClickedLink(null);
    setNodes([]);
    setLinks([]);
    setInodes([]);
    setIlinks([]);

    setTabValue(newValue);
  };

  const transformServiceData = (id, data) => {
    let nodes = []
    let links = []
    nodes.push(
      {
        id: id,
        label: id,
        type: "target"
      }
    )
    nodes = nodes.concat(data.invoked.map(
      (item, index) => {
        return {
          id: item.id,
          label: item.id,
          type: "invoked"
        }
      }
    ))
    nodes = nodes.concat(data.invoking.map(
      (item, index) => {
        return {
          id: item.id,
          label: item.id,
          type: "invoking"
        }
      }
    ))
    links = links.concat(data.invoked.map(
      (item, index) => {
        return {
          source: item.id,
          target: id,
          invoke_info: item.invoke_info
        }
      }
    ))
    links = links.concat(data.invoking.map(
      (item, index) => {
        return {
          source: id,
          target: item.id,
          invoke_info: item.invoke_info
        }
      }
    ))
    setNodes(nodes)
    setLinks(links)
  }

  const tranformInterfaceData = (id, data) => {
    let tmpNodes = []
    let nodes = []
    let links = []
    for (const link of data) {
      tmpNodes.push(link.source);
      tmpNodes.push(link.target);
      if (id === link.invoke_info.interface_id) {
        links.push(
          {
            source: link.source,
            target: link.target,
            invoke_info: link.invoke_info,
            center: true
          }
        )
      } else {
        links.push(
          {
            source: link.source,
            target: link.target,
            invoke_info: link.invoke_info
          }
        )
      }

    }
    tmpNodes = new Set(tmpNodes);
    for (const tmpNode of tmpNodes) {
      nodes.push({
        id: tmpNode,
        label: tmpNode
      })
    }
    setInodes(nodes)
    setIlinks(links)
  }

  const handleChange = (event) => {
    setMode(event.target.value);
  };

  const handleInputChange = (event) => {
    setQueryContent(event.target.value);
    if (event.target.value !== "") {
      setEmptyError(false);
    }
  }

  const handleSearchClick = (e) => {
    if (!queryContent || queryContent === "") {
      setEmptyError(true);
      return;
    }
    dispatch({ type: UPDATE_SERVICE_DEPENDENCY, data: data });
  }

  const handleInterfaceSearchClick = (e) => {
    if (!queryContent || queryContent === "") {
      setEmptyError(true);
      return;
    }
    dispatch({ type: UPDATE_INTERFACE_DEPENDENCY, data: interface_data });
  }

  const handleNodeClick = (id) => {
    dispatch({ type: UPDATE_SEARCH_SERVICE, data: fakeInfo });
  }

  const handleLinkClick = (data) => {
    setClickedLink(data)
  }

  const handleInterfaceNodeClick = (id) => {
    dispatch({ type: UPDATE_SEARCH_SERVICE, data: fakeInfo });
  }

  const handleInterfaceLinkClick = (data) => {
    setClickedLink(data)
  }


  return (
    <Box sx={{ 
      width: '100%',
      minHeight: "800px",
      m: "16px"
    }}>
      <SuperLargeBoldFont sx={{
        mb: "12px",
        ml: "12px"
      }}>
        服务依赖
      </SuperLargeBoldFont>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="基于服务的依赖查询" {...a11yProps(0)} />
          <Tab label="基于接口的依赖查询" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabValue} index={0}>
        <Box>
          <Stack direction="row" spacing={1}>
            <Stack>
              <SmallLightFont>
                Query
              </SmallLightFont>
              <FormControl>
                <Input
                  id="my-input"
                  aria-describedby="my-helper-text"
                  value={queryContent}
                  onChange={handleInputChange}
                  error={emptyError}
                />
                {
                  !emptyError && mode === 1
                    ?
                    <FormHelperText
                      sx={{
                        m: "3px 0px 0px 0px"
                      }}
                    >
                      Version Format should be "xx.xx.xx".
                    </FormHelperText>
                    :
                    <></>
                }
                {
                  emptyError
                    ?
                    <FormHelperText
                      sx={{
                        m: "3px 0px 0px 0px",
                        color: "red"
                      }}
                    >
                      This field is required.
                    </FormHelperText>
                    :
                    <></>
                }

              </FormControl>
            </Stack>
            <FormControl variant="standard">
              <InputLabel
                id="service_search_mode_label"
                sx={{
                  color: 'var(--gray-500, #596A7C)',
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                }}
              >
                Search Mode
              </InputLabel>
              <Select
                labelId="service_search_mode_label"
                id="service_search_mode"
                value={mode}
                onChange={handleChange}
                sx={{
                  minWidth: "120px"
                }}
              >
                <MenuItem value={0}>By ID</MenuItem>
                <MenuItem value={1}>By Version</MenuItem>
              </Select>
            </FormControl>
            <OutlinedButton
              ref={serviceClick}
              sx={{
                mt: "16px !important",
                width: "84px",
                height: "32px"
              }}
              onClick={handleSearchClick}
            >
              Search
            </OutlinedButton>
          </Stack>
          {
            (nodes.length !== 0)
              ?
              <ThreeLayerCanvas nodes={nodes} links={links} handleNodeClick={handleNodeClick} handleLinkClick={handleLinkClick} />
              :
              <></>
          }
          {
            queryResult !== null
              ?
              <ServiceInfoBlock data={queryResult} mode={mode} page={SERVICE_DEPENDENCY} cb={()=>{setParamChange(paramChange + 1)}} />
              :
              <></>
          }
          {
            clickedLink !== null
              ?
              <InvokeInfoBlock data={clickedLink} />
              :
              <></>
          }
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <Box>
          <Stack direction="row" spacing={1}>
            <Stack>
              <SmallLightFont>
                Query
              </SmallLightFont>
              <FormControl>
                <Input
                  id="my-input"
                  aria-describedby="my-helper-text"
                  value={queryContent}
                  onChange={handleInputChange}
                  error={emptyError}
                />
                {
                  emptyError
                    ?
                    <FormHelperText
                      sx={{
                        m: "3px 0px 0px 0px",
                        color: "red"
                      }}
                    >
                      This field is required.
                    </FormHelperText>
                    :
                    <FormHelperText
                      sx={{
                        m: "3px 0px 0px 0px"
                      }}
                    >
                      Please enter interface id.
                    </FormHelperText>
                }

              </FormControl>
            </Stack>
            <OutlinedButton
              ref={interfaceClick}
              sx={{
                mt: "16px !important",
                width: "84px",
                height: "32px"
              }}
              onClick={handleInterfaceSearchClick}
            >
              Search
            </OutlinedButton>
          </Stack>
          {
            (inodes.length !== 0)
              ?
              <EdgeCenterCanvas nodes={inodes} links={ilinks} handleNodeClick={handleInterfaceNodeClick} handleLinkClick={handleInterfaceLinkClick} />
              :
              <></>
          }
          {
            queryResult !== null
              ?
              <ServiceInfoBlock data={queryResult} mode={0} page={INTERFACE_DEPENDENCY} cb={()=>{setParamChange(paramChange + 1)}}/>
              :
              <></>
          }
          {
            clickedLink !== null
              ?
              <InvokeInfoBlock data={clickedLink} />
              :
              <></>
          }
        </Box>
      </CustomTabPanel>
    </Box>

  );
}

export default ServiceDependency;
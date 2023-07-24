import React from "react";
import { useState, useEffect } from "react";
import { Canvas } from "./canvas";
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
  Button
} from "@mui/material"
import { SmallLightFont } from "@/components/Fonts";
import { OutlinedButton } from "@/components/Button";
import {
  UPDATE_SERVICE_DEPENDENCY,
  UPDATE_SEARCH_SERVICE
} from "@/actions/serviceAction";
import ServiceInfoBlock from "../module/ServiceInfoBlock";
import InvokeInfoBlock from "../module/InvokeInfoBlock";
import { fakeInfo } from "../query";

const data = {
  invoked: [
    {
      id: "service_a",
      invoke_info: {
        time: "2023-07-24 16:00:00"
      }
    },
    {
      id: "service_b",
      invoke_info: {
        time: "2023-07-24 16:10:00"
      }
    }
  ],
  invoking: [
    {
      id: "service_c",
      invoke_info: {
        time: "2023-07-24 16:20:00"
      }
    },
    {
      id: "service_d",
      invoke_info: {
        time: "2023-07-24 16:30:00"
      }
    }
  ]
}



function ServiceDependency() {

  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [mode, setMode] = useState(0);
  const [queryContent, setQueryContent] = useState("");
  const [emptyError, setEmptyError] = useState(false);
  const [clickedLink, setClickedLink] = useState(null);


  const dispatch = useDispatch();

  const {
    queryResult,
    serviceDependency
  } = useSelector(state => {
    return {
      queryResult: state.Service.queryResult,
      serviceDependency: state.Service.serviceDependency,
    };
  });

  useEffect(() => {
    if (serviceDependency) {
      transformData("test_service", serviceDependency);
    }
  }, [serviceDependency]);

  const transformData = (id, data) => {
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

  const handleNodeClick = (id) => {
    dispatch({ type: UPDATE_SEARCH_SERVICE, data: fakeInfo });
  }

  const handleLinkClick = (data) => {
    setClickedLink(data)
  }


  return (
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
      <Canvas nodes={nodes} links={links} handleNodeClick={handleNodeClick} handleLinkClick={handleLinkClick} />
      {
        queryResult !== null
          ?
          <ServiceInfoBlock data={queryResult} />
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
  );
}

export default ServiceDependency;
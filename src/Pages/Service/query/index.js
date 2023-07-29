import {
  useState,
  useEffect,
} from "react"
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
  Button
} from "@mui/material"
import {
  SmallLightFont,
  SuperLargeBoldFont,
} from "@/components/Fonts";
import { OutlinedButton } from "@/components/Button";
import { UPDATE_SEARCH_SERVICE } from "@/actions/serviceAction";
import ServiceInfoBlock from "../module/ServiceInfoBlock";
import { QUERY } from "../module/ServiceInfoBlock";
import ServiceOverview from "../module/Overview";

export const fakeInfo = {
  id: "aaa",
  name: "service_a",
  repo: "https://github.com/aaa/service_a",
  imageUrl: "https://github.com/aaa/service_a",
  version: {
    major: "1",
    minor: "2",
    patch: "3"
  },
  interfaces: [
    {
      id: "interface_1",
      path: "service_a/interface_1",
      inputSize: 123,
      outputSize: "456"
    }
  ],
  idleResource: {
    cpu: 1,
    ram: 2,
    disk: 3,
    gpuCore: 4,
    gpuMem: 5
  },
  desiredResource: {
    cpu: 1,
    ram: 2,
    disk: 3,
    gpuCore: 4,
    gpuMem: 5
  },
  desiredCapability: {
    cpu: 1,
    ram: 2,
    disk: 3,
    gpuCore: 4,
    gpuMem: 5
  }
}

export default function ServiceQuery() {

  const [mode, setMode] = useState(0);
  const [queryContent, setQueryContent] = useState("");
  const [emptyError, setEmptyError] = useState(false);

  const dispatch = useDispatch();

  const {
    queryResult
  } = useSelector(state => {
    return {
      queryResult: state.Service.queryResult,
    };
  });

  useEffect(() => {
    return () => dispatch({ type: UPDATE_SEARCH_SERVICE, data: null });
  }, [])

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
    dispatch({ type: UPDATE_SEARCH_SERVICE, data: fakeInfo });
  }

  return (
    <Box sx={{
      minHeight: "800px",
      m: "16px 32px 0px 32px"
    }}>
      <SuperLargeBoldFont
        sx={{
          mb: "16px"
        }}
      >
        服务查询
      </SuperLargeBoldFont>
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
      <Stack direction="row" spacing={4} sx={{
        mt: "24px"
      }}>
        <Box sx={{
          maxWidth: queryResult === null ? "100%" : "50%"
        }}>
        <ServiceOverview />
        </Box>

        {
          queryResult === null
            ?
            <></>
            :
            <ServiceInfoBlock data={queryResult} mode={mode} page={QUERY} />
        }
      </Stack>
    </Box>
  )
}

import { useState, useEffect } from 'react';
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
} from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { SmallLightFont, SuperLargeBoldFont } from '@/components/Fonts';
import { OutlinedButton } from '@/components/Button';
import { UPDATE_SEARCH_SERVICE } from '@/actions/serviceAction';
import ServiceInfoBlock from '../module/ServiceInfoBlock';
import { QUERY } from '../module/ServiceInfoBlock';
import ServiceOverview from '../module/Overview';
import {
  searchServiceById,
  searchServiceByVersion,
} from '@/actions/serviceAction';
import { checkVersionFormat } from '@/utils/commonUtils';
import { fontFamily } from "@/utils/commonUtils";

export const fakeInfo = [
  {
    id: 'aaa',
    name: 'service_a',
    repo: 'https://github.com/aaa/service_a',
    imageUrl: 'https://github.com/aaa/service_a',
    version: {
      major: '1',
      minor: '2',
      patch: '3',
    },
    interfaces: [
      {
        id: 'interface_1',
        path: 'service_a/interface_1',
        inputSize: 123,
        outputSize: '456',
      },
    ],
    idleResource: {
      cpu: 1,
      ram: 2,
      disk: 3,
      gpuCore: 4,
      gpuMem: 5,
    },
    desiredResource: {
      cpu: 1,
      ram: 2,
      disk: 3,
      gpuCore: 4,
      gpuMem: 5,
    },
    desiredCapability: 39,
    // desiredCapability: {
    //   cpu: 1,
    //   ram: 2,
    //   disk: 3,
    //   gpuCore: 4,
    //   gpuMem: 5
    // }
  },
  {
    id: 'bbb',
    name: 'service_b',
    repo: 'https://github.com/aaa/service_a',
    imageUrl: 'https://github.com/aaa/service_a',
    version: {
      major: '1',
      minor: '2',
      patch: '3',
    },
    interfaces: [
      {
        id: 'interface_1',
        path: 'service_a/interface_1',
        inputSize: 123,
        outputSize: '456',
      },
    ],
    idleResource: {
      cpu: 1,
      ram: 2,
      disk: 3,
      gpuCore: 4,
      gpuMem: 5,
    },
    desiredResource: {
      cpu: 1,
      ram: 2,
      disk: 3,
      gpuCore: 4,
      gpuMem: 5,
    },
    desiredCapability: 39,
    // desiredCapability: {
    //   cpu: 1,
    //   ram: 2,
    //   disk: 3,
    //   gpuCore: 4,
    //   gpuMem: 5
    // }
  },
  {
    id: 'ccc',
    name: 'service_c',
    repo: 'https://github.com/aaa/service_a',
    imageUrl: 'https://github.com/aaa/service_a',
    version: {
      major: '1',
      minor: '2',
      patch: '3',
    },
    interfaces: [
      {
        id: 'interface_1',
        path: 'service_a/interface_1',
        inputSize: 123,
        outputSize: '456',
      },
    ],
    idleResource: {
      cpu: 1,
      ram: 2,
      disk: 3,
      gpuCore: 4,
      gpuMem: 5,
    },
    desiredResource: {
      cpu: 1,
      ram: 2,
      disk: 3,
      gpuCore: 4,
      gpuMem: 5,
    },
    desiredCapability: 39,
    // desiredCapability: {
    //   cpu: 1,
    //   ram: 2,
    //   disk: 3,
    //   gpuCore: 4,
    //   gpuMem: 5
    // }
  },
  {
    id: 'ddd',
    name: 'service_d',
    repo: 'https://github.com/aaa/service_a',
    imageUrl: 'https://github.com/aaa/service_a',
    version: {
      major: '1',
      minor: '2',
      patch: '3',
    },
    interfaces: [
      {
        id: 'interface_1',
        path: 'service_a/interface_1',
        inputSize: 123,
        outputSize: '456',
      },
    ],
    idleResource: {
      cpu: 1,
      ram: 2,
      disk: 3,
      gpuCore: 4,
      gpuMem: 5,
    },
    desiredResource: {
      cpu: 1,
      ram: 2,
      disk: 3,
      gpuCore: 4,
      gpuMem: 5,
    },
    desiredCapability: 39,
    // desiredCapability: {
    //   cpu: 1,
    //   ram: 2,
    //   disk: 3,
    //   gpuCore: 4,
    //   gpuMem: 5
    // }
  },
  {
    id: 'aaa',
    name: 'service_a',
    repo: 'https://github.com/aaa/service_a',
    imageUrl: 'https://github.com/aaa/service_a',
    version: {
      major: '1',
      minor: '2',
      patch: '3',
    },
    interfaces: [
      {
        id: 'interface_1',
        path: 'service_a/interface_1',
        inputSize: 123,
        outputSize: '456',
      },
    ],
    idleResource: {
      cpu: 1,
      ram: 2,
      disk: 3,
      gpuCore: 4,
      gpuMem: 5,
    },
    desiredResource: {
      cpu: 1,
      ram: 2,
      disk: 3,
      gpuCore: 4,
      gpuMem: 5,
    },
    desiredCapability: 39,
    // desiredCapability: {
    //   cpu: 1,
    //   ram: 2,
    //   disk: 3,
    //   gpuCore: 4,
    //   gpuMem: 5
    // }
  },
  {
    id: 'aaa',
    name: 'service_a',
    repo: 'https://github.com/aaa/service_a',
    imageUrl: 'https://github.com/aaa/service_a',
    version: {
      major: '1',
      minor: '2',
      patch: '3',
    },
    interfaces: [
      {
        id: 'interface_1',
        path: 'service_a/interface_1',
        inputSize: 123,
        outputSize: '456',
      },
    ],
    idleResource: {
      cpu: 1,
      ram: 2,
      disk: 3,
      gpuCore: 4,
      gpuMem: 5,
    },
    desiredResource: {
      cpu: 1,
      ram: 2,
      disk: 3,
      gpuCore: 4,
      gpuMem: 5,
    },
    desiredCapability: 39,
    // desiredCapability: {
    //   cpu: 1,
    //   ram: 2,
    //   disk: 3,
    //   gpuCore: 4,
    //   gpuMem: 5
    // }
  },
];

export default function ServiceQuery() {
  const [mode, setMode] = useState(0);
  const [queryContent, setQueryContent] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [versionFormatError, setVersionFormatError] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [serviceName, setServiceName] = useState('');

  const dispatch = useDispatch();

  const { queryResult } = useSelector(state => {
    return {
      queryResult: state.Service.queryResult,
    };
  });

  useEffect(() => {
    dispatch(searchServiceById(""));
    // dispatch({ type: UPDATE_SEARCH_SERVICE, data: fakeInfo });
    return () => dispatch({ type: UPDATE_SEARCH_SERVICE, data: null });
  }, []);

  useEffect(() => {
    if (queryResult !== null && queryResult.length > 0) {
      setSelectedIndex(0);
    }
  }, [queryResult]);

  const handleChange = event => {
    setVersionFormatError(false);
    setMode(event.target.value);
  };

  const handleInputChange = event => {
    setQueryContent(event.target.value);
    setVersionFormatError(false);
  };

  const handleServiceNameChange = event => {
    setServiceName(event.target.value);
  };

  const handleSearchClick = e => {
    // if (!queryContent || queryContent === "") {
    //   setEmptyError(true);
    //   return;
    // }
    if (mode === 0) {
      dispatch(searchServiceById(queryContent));
    } else {
      const version = checkVersionFormat(queryContent);
      if (!version) {
        setVersionFormatError(true);
        return;
      }
      dispatch(searchServiceByVersion(serviceName, version));
    }
    setSelectedIndex(-1);
  };

  return (
    // <BrowserRouter>
      <Box
        sx={{
          minHeight: '800px',
          m: '16px 32px 0px 32px',
        }}
      >
        <Stack direction='row' spacing={2}>
          <SuperLargeBoldFont
            sx={{
              ml: '12px',
              fontSize: '32px !important',
              lineHeight: '54px !important',
            }}
          >
            服务查询
          </SuperLargeBoldFont>
        </Stack>
        <Stack
          direction='row'
          spacing={4}
          sx={{
            mt: '24px',
          }}
        >
          {queryResult === null ? (
            <></>
          ) : (
            <Box
              sx={{
                // maxWidth: queryResult === null ? '100%' : '47.5%',
                maxWidth: '100%',
              }}
            >
              {/* 表格主体 */}
              <ServiceOverview data={fakeInfo} setIndex={setSelectedIndex} selectedIndex={selectedIndex} />
              {/* <ServiceOverview data={queryResult} setIndex={setSelectedIndex} selectedIndex={selectedIndex}/> */}
            </Box>
          )}
          {queryResult === null ||
            queryResult.length === 0 ||
            selectedIndex === -1 ? (
            <></>
          ) : (
            <Box sx={{
              maxWidth: '47.5%',
            }}>
              {/* <ServiceInfoBlock
            data={queryResult[selectedIndex]}
            mode={mode}
            page={QUERY}
          /> */}
            </Box>
          )}
        </Stack>
      </Box>
  );
}

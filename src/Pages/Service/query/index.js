import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Stack,
  Typography
} from '@mui/material';
import { UPDATE_SEARCH_SERVICE, UPDATE_EXACT_SERVICE } from '@/actions/serviceAction';
import ServiceInfoBlock from '../module/ServiceInfoBlock';
import { QUERY } from '../module/ServiceInfoBlock';
import ServiceOverview from '../module/Overview';
import {
  searchServiceById,
  searchServiceByVersion,
} from '@/actions/serviceAction';
import { checkVersionFormat } from '@/utils/commonUtils';
import { fontFamily } from '@/utils/commonUtils';
import { useIntl } from 'react-intl';
import GeneralService from '@/assets/GeneralService.svg';

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
  const intl = useIntl();

  const dispatch = useDispatch();

  const { queryResult } = useSelector(state => {
    return {
      queryResult: state.Service.queryResult,
    };
  });

  useEffect(() => {
    dispatch(searchServiceById(''));
    // dispatch({ type: UPDATE_SEARCH_SERVICE, data: fakeInfo });
    return () => {
      dispatch({ type: UPDATE_SEARCH_SERVICE, data: null })
      dispatch({ type: UPDATE_EXACT_SERVICE, data: null })
    };
    
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
          <GeneralService />
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
              服务
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
              {intl.messages['serviceOverview.serviceDescription']}
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Stack
        direction='row'
        spacing={4}
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
            <ServiceOverview
              data={queryResult}
              setIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
            />
            {/* <ServiceOverview data={queryResult} setIndex={setSelectedIndex} selectedIndex={selectedIndex}/> */}
          </Box>
        )}
        {queryResult === null ||
        queryResult.length === 0 ||
        selectedIndex === -1 ? (
          <></>
        ) : (
          <Box
            sx={{
              maxWidth: '47.5%',
            }}
          >
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

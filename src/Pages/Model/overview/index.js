import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Stack,
  Typography
} from '@mui/material';
import { UPDATE_SEARCH_SERVICE } from '@/actions/modelAction';
import ModelOverview from '../module/Overview';
import {
  searchModelByName
} from '@/actions/modelAction';
import { useIntl } from 'react-intl';
import GeneralService from '@/assets/GeneralService.svg';
import Upload from '../module/Upload'

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
      queryResult: state.Model.queryResult,
    };
  });

  useEffect(() => {
    dispatch(searchModelByName(''));
    // dispatch({ type: UPDATE_SEARCH_SERVICE, data: fakeInfo });
    return () => {
      dispatch({ type: UPDATE_SEARCH_SERVICE, data: null })
    };
    
  }, []);

  useEffect(() => {
    if (queryResult !== null && queryResult.length > 0) {
      setSelectedIndex(0);
    }
  }, [queryResult]);

  return (
    // <BrowserRouter>
    <Box
      sx={{
        minHeight: '1000px',
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
              模型
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
              {intl.messages['modelOverview.description']}
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
            <ModelOverview
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
              maxWidth: '80%',
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

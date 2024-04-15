import { Box } from '@mui/material';
import { Tabs } from '@mui/base/Tabs';
import { StyledTab, StyledTabsList, StyledTabPanel } from '@/components/Tab';
import Information from './DetailBlocks/Information';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { UPDATE_CURRENT_SCHEME } from '../../../../actions/schemeAction';


export function DetailInfo(props) {
  const { currentScheme } = useSelector(state => {
    return {
      currentScheme: state.Scheme.currentScheme,
    };
  });
  const dispatch = useDispatch();
  const intl = useIntl();

  return (
    <Box
      sx={{
        width: 'calc(100% - 380px)',
        height: '300px',
      }}
    >
      <Tabs defaultValue={1}>
        <StyledTabsList>
          <StyledTab value={1}>
            {intl.messages['common.detailedInfo']}
          </StyledTab>
        </StyledTabsList>
        <StyledTabPanel value={1}>
          <Information scheme={currentScheme && currentScheme.scheme} />
        </StyledTabPanel>
      </Tabs>
      {/* </Stack> */}
    </Box>
  );
}

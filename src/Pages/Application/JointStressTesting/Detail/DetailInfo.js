import { Box } from '@mui/material';
import { Tabs } from '@mui/base/Tabs';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { StyledTab, StyledTabsList, StyledTabPanel } from '@/components/Tab';
import { useSelector } from 'react-redux';
import { Information } from './DetailBlocks/Information';
import { TestResult } from './DetailBlocks/TestResult';
import { AggregateReportEnhance } from './DetailBlocks/AggregateReport';
import { BoundaryResult } from './DetailBlocks/BoundaryResult';
import { useIntl } from 'react-intl';
import { getJointTestPlanSonById } from '@/actions/applicationAction';
import React from 'react';


export default function DetailInfo() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { jointTestPlanId } = useParams();

  useEffect(() => {
    dispatch(getJointTestPlanSonById(jointTestPlanId));
  }, []);

  const { currentJointPlanSon } = useSelector(state => {
    return {
      currentJointPlanSon: state.Application.currentJointPlanSon,
    };
  });


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
          {currentJointPlanSon && currentJointPlanSon.boundary ? (
            <>
              <StyledTab value={2}>
                {intl.messages['stressTesting.boundaryResult']}
              </StyledTab>
            </>
          ) : (
            <>
              <StyledTab value={2}>
                {intl.messages['stressTesting.testResult']}
              </StyledTab>
              <StyledTab value={3}>
                {intl.messages['stressTesting.aggregateReport']}
              </StyledTab>
            </>
          )}

        </StyledTabsList>

        <StyledTabPanel value={1}>
          <Information />
        </StyledTabPanel>

        {currentJointPlanSon && currentJointPlanSon.boundary ? (
          <>
            <StyledTabPanel value={2}>
              <BoundaryResult />
            </StyledTabPanel>
          </>
        ) : (
          <>
            <StyledTabPanel value={2}>
              <TestResult />
            </StyledTabPanel>
            <StyledTabPanel value={3}>
              <AggregateReportEnhance />
            </StyledTabPanel>
          </>
        )}
      </Tabs>
      {/* </Stack> */}
    </Box>
  );
}




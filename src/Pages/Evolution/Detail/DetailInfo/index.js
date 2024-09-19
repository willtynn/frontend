import _, { set } from "lodash";
import { useSelector,useDispatch } from "react-redux";
import { EVO_UPDATE_CURRENT_DATARESOURCE, evo_get_dataSource } from "../../../../actions/evolutionAction";
import { useEffect, useState,useLayoutEffect } from "react";
import { Box } from '@mui/material';
import { Tabs } from '@mui/base/Tabs';
import {
  StyledTab,
  StyledTabsList,
  StyledTabPanel,
} from '@/components/Tab';
import { Information } from './Information';
import { Mean } from './Mean';
import { Goal } from './Goal';
import { TriggerConfidtion } from './TriggerCondition';
import { Algorithm } from './Algorithm';
import { useIntl } from 'react-intl';
import { EvoAlgorithm } from './EvoAlgorithm';
import { DataDetail } from './DataDetail';

export default function DetailInfo() {

  const intl = useIntl();

  return (
    <Box
      sx={{
        width: 'calc(100% - 380px)',
        height: '300px',
      }}
    >
      <Tabs defaultValue={6}>
        <StyledTabsList>
          {/* //封存，暂不需要 */}
          {/* <StyledTab value={1}>{intl.messages['common.detailedInfo']}</StyledTab>
          <StyledTab value={2}>{intl.messages['evolution.evolutionGoal']}</StyledTab>
          <StyledTab value={3}>{intl.messages['evolution.triggerCondition']}</StyledTab>
          <StyledTab value={4}>{intl.messages['evolution.evolutionMean']}</StyledTab>
          <StyledTab value={5}>{intl.messages['evolution.evolutionAlgorithm']}</StyledTab> */}
          <StyledTab value={6}>{intl.messages['evolution.monitorConfiguration']}</StyledTab>
          <StyledTab value={7}>{intl.messages['evolution.algorithmDetail']}</StyledTab>
        </StyledTabsList>
        <StyledTabPanel value={1}>
          <Information />
        </StyledTabPanel>
        <StyledTabPanel value={2}>
          <Goal />
        </StyledTabPanel>
        <StyledTabPanel value={3}>
          <TriggerConfidtion />
        </StyledTabPanel>
        <StyledTabPanel value={4}>
          <Mean />
        </StyledTabPanel>
        <StyledTabPanel value={5}>
          <Algorithm />
        </StyledTabPanel>
        <StyledTabPanel value={6}>
          <DataDetail />
        </StyledTabPanel>
        <StyledTabPanel value={7}>
          <EvoAlgorithm />
        </StyledTabPanel>
      </Tabs>
    </Box>
  );
}
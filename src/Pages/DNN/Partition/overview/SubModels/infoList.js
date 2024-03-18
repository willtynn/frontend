import {
  Box,
  Stack,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { YaHeiLargeFont } from '@/components/Fonts';
import InfoCard from '@/components/InfoCard';
import { useIntl } from 'react-intl';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
// import { SELECT_INSTANCE } from '@/actions/clusterAction';
import InfoAlert from '@/assets/InfoAlert.svg';
import { fontFamily } from "@/utils/commonUtils";

const BoxForItem = styled(Box)(({ selected }) => ({
  color: '#262E35',
  fontSize: '15px',
  fontFamily: fontFamily,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '36px',
  padding: '0px 0px 0px 32px',
  cursor: 'pointer',
  height: '',
  '&:hover': {
    color: '#262E35',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  backgroundColor: selected ? 'rgba(25, 118, 210, 0.1)' : "'#FFFFFF",
}));

export function ListItem(props) {
  const { itemName } = props;


  const dispatch = useDispatch();

  // const handleClick = () => {
  //   dispatch({ type: SELECT_INSTANCE, data: itemName });
  // };

  return (
    <BoxForItem onClick={() => {}}>
      {itemName}
    </BoxForItem>
  );
}

export default function InfoList(props) {
  const { dataList, sx } = props;
  const [display, setDisplay] = useState(false);
  const intl = useIntl();

  useEffect(() => {
    setDisplay(dataList !== null && dataList !== undefined);
  }, [dataList]);

  return (
    <InfoCard title={intl.messages['subModel.title']}>
      <Box sx={sx}>
        {dataList && display ? (
          <Stack
            spacing={0.5}
            sx={{
              overflowY: 'auto',
            }}
          >
            {dataList.map((i, index) => {
              return <ListItem itemName={i.metadata.name} />;
            })}
          </Stack>
        ) : (
          <Stack
            sx={{
              pt: '160px',
            }}
            direction='row'
            spacing={2}
            alignItems='center'
            justifyContent='center'
          >
            <InfoAlert />
            <YaHeiLargeFont>
              {intl.messages['subModel.tip']}
            </YaHeiLargeFont>
          </Stack>
        )}
      </Box>
    </InfoCard>
  );
}
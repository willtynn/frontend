import {
  Stack,
} from '@mui/material';
import InfoAlert from '@/assets/InfoAlert.svg';
import { YaHeiLargeFont } from '@/components/Fonts';
import InfoCard from '@/components/InfoCard';
import { useIntl } from 'react-intl';
import React from "react";
import {NormalFont, NormalFontBlack} from "@/components/Fonts";
import {Box} from "@mui/system";

export default function ModelInfo(props) {
  const { showInfo, info } = props;
  const intl = useIntl();
  return (
    <>
      <InfoCard title={'模型信息'}>
        <Stack
          sx={{
            minHeight: '200px',

          }}
          spacing={3}
        >
          {showInfo ?
            <Stack sx={{padding: '20px'}}>
              <Box style={{justifyContent: 'center'}}>
                <Stack spacing={2}>
                  <Stack direction='row' spacing={10}>
                    <NormalFont sx={{width: '100px'}}>
                      模型ID
                    </NormalFont>
                    <NormalFontBlack>
                      {info.id}
                    </NormalFontBlack>
                  </Stack>
                  <Stack direction='row' spacing={10}>
                    <NormalFont sx={{width: '100px'}}>
                      模型名称
                    </NormalFont>
                    <NormalFontBlack>
                      {info.name}
                    </NormalFontBlack>
                  </Stack>
                  <Stack direction='row' spacing={10}>
                    <NormalFont sx={{width: '100px'}}>
                      模型路径
                    </NormalFont>
                    <NormalFontBlack>{info.file}</NormalFontBlack>
                  </Stack>
                  <Stack direction='row' spacing={10}>
                    <NormalFont sx={{width: '100px'}}>
                      模型大小(KB)
                    </NormalFont>
                    <NormalFontBlack>
                      {info.size}
                    </NormalFontBlack>
                  </Stack>
                </Stack>
              </Box>
            </Stack> :
            <Stack sx={{pt: "80px"}} direction="row" spacing={2} alignItems="center" justifyContent="center">
              <InfoAlert/>
              <YaHeiLargeFont>{'请选择一个模型'}</YaHeiLargeFont>
            </Stack>
          }
        </Stack>
      </InfoCard>
      <InfoCard title={'模型结构'}>
        <Stack
          sx={{
            minHeight: '200px',

          }}
          spacing={3}
        >
          {showInfo?
            <Stack spacing={3}>
              <iframe
                style={{
                  borderRadius: '5px',
                  border: 'none',
                }}
                height={'435px'}
                src={'http://192.168.1.104:32589/static?modelPath=/models/' + info.file}
              />
            </Stack> :
            <Stack sx={{pt: "80px"}} direction="row" spacing={2} alignItems="center" justifyContent="center">
              <InfoAlert/>
              <YaHeiLargeFont>{'请选择一个模型'}</YaHeiLargeFont>
            </Stack>
          }
        </Stack>
      </InfoCard>
    </>

  );
}
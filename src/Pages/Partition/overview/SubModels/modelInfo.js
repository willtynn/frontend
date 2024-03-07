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
    <InfoCard title={intl.messages['subModel.title']}>
      <Stack
        sx={{
          minHeight: '500px',
        }}
        spacing={3}
      >
        {showInfo ?
          <Box sx={{padding: '24px'}}>
            <div style={{ justifyContent: 'center' }}>
              <Stack spacing={2}>
                <Stack direction='row' spacing={10}>
                  <NormalFont sx={{width: '100px'}}>
                    子模型ID
                  </NormalFont>
                  <NormalFontBlack>
                    {info.id}
                  </NormalFontBlack>
                </Stack>
                <Stack direction='row' spacing={10}>
                  <NormalFont sx={{width: '100px'}}>
                    拆分策略ID
                  </NormalFont>
                  <NormalFontBlack>
                    {info.partition_id}
                  </NormalFontBlack>
                </Stack>
                <Stack direction='row' spacing={10}>
                  <NormalFont sx={{width: '100px'}}>
                    模型名称
                  </NormalFont>
                  <NormalFontBlack>
                    {info.model_name}
                  </NormalFontBlack>
                </Stack>
                <Stack direction='row' spacing={10}>
                  <NormalFont sx={{width: '100px'}}>
                    模型路径
                  </NormalFont>
                  <NormalFontBlack>{info.model_path}</NormalFontBlack>
                </Stack>
                <Stack direction='row' spacing={10}>
                  <NormalFont sx={{width: '100px'}}>
                    输入
                  </NormalFont>
                  <NormalFontBlack>
                    {info.input}
                  </NormalFontBlack>
                </Stack>
                <Stack direction='row' spacing={10}>
                  <NormalFont sx={{width: '100px'}}>
                    输出
                  </NormalFont>
                  <NormalFontBlack>
                    {info.output}
                  </NormalFontBlack>
                </Stack>
                <iframe
                  height={'470px'}
                  src={'http://192.168.1.104:32589/static?modelPath=' + info.model_path}
                />
              </Stack>
            </div>
          </Box> :
          <Stack sx={{pt: "220px"}} direction="row" spacing={2} alignItems="center" justifyContent="center">
            <InfoAlert />
            <YaHeiLargeFont>{intl.messages['subModel.tip']}</YaHeiLargeFont>
          </Stack>
        }
      </Stack>
    </InfoCard>
  );
}
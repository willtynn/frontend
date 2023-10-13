import { useState } from 'react';
import KubeNormalReturn from '@/assets/KubeNormalReturn.svg';
import KubeHoverReturn from '@/assets/KubeHoverReturn.svg';
import { Box, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { KubeTextField } from '../../../../components/Input';
import CPU from '@/assets/CPU.svg';
import Memory from '@/assets/Memory.svg';

export default function ContainerAddBlock(props) {
  const { handleReturn } = props;
  const [returnHover, setReturnHover] = useState(false);
  const intl = useIntl();

  return (
    <Box>
      <Stack direction='row' spacing={1}>
        <Box
          sx={{
            pt: '2px',
            cursor: 'pointer',
          }}
          onMouseOver={() => {
            setReturnHover(true);
          }}
          onMouseLeave={() => {
            setReturnHover(false);
          }}
          onClick={handleReturn}
        >
          {returnHover ? <KubeHoverReturn /> : <KubeNormalReturn />}
        </Box>
        <Typography
          sx={{
            fontWeight: 600,
            color: '#242e42',
            fontSize: '16px',
            lineHeight: 1.67,
          }}
        >
          添加容器
        </Typography>
      </Stack>
      <Box
        sx={{
          mt: '12px',
          borderRadius: '4px',
          backgroundColor: '#fff',
          border: '1px solid #ccd3db',
          p: '11px 16px',
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            color: '#242e42',
            fontSize: '12px',
            lineHeight: 1.67,
          }}
        >
          容器设置
        </Typography>

        <Typography
          sx={{
            fontWeight: 400,
            color: '#79879c',
            fontSize: '12px',
            lineHeight: 1.67,
          }}
        >
          {intl.messages['instance.containerConfigDescription']}
        </Typography>
        <Stack direction='row' spacing={1}>
          <Typography
            sx={{
              fontWeight: 400,
              color: '#36435c',
              fontSize: '12px',
              lineHeight: 1.67,
            }}
          >
            镜像
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              color: '#ca2621',
              fontSize: '12px',
              lineHeight: 1.67,
            }}
          >
            *
          </Typography>
        </Stack>
        <KubeTextField
          placeholder={intl.messages['instance.containerInputPlaceHolder']}
        />
        <Box
          sx={{
            padding: '12px',
            borderRadius: '4px',
            backgroundColor: '#c7deef',
            fontWeight: 400,
            color: '#3385b0',
            fontSize: '12px',
            lineHeight: 1.67,
            mt: "24px",
            mb: "12px"
          }}
        >
          {intl.messages['instance.containerResourceConfigDescription']}
        </Box>
        <Box
          sx={{
            padding: '12px',
            borderRadius: '4px',
            backgroundColor: '#f9fbfd',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: 1.67,
            p:"12px"
          }}
        >
          <Stack direction="row" spacing={2} sx={{
            height: "72px"
          }}>
            <Stack direction="row" spacing={0}>
              <Box sx={{width: "68px", p: "6px 0px 0px 16px"}}>
                <CPU />
              </Box>

              <Box sx={{width: "68px", p: "6px 0px 0px 16px"}}>
                <Memory />
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

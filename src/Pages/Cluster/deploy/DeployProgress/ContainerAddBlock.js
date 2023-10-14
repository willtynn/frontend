import { useState } from 'react';
import KubeNormalReturn from '@/assets/KubeNormalReturn.svg';
import KubeHoverReturn from '@/assets/KubeHoverReturn.svg';
import {
  Box,
  Stack,
  Typography,
  InputAdornment,
  Grid,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { useIntl } from 'react-intl';
import { KubeTextField } from '../../../../components/Input';
import CPU from '@/assets/CPU.svg';
import Memory from '@/assets/Memory.svg';
import {
  KubeEndAdornmentTextField,
  KubeSelect,
} from '../../../../components/Input';
import './ContainerAddBlock.css';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { KubeCancelButton } from '../../../../components/Button';

const protocals = [
  'GRPC',
  'HTTP',
  'HTTP2',
  'HTTPS',
  'MONGO',
  'REDIS',
  'TCP',
  'TLS',
  'UDP',
];

export function PortConfigRow(props) {
  const { protocals } = props;
  const intl = useIntl();
  return (
    <Box
      sx={{
        padding: '6px 17px 6px 17px',
        borderRadius: '60px',
        backgroundColor: '#eff4f9',
        border: '1px solid #ccd3db',
        height: "34px"
      }}
    >
      <Stack direction='row' spacing={0.75}>
        <Stack direction='row'>
          <Box
            sx={{
              mt: '-0.36px',
              p: '6px 10px',
              height: '20px',
              fontSize: '12px',
              lineHeight: '1.67',
              color: '#242e42',
              border: '1px solid #abb4be',
              backgroundColor: '#eff4f9 !important',
              borderRadius: '4px 0px 0px 4px',
              borderRight: '0px',
            }}
          >
            协议
            <Tooltip
              PopperProps={{
                sx: {
                  width: '260px',
                  '& .MuiTooltip-tooltip': {
                    backgroundColor: '#242e42',
                  },
                  '& .MuiTooltip-arrow': {
                    color: '#242e42',
                  },
                },
              }}
              title={intl.messages['instance.protocalTip']}
              placement='top'
              arrow
            >
              <span
                style={{
                  float: 'right',
                  top: '2px',
                  position: 'relative',
                  height: '12px',
                }}
              >
                <HelpOutlineIcon fontSize='10px' />
              </span>
            </Tooltip>
          </Box>
          <KubeSelect
            sx={{
              width: "150px",
              height: '32.36px',
              fontSize: '12px',
              lineHeight: '1.67',
              color: '#242e42',
            }}
            MenuProps={{ className: 'PortProtocals-List' }}
          >
            {protocals.map((value, item) => {
              return (
                <MenuItem className='PortProtocals-Item' sx={{}} value={value}>
                  {value}
                </MenuItem>
              );
            })}
          </KubeSelect>
        </Stack>

        <Stack direction='row'>
          <Box
            sx={{
              p: '6px 10px',
              height: '20px',
              fontSize: '12px',
              lineHeight: '1.67',
              color: '#242e42',
              border: '1px solid #abb4be',
              backgroundColor: '#eff4f9 !important',
              borderRadius: '4px 0px 0px 4px',
              borderRight: '0px',
              width: "45px",
            }}
          >
            名称
          </Box>
          <KubeTextField sx={{
            width: "150px",
            height: "33.36px",
            '& .MuiOutlinedInput-input.MuiInputBase-input': {
              height: "19.67px",
              borderRadius: '0px 4px 4px 0px !important',
            }
          }}/>
        </Stack>

        <Stack direction='row'>
          <Box
            sx={{
              p: '6px 10px',
              height: '20px',
              fontSize: '12px',
              lineHeight: '1.67',
              color: '#242e42',
              border: '1px solid #abb4be',
              backgroundColor: '#eff4f9 !important',
              borderRadius: '4px 0px 0px 4px',
              borderRight: '0px',
              width: "50px",
            }}
          >
            容器端口
          </Box>
          <KubeTextField sx={{
            height: "33.36px",
            width: "150px",
            '& .MuiOutlinedInput-input.MuiInputBase-input': {
              height: "19.67px",
              borderRadius: '0px 4px 4px 0px !important',
            }
          }}/>
        </Stack>
      </Stack>
      <Box sx={{
        float: "right",
        position: "relative",
        top: "-29px"
      }}
      
      >
        <DeleteOutlineIcon></DeleteOutlineIcon>
      </Box>
    </Box>
  );
}

export default function ContainerAddBlock(props) {
  const { handleReturn } = props;
  const [returnHover, setReturnHover] = useState(false);
  const intl = useIntl();

  return (
    <Box
      sx={{
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 350px)',
      }}
    >
      {/* 返回按钮和标题 */}
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
      {/* 容器设置模块 */}
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
            mt: '24px',
            mb: '12px',
          }}
        >
          {intl.messages['instance.containerResourceConfigDescription']}
        </Box>

        <Grid
          container
          // direction='row'
          spacing={0}
          sx={{
            padding: '12px',
            borderRadius: '4px',
            backgroundColor: '#f9fbfd',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: 1.67,
            p: '12px',
            // margin: "24px 0px 24px 0px",
          }}
        >
          <Grid xs={6}>
            <Stack direction='row' spacing={0}>
              <Box sx={{ width: '68px', p: '6px 0px 0px 16px' }}>
                <CPU />
              </Box>
              <Stack direction='column' spacing={1}>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontStretch: 'normal',
                      lineHeight: 1.67,
                      letterSpacing: 'normal',
                      color: '#242e42',
                    }}
                  >
                    CPU预留
                  </Typography>
                  <KubeEndAdornmentTextField
                    sx={{
                      width: '200px',
                    }}
                    placeholder='不预留'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          sx={{
                            '& p': {
                              fontSize: '12px',
                              fontWeight: 600,
                              fontStyle: 'normal',
                              fontStretch: 'normal',
                              lineHeight: 1.67,
                              letterSpacing: 'normal',
                              color: '#36435c',
                            },
                          }}
                          position='end'
                        >
                          Core
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontStretch: 'normal',
                      lineHeight: 1.67,
                      letterSpacing: 'normal',
                      color: '#242e42',
                    }}
                  >
                    CPU限制
                  </Typography>
                  <KubeEndAdornmentTextField
                    sx={{
                      width: '200px',
                    }}
                    placeholder='不限制'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          sx={{
                            '& p': {
                              fontSize: '12px',
                              fontWeight: 600,
                              fontStyle: 'normal',
                              fontStretch: 'normal',
                              lineHeight: 1.67,
                              letterSpacing: 'normal',
                              color: '#36435c',
                            },
                          }}
                          position='end'
                        >
                          Core
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={6}>
            <Stack direction='row' spacing={0}>
              <Box sx={{ width: '68px', p: '6px 0px 0px 16px' }}>
                <Memory />
              </Box>
              <Stack direction='column' spacing={1}>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontStretch: 'normal',
                      lineHeight: 1.67,
                      letterSpacing: 'normal',
                      color: '#242e42',
                    }}
                  >
                    内存预留
                  </Typography>
                  <KubeEndAdornmentTextField
                    sx={{
                      width: '200px',
                    }}
                    placeholder='不预留'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          sx={{
                            '& p': {
                              fontSize: '12px',
                              fontWeight: 600,
                              fontStyle: 'normal',
                              fontStretch: 'normal',
                              lineHeight: 1.67,
                              letterSpacing: 'normal',
                              color: '#36435c',
                            },
                          }}
                          position='end'
                        >
                          Mi
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontStretch: 'normal',
                      lineHeight: 1.67,
                      letterSpacing: 'normal',
                      color: '#242e42',
                    }}
                  >
                    内存限制
                  </Typography>
                  <KubeEndAdornmentTextField
                    sx={{
                      width: '200px',
                    }}
                    placeholder='不限制'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          sx={{
                            '& p': {
                              fontSize: '12px',
                              fontWeight: 600,
                              fontStyle: 'normal',
                              fontStretch: 'normal',
                              lineHeight: 1.67,
                              letterSpacing: 'normal',
                              color: '#36435c',
                            },
                          }}
                          position='end'
                        >
                          Mi
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* 端口设置模块 */}
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
          端口设置
        </Typography>

        <Typography
          sx={{
            fontWeight: 400,
            color: '#79879c',
            fontSize: '12px',
            lineHeight: 1.67,
          }}
        >
          {intl.messages['instance.portConfigDescription']}
        </Typography>
        <Box
          sx={{
            mt: '12px',
            padding: '12px',
            borderRadius: '4px',
            backgroundColor: '#f9fbfd',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: 1.67,
            p: '12px',
          }}
        >
          <Stack direction='column' spacing={0.5}>
            <PortConfigRow protocals={protocals} />
          </Stack>
          <Box sx={{
            mt: "12px"
          }} display="flex" justifyContent="flex-end">
            <KubeCancelButton sx={{
              border: "1px solid #ccd3db",
              backgroundColor: "#eff4f9",
              width: "96px"
            }}>
              添加端口
            </KubeCancelButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

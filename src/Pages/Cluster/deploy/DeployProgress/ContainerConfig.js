import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { KubeTransparentButton } from '@/components/Button';
import KubeAdd from '@/assets/KubeAdd.svg';
import KubeMinus from '@/assets/KubeMinus.svg';
import { KubeTextField } from '../../../../components/Input';
import Docker from '@/assets/Docker.svg';
import { useIntl } from 'react-intl';
import ContainerAddBlock from './ContainerAddBlock';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

export default function ContainerConfig(props) {
  const {
    imageUrl,
    setImageUrl,
    replicas,
    setReplicas,
    ports,
    setPorts,
    resources,
    setResources,
    showError,
    setContainerAddError,
    isConfig,
    setIsConfig,
    setShowError,
    configFinish,
    setConfigFinish,
  } = props;

  const intl = useIntl();
  const [imageUrlError, setImageUrlError] = useState(true);
  const [portsError, setPortsError] = useState([true]);
  const [resourcesError, setResourcesError] = useState(false);

  useEffect(() => {
    setContainerAddError(
      imageUrlError || portsError.includes(true) || resourcesError
    );
  }, [imageUrlError, portsError, resourcesError]);

  const handleReplicasInputChange = e => {
    setReplicas(e.target.value);
  };

  const handleMinus = () => {
    if (replicas <= 1) {
      return;
    }
    setReplicas(prevReplicas => Number(prevReplicas) - 1);
  };

  const handleAdd = () => {
    setReplicas(prevReplicas => Number(prevReplicas) + 1);
  };

  const handleContainerDelete = () => {
    setImageUrl('');
    setPorts([{ name: 'http-0', protocol: 'HTTP', containerPort: '' }]);
    setResources({
      requests: {
        cpu: '',
        memory: '',
      },
      limits: {
        cpu: '',
        memory: '',
      },
    });
    setConfigFinish(false);
  };

  const handleContainerEdit = () => {
    setShowError(false);
    setIsConfig(true);
  };

  return (
    <>
      {isConfig ? (
        <ContainerAddBlock
          handleReturn={() => {
            setShowError(false);
            setIsConfig(false);
          }}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          ports={ports}
          setPorts={setPorts}
          resources={resources}
          setResources={setResources}
          imageUrlError={imageUrlError}
          setImageUrlError={setImageUrlError}
          portsError={portsError}
          setPortsError={setPortsError}
          resourcesError={resourcesError}
          setResourcesError={setResourcesError}
          showError={showError}
          setShowError={setShowError}
          setConfigFinish={setConfigFinish}
        />
      ) : (
        <Stack spacing={1}>
          <Box
            sx={{
              borderRadius: '4px',
              backgroundColor: '#fff',
              border: '1px solid #ccd3db',
              height: '76px',
              p: '12px',
            }}
          >
            <Box
              sx={{
                borderRadius: '4px',
                backgroundColor: '#eff4f9',
                border: '1px solid #ccd3db',
                // height: "100px",
                width: '320px',
                height: '58px',
                p: '8px',
                textAlign: 'center',
              }}
            >
              <Stack spacing={1}>
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontStretch: 'normal',
                    lineHeight: 1.67,
                    letterSpacing: 'normal',
                  }}
                >
                  实例副本数量
                </Typography>
                <Stack direction='row' spacing={0}>
                  <KubeTransparentButton
                    sx={{
                      height: '32px',
                    }}
                    onClick={handleMinus}
                  >
                    <KubeMinus />
                  </KubeTransparentButton>

                  <KubeTextField
                    value={replicas}
                    onChange={handleReplicasInputChange}
                    sx={{
                      height: '32px',
                      '& .MuiOutlinedInput-input.MuiInputBase-input': {
                        textAlign: 'center',
                      },
                    }}
                  />
                  <KubeTransparentButton
                    sx={{
                      height: '32px',
                    }}
                    onClick={handleAdd}
                  >
                    <KubeAdd />
                  </KubeTransparentButton>
                </Stack>
              </Stack>
            </Box>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: 400,
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: 1.67,
                letterSpacing: 'normal',
              }}
            >
              容器
            </Typography>
            <Box
              sx={{
                borderRadius: '4px',
                backgroundColor: '#f9fbfd',
                // border: '1px solid #ccd3db',
                p: '12px',
                // height: "166px"
              }}
            >
              {configFinish ? (
                <Box
                  sx={{
                    borderRadius: '4px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #ccd3db',
                    padding: '11px 12px 11px 20px',
                    '&:hover': {
                      boxShadow: '0 4px 8px 0 rgba(36,46,66,.2)',
                    },
                  }}
                >
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    height='40px'
                  >
                    <Stack
                      direction='row'
                      justifyContent='flex-start'
                      alignItems='center'
                      spacing={2}
                    >
                      <Docker />
                      <Stack direction='row' spacing={0.5}>
                        <Box
                          sx={{
                            fontSize: '12px',
                            fontWeight: 700,
                            fontStyle: 'normal',
                            fontStretch: 'normal',
                            lineHeight: 1.67,
                            letterSpacing: 'normal',
                            color: '#242e42',
                          }}
                        >
                          镜像地址:
                        </Box>
                        <Box
                          sx={{
                            fontSize: '12px',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            fontStretch: 'normal',
                            lineHeight: 1.67,
                            letterSpacing: 'normal',
                            color: '#4C5561',
                          }}
                        >
                          {imageUrl}
                        </Box>
                      </Stack>
                    </Stack>
                    <Stack direction='row'>
                      <KubeTransparentButton
                        sx={{
                          color: '#b6c2cd !important',
                          '&:hover': {
                            color: '#324558 !important',
                          },
                        }}
                        onClick={handleContainerDelete}
                      >
                        <DeleteOutlineIcon />
                      </KubeTransparentButton>
                      <KubeTransparentButton
                        sx={{
                          color: '#b6c2cd !important',
                          '&:hover': {
                            color: '#324558 !important',
                          },
                        }}
                        onClick={handleContainerEdit}
                      >
                        <ModeEditOutlineOutlinedIcon />
                      </KubeTransparentButton>
                    </Stack>
                  </Stack>
                </Box>
              ) : (
                <Box
                  sx={{
                    borderRadius: '4px',
                    backgroundColor: '#FFFFFF',
                    border: '1px dashed #ccd3db',
                    height: '140px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0 4px 8px 0 rgba(36,46,66,.2)',
                    },
                  }}
                  onClick={handleContainerEdit}
                >
                  <Stack
                    direction='column'
                    justifyContent='center'
                    alignItems='center'
                    sx={{
                      p: '28px',
                    }}
                    spacing={0}
                  >
                    <Docker />
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: '#242e42',
                        fontSize: '12px',
                        lineHeight: 1.67,
                        pt: '8px',
                      }}
                    >
                      添加容器
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 400,
                        color: '#79879c',
                        fontSize: '12px',
                        lineHeight: 1.67,
                      }}
                    >
                      {intl.messages['instance.containerAddDescription']}
                    </Typography>
                  </Stack>
                </Box>
              )}
            </Box>
            {showError && isConfig === false ? (
              <Box
                sx={{
                  fontSize: '12px',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontStretch: 'normal',
                  lineHeight: 1.67,
                  letterSpacing: 'normal',
                  color: '#CA2621',
                  mt: '4px',
                }}
              >
                {intl.messages['instance.containerEmptyError']}
              </Box>
            ) : (
              <></>
            )}
          </Box>
        </Stack>
      )}
    </>
  );
}

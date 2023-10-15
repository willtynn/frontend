import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { KubeTransparentButton } from '@/components/Button';
import KubeAdd from '@/assets/KubeAdd.svg';
import KubeMinus from '@/assets/KubeMinus.svg';
import { KubeTextField } from '../../../../components/Input';
import Docker from '@/assets/Docker.svg';
import { useIntl } from 'react-intl';
import ContainerAddBlock from './ContainerAddBlock';

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
  } = props;

  const [isConfig, setIsConfig] = useState(false);
  const intl = useIntl();
  const [imageUrlError, setImageUrlError] = useState(false);
  const [portsError, setPortsError] = useState(false);
  const [resourcesError, setResourcesError] = useState(false);

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

  const handleContainerAdd = () => {
    setIsConfig(true);
  };

  return (
    <>
      {isConfig ? (
        <ContainerAddBlock
          handleReturn={() => {
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
                onClick={handleContainerAdd}
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
            </Box>
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
              {intl.messages['instance.imageUrlEmptyError']}
            </Box>
          </Box>
        </Stack>
      )}
    </>
  );
}

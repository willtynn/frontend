/**
 * src\Pages\Menu\ClusterSelectModal.js
 */
import { useState, useEffect, useMemo, forwardRef  } from 'react';
import { Box, Stack, InputAdornment } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { fontFamily } from '@/utils/commonUtils';
import { useIntl } from 'react-intl';
import {
  EclipseTransparentButton,
} from '@/components/Button';
import SingleCluster from '@/assets/SingleCluster.svg';
import Cluster40 from '@/assets/Cluster40.svg';
import { KubeAdornmentTextField } from '../../components/Input';
import RefreshIcon from '@mui/icons-material/Refresh';
import { searchAllClusters } from '../../actions/clusterAction';
import { useDispatch, useSelector } from 'react-redux';
import KubeSearch from '@/assets/KubeSearch.svg';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '960px',
  boxShadow: 24,
  height: 'calc(100% - 120px)',
  fontFamily: fontFamily,
};

// export default function ClusterSelectModal(props) {
const ClusterSelectModal = forwardRef((props, ref) => {
  const { handleCancelClick } = props;

  const [clusterSearchValue, setClusterSearchValue] = useState('');
  const [enter, setEnter] = useState(0);
  const dispatch = useDispatch();

  const { clusters } = useSelector(state => {
    return {
      clusters: state.Cluster.clusters
    };
  });

  const filtering = () => {
    if(clusters === null) {
      return;
    }
    const tmpClusters = JSON.parse(JSON.stringify(clusters));
    return tmpClusters.filter((cluster, index) => {
      return cluster.id.includes(clusterSearchValue);
    });
  };

  const handleSearchInputChange = e => {
    setClusterSearchValue(e.target.value);
  };

  const handleRefresh = () => {
    setClusterSearchValue('');
    dispatch(searchAllClusters());
  };

  const handleKeyDown = e => {
    if (typeof e.target.value === 'string' && e.keyCode === 13) {
      setEnter(prev => prev + 1);
    }
  };

  const handleClusterClick = () => {
    localStorage.setItem("current_cluster", "ices104");
    handleCancelClick();
  }

  const intl = useIntl();
  return (
    <Box sx={style}>
      <KubeDeploymentCard
        title={
          <Stack direction='row' alignItems='center' spacing={1.5}>
            <Cluster40 />
            <Stack direction='column'>
              <Box
                sx={{
                  fontSize: '12px',
                  fontFamily: fontFamily,
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: 1.67,
                  color: '#242E42',
                }}
              >
                {intl.messages['common.cluster']}
              </Box>
              <Box
                sx={{
                  fontSize: '12px',
                  fontFamily: fontFamily,
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 1.67,
                  color: '#79879c',
                }}
              >
                {intl.messages['menu.clusterMangementDescription']}
              </Box>
            </Stack>
          </Stack>
        }
        handleClose={handleCancelClick}
      >
        <Stack
          direction='row'
          spacing={1.5}
          justifyContent='space-between'
          sx={{
            padding: '6px 24px',
            bgcolor: '#EFF4F9',
            borderBottom: '1.5px #E9E9E9 solid',
          }}
        >
          {/* 搜索框 */}
          <KubeAdornmentTextField
            onChange={handleSearchInputChange}
            value={clusterSearchValue}
            onKeyDown={handleKeyDown}
            sx={{
              width: 'calc(100% - 60px)',
              '&.MuiFormControl-root.MuiTextField-root .MuiInputBase-root.MuiOutlinedInput-root':
                {
                  padding: '0px 0px 0px 12px !important',
                  height: '32px',
                  flexFlow: 'wrap',
                  paddingY: '4px',
                  '& input': {
                    flexGrow: 1,
                    width: '10%',
                    '&:placeholder-shown': {
                      fontWeight: '400 !important',
                      fontSize: '12px !important',
                      lineHeight: 1.67,
                    },
                  },
                  bgcolor: '#EFF4F9',
                },
              '& fieldset': {
                border: 'none !important',
              },
              '& .Mui-focused': {
                bgcolor: '#FFFFFF !important',
                border: '1px solid #79879c !important',
              },

              '& .MuiOutlinedInput-input.MuiInputBase-input': {
                fontSize: '12px',
                fontWeight: 600,
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: 1.67,
                letterSpacing: 'normal',
                color: '#36435c',
                height: '20px',
                padding: '7px 12px 7px 0px !important',
              },
              '& :hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid #79879c !important',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <KubeSearch />
                </InputAdornment>
              ),
            }}
            placeholder={intl.messages['common.searchByName']}
            inputProps={{}}
          />

          {/* 刷新按钮 */}
          <EclipseTransparentButton
            sx={{
              bgcolor: '#EFF4F9 !important',
              '&:hover': {
                bgcolor: '#f9fbfd !important',
                opacity: '1',
              },
              '& svg': {
                color: '#3d3b4f',
              },
              height: '32px',
              opacity: '0.5',
            }}
            onClick={handleRefresh}
          >
            <RefreshIcon />
          </EclipseTransparentButton>
        </Stack>
        <Box
          sx={{
            padding: '12px',
            height: 'calc(100% - 130px)',
            bgcolor: '#FFF',
          }}
        >
          <Stack
            sx={{
              padding: '12px',
              bgcolor: '#f9fbfd',
              borderRadius: '4px',
              height: 'calc(100% - 24px)',
            }}
            spacing={1.5}
          >
            {/* cluster 列表 */}
            <Stack
              sx={{
                padding: '11px 12px',
                border: '1px solid #ccd3db',
                borderRadius: '4px',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '0 4px 8px 0 rgba(36,46,66,.2)',
                },
              }}
              direction='row'
              justifyContent="space-between"
              onClick={handleClusterClick}
            >
              <Stack direction='row' spacing={1}>
                <SingleCluster />
                <Stack direction='column'>
                  <Box
                    sx={{
                      fontSize: '12px',
                      fontFamily: fontFamily,
                      fontStyle: 'normal',
                      fontWeight: 700,
                      lineHeight: 1.67,
                      color: '#242e42',
                    }}
                  >
                    ices104
                  </Box>
                  <Box
                    sx={{
                      fontSize: '12px',
                      fontFamily: fontFamily,
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 1.67,
                      color: '#79879c',
                    }}
                  >
                    The description was created...
                  </Box>
                </Stack>
              </Stack>

              <Stack direction='column'>
                  <Box
                    sx={{
                      fontSize: '12px',
                      fontFamily: fontFamily,
                      fontStyle: 'normal',
                      fontWeight: 700,
                      lineHeight: 1.67,
                      color: '#242e42',
                    }}
                  >
                    4
                  </Box>
                  <Box
                    sx={{
                      fontSize: '12px',
                      fontFamily: fontFamily,
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 1.67,
                      color: '#79879c',
                    }}
                  >
                    {intl.messages['menu.nodeNum']}
                  </Box>
                </Stack>

                <Stack direction='column'>
                  <Box
                    sx={{
                      fontSize: '12px',
                      fontFamily: fontFamily,
                      fontStyle: 'normal',
                      fontWeight: 700,
                      lineHeight: 1.67,
                      color: '#242e42',
                    }}
                  >
                    v1.24.15
                  </Box>
                  <Box
                    sx={{
                      fontSize: '12px',
                      fontFamily: fontFamily,
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 1.67,
                      color: '#79879c',
                    }}
                  >
                    {`Kubernetes ${intl.messages['common.version']}`}
                  </Box>
                </Stack>

            </Stack>
          </Stack>
        </Box>
      </KubeDeploymentCard>
    </Box>
  );
});

export default ClusterSelectModal;

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Stack,
  Tooltip,
  Table,
  TableHead,
  TableRow,
  IconButton,
  TableBody,
  InputAdornment,
} from '@mui/material';
import { SmallLightFont, SuperLargeBoldFont } from '@/components/Fonts';
import {
  OutlinedButton,
  KubeConfirmButton,
  KubeCancelButton,
} from '@/components/Button';
import { checkVersionFormat } from '@/utils/commonUtils';
import { fontFamily } from '@/utils/commonUtils';
import { KubeSimpleCard } from '../../../../components/InfoCard';
import {
  StyledTableBodyCell,
  StyledTableRowCell,
  StyledTableBox,
  StyledTableContainer,
} from '@/components/DisplayTable';
import { EclipseTransparentButton } from '../../../../components/Button';
import { KubeAdornmentTextField } from '../../../../components/Input';
import PolylineIcon from '@mui/icons-material/Polyline';
import { useNavigate, useParams } from 'react-router';
import ActivePod from '@/assets/ActivePod.svg';
import PendingPod from '@/assets/PendingPod.svg';
import FailedPod from '@/assets/FailedPod.svg';
import SucceededPod from '@/assets/SucceededPod.svg';
import KubeSearch from '@/assets/KubeSearch.svg';
import RefreshIcon from '@mui/icons-material/Refresh';
import { searchPodsByServiceName } from '../../../../actions/serviceAction';

export default function ResourceStatus(props) {
  const { service } = props;
  const [podSearchValue, setPodSearchValue] = useState('');

  const dispatch = useDispatch();

  const { pods, currrentCluster } = useSelector(state => {
    return {
      pods: state.Service.pods,
      currrentCluster: state.Cluster.currrentCluster
    };
  });

  useEffect(() => {
    dispatch(searchPodsByServiceName(currrentCluster, service.name));
  }, []);

  const handleSearchInputChange = e => {
    setPodSearchValue(e.target.value);
  };

  const handleRefresh = () => {
    dispatch(searchPodsByServiceName(service.name));
  };

  return (
    <KubeSimpleCard title='容器组'>
      <Stack direction='row' spacing={1.5} justifyContent='space-between'>
        <KubeAdornmentTextField
          onChange={handleSearchInputChange}
          value={podSearchValue}
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
              border: '1px solid rgba(0, 0, 0, 0.23) !important',
            },
            '& .Mui-focused': {
              bgcolor: '#FFFFFF !important',
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
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <KubeSearch />
              </InputAdornment>
            ),
          }}
          placeholder='按名称搜索'
          inputProps={{}}
        />

        <EclipseTransparentButton
          sx={{
            bgcolor: '#f9fbfd !important',
            '&:hover': {
              bgcolor: '#EFF4F9 !important',
            },
            '& svg': {
              color: '#3d3b4f',
            },
            height: '32px',
          }}
          onClick={handleRefresh}
        >
          <RefreshIcon />
        </EclipseTransparentButton>
      </Stack>
      <Stack direction='column' spacing={1.5}></Stack>
    </KubeSimpleCard>
  );
}

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  KubeCancelButton,
} from '@/components/Button';
import { fontFamily } from '@/utils/commonUtils';
import DetailBG from '@/assets/DetailBG.svg';
import Service21 from '@/assets/Service21.svg';
// import EditService from '@/assets/EditService.svg';
import Delete16 from '@/assets/Delete16.svg';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { StyledPopover } from '@/components/Popover';
import { useIntl } from 'react-intl';
import { deleteDataSource, fetchAllDataSources } from '@/actions/dataSourceAction';

const labelStyle = {
  fontSize: '12px',
  fontWeight: 400,
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.67,
  letterSpacing: 'normal',
  color: '#5F708A',
  mb: '12px',
  width: '140px',
};

const valueStyle = {
  fontSize: '12px',
  fontWeight: 400,
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.67,
  letterSpacing: 'normal',
  color: '#242e42',
  mb: '12px',
  width: '184px',
  overflowWrap: 'break-word',
  wordBreak: 'break-all',
};

export default function GeneralInfo({ dataSourceName }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const intl = useIntl();
    const backText = intl.messages['dataSource.dataSourceInfo']
    const [moreOperationAnchorEl, setMoreOperationAnchorEl] = useState(null);
    const moreOperationOpen = Boolean(moreOperationAnchorEl);

    //  获取所有的数据源，并找到名称匹配的目标数据源
    const dataSourceDetail = useSelector(state =>
        state.DataSource.dataSources ? state.DataSource.dataSources.find(source => source.name === dataSourceName) : null
    );

    useEffect(() => {
        // 如果数据源信息不存在，先加载所有数据源信息
        if (!dataSourceDetail) {
            dispatch(fetchAllDataSources());
        }
    }, [dataSourceName, dataSourceDetail, dispatch]);

    const handleReturn = () => {
        navigate('/datasource/info');
    };

    // 根据数据源名称删除数据源
    const handleDelete = () => {
        dispatch(deleteDataSource(dataSourceName)).then(() => {
            navigate('/datasource/info'); //删除后返回数据源信息页面
            setMoreOperationAnchorEl(null);  // 关闭操作菜单
        });
    };

    const items = [
        // [<EditService />, '编辑数据源', () => { }],
        [<Delete16 />, '删除', handleDelete],
    ];

    const handleMoreOperation = e => {
        setMoreOperationAnchorEl(e.currentTarget);
    };


  return (
    <Stack
      direction='column'
      sx={{ position: 'relative', boxShadow: '0 4px 8px 0 rgba(36,46,66,.06)' }}
    >
      <StyledPopover
        id='service-detail-more-operation'
        open={moreOperationOpen}
        anchorEl={moreOperationAnchorEl}
        handleClose={() => setMoreOperationAnchorEl(null)}
        items={items}
        sx={{
          mt: '8px !important',
          boxShadow: 'inset 0 4px 8px 0 rgba(36,46,66,.12) !important',
        }}
        border='none'
      />
      <DetailBG />
      <Box
        style={{
          position: 'absolute',
          top: 0,
          width: '324px',
          height: '108px',
          padding: '12px',
          zIndex: 1000,
        }}
      >
        <KubeCancelButton
          sx={{
            backgroundColor: '#FFFFFF !important',
            padding: '1px 16px 1px 10px',
            border: 'none !important',
          }}
          onClick={handleReturn}
        >
          <Stack direction='row' spacing={1}>
            <NavigateBeforeIcon fontSize='small' />
            <Box
              sx={{
                fontFamily: fontFamily,
                fontSize: '12px',
                fontWeight: 600,
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: 1.67,
                letterSpacing: 'normal',
                color: '#36435C',
                '&:hover': {
                  color: '#55bc8a',
                },
              }}
            >
              {backText}
            </Box>
          </Stack>
        </KubeCancelButton>
        <Stack
          sx={{ mt: '12px' }}
          direction='row'
          spacing={1}
          alignItems='center'
        >
          <Service21 />
          <Tooltip
            PopperProps={{
              sx: {
                '& .MuiTooltip-tooltip': {
                  backgroundColor: '#242e42',
                  margin: "0 !important"
                },
              },
            }}
            title={dataSourceDetail ? dataSourceDetail.description : ''}
            placement='bottom'
          >
            <Box
              sx={{
                fontFamily: fontFamily,
                fontSize: '20px',
                fontWeight: 600,
                fontStyle: 'normal',
                fontStretch: 'normal',
                lineHeight: 1.4,
                letterSpacing: 'normal',
                color: '#36435C',
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: 'nowrap'
              }}
            >
              {dataSourceDetail ? dataSourceDetail.name : ''}
            </Box>
          </Tooltip>
        </Stack>
        <Stack
          sx={{ mt: '12px' }}
          direction='row'
          spacing={1.5}
          alignItems='center'
        >

          <KubeCancelButton
            onClick={handleMoreOperation}
            sx={{ height: '32px', minWidth: '96px' }}
          >
            <Stack direction='row' alignItems='center' justifyContent='center'>
              <Box sx={{ ml: '4px' }}>{intl.messages['common.moreOperation']}</Box>
              <ArrowDropDownIcon fontSize='small' />
            </Stack>
          </KubeCancelButton>

        </Stack>
      </Box>
      <Box
        style={{
          position: 'absolute',
          top: '132px',
          width: '330px',
          padding: '12px',
          zIndex: 1000,
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* 详情 */}
        <Box
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: '20px',
            letterSpacing: 'normal',
            color: '#2E2E42',
            mb: '12px',
          }}
        >
          {intl.messages['common.details']}
        </Box>

        {/* Key-Value Pair */}
        <Stack sx={{ margin: '6px 0px' }} direction='column' spacing={2}>
            <Stack direction='row' spacing={0.75}>
                <Box sx={labelStyle}>{intl.messages['dataSource.dataSourceName']}</Box>
                <Box sx={valueStyle}>
                {dataSourceDetail ? dataSourceDetail.name : ''}
                </Box>
            </Stack>
            <Stack direction='row' spacing={0.75}>
                <Box sx={labelStyle}>{intl.messages['dataSource.dataSourceDes']}</Box>
                <Box sx={valueStyle}>
                    {dataSourceDetail ? dataSourceDetail.description : ''}
                </Box>
            </Stack>
            <Stack direction='row' spacing={0.75}>
                <Box sx={labelStyle}>{intl.messages['dataSource.dataSourceCluster']}</Box>
                <Box sx={valueStyle}>
                    {dataSourceDetail ? dataSourceDetail.cluster : ''}
                </Box>
            </Stack>
            <Stack direction='row' spacing={0.75}>
                <Box sx={labelStyle}>{intl.messages['dataSource.dataSourceHost']}</Box>
                <Box sx={valueStyle}>
                    {dataSourceDetail ? dataSourceDetail.host : ''}
                </Box>
            </Stack>
            <Stack direction='row' spacing={0.75}>
                <Box sx={labelStyle}>{intl.messages['dataSource.dataSourceStatus']}</Box>
                <Box sx={valueStyle}>
                    {dataSourceDetail ? dataSourceDetail.status : ''}
                </Box>
            </Stack>
            <Stack direction='row' spacing={0.75}>
                <Box sx={labelStyle}>{intl.messages['dataSource.dataSourceInterval']}</Box>
                <Box sx={valueStyle}>
                    {dataSourceDetail ? dataSourceDetail.interval : ''}
                </Box>
            </Stack>
            <Stack direction='row' spacing={0.75}>
                <Box sx={labelStyle}>{intl.messages['dataSource.dataSourceLastSeen']}</Box>
                <Box sx={valueStyle}>
                    {dataSourceDetail ? dataSourceDetail.lastSeen : ''}
                </Box>
            </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

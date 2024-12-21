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
import EditService from '@/assets/EditService.svg';
import Delete16 from '@/assets/Delete16.svg';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { StyledPopover } from '@/components/Popover';
import { useIntl } from 'react-intl';
import {fetchAllAlgorithms, deleteAlgorithm} from '@/actions/algorithmAction';
import EditAlgorithm from "../../Form/edit"; // 引入EditAlgorithm
import RunAlgorithmForm from "../../Form/runAlgorithmForm";
import RefreshIcon from "@mui/icons-material/Refresh";
import * as React from "react";
import {EclipseTransparentButton} from "../../../../components/Button";
import { queryInstancesWithParams } from '@/actions/algorithmAction';


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

export default function GeneralInfo({ algorithmName }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const intl = useIntl();
    const backText = intl.messages['evolution.planningAlgorithm']
    const [moreOperationAnchorEl, setMoreOperationAnchorEl] = useState(null);
    const moreOperationOpen = Boolean(moreOperationAnchorEl);
    const handleReturn = () => {
        navigate('/evolution/planningAlgorithm');
    };
    //  获取所有的数据源，并找到名称匹配的目标数据源
    const planningAlgorithmDetail = useSelector(state =>
        state.AlgorithmReducer.allAlgorithms ? state.AlgorithmReducer.allAlgorithms.find(source => source.name === algorithmName) : null
    );

    useEffect(() => {
        // 如果数据源信息不存在，先加载所有数据源信息
        if (!planningAlgorithmDetail) {
            dispatch(fetchAllAlgorithms());
        }
    }, [algorithmName, planningAlgorithmDetail, dispatch]);

    const handleRefreshInstances = () => {
        const algorithmId = planningAlgorithmDetail?.id;
        if (algorithmId) {
            dispatch(queryInstancesWithParams({ algorithmId }));
        }
    };

    // 根据算法的 id 删除算法
    const handleDelete = () => {
        // 查找对应的算法并获取 id
        if (planningAlgorithmDetail) {
            const { id } = planningAlgorithmDetail;

            // 调用 deleteAlgorithm 并传递 id
            dispatch(deleteAlgorithm(id)).then(() => {
                navigate('/evolution/planningAlgorithm'); // 删除后返回数据源信息页面
                setMoreOperationAnchorEl(null);  // 关闭操作菜单
            });
        } else {
            console.error('找不到对应的算法数据源');
        }
    };

    const [openEditDialog, setOpenEditDialog] = useState(false);

    // 编辑操作
    const handleEdit = () => {
        // 设置编辑页面打开
        setOpenEditDialog(true);
    };

    const items = [
        [<EditService />, intl.messages['evolution.editAlgorithm'], handleEdit],
        [<Delete16 />, intl.messages['evolution.delete'], handleDelete],
    ];

    const handleMoreOperation = e => {
        setMoreOperationAnchorEl(e.currentTarget);
    };

    const [openCreateInstanceDialog, setOpenCreateInstanceDialog] = useState(false);

    const handleCreateInstance = () => {
        // 创建实例页面打开
        setOpenCreateInstanceDialog(true);
    }

    const handleRefresh = () => {

    }


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
            title={planningAlgorithmDetail ? planningAlgorithmDetail.info: ''}
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
              {planningAlgorithmDetail ? planningAlgorithmDetail.name : ''}
            </Box>
          </Tooltip>
        </Stack>
        <Stack
          sx={{ mt: '12px' }}
          direction='row'
          spacing={1.5}
          alignItems='center'
        >

          {/*  创建算法运行实例按键 */}
          <KubeCancelButton
              onClick={handleCreateInstance}
              sx={{ height: '32px', minWidth: '96px' }}
          >
              <Stack direction='row' alignItems='center' justifyContent='center'>
                  <Box sx={{ ml: '4px' }}>{intl.messages['evolution.createInstance']}</Box>
              </Stack>
          </KubeCancelButton>

          {/*  更多操作按键 */}
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
                <Box sx={labelStyle}>{intl.messages['evolution.name']}</Box>
                <Box sx={valueStyle}>
                {planningAlgorithmDetail ? planningAlgorithmDetail.name : ''}
                </Box>
            </Stack>
            <Stack direction='row' spacing={0.75}>
                <Box sx={labelStyle}>{intl.messages['evolution.info']}</Box>
                <Box sx={valueStyle}>
                    {planningAlgorithmDetail ? planningAlgorithmDetail.info : ''}
                </Box>
            </Stack>
            <Stack direction='row' spacing={0.75}>
                <Box sx={labelStyle}>{intl.messages['evolution.type']}</Box>
                <Box sx={valueStyle}>
                    {planningAlgorithmDetail ? planningAlgorithmDetail.type : ''}
                </Box>
            </Stack>
            <Stack direction='row' spacing={0.75}>
                <Box sx={labelStyle}>{intl.messages['evolution.input']}</Box>
                <Box sx={valueStyle}>
                    {planningAlgorithmDetail ? planningAlgorithmDetail.input : ''}
                </Box>
            </Stack>
            <Stack direction='row' spacing={0.75}>
                <Box sx={labelStyle}>{intl.messages['evolution.output']}</Box>
                <Box sx={valueStyle}>
                    {planningAlgorithmDetail ? planningAlgorithmDetail.output : ''}
                </Box>
            </Stack>
            <Stack direction='row' spacing={0.75}>
                <Box sx={labelStyle}>{intl.messages['evolution.parameter']}</Box>
                <Box sx={valueStyle}>
                    {planningAlgorithmDetail ? planningAlgorithmDetail.parameter : ''}
                </Box>
            </Stack>
            <Stack direction='row' spacing={0.75}>
                <Box sx={labelStyle}>{intl.messages['evolution.url']}</Box>
                <Box sx={valueStyle}>
                    {planningAlgorithmDetail ? planningAlgorithmDetail.url : ''}
                </Box>
            </Stack>
            <Stack direction='row' spacing={0.75}>
                <Box sx={labelStyle}>{intl.messages['evolution.createTime']}</Box>
                <Box sx={valueStyle}>
                    {planningAlgorithmDetail ? planningAlgorithmDetail.createTime : ''}
                </Box>
            </Stack>
            <Stack direction='row' spacing={0.75}>
                <Box sx={labelStyle}>{intl.messages['evolution.updateTime']}</Box>
                <Box sx={valueStyle}>
                    {planningAlgorithmDetail ? planningAlgorithmDetail.updateTime : ''}
                </Box>
            </Stack>
            <Stack direction='row' spacing={0.75}>
                <Box sx={labelStyle}>{intl.messages['evolution.isDelete']}</Box>
                <Box sx={valueStyle}>
                    {planningAlgorithmDetail ? planningAlgorithmDetail.isDelete : ''}
                </Box>
            </Stack>
        </Stack>
      </Box>

        {/* 编辑算法弹窗 */}
        <EditAlgorithm
            open={openEditDialog}
            handleClose={() => setOpenEditDialog(false)}
            algorithmToEdit={planningAlgorithmDetail} // 传递现有算法数据源
        />

        {/* 创建算法实例弹窗 */}
        <RunAlgorithmForm
            open={openCreateInstanceDialog}
            handleClose={() => setOpenCreateInstanceDialog(false)}
            instanceToCreate={planningAlgorithmDetail} // 传递现有算法数据源
            onRefresh={handleRefreshInstances} // 传递刷新方法
        />
    </Stack>
  );
}

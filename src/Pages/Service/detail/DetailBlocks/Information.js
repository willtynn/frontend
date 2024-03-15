/**
 * src\Pages\Service\detail\DetailBlocks\Information.js
 */
import {
  Stack,
  Tooltip,
  Table,
  TableHead,
  TableRow,
  IconButton,
  TableBody,
  TableCell,
} from '@mui/material';
import { fontFamily, decodeInterfaceSymbol } from '@/utils/commonUtils';
import { KubeSimpleCard } from '../../../../components/InfoCard';
import {
  StyledTableBodyCell,
  StyledTableRowCell,
  StyledTableContainer,
} from '@/components/DisplayTable';
import PolylineIcon from '@mui/icons-material/Polyline';
import { useNavigate } from 'react-router';
import { setSnackbarMessageAndOpen } from '@/actions/snackbarAction';
import { SEVERITIES } from '@/components/CommonSnackbar';
import { useDispatch } from 'react-redux';
import Question from '@/assets/Question.svg';
import { NormalBoldFont, SmallLightFont } from '@/components/Fonts';
import { useIntl } from 'react-intl';

function createRow(
  id,
  label,
  isOrder = true,
  minWidth = '110px',
  maxWidth = '220px',
  show = true,
  align = 'center',
  colSpan = 1,
  rowSpan = 1
) {
  return {
    id,
    label,
    isOrder,
    minWidth,
    maxWidth,
    show,
    align,
    colSpan,
    rowSpan,
  };
}

export default function Information(props) {
  const { service } = props;
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const headRow = [
    createRow('id', '接口', false, '40px', '40px', true, 'left'),
    createRow('path', '请求的路径', false, '50px', '50px', true, 'center'),
    createRow(
      'inputSize',
      '输入数据大小',
      false,
      '50px',
      '50px',
      true,
      'center'
    ),
    createRow(
      'outputSize',
      '输出数据大小',
      false,
      '50px',
      '50px',
      true,
      'center'
    ),
    createRow('method', '请求方法', false, '50px', '50px', true, 'center'),
    createRow('info', '描述', false, '50px', '50px', true, 'center'),
    createRow('dependency', '接口依赖', false, '30px', '30px', true, 'center'),
  ];

  const resourceAndCapabilityHeadRow = [
    createRow('cpu', 'cpu资源', false, '70px', '70px', true, 'center'),
    createRow('ram', 'ram资源', false, '70px', '70px', true, 'center'),
    createRow('disk', '硬盘资源', false, '70px', '70px', true, 'center'),
    createRow('gpuCore', 'gpu-core资源', false, '70px', '70px', true, 'center'),
    createRow('gpuMem', 'gpu内存资源', false, '70px', '70px', true, 'center'),
  ];

  const handleInterfaceDependencyClick = id => {
    navigate(`/service/dependency?type=interface&id=${id}`);
  };

  const handleCopyToClickboard = text => {
    navigator.clipboard.writeText(text);
    dispatch(
      setSnackbarMessageAndOpen('common.copyboard', {}, SEVERITIES.success)
    );
  };

  return (
    <Stack direction='column' spacing={1.5}>
      <KubeSimpleCard title='接口集合'>
        <StyledTableContainer sx={{ maxHeight: '680px' }}>
          <Table
            stickyHeader
            size='small'
            sx={{
              tableLayout: 'auto',
              minWidth: '100%',
            }}
          >
            <TableHead>
              <TableRow>
                {headRow.map((item, index) => (
                  <StyledTableRowCell
                    key={item.id}
                    align={item.align}
                    sx={{
                      maxWidth: item.maxWidth,
                      minWidth: item.minWidth,
                    }}
                  >
                    {item.label}
                  </StyledTableRowCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {service !== null ? (
                service.interfaces.map((row, index) => (
                  <TableRow
                    key={row.id + '' + index}
                    aria-checked={false}
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                      fontWeight: 600,
                      maxWidth: '110px',
                      position: 'sticky',
                      left: 0,
                      zIndex: 6,
                      backgroundColor: '#FFF !important',
                    }}
                    selected={false}
                  >
                    <StyledTableBodyCell
                      align={headRow[0].align}
                      sx={{
                        maxWidth: headRow[0].maxWidth,
                        minWidth: headRow[0].minWidth,
                      }}
                    >
                      {decodeInterfaceSymbol(row.id)[1]}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[1].align}
                      sx={{
                        maxWidth: headRow[1].maxWidth,
                        minWidth: headRow[1].minWidth,
                      }}
                    >
                      <Tooltip
                        PopperProps={{
                          sx: {
                            '& .MuiTooltip-tooltip': {
                              backgroundColor: '#242e42',
                              margin: '0 !important',
                              overflowWrap: 'break-word',
                              wordBreak: 'break-all',
                              cursor: 'pointer',
                            },
                          },
                          onClick: handleCopyToClickboard.bind(this, row.path),
                        }}
                        title={row.path}
                        placement='bottom'
                        leaveDelay={250}
                        enterDelay={300}
                      >
                        {row.path}
                      </Tooltip>
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[2].align}
                      sx={{
                        maxWidth: headRow[2].maxWidth,
                        minWidth: headRow[2].minWidth,
                      }}
                    >
                      {row.inputSize}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[3].align}
                      sx={{
                        maxWidth: headRow[3].maxWidth,
                        minWidth: headRow[3].minWidth,
                      }}
                    >
                      {row.outputSize}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[4].align}
                      sx={{
                        maxWidth: headRow[4].maxWidth,
                        minWidth: headRow[4].minWidth,
                      }}
                    >
                      {row.method}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[5].align}
                      sx={{
                        maxWidth: headRow[5].maxWidth,
                        minWidth: headRow[5].minWidth,
                      }}
                    >
                      {row.info}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={headRow[6].align}
                      sx={{
                        maxWidth: headRow[6].maxWidth,
                        minWidth: headRow[6].minWidth,
                      }}
                    >
                      <Tooltip title='查看依赖'>
                        <IconButton
                          onClick={() => {
                            handleInterfaceDependencyClick(row.id);
                          }}
                          size='small'
                        >
                          <PolylineIcon fontSize='small' />
                        </IconButton>
                      </Tooltip>
                    </StyledTableBodyCell>
                  </TableRow>
                ))
              ) : (
                <TableRow style={{ height: '220px' }}>
                  <TableCell
                    colSpan={5}
                    sx={{
                      textAlign: 'center',
                      fontSize: '20px',
                      fontFamily: fontFamily,
                      fontStyle: 'normal',
                    }}
                  >
                    <Question />
                    <NormalBoldFont>
                      {intl.messages['common.serviceTableContentNoData']}
                    </NormalBoldFont>

                    <SmallLightFont>
                      {intl.messages['common.serviceTableContentNoDataHint']}
                    </SmallLightFont>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </KubeSimpleCard>
      <KubeSimpleCard title='资源与能力'>
        <StyledTableContainer
          sx={{ maxHeight: '680px', overflow: 'auto', width: '100%' }}
        >
          <Table
            stickyHeader
            aria-label='simple table'
            size='small'
            sx={{
              tableLayout: 'auto',
              minWidth: '100%',
            }}
          >
            <TableHead>
              <TableRow>
                <StyledTableRowCell align='left'>Type</StyledTableRowCell>
                {resourceAndCapabilityHeadRow.map((item, index) => (
                  <StyledTableRowCell
                    key={item.id}
                    align={item.align}
                    sx={{
                      maxWidth: item.maxWidth,
                      minWidth: item.minWidth,
                    }}
                  >
                    {item.label}
                  </StyledTableRowCell>
                ))}
              </TableRow>
            </TableHead>
            {service !== null ? (
              <TableBody>
                <TableRow
                  aria-checked={false}
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: 0,
                    },
                    fontWeight: 600,
                    maxWidth: '110px',
                    position: 'sticky',
                    left: 0,
                    zIndex: 6,
                    backgroundColor: '#FFF !important',
                  }}
                  selected={false}
                >
                  <StyledTableBodyCell align='left'>
                    空闲时占用资源
                  </StyledTableBodyCell>
                  {service &&
                    resourceAndCapabilityHeadRow.map((item, index) => (
                      <StyledTableBodyCell
                        align='center'
                        sx={{
                          maxWidth: item.maxWidth,
                          minWidth: item.minWidth,
                        }}
                        key={item.id}
                      >
                        {service.idleResource[item.id]}
                      </StyledTableBodyCell>
                    ))}
                </TableRow>
                <TableRow
                  aria-checked={false}
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: 0,
                    },
                    fontWeight: 600,
                    maxWidth: '110px',
                    position: 'sticky',
                    left: 0,
                    zIndex: 6,
                    backgroundColor: '#FFF !important',
                  }}
                  selected={false}
                >
                  <StyledTableBodyCell align='left'>
                    期望资源
                  </StyledTableBodyCell>
                  {service &&
                    resourceAndCapabilityHeadRow.map((item, index) => (
                      <StyledTableBodyCell
                        key={item.id}
                        align='center'
                        sx={{
                          maxWidth: item.maxWidth,
                          minWidth: item.minWidth,
                        }}
                      >
                        {service.desiredResource[item.id]}
                      </StyledTableBodyCell>
                    ))}
                </TableRow>
                <TableRow
                  aria-checked={false}
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: 0,
                    },
                    fontWeight: 600,
                    maxWidth: '110px',
                    position: 'sticky',
                    left: 0,
                    zIndex: 6,
                    backgroundColor: '#FFF !important',
                  }}
                  selected={false}
                >
                  <StyledTableBodyCell align='left'>
                    处理能力
                  </StyledTableBodyCell>
                  <StyledTableBodyCell
                    align='center'
                    colSpan={5}
                    sx={{
                      maxWidth: '350px',
                      minWidth: '350px',
                    }}
                  >
                    {service && service.desiredCapability}
                  </StyledTableBodyCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                <TableRow style={{ height: '220px' }}>
                  <TableCell
                    colSpan={6}
                    sx={{
                      textAlign: 'center',
                      fontSize: '20px',
                      fontFamily: fontFamily,
                      fontStyle: 'normal',
                    }}
                  >
                    <Question />
                    <NormalBoldFont>
                      {intl.messages['common.serviceTableContentNoData']}
                    </NormalBoldFont>

                    <SmallLightFont>
                      {intl.messages['common.serviceTableContentNoDataHint']}
                    </SmallLightFont>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </StyledTableContainer>
      </KubeSimpleCard>
    </Stack>
  );
}

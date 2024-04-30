import {
  Stack,
  Tooltip,
  Table,
  TableHead,
  TableRow,
  IconButton,
  TableBody,
  TableCell,
  Box,
} from '@mui/material';
import { fontFamily, decodeInterfaceSymbol } from '@/utils/commonUtils';
import { KubeSimpleCard } from '@/components/InfoCard';
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
import { StyledModal } from '@/components/Modal';
import { useState } from 'react';
import LanIcon from '@mui/icons-material/Lan';
import { ContainedButton } from '../../../../../components/Button';
import { KubeDeploymentCard } from '../../../../../components/InfoCard';

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

export default function Information(props) {
  const { scheme } = props;
  const intl = useIntl();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [portsOpen, setPortsOpen] = useState(false);
  const [ports, setPorts] = useState([]);

  const firstRow = [
    createRow(
      'serviceId',
      intl.messages['common.serviceId'],
      false,
      '40px',
      '40px',
      true,
      'left',
      1,
      2
    ),
    createRow(
      'serviceName',
      intl.messages['common.serviceName'],
      false,
      '50px',
      '50px',
      true,
      'center',
      1,
      2
    ),
    createRow(
      'namespace',
      intl.messages['common.namespace'],
      false,
      '50px',
      '50px',
      true,
      'center',
      1,
      2
    ),
    createRow(
      'imageUrl',
      intl.messages['common.imageUrl'],
      false,
      '50px',
      '50px',
      true,
      'center',
      1,
      2
    ),
    createRow(
      'replicas',
      intl.messages['cluster.instanceReplicas'],
      false,
      '50px',
      '50px',
      true,
      'center',
      1,
      2
    ),
    createRow(
      'info',
      intl.messages['common.port'],
      false,
      '50px',
      '50px',
      true,
      'center',
      1,
      2
    ),
    createRow(
      'requests',
      intl.messages['common.resourceRequest'],
      false,
      '30px',
      '30px',
      true,
      'center',
      2,
      1
    ),
    createRow(
      'limits',
      intl.messages['common.resourceLimit'],
      false,
      '30px',
      '30px',
      true,
      'center',
      2,
      1
    ),
  ];

  const secondRow = [
    createRow(
      'cpu',
      intl.messages['common.cpu'],
      false,
      '70px',
      '70px',
      true,
      'center',
      1,
      1
    ),
    createRow(
      'memory',
      intl.messages['common.memory'],
      false,
      '70px',
      '70px',
      true,
      'center',
      1,
      1
    ),
    createRow(
      'cpu',
      intl.messages['common.cpu'],
      false,
      '70px',
      '70px',
      true,
      'center',
      1,
      1
    ),
    createRow(
      'memory',
      intl.messages['common.memory'],
      false,
      '70px',
      '70px',
      true,
      'center',
      1,
      1
    ),
  ];

  const portRow = [
    createRow(
      'name',
      intl.messages['common.name'],
      false,
      '40px',
      '40px',
      true,
      'left'
    ),
    createRow(
      'protocol',
      intl.messages['common.protocol'],
      false,
      '50px',
      '50px',
      true,
      'center'
    ),
    createRow(
      'containerPort',
      intl.messages['common.port'],
      false,
      '50px',
      '50px',
      true,
      'center'
    ),
  ];

  const handleClose = () => {
    setPortsOpen(false);
  };

  const handlePortsClick = ports => {
    setPortsOpen(true);
    setPorts(ports);
  };

  const handleCopyToClickboard = text => {
    navigator.clipboard.writeText(text);
    dispatch(
      setSnackbarMessageAndOpen('common.copyboard', {}, SEVERITIES.success)
    );
  };

  return (
    <Stack direction='column' spacing={1.5}>
      <KubeSimpleCard title={intl.messages['common.schemeDetails']}>
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
                {firstRow.map((item, index) => (
                  <StyledTableRowCell
                    key={item.id}
                    align={item.align}
                    sx={{
                      maxWidth: item.maxWidth,
                      minWidth: item.minWidth,
                    }}
                    colSpan={item.colSpan}
                    rowSpan={item.rowSpan}
                  >
                    {item.label}
                  </StyledTableRowCell>
                ))}
              </TableRow>
              <TableRow>
                {secondRow.map((item, index) => (
                  <StyledTableRowCell
                    key={item.id}
                    align={item.align}
                    sx={{
                      maxWidth: item.maxWidth,
                      minWidth: item.minWidth,
                    }}
                    colSpan={item.colSpan}
                    rowSpan={item.rowSpan}
                  >
                    {item.label}
                  </StyledTableRowCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {scheme && scheme.length ? (
                scheme.map((row, index) => (
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
                  >
                    <StyledTableBodyCell
                      align={firstRow[0].align}
                      sx={{
                        maxWidth: firstRow[0].maxWidth,
                        minWidth: firstRow[0].minWidth,
                      }}
                    >
                      {row.serviceId}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={firstRow[1].align}
                      sx={{
                        maxWidth: firstRow[1].maxWidth,
                        minWidth: firstRow[1].minWidth,
                      }}
                    >
                      {row.serviceName}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={firstRow[2].align}
                      sx={{
                        maxWidth: firstRow[2].maxWidth,
                        minWidth: firstRow[2].minWidth,
                      }}
                    >
                      {row.namespace}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={firstRow[3].align}
                      sx={{
                        maxWidth: firstRow[3].maxWidth,
                        minWidth: firstRow[3].minWidth,
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
                        title={row.imageUrl}
                        placement='bottom'
                        leaveDelay={250}
                        enterDelay={300}
                      >
                        {row.imageUrl}
                      </Tooltip>
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={firstRow[4].align}
                      sx={{
                        maxWidth: firstRow[4].maxWidth,
                        minWidth: firstRow[4].minWidth,
                      }}
                    >
                      {row.replicas}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={firstRow[5].align}
                      sx={{
                        maxWidth: firstRow[5].maxWidth,
                        minWidth: firstRow[5].minWidth,
                      }}
                    >
                      <Stack direction="column" spacing={0.5}>
                        {row.ports.map((port, index) => {
                          return (
                            <Box>{`${port.protocol}:${port.containerPort}->${port.containerPort}`}</Box>
                          )
                        })}

                      </Stack>

                      {/* <ContainedButton
                        onClick={handlePortsClick.bind(this, row.ports)}
                      >
                        <LanIcon />
                      </ContainedButton> */}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={secondRow[1].align}
                      sx={{
                        maxWidth: secondRow[1].maxWidth,
                        minWidth: secondRow[1].minWidth,
                      }}
                    >
                      {row.resources.requests.cpu ??
                        intl.messages['cluster.noLimited']}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={secondRow[2].align}
                      sx={{
                        maxWidth: secondRow[2].maxWidth,
                        minWidth: secondRow[2].minWidth,
                      }}
                    >
                      {row.resources.requests.memory ??
                        intl.messages['cluster.noLimited']}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={secondRow[3].align}
                      sx={{
                        maxWidth: secondRow[3].maxWidth,
                        minWidth: secondRow[3].minWidth,
                      }}
                    >
                      {row.resources.limits.cpu ??
                        intl.messages['cluster.noLimited']}
                    </StyledTableBodyCell>
                    <StyledTableBodyCell
                      align={secondRow[2].align}
                      sx={{
                        maxWidth: secondRow[3].maxWidth,
                        minWidth: secondRow[3].minWidth,
                      }}
                    >
                      {row.resources.limits.memory ??
                        intl.messages['cluster.noLimited']}
                    </StyledTableBodyCell>
                  </TableRow>
                ))
              ) : (
                <TableRow style={{ height: '220px' }}>
                  <TableCell
                    colSpan={7}
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
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </KubeSimpleCard>
      <StyledModal open={portsOpen} onClose={handleClose}>
        <Box sx={style}>
          <KubeDeploymentCard
            title={intl.messages['common.portsDetails']}
            handleClose={handleClose}
          >
            <Box sx={{
              p: "20px"
            }}>
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
                      {portRow.map((item, index) => (
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
                    {ports && ports.length ? (
                      ports.map((row, index) => (
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
                        >
                          <StyledTableBodyCell
                            align={firstRow[0].align}
                            sx={{
                              maxWidth: firstRow[0].maxWidth,
                              minWidth: firstRow[0].minWidth,
                            }}
                          >
                            {row.name}
                          </StyledTableBodyCell>
                          <StyledTableBodyCell
                            align={firstRow[1].align}
                            sx={{
                              maxWidth: firstRow[1].maxWidth,
                              minWidth: firstRow[1].minWidth,
                            }}
                          >
                            {row.protocol}
                          </StyledTableBodyCell>
                          <StyledTableBodyCell
                            align={firstRow[2].align}
                            sx={{
                              maxWidth: firstRow[2].maxWidth,
                              minWidth: firstRow[2].minWidth,
                            }}
                          >
                            {row.containerPort}
                          </StyledTableBodyCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow style={{ height: '220px' }}>
                        <TableCell
                          colSpan={7}
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
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            </Box>
          </KubeDeploymentCard>
        </Box>
      </StyledModal>
    </Stack>
  );
}

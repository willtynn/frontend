/**
 * src\Pages\Cluster\deploy\index.js
 */
import { useEffect, useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ContainedButton, OutlinedButton } from '../../../components/Button';
import ServiceStatusTable from './ServiceStatusTable';
import DeployProgress from './DeployProgress';
import BasicInfo from './DeployProgress/BasicInfo';
import ContainerConfig from './DeployProgress/ContainerConfig';
import TaskIcon from '@/assets/TaskIcon.svg';
import { useIntl } from 'react-intl';
import { deploy } from '../../../actions/instanceAction';
import DeployConfig from './DeployConfig';
import { StyledPopover } from '@/components/Popover';
import DataObjectIcon from '@mui/icons-material/DataObject';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

const formControlStyle = {
  // height: "45px",
  legend: {
    display: 'none',
  },
  width: '100%',
  '& .MuiOutlinedInput-root.MuiInputBase-root': {
    '& .MuiOutlinedInput-input.MuiInputBase-input': {
      '&:hover': {
        border: '1px solid #000',
      },
      '&:focus': {
        border: '2px solid #0072E5',
      },
      border: '1px solid rgba(0, 0, 0, 0.23)',
      borderRadius: '5px',
      p: '11px 8px !important',
    },
    '& fieldset': {
      border: 'none',
    },
  },
};

export default function InstanceDeploy() {
  const [open, setOpen] = useState(false);
  const [serviceId, setServiceId] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [namespace, setNamespace] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [replicas, setReplicas] = useState(1);
  const [ports, setPorts] = useState([
    { name: 'http-0', protocol: 'HTTP', containerPort: '' },
  ]);

  const [showError, setShowError] = useState(false);
  const [resources, setResources] = useState({
    requests: {
      cpu: '',
      memory: '',
    },
    limits: {
      cpu: '',
      memory: '',
    },
  });

  const [basicInfoError, setBasicInfoError] = useState(false);
  const [containerAddError, setContainerAddError] = useState(false);
  const [isConfig, setIsConfig] = useState(false);
  const [configFinish, setConfigFinish] = useState(false);

  const [openConfig, setOpenConfig] = useState(false);
  const [methodSelectOpenEl, setMethodSelectOpenEl] = useState(null);
  const methodSelectOpen = Boolean(methodSelectOpenEl);

  const intl = useIntl();
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfigOpen = () => setOpenConfig(true);
  const handleConfigClose = () => setOpenConfig(false);

  const items = [
    [
      <ContentPasteIcon />,
      '面板配置',
      handleOpen,
    ],
    [
      <DataObjectIcon />,
      'Json配置',
      handleConfigOpen,
    ],
  ];

  const handleMethodSelection = e => {
    setMethodSelectOpenEl(e.currentTarget);
  };

  const resetParam = () => {
    setServiceId('');
    setServiceName('');
    setNamespace('');
    setImageUrl('');
    setReplicas(1);
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

  const handleConfirmClick = () => {
    if (configFinish === true) {
      //等待后端接口的部署
      dispatch(
        deploy(
          (serviceId = serviceId),
          (serviceName = serviceName),
          (namespace = namespace),
          (imageUrl = imageUrl),
          (replicas = replicas),
          (ports = ports),
          (resources = {
            requests: {
              cpu: resources.requests.cpu + '',
              memory:
                resources.requests.memory === ''
                  ? ''
                  : resources.requests.memory + 'Mi',
            },
            limits: {
              cpu: resources.limits.cpu + '',
              memory:
                resources.limits.memory === ''
                  ? ''
                  : resources.limits.memory + 'Mi',
            },
          })
        )
      );
      console.log({
        serviceId: serviceId,
        serviceName: serviceName,
        namespace: namespace,
        imageUrl: imageUrl,
        replicas: replicas,
        ports: ports,
        resources: {
          requests: {
            cpu: resources.requests.cpu + '',
            memory:
              resources.requests.memory === ''
                ? ''
                : resources.requests.memory + 'Mi',
          },
          limits: {
            cpu: resources.limits.cpu + '',
            memory:
              resources.limits.memory === ''
                ? ''
                : resources.limits.memory + 'Mi',
          },
        },
      });
      setOpen(false);
      setShowError(false);
      resetParam();
    } else {
      setShowError(true);
    }
  };

  const handleCancelClick = () => {
    setOpen(false);
  };

  const currentPage = stage => {
    if (stage === 1) {
      return (
        <Box sx={{ p: '64px 64px 32px 64px', bgcolor: '#FFFFFF' }}>
          <BasicInfo
            serviceId={serviceId}
            setServiceId={setServiceId}
            serviceName={serviceName}
            setServiceName={setServiceName}
            namespace={namespace}
            setNamespace={setNamespace}
            showError={showError}
            setBasicInfoError={setBasicInfoError}
          />
        </Box>
      );
    }
    return (
      <Box sx={{ p: '20px 64px 32px 64px', bgcolor: '#FFFFFF' }}>
        <ContainerConfig
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          replicas={replicas}
          setReplicas={setReplicas}
          ports={ports}
          setPorts={setPorts}
          resources={resources}
          setResources={setResources}
          showError={showError}
          setContainerAddError={setContainerAddError}
          isConfig={isConfig}
          setIsConfig={setIsConfig}
          setShowError={setShowError}
          configFinish={configFinish}
          setConfigFinish={setConfigFinish}
        />
      </Box>
    );
  };

  return (
    <Box>
      <Box
        sx={{
          borderRadius: '4px',
          backgroundColor: '#FFFFFF',
          padding: '24px 20px',
          width: 'calc(100% - 40px)',
          height: '58px',
          mb: '12px',
        }}
      >
        <Stack direction='row' spacing={1}>
          <TaskIcon />
          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontStyle: 'normal',
                color: '#242e42',
                textShadow: '0 4px 8px rgba(36,46,66,.1)',
                fontSize: '24px',
                lineHeight: '32px',
              }}
            >
              服务实例
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontStyle: 'normal',
                color: '#79879c',
                fontSize: '12px',
                lineHeight: 1.67,
              }}
            >
              {intl.messages['instance.instanceDescription']}
            </Typography>
          </Box>
        </Stack>
      </Box>
      {/* 表格主体 */}
      <ServiceStatusTable
        embeddingButton={
          <OutlinedButton
            onClick={handleMethodSelection}
            sx={{
              borderRadius: '20px !important',
              width: '120px',
            }}
          >
            部署
          </OutlinedButton>
        }
      />
      <Modal open={open} onClose={handleClose}>
        <DeployProgress
          handleConfirmClick={handleConfirmClick}
          handleCancelClick={handleCancelClick}
          totalStage={2}
          currentPage={currentPage}
          basicInfoError={basicInfoError}
          setShowError={setShowError}
          isConfig={isConfig}
        />
      </Modal>

      <Modal open={openConfig} onClose={handleConfigClose}>
        <DeployConfig 
          handleCancelClick={handleConfigClose}
        />
      </Modal>

      <StyledPopover
        id='deploy-method-popover'
        open={methodSelectOpen}
        anchorEl={methodSelectOpenEl}
        handleClose={() => setMethodSelectOpenEl(null)}
        items={items}
        sx={{
          mt: '8px !important',
          boxShadow: 'inset 0 4px 8px 0 rgba(36,46,66,.12) !important',
          overflow: "hidden !important",
        }}
        border='none'
      />
    </Box>
  );
}

import { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  MenuItem,
} from '@mui/material';
import { KubeInput, EditableTextField, KubeSelect } from '@/components/Input';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { StyledRadioGroup } from '../../../../../components/Radio';
import { KubeCheckbox } from '../../../../../components/Checkbox';
import {
  UPDATE_WEB_SERVER_PROTOCOL,
  UPDATE_WEB_SERVER_NAME_OR_IP,
  UPDATE_WEB_SERVER_PORT,
  UPDATE_HTTP_REQUEST_PATH,
  UPDATE_HTTP_REQUEST_CONTENT_ENCODING,
  UPDATE_REQUEST_PARAMETERS,
  UPDATE_REQUEST_BODY_DATA,
} from '../../../../../actions/applicationAction';
import {
  KubeSubCard,
  KubeDeploymentCard,
} from '../../../../../components/InfoCard';
import Editor from '@monaco-editor/react';
import {
  StyledTableHead,
  StyledTableContainer,
  StyledTableBodyCell,
  StyledTableBox,
} from '../../../../../components/DisplayTable';
import { fontFamily } from '../../../../../utils/commonUtils';
import {
  KubeConfirmButton,
  KubeCancelButton,
} from '../../../../../components/Button';
import { PoissonRandomTimer } from './Timers/PoissonRandomTimer';
import { GaussianRandomTimer } from './Timers/GaussianRandomTimer';
import { ConstantTimer } from './Timers/ConstantTimer';
import { UniformRandomTimer } from './Timers/UniformRandomTimer';
import { NestedModal } from '../../../../../components/Modal';
import Docker from '@/assets/Docker.svg';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '640px',
  boxShadow: 24,
  height: 'calc(100% - 300px)',
  fontFamily: fontFamily,
};

export function Timer(props) {
  const {} = props;

  const [timerConfigOpen, setTimerConfigOpen] = useState(false);

  const intl = useIntl();

  const handleClose = () => {
    setTimerConfigOpen(false);
  };

  const handleTimerEdit = () => {
    setTimerConfigOpen(true);
  };

  return (
    <Box sx={{ p: '12px' }}>
      <KubeSubCard title='定时器列表'>
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
          onClick={handleTimerEdit}
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
              添加定时器
            </Typography>

            <Typography
              sx={{
                fontWeight: 400,
                color: '#79879c',
                fontSize: '12px',
                lineHeight: 1.67,
              }}
            >
              {intl.messages['stressTesting.timerAddDescription']}
            </Typography>
          </Stack>
        </Box>
      </KubeSubCard>

      <NestedModal open={timerConfigOpen} onClose={handleClose}>
        <TimerConfiguration handleCancelClick={handleClose} />
      </NestedModal>
    </Box>
  );
}

function TimerConfiguration(props) {
  const { handleConfirmClick, handleCancelClick } = props;

  const [currentTimer, setCurrentTimer] = useState('constant');
  const [threadDelay, setThreadDelay] = useState(300);
  const [randomDelayMaximum, setRandomDelayMaximum] = useState(100.0);
  const [constantDelayOffset, setConstantDelayOffset] = useState(0);
  const [lambda, setLambda] = useState(100);
  const [deviation, setDeviation] = useState(100);

  const timerList = [
    {
      id: 'constant',
      name: '固定计时器',
      timer: (
        <ConstantTimer
          threadDelay={threadDelay}
          setThreadDelay={setThreadDelay}
        />
      ),
    },
    {
      id: 'uniformRandom',
      name: '统一随机定时器',
      timer: (
        <UniformRandomTimer
          randomDelayMaximum={randomDelayMaximum}
          setRandomDelayMaximum={setRandomDelayMaximum}
          constantDelayOffset={constantDelayOffset}
          setConstantDelayOffset={setConstantDelayOffset}
        />
      ),
    },
    {
      id: 'PoissonRandom',
      name: '泊松随机定时器',
      timer: (
        <PoissonRandomTimer
          lambda={lambda}
          setLambda={setLambda}
          constantDelayOffset={constantDelayOffset}
          setConstantDelayOffset={setConstantDelayOffset}
        />
      ),
    },
    {
      id: 'GaussianRandom',
      name: '高斯随机定时器',
      timer: (
        <GaussianRandomTimer
          deviation={deviation}
          setDeviation={setDeviation}
          constantDelayOffset={constantDelayOffset}
          setConstantDelayOffset={setConstantDelayOffset}
        />
      ),
    },
  ];

  const handleTimerChange = e => {
    setCurrentTimer(e.target.value);
  };

  return (
    <Box sx={style}>
      <KubeDeploymentCard title='创建定时器' handleClose={handleCancelClick}>
        <Stack sx={{ p: '24px', bgcolor: '#FFFFFF', height: "calc(100% - 164px)" }} direction="column" spacing={1}>
          <KubeSelect
            sx={{
              height: '32.36px',
              fontSize: '12px',
              lineHeight: '1.67',
              color: '#242e42',
            }}
            MenuProps={{ className: 'PortProtocols-List' }}
            value={currentTimer}
            onChange={handleTimerChange}
            // error={error}
          >
            {timerList.map((value, item) => {
              return (
                <MenuItem className='PortProtocols-Item' value={value.id}>
                  {value.name}
                </MenuItem>
              );
            })}
          </KubeSelect>
          {
            timerList.find((value, index) => {
              return value.id === currentTimer;
            }).timer
          }
        </Stack>
      </KubeDeploymentCard>
    </Box>
  );
}

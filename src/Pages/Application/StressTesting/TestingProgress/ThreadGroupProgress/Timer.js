/**
 * src\Pages\Application\StressTesting\TestingProgress\ThreadGroupProgress\Timer.js
 */
import { useState, useEffect } from 'react';
import { Box, Stack, Typography, MenuItem } from '@mui/material';
import { KubeInput, EditableTextField, KubeSelect } from '@/components/Input';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_TIMER } from '../../../../../actions/applicationAction';
import {
  KubeSubCard,
  KubeDeploymentCard,
} from '../../../../../components/InfoCard';
import { fontFamily } from '../../../../../utils/commonUtils';
import {
  KubeConfirmButton,
  KubeCancelButton,
  KubeTransparentButton,
} from '../../../../../components/Button';
import { PoissonRandomTimer } from './Timers/PoissonRandomTimer';
import { GaussianRandomTimer } from './Timers/GaussianRandomTimer';
import { ConstantTimer } from './Timers/ConstantTimer';
import { UniformRandomTimer } from './Timers/UniformRandomTimer';
import { NestedModal } from '../../../../../components/Modal';
import Docker from '@/assets/Docker.svg';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

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
  const [timerEditOpen, setTimerEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  const { timer } = useSelector(state => {
    return {
      timer: state.Application.timer,
    };
  });

  const intl = useIntl();
  const dispatch = useDispatch();

  const handleClose = () => {
    setTimerConfigOpen(false);
  };

  const handleEditClose = () => {
    setTimerEditOpen(false);
  };

  const handleTimerAdd = () => {
    setTimerConfigOpen(true);
  };

  const handleTimerFinish = data => {
    dispatch({ type: UPDATE_TIMER, data: [...timer, data] });
  };

  const handleTimerEditFinish = data => {
    let tmpTimer = JSON.parse(JSON.stringify(timer));
    tmpTimer[editIndex] = data;
    dispatch({ type: UPDATE_TIMER, data: tmpTimer });
  };

  const handleTimerEdit = index => {
    setTimerEditOpen(true);
    setEditIndex(index);
  };

  const handleTimerDelete = index => {
    let tmpTimer = JSON.parse(JSON.stringify(timer));
    tmpTimer.splice(index, 1);
    dispatch({ type: UPDATE_TIMER, data: tmpTimer });
  };

  return (
    <Box sx={{ p: '12px' }}>
      <KubeSubCard title='定时器列表'>
        <Stack
          sx={{
            mt: '12px',
            mb: '12px',
          }}
          direction='column'
          spacing={0.5}
        >
          {timer && timer.length && timer.length > 0 ? (
            timer.map((singleTimer, index) => {
              return (
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
                          定时器
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
                          {singleTimer.label}
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
                        onClick={handleTimerDelete.bind(this, index)}
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
                        onClick={handleTimerEdit.bind(this, index)}
                      >
                        <ModeEditOutlineOutlinedIcon />
                      </KubeTransparentButton>
                    </Stack>
                  </Stack>
                </Box>
              );
            })
          ) : (
            <></>
          )}
        </Stack>
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
          onClick={handleTimerAdd}
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

      {/* 负责添加 */}
      <NestedModal open={timerConfigOpen} onClose={handleClose}>
        <TimerConfiguration
          handleConfirmClick={handleTimerFinish}
          handleCancelClick={handleClose}
        />
      </NestedModal>

      {/* 负责修改 */}
      <NestedModal open={timerEditOpen} onClose={handleEditClose}>
        <TimerConfiguration
          editTimer={timer.length > editIndex ? timer[editIndex] : null}
          handleConfirmClick={handleTimerEditFinish}
          handleCancelClick={handleEditClose}
        />
      </NestedModal>
    </Box>
  );
}

export const CONSTANT_TIMER = 'constant';
export const UNIFORM_RANDOM_TIMER = 'uniformRandom';
export const POISSON_RANDOM_TIMER = 'poissonRandom';
export const GAUSSIAN_RANDOM_TIMER = 'gaussianRandom';

function TimerConfiguration(props) {
  const { editTimer, handleConfirmClick, handleCancelClick } = props;

  const [currentTimer, setCurrentTimer] = useState(CONSTANT_TIMER);
  const [threadDelay, setThreadDelay] = useState(300);
  const [randomDelayMaximum, setRandomDelayMaximum] = useState(100.0);
  const [constantDelayOffset, setConstantDelayOffset] = useState(0);
  const [lambda, setLambda] = useState(100);
  const [deviation, setDeviation] = useState(100);

  const timerList = [
    {
      id: CONSTANT_TIMER,
      name: '固定计时器',
      timer: (
        <ConstantTimer
          threadDelay={threadDelay}
          setThreadDelay={setThreadDelay}
        />
      ),
    },
    {
      id: UNIFORM_RANDOM_TIMER,
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
      id: POISSON_RANDOM_TIMER,
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
      id: GAUSSIAN_RANDOM_TIMER,
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

  useEffect(() => {
    if (editTimer && editTimer.id) {
      setCurrentTimer(editTimer.id);
      if (editTimer.id === CONSTANT_TIMER) {
        setThreadDelay(editTimer.threadDelay);
      } else if (editTimer.id === UNIFORM_RANDOM_TIMER) {
        setRandomDelayMaximum(editTimer.randomDelayMaximum);
        setConstantDelayOffset(editTimer.constantDelayOffset);
      } else if (editTimer.id === POISSON_RANDOM_TIMER) {
        setLambda(editTimer.setLambda);
        setConstantDelayOffset(editTimer.constantDelayOffset);
      } else {
        setDeviation(editTimer.deviation);
        setConstantDelayOffset(editTimer.constantDelayOffset);
      }
    }
  }, [editTimer]);

  const handleTimerChange = e => {
    setCurrentTimer(e.target.value);
  };

  const handleConfirmButtonClick = () => {
    let tmpTimer = {};
    tmpTimer.id = currentTimer;
    if (currentTimer === CONSTANT_TIMER) {
      tmpTimer.label = '固定计时器';
      tmpTimer.threadDelay = threadDelay;
    } else if (currentTimer === UNIFORM_RANDOM_TIMER) {
      tmpTimer.label = '统一随机定时器';
      tmpTimer.randomDelayMaximum = randomDelayMaximum;
      tmpTimer.constantDelayOffset = constantDelayOffset;
    } else if (currentTimer === POISSON_RANDOM_TIMER) {
      tmpTimer.label = '泊松随机定时器';
      tmpTimer.lambda = lambda;
      tmpTimer.constantDelayOffset = constantDelayOffset;
    } else {
      tmpTimer.label = '高斯随机定时器';
      tmpTimer.deviation = deviation;
      tmpTimer.constantDelayOffset = constantDelayOffset;
    }
    handleConfirmClick(tmpTimer);
    handleCancelClick();
  };

  return (
    <Box sx={style}>
      <KubeDeploymentCard
        title={editTimer && editTimer.id ? '修改定时器' : '创建定时器'}
        handleClose={handleCancelClick}
      >
        <Stack
          sx={{ p: '24px', bgcolor: '#FFFFFF', height: 'calc(100% - 164px)' }}
          direction='column'
          spacing={1}
        >
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
        <Stack
          sx={{
            mt: '80px',
            position: 'absolute',
            bottom: '12px',
            width: 'calc(100% - 64px)',
            bgcolor: '#f9fbfd',
          }}
          direction='row'
          spacing={3}
          justifyContent='flex-end'
          alignItems='flex-end'
        >
          <KubeCancelButton
            sx={{ height: '32px', width: '84px' }}
            onClick={handleCancelClick}
          >
            取消
          </KubeCancelButton>
          <KubeConfirmButton
            sx={{ height: '32px', width: '84px' }}
            onClick={handleConfirmButtonClick}
          >
            {editTimer && editTimer.id ? '确认' : '创建'}
          </KubeConfirmButton>
        </Stack>
      </KubeDeploymentCard>
    </Box>
  );
}

import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';

import {
  stepClasses,
  StepLabel,
  stepLabelClasses,
  ThemeProvider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import PropTypes from 'prop-types';
// import Completed from '../../assets/Completed.svg';
import { StepTheme } from './MyTheme';
import { stepLabel } from './commonStyle';
// import { AllCentered } from '@/pages/SIPage/CreateAndUpdateSI/CGTComponents/CommonStyle';
// import Subtract from '@/pages/SIPage/CreateAndUpdateSI/CGTComponents/SVGComponents/Subtract.svg';
import StepperCheckedTag from './StepperCheckedTag.svg';

const BootstrapConnector = styled(StepConnector)({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#4C81EB',
      borderTopWidth: '4px',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#4C81EB',
      borderTopWidth: '4px',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#DFE4E8',
    borderTopWidth: '2px',
    borderRadius: '6px',
    maxWidth:'201px'
  },
  
});

const BootstrapIconRoot = styled('div')(({ ownerState }) => ({
  backgroundColor: '#BCC5CF',
  zIndex: 1,
  color: '#F6F7F8',
  width: '26.67px',
  height: '26.67px',
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  fontFamily: 'Open Sans',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '16.3955px',
  lineHeight: '26.67px',
  letterSpacing: '0',
  margin: '2.665px',
  ...(ownerState.active && {
    backgroundColor: '#154AB6',
  }),
  ...(ownerState.completed && {
    color: '#fff',
    backgroundColor: '#FFFFFF',
    margin: '0px',
    width: '32px',
    height: '32px',
  }),
  ...(ownerState.error && {
    backgroundColor: 'rgb(238, 83, 80)',
  }),
}));

function BootstrapStepIcon(props) {
  const { active, completed, className, error } = props;
  return (
    <BootstrapIconRoot
      ownerState={{ completed, active, error }}
      className={className}
    >
      {completed ? <StepperCheckedTag></StepperCheckedTag> : String(props.icon)}
    </BootstrapIconRoot>
  );
}

BootstrapStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const BootstrapStepLable = styled(StepLabel)({
  '& .MuiStepLabel-label': {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '600 !important',
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '1.12px',  //modified
    textTransform: 'capitalize',
    color: '#596A7C',
  },
  '& .Mui-active': {
    color: '#0052CC !important',
  },
  '& .Mui-completed': {
    color: '#4C81EB !important',
  },
});

function BootstrapStepper(props) {
  const { id, steps, activeStep } = props;
  return (
    <Stepper
      id={id}
      data-selenium-id={id}
      activeStep={activeStep}
      connector={<BootstrapConnector />}
      sx={{
        // gap:'8px',  //modified
        justifyContent:'center',
        '& .MuiStep-root':{
          padding:'0px'
        },
        '& .MuiStepConnector-root':{
          maxWidth:'201px',
          marginLeft:'8px',
          marginRight:'6px'
        }
      }}
    >
      {steps.map(label => {
        const labelProps = {};
        // 这个部分 用于 当需要步骤条错误显示时
        //   if (isStepError(index)) {
        //     labelProps.error = true;
        //   }
        return (
          <Step
            key={label}
            id={`${id}_step_${label}`}
            data-selenium-id={`${id}_step_${label}`}
          >
            <ThemeProvider theme={StepTheme}>
              <BootstrapStepLable
                {...labelProps}
                sx={{
                  ...stepLabel,
                  '& .MuiStepLabel-iconContainer': {
                    paddingRight: '6px',
                  },
                }}
                StepIconComponent={BootstrapStepIcon}
              >
                {label}
              </BootstrapStepLable>
            </ThemeProvider>
          </Step>
        );
      })}
    </Stepper>
  );
}

export default BootstrapStepper;

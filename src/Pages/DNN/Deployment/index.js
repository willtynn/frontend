import * as React from 'react';
import { Box } from '@mui/material';
import CreateAndUpdateHeader from './CommonComponents/MyHeader';
import MainPageFramework from './CommonComponents/MainPageFramework'
import CreateAndUpdateFooter from './CommonComponents/MyFooter'
import ModelInfomation from './SubPage/ModelSelector/ModelInfomation';

export default function ModelDeploymentPage() {
  const steps = ['选择模型', '选择服务器', '生成分区方案', '生成部署方案'];

  const [activeStep, setActiveStep] = React.useState(0);

  const handleItemClick = (stage) => {
    console.log(`Clicked on ${stage}`);
    // Add your logic for handling the click event here
  };

  const handleBack = () => {
    if (activeStep !== 0) {
      //stakeholdersAndDatesMonitor
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    }
  };

  const handleNext = active => {
    if(activeStep !== steps.length - 1){
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
    console.log(active);
  };

  const stepper = (
    <CreateAndUpdateHeader
      id={`updateSI_mainPage_header`}
      activeStep={activeStep}
      steps={steps}
    />
  );

  const actionBar = (
    <CreateAndUpdateFooter
      id={`updateSI_mainPage_actionBar`}
      activeStep={activeStep}
      lastStep={steps.length - 1}
      handleBack={handleBack}
      handleNextOrCreate={e => {
        handleNext(activeStep);
      }}
    />
  );

  const getContainer = active => {
    switch (active) {
      case 0:
        return (<ModelInfomation>

        </ModelInfomation>);
      case 1:
        return steps[activeStep];
      case 2:
        return steps[activeStep];
      case 3:
        return steps[activeStep];
      default:
        return 'defalut';
    }
  };
  
  return (
    <MainPageFramework
      id={`updateSI_mainPage`}
      actionBar={actionBar}
      stepper={stepper}
    >
      {getContainer(activeStep)}
    </MainPageFramework>
  );
}
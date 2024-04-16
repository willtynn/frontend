import CreateAndUpdateHeader from './CommonComponents/MyHeader';
import MainPageFramework from './CommonComponents/MainPageFramework'
import CreateAndUpdateFooter from './CommonComponents/MyFooter'
import ModelInformation from './SubPage/ModelSelector/ModelInformation';
import ServerInformation from './SubPage/ServerSelector/ServerInformation';
import PartitionInformation from './SubPage/PartitionView/PartitionInformation';
import DeploymentInformation from './SubPage/DeploymentView/DeploymentInformation'
import React, { createContext, useState, useContext } from 'react';

export default function ModelDeploymentPage() {

  const steps = ['选择模型', '选择服务器', '分区部署算法配置', '生成分区方案', '生成部署方案'];

  const [activeStep, setActiveStep] = useState(0);

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
    if (activeStep !== steps.length - 1) {
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
        return (<ModelInformation></ModelInformation>);
      case 1:
        return (<ServerInformation></ServerInformation>);
      case 2:
        return steps[activeStep]; 
      case 3:
        return (<PartitionInformation></PartitionInformation>);
      case 4:
        return (<DeploymentInformation></DeploymentInformation>);
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
import { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { KubeDeploymentCard } from '@/components/InfoCard';
import { fontFamily } from '@/utils/commonUtils';
import { KubeInput, StyledTextFiled } from '@/components/Input';
import { useIntl } from 'react-intl';
import { StyledCheckbox } from '../../../../components/Checkbox';

const regExp = new RegExp(/^[a-z0-9](?:[a-z0-9-]{0,251}[a-z0-9])?$/);

export function TestPlan(props) {

  const { showError } = props;

  const [planName, setPlanName] = useState("");
  const [planComment, setPlanComment] = useState("");
  const [serializeThreadgroups, setSerializeThreadgroups] = useState(false);


  const [planNameError, setPlanNameError] = useState(true);
  const [planNameErrorType, setPlanNameErrorType] = useState(0);

  const intl = useIntl();

  const handlePlanNameChange = (e) => {
    
    if(e.target.value === "") {
      setPlanNameError(true);
      setPlanNameErrorType(0);
    } else if(!regExp.test(e.target.value)) {
      setPlanNameError(true);
      setPlanNameErrorType(1);
    } else {
      setPlanNameError(false);
    }
    setPlanNameError(e.target.value);
  }

  const handlePlanCommentChange = (e) => {
    setPlanComment(e.target.value);
  }

  return (
    <Stack direction="column" justifyContent="space-between">

    
    <Stack sx={{p: '32px 64px', bgcolor: '#FFFFFF'}} direction="column" spacing={2}>
      <KubeInput
        label='名称'
        decription={intl.messages['stressTesting.planNameDescription']}
        requried={true}
        id='test-plan-name-input'
        variant='outlined'
        value={planName}
        onChange={handlePlanNameChange}
        error={planNameError && showError}
        errorMessage={intl.messages['stressTesting.nameEmptyErrorMsg']}
      />

      <KubeInput
        label='注释'
        decription={intl.messages['stressTesting.planCommentDescription']}
        requried={false}
        id='test-plan-comment-input'
        variant='outlined'
        value={planComment}
        onChange={handlePlanCommentChange}
      />
    </Stack>

    <Stack direction="column" spacing={1}>
      <StyledCheckbox 
        checked
        setChecked
        msg
      />
    </Stack>
      
    </Stack>
  );
}

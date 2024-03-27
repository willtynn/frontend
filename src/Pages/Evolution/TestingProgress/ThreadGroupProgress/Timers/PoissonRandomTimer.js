import { Stack } from '@mui/material';
import { KubeInput } from '../../../../../../components/Input';
import { useIntl } from 'react-intl';

export function PoissonRandomTimer(props) {
  const { lambda, setLambda, constantDelayOffset, setConstantDelayOffset } = props;

  const intl = useIntl();

  const handleLambdanChange = e => {
    setLambda(e.target.value);
  }

  const handleConstantDelayOffsetChange = e => {
    setConstantDelayOffset(e.target.value);
  }

  return (
    <Stack direction="column" spacing={1}>
      <KubeInput
        label={intl.messages['stressTesting.msLambda']}
        // decription={intl.messages['stressTesting.groupCommentDescription']}
        requried={true}
        id='poisson-timer-lambda-input'
        variant='outlined'
        value={lambda}
        onChange={handleLambdanChange}
      />
      <KubeInput
        label={intl.messages['stressTesting.constantMsDelayOffset']}
        // decription={intl.messages['stressTesting.groupCommentDescription']}
        requried={true}
        id='poisson-timer-constantDelayOffset-input'
        variant='outlined'
        value={constantDelayOffset}
        onChange={handleConstantDelayOffsetChange}
      />
    </Stack>
  )
}

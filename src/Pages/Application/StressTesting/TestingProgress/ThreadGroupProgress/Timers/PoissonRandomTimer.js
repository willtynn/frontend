import { Stack } from '@mui/material';
import { KubeInput } from '../../../../../../components/Input';

export function PoissonRandomTimer(props) {
  const { lambda, setLambda, constantDelayOffset, setConstantDelayOffset } = props;
  const handleLambdanChange = e => {
    setLambda(e.target.value);
  }

  const handleConstantDelayOffsetChange = e => {
    setConstantDelayOffset(e.target.value);
  }

  return (
    <Stack direction="column" spacing={1}>
      <KubeInput
        label='Lambda（毫秒）'
        // decription={intl.messages['stressTesting.groupCommentDescription']}
        requried={true}
        id='poisson-timer-lambda-input'
        variant='outlined'
        value={lambda}
        onChange={handleLambdanChange}
      />
      <KubeInput
        label='固定延迟偏移（毫秒）'
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

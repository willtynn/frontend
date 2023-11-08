import { Stack } from '@mui/material';
import { KubeInput } from '../../../../../../components/Input';

export function GaussianRandomTimer(props) {
  const {deviation, setDeviation, constantDelayOffset, setConstantDelayOffset} = props;

  const handleDeviationChange = e => {
    setDeviation(e.target.value);
  }

  const handleConstantDelayOffsetChange = e => {
    setConstantDelayOffset(e.target.value);
  }

  return (
    <Stack direction="column" spacing={1}>
      <KubeInput
        label='偏差（毫秒）'
        // decription={intl.messages['stressTesting.groupCommentDescription']}
        requried={true}
        id='gaussian-timer-deviation-input'
        variant='outlined'
        value={deviation}
        onChange={handleDeviationChange}
      />
      <KubeInput
        label='固定延迟偏移（毫秒）'
        // decription={intl.messages['stressTesting.groupCommentDescription']}
        requried={true}
        id='gaussian-timer-constantDelayOffset-input'
        variant='outlined'
        value={constantDelayOffset}
        onChange={handleConstantDelayOffsetChange}
      />
    </Stack>
  )
}

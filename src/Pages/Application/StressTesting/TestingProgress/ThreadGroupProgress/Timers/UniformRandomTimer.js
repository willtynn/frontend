import { Stack } from '@mui/material';
import { KubeInput } from '../../../../../../components/Input';

export function UniformRandomTimer(props) {
  const {
    randomDelayMaximum,
    setRandomDelayMaximum,
    constantDelayOffset,
    setConstantDelayOffset,
  } = props;

  const handleRandomDelayMaximumChange = e => {
    setRandomDelayMaximum(e.target.value);
  };

  const handleConstantDelayOffsetChange = e => {
    setConstantDelayOffset(e.target.value);
  };

  return (
    <Stack direction="column" spacing={1}>
      <KubeInput
        label='最大随机延迟时间（毫秒）'
        // decription={intl.messages['stressTesting.groupCommentDescription']}
        requried={true}
        id='random-uniform-timer-randomDelayMaximum-input'
        variant='outlined'
        value={randomDelayMaximum}
        onChange={handleRandomDelayMaximumChange}
      />
      <KubeInput
        label='固定延迟偏移（毫秒）'
        // decription={intl.messages['stressTesting.groupCommentDescription']}
        requried={true}
        id='random-uniform-timer-constantDelayOffset-input'
        variant='outlined'
        value={constantDelayOffset}
        onChange={handleConstantDelayOffsetChange}
      />
    </Stack>
  );
}

import { Stack } from '@mui/material';
import { KubeInput } from '../../../../../../components/Input';
import { useIntl } from 'react-intl';

export function UniformRandomTimer(props) {
  const {
    randomDelayMaximum,
    setRandomDelayMaximum,
    constantDelayOffset,
    setConstantDelayOffset,
  } = props;

  const intl = useIntl();

  const handleRandomDelayMaximumChange = e => {
    setRandomDelayMaximum(e.target.value);
  };

  const handleConstantDelayOffsetChange = e => {
    setConstantDelayOffset(e.target.value);
  };

  return (
    <Stack direction="column" spacing={1}>
      <KubeInput
        label={intl.messages['stressTesting.randomMsDelayMaximum']}
        requried={true}
        id='random-uniform-timer-randomDelayMaximum-input'
        variant='outlined'
        value={randomDelayMaximum}
        onChange={handleRandomDelayMaximumChange}
      />
      <KubeInput
        label={intl.messages['stressTesting.constantMsDelayOffset']}
        requried={true}
        id='random-uniform-timer-constantDelayOffset-input'
        variant='outlined'
        value={constantDelayOffset}
        onChange={handleConstantDelayOffsetChange}
      />
    </Stack>
  );
}

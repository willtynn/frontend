import { Stack } from '@mui/material';
import { KubeInput } from '../../../../../../components/Input';
import { useIntl } from 'react-intl';

export function GaussianRandomTimer(props) {
  const {deviation, setDeviation, constantDelayOffset, setConstantDelayOffset} = props;

  const intl = useIntl();

  const handleDeviationChange = e => {
    setDeviation(e.target.value);
  }

  const handleConstantDelayOffsetChange = e => {
    setConstantDelayOffset(e.target.value);
  }

  return (
    <Stack direction="column" spacing={1}>
      <KubeInput
        label={intl.messages['stressTesting.msDeviation']}
        // decription={intl.messages['stressTesting.groupCommentDescription']}
        requried={true}
        id='gaussian-timer-deviation-input'
        variant='outlined'
        value={deviation}
        onChange={handleDeviationChange}
      />
      <KubeInput
        label={intl.messages['stressTesting.constantMsDelayOffset']}
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

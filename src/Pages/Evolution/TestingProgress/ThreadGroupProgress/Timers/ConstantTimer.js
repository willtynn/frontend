import { Box } from '@mui/material';
import { KubeInput } from '../../../../../../components/Input';
import { useIntl } from 'react-intl';

export function ConstantTimer(props) {

  const { threadDelay, setThreadDelay } = props;

  const intl = useIntl();

  const handleThreadDelayChange = e => {
    setThreadDelay(e.target.value);
  }
  return (
    <Box>
      <KubeInput
        label={intl.messages['stressTesting.threadMsDelay']}
        // decription={intl.messages['stressTesting.groupCommentDescription']}
        requried={true}
        id='constant-timer-delay-input'
        variant='outlined'
        value={threadDelay}
        onChange={handleThreadDelayChange}
      />
    </Box>
  );
}

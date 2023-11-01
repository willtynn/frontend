import { Box } from '@mui/material';
import { KubeInput } from '../../../../../../components/Input';

export function ConstantTimer(props) {

  const { threadDelay, setThreadDelay } = props;

  const handleThreadDelayChange = e => {
    setThreadDelay(e.target.value);
  }
  return (
    <Box>
      <KubeInput
        label='线程延迟（毫秒）'
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

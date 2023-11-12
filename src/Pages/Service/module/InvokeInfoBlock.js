/**
 * src\Pages\Service\module\InvokeInfoBlock.js
 */
import LabelAndValue from '@/components/LabelAndValue';
import { Box } from '@mui/material';
import { LargeBoldFont } from '@/components/Fonts';
import { shadowStyle } from '@/utils/commonUtils';
import { useState, useEffect } from 'react';

export default function InvokeInfoBlock(props) {
  const { data, init = () => {} } = props;
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [isUrl, setIsUrl] = useState([]);

  useEffect(() => {
    if (!data) {
      return;
    }
    let tmpLabels = [];
    let tmpValues = [];
    let tmpIsUrl = [];
    for (const [key, value] of Object.entries(data)) {
      tmpLabels.push(key);
      tmpValues.push(value);
      tmpIsUrl.push(false);
    }
    setLabels(tmpLabels);
    setValues(tmpValues);
    setIsUrl(tmpIsUrl);
    init();
  }, [data]);

  return (
    <Box
      sx={{
        mt: '40px',
        ...shadowStyle,
      }}
    >
      <LargeBoldFont
        sx={{
          mb: '20px',
        }}
      >
        调用详细信息
      </LargeBoldFont>
      <LabelAndValue
        id='serviceQueryInfo'
        labels={labels}
        value={values}
        isUrl={isUrl}
      />
    </Box>
  );
}

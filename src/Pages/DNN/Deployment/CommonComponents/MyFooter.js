import { Box, Stack } from '@mui/material';
import { useState } from 'react';
import NextButton from './NextButton';
import BackButton from './BackButton';
import {
  KubeCancelButton,
  KubeConfirmButton,
} from '@/components/Button';
// import { useUpdateEffect } from 'ahooks';

export const AllCentered = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

function CreateAndUpdateFooter(props) {
  const {
    id,
    handleBack,
    handleNextOrCreate,
    activeStep,
    lastStep,
    isShelved = false,
    Err = false,
  } = props;
  //获取当前页面的url
  // const url = window.location.pathname;
  //判断当前页面的操作是否为update,如果是 返回 true， 否则返回false
  // const isUpdate = () => {
  //   return url.indexOf('update') !== -1;
  // };
  // const btnNextString = isUpdate() ? 'Update' : 'Create';
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
//   useUpdateEffect(() => {
//     error&&setError(Err);
//   }, [Err]);
  const handleNextAsync = () => {
    setLoading(true);
    async function nextStep() {
      await handleNextOrCreate();
    }
    nextStep().then(_r => {
      setLoading(false);
      // setError(Err);
    });
  };

  const handleBackAsync = () => {
    setLoading(true);
    async function nextStep() {
      await handleBack();
    }
    nextStep().then(_r => {
      setLoading(false);
      // setError(false);
    });
  };

  return (
    <Box
      id={`box`}
      data-selenium-id={`box`}
      style={{
        ...AllCentered,
        width: '100%',
        height: '60px',
        background: '#FFFFFF',
        position: 'center',
        boxShadow: '2px 2px 12px rgba(0,0,0,0.25)',
        // position: 'sticky', // 外部需要有一个容器让他贴靠底部
        // bottom: 0,
      }}
    >
      <Stack spacing={1} direction='column'>
        {isShelved && (
          <Box
            sx={{
              width: '680px',
              fontFamily: 'Open Sans',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '12px',
              lineHeight: '16px',
              textAlign: 'center',
              color: '#C40000'
            }}
          >
            After clicking 'Update' button, you will <b>NOT</b> be able to edit
            this page any more, please make sure you want to shelve the SI and
            input the complete 'Shelved Reason'.
          </Box>
        )}
        <Stack spacing={10} direction='row' sx={{...AllCentered}}>
          <KubeCancelButton
          onClick={handleBackAsync}>
            Back
          </KubeCancelButton>
          <KubeConfirmButton
           onClick={handleNextAsync}>
            {activeStep === lastStep ? 'Finish' : 'Next'}
          </KubeConfirmButton>
          {/* <BackButton
            id={`back_buttonSI`}
            data-selenium-id={`back_button`}
            disabled={loading}
            onClick={handleBackAsync}
          >
            Back
          </BackButton> */}
          {/* <NextButton
            id={`next_buttonSI`}
            data-selenium-id={`next_button`}
            disabled={loading}
            onClick={handleNextAsync}
          >
            {activeStep === lastStep ? 'Finish' : 'Next'}
          </NextButton> */}
        </Stack>
      </Stack>
    </Box>
  );
}

export default CreateAndUpdateFooter;
